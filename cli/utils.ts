import { Builder } from '@puresamari/spb-core';
import { CompielableType } from '@puresamari/spb-core/lib/builders/compilers';
import { ExportType } from '@puresamari/spb-core/lib/builders/utils';
import chalk from 'chalk';
import { Bar, Presets } from 'cli-progress';

// TODO: Wow thats an ugly solution for getting the version number
export const version: string = (() => {
  try {
    return require("../package.json").version;
  } catch {
    try {
      return require("../../package.json").version;
    } catch {
      return "unknown";
    }
  }
})();


export function chalkFileType(type: CompielableType | ExportType) {
  switch (type) {
    case "twig":
      return chalk.white.bgGreen(" twig ");
    case "pug":
      return chalk.white.bgRgb(168, 100, 84)(" pug  ");
    case "css":
      return chalk.white.bgBlue(" css  ");
    case "ts":
      return chalk.white.bgBlue(" ts   ");
    case "js":
      return chalk.black.bgYellow(" js   ");
    case "html":
      return chalk.white.bgRgb(212, 87, 56)(" html ");
    case "scss":
      return chalk.white.bgRgb(191, 64, 128)(" scss ");
    case "ts":
      return chalk.white(" ts   ");
    default:
      return chalk.white(" " + type.padEnd(4, " ").slice(0, 4) + " ");
  }
}

export function chalkFile(file: string) {
  const ending = file.split(".")[file.split(".").length - 1] as
    | CompielableType
    | ExportType;
  return `${chalkFileType(ending)}: ${chalk.blue.underline(file)}`;
}

export async function printBuilder(builder: Builder) {
  console.log(chalk`
Input:
  ${builder.options.files.map(chalkFile).join("\n  ")}
`);

  await builder.build();
}

export function getProgressBar(builder: Builder) {
  const bar = new Bar({}, Presets.shades_classic);
  return bar;
}

export async function build(builder: Builder, progressBar: Bar, file?: string) {
  progressBar.start(file ? 1 : builder.Files.length, 0);

  await builder.build(
    async (v) => await progressBar.increment(1),
    file ? [file] : builder.Files
  );

  progressBar.stop();

  if (file) {
    return console.log(chalk`\n  ${chalkFile(file)}`);
  }

  const outputs = [
    ...builder.builderContext.stylesheets,
    ...builder.builderContext.scripts,
    ...builder.builderContext.html,
    ...builder.builderContext.other,
  ]; //.map(v => `${builder.options.output}/${path.relative(builder.options.output, v)}`);

  console.log(builder.options.output);
  console.log(chalk`
OUTPUT:
  ${outputs.map(chalkFile).join("\n  ")}
`);
}
