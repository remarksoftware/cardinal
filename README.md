# Cardinal 🐦

> **car·di·nal** /ˈkärd(ə)nl/
>
> _adjective_
>
> 1. of the greatest importance; fundamental.

## Usage

To use Cardinal, first update your `package.json`:

```diff json
{
  "devDependencies": {
+    "@remark/cardinal": "1.0.2"
  }
}
```

Then, run [`bootstrap.sh`](../../bootstrap.sh) to install it.

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
