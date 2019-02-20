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

### format

`format` formats your code using [Prettier].

#### Options

- `--config <path>` - Specify a custom Prettier [configuration file](https://prettier.io/docs/en/configuration.html).
- `--ignore-path <path>` - Path to a file containing patterns that describe files to ignore. By default, Cardinal respects the project's `.gitignore`.
- `--no-write` - Disables Prettier's `--write` option.

[prettier]: https://prettier.io/
