# Cardinal 🐦

> **car·di·nal** /ˈkärd(ə)nl/
>
> _adjective_
>
> 1. of the greatest importance; fundamental.

## Usage

First you need to install Cardinal:

```sh
npm i -D @remark/cardinal
```

Once that finishes, you can configure your desired scripts:

```diff json
{
  "scripts": {
+    "format": "remark-cardinal format"
  }
}
```

## Scripts

### build

`build` builds you code.

Currently only supports [TypeScript] (via the `--typescript` flag).

#### Options

- `--typescript [<tsc_flag>...]` - Builds your code using the [TypeScript] compiler. May optionally take any number of [TypeScript compiler options](https://www.typescriptlang.org/docs/handbook/compiler-options.html).

### format

`format` formats your code using [Prettier].

#### Options

- `--config <path>` - Specify a custom Prettier [configuration file](https://prettier.io/docs/en/configuration.html).
- `--ignore-path <path>` - Path to a file containing patterns that describe files to ignore. By default, Cardinal respects the project's `.gitignore`.
- `--no-write` - Disables Prettier's `--write` option.

[typescript]: https://www.typescriptlang.org/index.html
[prettier]: https://prettier.io/
