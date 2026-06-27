/**
 * Test governance — enforces the "every authored component has a mirrored test"
 * rule for the non-co-located `tests/` layout.
 *
 *   src/components/atoms/foo.tsx  ->  tests/components/atoms/foo.test.tsx
 *
 * Modes:
 *   --staged   pre-commit: check only staged changes. Enforces
 *                (1) PRESENCE — a newly added/modified authored component has a test
 *                (2) PAIRING  — deleting/renaming a component deletes/renames its test
 *   --all      CI / pre-push: full sweep of every authored component.
 *
 * Scope (tune COMPONENT_ROOTS / EXEMPT_* below): every `.tsx` under
 * src/components/ (incl. registry ui/) plus any `_local/` component under src/app.
 */
import { execSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const REPO = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');

// ── SCOPE ────────────────────────────────────────────────────────────────────
// Every authored `.tsx` component needs a mirror test: all of src/components/
// (incl. registry ui/) plus page/layout-specific components under any _local/.
const COMPONENT_ROOTS = ['src/components'];
const isLocal = (p: string) => p.startsWith('src/app/') && p.includes('/_local/');

// Files that are NOT standalone components — never require a test.
const EXEMPT_BASENAMES = new Set(['interfaces.ts', 'constants.ts', 'mock-constants.ts', 'util.ts', 'utils.ts', 'types.ts']);
const EXEMPT_PATTERNS = [/\.d\.ts$/, /-actions\.ts$/, /\.test\.tsx?$/, /\.spec\.tsx?$/];
// `index.tsx` is a barrel in components/, but a REAL component in _local/ — only
// exempt the barrel case.
const isBarrelIndex = (p: string) => /(^|\/)index\.tsx?$/.test(p) && !isLocal(p);
// Opt-out for files that genuinely can't be unit-tested (e.g. async Server
// Components — jsdom can't render them; cover via E2E). Add the comment + reason.
const OPT_OUT = '@no-unit-test';
// ──────────────────────────────────────────────────────────────────────────────

const inScope = (p: string) => isLocal(p) || COMPONENT_ROOTS.some(root => p === root || p.startsWith(`${root}/`));

const hasOptOut = (p: string): boolean => {
    const abs = path.join(REPO, p);
    if (!existsSync(abs)) return false;
    return readFileSync(abs, 'utf8').includes(OPT_OUT);
};

const requiresTest = (p: string): boolean => {
    if (!p.endsWith('.tsx')) return false; // only component files (JSX) are mandated
    if (!inScope(p)) return false;
    if (isBarrelIndex(p)) return false;
    if (EXEMPT_BASENAMES.has(path.basename(p))) return false;
    if (EXEMPT_PATTERNS.some(re => re.test(p))) return false;
    return !hasOptOut(p);
};

/** src/components/atoms/foo.tsx -> tests/components/atoms/foo.test.tsx */
const sourceToTest = (p: string): string => {
    const rel = p.replace(/^src\//, '');
    return `tests/${rel.replace(/\.(tsx|ts)$/, '.test.$1')}`;
};

const onDisk = (rel: string) => existsSync(path.join(REPO, rel));

const fail = (lines: string[]) => {
    console.error('\n🧪❌ Test governance failed:\n');
    for (const l of lines) console.error(`   ${l}`);
    console.error('');
    process.exit(1);
};

/** Recursively collect every `.tsx` file (repo-relative, forward-slashed) under a dir. */
function walkTsx(dir: string): string[] {
    const abs = path.join(REPO, dir);
    if (!existsSync(abs)) return [];
    const out: string[] = [];
    for (const entry of readdirSync(abs, { withFileTypes: true })) {
        const rel = `${dir}/${entry.name}`;
        if (entry.isDirectory()) out.push(...walkTsx(rel));
        else if (entry.name.endsWith('.tsx')) out.push(rel);
    }
    return out;
}

// ── MODE: --all ───────────────────────────────────────────────────────────────
function checkAll() {
    // All component .tsx, plus _local component .tsx anywhere under src/app.
    const sources = [...walkTsx('src/components'), ...walkTsx('src/app').filter(isLocal)];
    const missing: string[] = [];
    for (const norm of sources) {
        if (requiresTest(norm) && !onDisk(sourceToTest(norm))) {
            missing.push(`${norm}  →  missing ${sourceToTest(norm)}`);
        }
    }
    if (missing.length) {
        fail(['Components without a mirror test in tests/:', ...missing]);
    }
    console.log('✅ Test governance: every authored component has a mirror test.');
}

// ── MODE: --staged ────────────────────────────────────────────────────────────
interface StagedEntry {
    status: string;
    path: string;
    newPath?: string;
}

function stagedEntries(): StagedEntry[] {
    const out = execSync('git diff --cached --name-status -M', { cwd: REPO, encoding: 'utf8' });
    return out
        .split('\n')
        .filter(Boolean)
        .map(line => {
            const parts = line.split('\t');
            const status = parts[0];
            if (status.startsWith('R')) return { status: 'R', path: parts[1], newPath: parts[2] };
            return { status, path: parts[1] };
        });
}

function checkStaged() {
    const entries = stagedEntries();
    const deletedSet = new Set(entries.filter(e => e.status === 'D').map(e => e.path));
    const renamedFrom = new Set(entries.filter(e => e.status === 'R').map(e => e.path));
    const errors: string[] = [];

    for (const e of entries) {
        // PAIRING — a removed component must take its test with it.
        if (e.status === 'D' && requiresTest(e.path)) {
            const test = sourceToTest(e.path);
            const testGone = deletedSet.has(test) || renamedFrom.has(test) || !onDisk(test);
            if (!testGone) {
                errors.push(`Deleted ${e.path} but its test ${test} still exists — delete it in the same commit.`);
            }
            continue;
        }

        // PRESENCE — an added/modified/renamed-in component needs its test.
        const target = e.status === 'R' ? e.newPath : e.path;
        if (target && requiresTest(target)) {
            const test = sourceToTest(target);
            if (!onDisk(test)) {
                errors.push(`${target} has no test — add ${test} and stage it.`);
            }
        }
    }

    if (errors.length) fail(errors);
    console.log('✅ Test governance: staged component changes are paired with tests.');
}

const mode = process.argv[2];
if (mode === '--all') checkAll();
else if (mode === '--staged') checkStaged();
else {
    console.error('Usage: bun run scripts/test-governance.ts --staged | --all');
    process.exit(2);
}
