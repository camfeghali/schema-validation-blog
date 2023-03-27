import { existsSync, mkdirSync, rmdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import * as TJS from 'typescript-json-schema';

const settings: TJS.PartialArgs = {
  required: true,
};

const compilerOptions: TJS.CompilerOptions = {
  strictNullChecks: true,
};

const schemas: Record<string, string[]> = {
  './src': ['Address'],
};

const domainDirs = Object.keys(schemas);

const program = TJS.getProgramFromFiles(
  domainDirs.map((x) => resolve(`${x}/types.ts`)),
  compilerOptions
);
const generator = TJS.buildGenerator(program, settings);

function generate() {
  for (let i = 0; i < domainDirs.length; i++) {
    const targetDir = domainDirs[i];

    if (existsSync(`${targetDir}/schemas`))
      rmdirSync(`${targetDir}/schemas`, { recursive: true });

    mkdirSync(`${targetDir}/schemas`);

    const symbols = schemas[targetDir];

    for (const symbol of symbols) {
      const schema = generator!.getSchemaForSymbol(symbol);

      writeFileSync(
        `${targetDir}/schemas/${symbol}Schema.json`,
        JSON.stringify(schema)
      );
    }
  }
}

generate();
