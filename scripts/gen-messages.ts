import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { watch } from 'chokidar';
import { parse } from 'yaml';

const REPO = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SRC = path.join(REPO, 'locales');
const OUT = path.join(REPO, 'messages');

const kebabToCamel = (s: string) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

const localeDirs = async () => {
    const entries = await readdir(SRC, { withFileTypes: true });
    return entries.filter(e => e.isDirectory()).map(e => e.name);
};

const yamlsIn = async (locale: string) => {
    try {
        const files = await readdir(path.join(SRC, locale));
        return files.filter(f => f.endsWith('.yaml')).sort();
    } catch {
        return [];
    }
};

const writeIndex = async (outDir: string, names: string[]) => {
    const indexPath = path.join(outDir, 'index.ts');
    if (!names.length) {
        await writeFile(indexPath, 'export default {};\n');
        return;
    }
    const sorted = [...names].sort();
    const imports = sorted.map(n => `import ${kebabToCamel(n)} from './${n}.json';`).join('\n');
    const body = sorted.map(kebabToCamel).join(', ');
    await writeFile(indexPath, `${imports}\n\nexport default { ${body} };\n`);
};

const compileLocale = async (locale: string) => {
    const outDir = path.join(OUT, locale);
    await mkdir(outDir, { recursive: true });
    const yamls = await yamlsIn(locale);
    const names: string[] = [];
    for (const y of yamls) {
        const raw = await readFile(path.join(SRC, locale, y), 'utf-8');
        const name = y.replace(/\.yaml$/, '');
        const json = `${JSON.stringify(parse(raw), null, 4)}\n`;
        await writeFile(path.join(outDir, `${name}.json`), json);
        names.push(name);
    }
    await writeIndex(outDir, names);
};

const compileAll = async () => {
    await mkdir(OUT, { recursive: true });
    const locales = await localeDirs();
    await Promise.all(locales.map(compileLocale));
};

const localeFromPath = (p: string) => path.relative(SRC, p).split(path.sep)[0];

const handleChange = async (p: string) => {
    const locale = localeFromPath(p);
    if (!locale) return;
    await compileLocale(locale);
};

const handleRemove = async (p: string) => {
    const locale = localeFromPath(p);
    if (!locale) return;
    const name = path.basename(p, '.yaml');
    await rm(path.join(OUT, locale, `${name}.json`), { force: true });
    await compileLocale(locale);
};

const main = async () => {
    await compileAll();
    if (!process.argv.includes('--watch')) return;

    const watcher = watch(`${SRC}/**/*.yaml`, { ignoreInitial: true });
    watcher.on('add', handleChange);
    watcher.on('change', handleChange);
    watcher.on('unlink', handleRemove);
};

main().catch(_err => {
    process.exit(1);
});
