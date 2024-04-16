# Rackun 🦝

![Rackun logo](./assets/logo.png "Rackun")

[![Build Status](https://img.shields.io/github/actions/workflow/status/dinhthienphuc/rackun/lint-and-type.yml?branch=main&style=flat&colorA=000000&colorB=000000)](https://github.com/dinhthienphuc/rackun/actions?query=workflow%3ALint)
[![Build Size](https://img.shields.io/bundlephobia/minzip/rackun?label=bundle%20size&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/result?p=rackun)
[![Version](https://img.shields.io/npm/v/rackun?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/rackun)
[![Downloads](https://img.shields.io/npm/dt/rackun.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/rackun)

------
> ❄️ A tiny script for intergrating [Bit](https://bit.dev/) with git follow. ❄️

Tired of `lance`, `swim`, ... of [Bit](https://bit.dev/)? This tiny library will help you to get rid of this.

## Prerequisite

Install the packages to ensure `rackun` works properly:

- [Bit](https://bit.dev/)

## Installation

- The `init` command simplifies setting up `rackun` in a project. It updates the prepare script in package.json and adds 2 new git alias: `git act` and `git thrust`, corresponding to `git commit` and `git push`, with the same syntax. Modifications can be made later to suit your workflow.

```bash
npx rackun init
```

Then you will let the git to easily manipulate the [Bit](https://bit.dev/) components sync for you! 🦝
