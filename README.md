# Simple Page Builder

[![npm version](https://badge.fury.io/js/%40puresamari%2Fspb.svg)](https://badge.fury.io/js/%40puresamari%2Fspb)

`SPB` is a really simple build tool, designed to just take input fields and automatically generate files without the hassle of creating a bloated config file.

## App
[![version](https://img.shields.io/badge/version-0.1.0-yellow.svg)](https://semver.org)

The simple page builder also has an application you can download or you can checkout the [repository](https://github.com/puresamari/spb-app).

### Available features
- Run a fully functional spb-dev-server from different *.spb.json files
- Create new projects (spb.json files).
- Have multiple projects listed and switch between them.
- More features to come...
  
### Downloads 
- [Mac .dmg](https://github.com/puresamari/spb-app/releases/download/0.1.0/SPB.0.1.0.dmg) *(I still have to fully sign it so its going to warn you that im not trustworthy)* 
  

## Examples
- This projects gh-page is built with `spb`, you can see the code and configuration in examples/spb-page and see the result [here](https://puresamari.github.io/spb/) (carefull its really ugly and only for demonstration at the moment)

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
- `--files <files...>  ` files that should be compiled (overwrites configurations from the config file). All files can also be defined with wildcardmatching for example `./views/*.pug`
- `--verbose           ` enable verbose logging
- `-h, --help          ` display help for command

Commands:
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
    "./src/main.ts",
    "./src/styles.css"
  ],
  "output": "dist/",
}
```

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

Using this config file you can then build your project like this: `$ spb -c config.spb.json`

# Compilers

For examples take a look at `examples` in this repository. The gh-page for this repository is built using `spb` and you can have a look at the setup under `examples/spb-page`.

You can currently compile `typescript`, `postcss`, `pug` and `twig` files uing `spb`. all other files given to the builder will simply be copied to the output directory.

## twig and pug

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