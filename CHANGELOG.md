# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## WIP
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