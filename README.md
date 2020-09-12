# Simple Page Builder

[![npm version](https://badge.fury.io/js/%40puresamari%2Fspb.svg)](https://badge.fury.io/js/%40puresamari%2Fspb)

`SPB` is a really simple build tool, designed to just take input fields and automatically generate files without the hassle of creating a bloated config file.

## Supported files
At the moment, `spb` supports the compilation of `.ts`, `.css`, `.scss`, `.js`, `.twig` and `.pug` files. All other file types defined will just be copied when `watching` or `building` and served when using the `dev-server`. Images will automatically converted to the correct mime type as well.

## Examples
- This projects gh-page is built with `spb`, you can see the code and configuration in examples/spb-page and see the result [here](https://puresamari.github.io/spb/)

# Installation
    npm i [-g|-D|-S] @puresamari/spb

# Getting started

After you installed the spb application the easiest way to get started is using the `init` command. Here is a step by step guide for it.
1. `npm i -g @puresamari/spb`
2. `spb init`
   1. Select the directory where spb should be created (leave empty if you want to init it in your current directory).
   2. Select the directory where spb should compile into (leave empty for dist)
   3. Select the files you want to compile (Add files one by one. To finish just leave the field empty and hit enter)
3. `spb dev-server -c config.spb.json`

If you want to run it in your local enviroment do:

1. `npm i -D @puresamari/spb`
2. `npx spb init`
   1. Same instructions as above
3. `npx spb dev-server -c config.spb.json`

# CLI

Once the `spb` cli is installed you can use the cli.

## Usage:

    spb [options] [command]

Options:
- `-V, --version       ` output the version number
- `-c, --config <path> ` path to config json file (default: "config.spb.json")
- `-o, --out <path>    ` where the compiles files should be compiled to (overwrites configurations from the config file)
- `--files <files...>  ` files that should be compiled (overwrites configurations from the config file). All files can also be defined with wildcardmatching for example `./views/*.pug`
- `--verbose           ` enable verbose logging
- `-h, --help          ` display help for command

Commands:
  - `init` generate the config file using the init-wizard.
  - `build` build once (is default)
    - `$ spb --config examples/hello-world/config.spb.json -o dist --files test.twig ...`
  - `watch` watch and automatically build when input files change
    - `$ spb watch --config examples/hello-world/config.spb.json`
  - `dev-server` starts the dev server
    - `$ spb dev-server --config examples/hello-world/config.spb.json`

## Dev Server

The dev server starts a server and loads all compiled files temporarily instead of building and saving them.

When opening a html file the devserver adds a script to it to automatically reload the page when changes occure to the code.

## Config file

You can use a configuration file with the flag `-c` or `--config`.
All options declared in the config file will be overwritten by options from the cli:
- `spb public -c config.spb.json` if the config file has a declaration for output it will be overwritten with `public` in this case.
- `spb public ./src/styles.css ./views/*.pug -c config.spb.json` if the config file has a declaration for files it will be overwritten with `./src/styles.css` and all `./views/*.pug` files in this case.

You can also use this projects JSON schema to ensure integrity but it is not necessary.

For example when the configuration file (for example named `config.spb.json`) is in the root directory and `spb` is installed locally:
```json
{
  "$schema": "node_modules/@puresamari/spb/lib/config.schema.json",
  "files": [
    "./src/example.pug",
    "./views/*.pug",
    "./src/index.twig",
    "./src/images/*",
    "./src/license.pdf",
    "./src/main.ts",
    "./src/styles.css"
  ],
  "output": "dist/",
}
```

### PostCSS plugins
If it is necessary to add options to the builders / compilers (for example postcss plugins), you can add it to the `compilers` part of the config file. Like in this example:
```json
{
  "$schema": "node_modules/@puresamari/spb/lib/config.schema.json",
  
  ...
  
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

### Post build script
It is possible to run a script after a build was completed. **NOTE** this script will not be executed when running a `dev-server`.
```json
{
  "$schema": "node_modules/@puresamari/spb/lib/config.schema.json",
  
  ...
  
  "postBuild": "npm run deploy" // For example
}
```

Using this config file you can then build your project like this: `$ spb -c config.spb.json`

# Compilers

For examples take a look at `examples` in this repository. The gh-page for this repository is built using `spb` and you can have a look at the setup under `examples/spb-page`.

You can currently compile `typescript`, `postcss`, `scss`, `js`, `pug` and `twig` files uing `spb`. all other files given to the builder will simply be copied to the output directory.

## `twig` and `pug`

The `spb` adds a context object (`spb`) to all `.twig` and `.pug` files which contains all `stylesheets`, `scripts` and `html` files. This allowes to dynamically add all files to the html page.

### Expample usage for `pug`:
```pug

html
  head
    
    ...

    each stylesheet in spb.stylesheets
      link(rel="text/stlesheet", href=stylesheet)
  
  body
    block content
    each script in spb.scripts
      script(type="text/javascript", src=script)


```
### Expample usage for `twig`:
```twig
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

# Links

- [Changelog](https://github.com/puresamari/spb/blob/master/CHANGELOG.md)