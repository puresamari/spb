# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 0.7.5 - 18. April 2021
### Fixed
- Memory leak with files being constantly recompiled when watching or running a dev-server.
- Cleaned up debug output of console on dev-server.
- Fixed output paths of watch and build commands.
- Fixed Twig compiler issue where layout files are not recompiled in dev server by removing its caching function.

### Changed
- Context file detection for watch and dev-server are now self-maintaining within the builders.
- Context file detection for watch and dev-server is now an RXJS observable.

## 0.7.4 - 8. November 2020
### Added
- Added root as option to optionally define the root of your project.

### Changed
- Instantly 404ing request with unresolvable path on dev-server for performance gains.

## 0.7.3 - 29. October 2020
### Fixed
- Added precss to dependencies.

## 0.7.2 - 29. October 2020
### Fixed
- Added precss for scss syntax files to fix nesting.

## 0.7.1 - 24. October 2020
### Fixed
- Moved `@puresamari/ts-bundler` to dependencies since it was missing from the package itself.

## 0.7.0 - 24. October 2020
### Fixed
- Bumped version of ts-bundler to fix commonjs module imports.

## 0.6.4 - 22. October 2020
### Fixed
- `[builder]` Fixed scss syntax compilation error by replacing `precss` with `postcss-scss`.

## 0.6.3 - 12. September 2020
### Fixed
- `[builder]` Fixed issue with context files being absolute.

## 0.6.2 - 12. September 2020
### Added
- `[builder]` now compiles into the relative directory from its source file.

## 0.6.1 - 6. September 2020
### Added
- `[dev-server]` Added `.html` and `index.html` resolving for urls.
- `[init]` Added init command to easily initialize your spb website.

## 0.6.0 - 6. September 2020
### Added
- `[compilers]` Added copy compiler for if no compiler is found for files.

### Fixed
- `[dev-server]` Fixed issue with double compiling files.
- `[watch]` Fixed issue with double compiling files.

## 0.5.6 - 6. September 2020
### Added
- `[config]` Option for not clearing dist dir when building

## 0.5.5 - 5. September 2020
### Changed
- `[tests]` Removed test files from npm tarball

## 0.5.4 - 5. September 2020
### Added
- `[config]` Added postbuild script option to the configs

## 0.5.3 - 5. September 2020
### Added
- `[compilers]` Added `js` and `scss` compilers.

## 0.5.2 - 4. September 2020
### Fixed
- `[dev-server]` Fixed issue when output folder doesn't exist

## 0.5.0 - 15. August 2020
### Added
- `[dev-server]` Added compile indication to html views

### Changed
- `[dev-server]` Improved event propagation through rxjs

## 0.4.6 - 14. August 2020
### Added
- Switch between explicit postcss plugin require for webpack and implicit for nodejs based applications.

## 0.4.3 - 14. August 2020
### Added
- Dynamically add new dependencies while watching or running dev-server.

## 0.3.9 - 9. August 2020
### Changed
- PostCSS Module resolution is now relative to the initiating script (implemented for the `spb-app`).

## 0.3.6 - 6. August 2020
### Added
- Added destroy function to `dev-server`

## 0.3.4 - 5. August 2020
### Changed
- Upgraded `@puresamari/ts-bundler` to `v0.0.7` for compatibility for the bundler application

## 0.3.3 - 4. August 2020
### Changed
- Upgraded `@puresamari/ts-bundler` to v0.0.6
- Compatibility for the bundler application

## 0.3.2 - 3. August 2020
### Changed
- Moved `@puresamari/ts-bundler` from devDependencies to normal dependencies

## 0.3.0 - 2. August 2020
### Changed
- Config file data aquiration from require to fs.readfilesync for the application
- Exposing native .ts files for now

## 0.2.8 - 2. August 2020
### Added
- Deep dependency discovery for `.twig`, `.pug` and `.css` files

## 0.2.7 - 2. August 2020
### Added
- Wildcard matching for file collection in configuration and `--files` cli option

### Changed
- Moved dev-server to different path

## 0.2.6 - 1. August 2020
### Added
- Dependency discovery for `.twig`, `.pug` and `.css` files

## 0.2.5 - 1. August 2020
### Added
- Updated `@puresamari/ts-bundler` to `@puresamari/ts-bundler@0.0.4`

### Fixed
- Watcher is now recompiling the correct file on change of a imported module

## 0.2.4 - 1. August 2020
### Fixed
- Dev server export path detection for compiled files

## 0.2.3 - 1. August 2020
### Changed
- Compiler structure so that a compiler is instanciated when a spb builder option is loaded.
- Improved re-compilation for watcher and dev-server since the compilers are always instanciated.
- Switched from `fs.watchFile` to `fs.watch` for performance improvements on change detection.

## 0.2.2 - 1. August 2020
### Changed
- Upgraded version of the typescript bundler

## 0.2.1 - 1. August 2020
### Fixed
- ts module collection
- auto refresh for watcher and dev server when changing ts files

## 0.2.0 - 31. July 2020
### Changed
- Split file compilation and building into different functions

### Added
- Added a dynamic development server
- Added auto reload on file changes

## 0.1.1 - 31. July 2020
### Added
- Pug compiler

### Changed
- GH-Page now is compiled with pug

## 0.1.0 - 31. July 2020
### Added
- GP-pages

### Changed
- Watcher only compiles changed files
- spb-page compiles to dist

### Removed
- Public folder

### Fixed
- Issue where watcher compiled 2 times initially

## 0.0.9 - 31. July 2020
### Added
- Improved looks

## 0.0.8 - 30. July 2020
### Added
- Using `@puresamari/ts-bundler` as ts-bundler.

### Changed
- Compiler file discovery is now async.
- Removed webpack as typescript bundler.

## 0.0.6 - 26. July 2020
### Added
- Import tree detection for twig files

### Changed
- Compilers are now running as an instance

## 0.0.5 - 26. July 2020
### Added
- `.js` and `.ts` extensions are now automatically resolved in `typescript` and `javascript` files
- Postcss plugins can be customized with the config files `compilers.postcss.plugins`
```
"compilers": {
  "postcss": {
    "plugins": [
      ...
      "precss", // or other
      ...
    ]
  }
}
```