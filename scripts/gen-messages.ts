import { watch } from 'chokidar';
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'yaml';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..', 'messages');

const yamlToJson = (yamlPath: string) => yamlPath.replace(/\.yaml$/, '.json');

const compile = async (yamlPath: string) => {
    const raw = await readFile(yamlPath, 'utf-8');
    const parsed = parse(raw);
    const jsonPath = yamlToJson(yamlPath);
    await mkdir(path.dirname(jsonPath), { recursive: true });
    await writeFile(jsonPath, `${JSON.stringify(parsed, null, 4)}\n`);
    console.log(`[i18n] ${path.relative(ROOT, yamlPath)} -> ${path.relative(ROOT, jsonPath)}`);
};

const removeJson = async (yamlPath: string) => {
    const jsonPath = yamlToJson(yamlPath);
    await rm(jsonPath, { force: true });
    console.log(`[i18n] removed ${path.relative(ROOT, jsonPath)}`);
};

const compileAll = async () => {
    const entries = await readdir(ROOT, { recursive: true, withFileTypes: true });
    const tasks = entries
        .filter(e => e.isFile() && e.name.endsWith('.yaml'))
        .map(e => compile(path.join(e.parentPath, e.name)));
    await Promise.all(tasks);
};

const main = async () => {
    await compileAll();
    if (!process.argv.includes('--watch')) return;

    const watcher = watch(`${ROOT}/**/*.yaml`, { ignoreInitial: true });
    watcher.on('add', compile);
    watcher.on('change', compile);
    watcher.on('unlink', removeJson);
    console.log(`[i18n] watching ${ROOT}`);
};

main().catch(err => {
    console.error('[i18n] failed', err);
    process.exit(1);
});
