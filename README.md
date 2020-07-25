# Simple Page Builder

[![npm version](https://badge.fury.io/js/%40puresamari%2Fspb.svg)](https://badge.fury.io/js/%40puresamari%2Fspb)

Hi my name is `SIMON` and this is a Simple build tool for REALLY simple pages.

# Installation
    npm i [-g|-D|-S] @puresamari/spb

# CLI

Once the `spb` cli is installed you can use the cli.

## Building

    spb [build] [out] [files...] [-c, --config <file>]

### Options
- `build` is not necessary at the moment since it is only possible to build at the moment.
- `out` is the directory where the files should be compiled to.
- `files` are all the files to be compiled.
- `-c, --config` is a configuration file.

## Config file

You can use a configuration file with the flag `-c` or `--config`.
All options declared in the config file will be overwritten by options from the cli:
- `spb public -c config.spb.json` if the config file has a declaration for output it will be overwritten with `public` in this case.
- `spb public ./src/styles.css -c config.spb.json` if the config file has a declaration for files it will be overwritten with `./src/styles.css` in this case.

You can also use this projects JSON schema to ensure integrity but it is not necessary.

For example when the configuration file (for example named `config.spb.json`) is in the root directory and `spb` is installed locally:
```
{
    "$schema": "node_modules/@puresamari/spb/lib/config.json",
    "files": [
      "./src/index.twig",
      "./src/main.ts",
      "./src/styles.css"
    ],
    "output": "dist/"
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