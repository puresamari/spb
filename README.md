# Simple Page Builder

[![npm version](https://badge.fury.io/js/%40puresamari%2Fspb.svg)](https://badge.fury.io/js/%40puresamari%2Fspb)

Hi my name is `SIMON` and this is a Simple build tool for REALLY simple pages.

# Installation
    npm i [-g|-D|-S] @puresamari/spb

# CLI

Once the `spb` cli is installed you can use the cli.

## Building

    spb [build] <out> <files...>
The `out` dir will contain all files and the `files` are the compiled files

For example:
- `$ spb dist hello-world.ts index.twig styles.css` Which will generate:
  - `dist/hello-world.js`
  - `dist/index.html`
  - `dist/styles.css`

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