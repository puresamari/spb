# Simple Page Builder

[![npm version](https://badge.fury.io/js/%40puresamari%2Fspb.svg)](https://badge.fury.io/js/%40puresamari%2Fspb)

Hi my name is `SIMON` and this is a Simple build tool for REALLY simple pages.

# Installation
    npm i [-g|-D|-S] @puresamari/spb

# CLI

Once the `spb` cli is installed you can use the cli.

## Usage:

    spb [options] [command]

Options:
- `-V, --version       ` output the version number
- `-c, --config <path> ` path to config json file (default: "config.spb.json")
- `-o, --out <path>    ` where the compiles files should be compiled to (overwrites configurations from the config file)
- `--files <files...>  ` files that should be compiled (overwrites configurations from the config file)
- `--verbose           ` enable verbose logging
- `-h, --help          ` display help for command

Commands:
  - `build` build once (is default)
    - `$ spb --config examples/hello-world/config.spb.json -o dist --files test.twig ...`
  - `watch` watch and automatically build when input files change
    - `$ spb watch --config examples/hello-world/config.spb.json`

## Building

## Config file

You can use a configuration file with the flag `-c` or `--config`.
All options declared in the config file will be overwritten by options from the cli:
- `spb public -c config.spb.json` if the config file has a declaration for output it will be overwritten with `public` in this case.
- `spb public ./src/styles.css -c config.spb.json` if the config file has a declaration for files it will be overwritten with `./src/styles.css` in this case.

You can also use this projects JSON schema to ensure integrity but it is not necessary.

For example when the configuration file (for example named `config.spb.json`) is in the root directory and `spb` is installed locally:
```
{
  "$schema": "node_modules/@puresamari/spb/lib/config.schema.json",
  "files": [
    "./src/index.twig",
    "./src/main.ts",
    "./src/styles.css"
  ],
  "output": "dist/",
  "compilers": {
    "postcss": {
      "plugins": [
        ...
        "precss", // or other
        ...
      ]
    }
  }
}
```

Using this config file you can then build your project like this: `$ spb -c config.spb.json`

# Compilers

For examples take a look at `examples` in this repository. The gh-page for this repository is built using `spb` and you can have a look at the setup under `examples/spb-page`.

## twig 

The `spb` adds a context object (`spb`) to all .twig files which contains all `stylesheets`, `scripts` and `html` files. This allowes to dynamically add all files to the html page.

### Expample usage:
```
...
<head>
  ....
  {% for stylesheet in spb.stylesheets %}
    <link rel="stylesheet" href="{{stylesheet}}" >
  {% endfor %}
  ....
</head>

<body>
  ...
  {% for script in spb.scripts %}
    <script type="text/javascript" href="{{script}}" ></script>
  {% endfor %}
  ...
</body>

```