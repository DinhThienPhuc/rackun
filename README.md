# Autobit

❄️ A tiny script for intergrating Bit with git follow. ❄️

## Prerequisite

Install the packages to ensure `bit-simple` works properly:

- husky
- bit

## Installation

- Install package globally or project bases on your choice. You can use `npm`, `yarn` or `pnpm`.

```bash
npm i -g bit-simple

# or

npm i -g bit-simple
```

- Add `tag` command **AFTER** all other commands inside `pre-commit` file:

```bash
# Tag bit components
bit-simple tag
```

- Add `export` command **BEFORE** all other commands inside `pre-push` file:

```bash
# Tag bit components
bit-simple export
```

Then you will let the git to easily manipulate the `bit` components sync for you! ❄️ ❄️ ❄️
