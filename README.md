# bit-simple

❄️ A tiny script for intergrating [Bit](https://bit.dev/) with git follow. ❄️

Tired of `lance`, `swim`, ... of [Bit](https://bit.dev/)? This tiny script will help you to get rid of this.

## Prerequisite

Install the packages to ensure `bit-simple` works properly:

- [husky](https://typicode.github.io/husky/)
- [Bit](https://bit.dev/)

## Installation

- Install package at the globally scope or project scope bases on your choice. You can use `npm`, `yarn` or `pnpm`.

```bash
pnpm add -g bit-simple

# or

pnpm add -D bit-simple
```

- Add `tag` command **AFTER** all other commands inside `pre-commit` file:

```bash
# Tag bit components
bit-simple tag
```

- Add `export` command **BEFORE** all other commands inside `pre-push` file:

```bash
# Export bit components
bit-simple export
```

Then you will let the git to easily manipulate the [Bit](https://bit.dev/) components sync for you! ❄️ ❄️ ❄️
