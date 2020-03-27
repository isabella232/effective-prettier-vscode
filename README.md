# ✪ Effective Prettier - Formatter for Visual Studio Code

[Prettier](https://prettier.io/) is an opinionated code formatter. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary.

<p align="center">
  <em>
    JavaScript
    · TypeScript
    · Flow
    · JSX
    · JSON
  </em>
  <br />
  <em>
    CSS
    · SCSS
    · Less
  </em>
  <br />
  <em>
    HTML
    · Vue
    · Angular
  </em>
  <br />
  <em>
    GraphQL
    · Markdown
    · YAML
  </em>
  <br />
  <em>
    <a href="https://prettier.io/docs/en/plugins.html">
      Your favorite language?
    </a>
  </em>
</p>

<p align="center">
  <a href="https://dev.azure.com/prettier/prettier-vscode/_build?definitionId=9">
    <img alt="Azure Pipelines Build Status" src="https://dev.azure.com/prettier/prettier-vscode/_apis/build/status/prettier.prettier-vscode?branchName=master"></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=sebastian-software.effective-prettier-vscode">
    <img alt="VS Code Marketplace Downloads" src="https://img.shields.io/visual-studio-marketplace/d/sebastian-software.effective-prettier-vscode"></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=sebastian-software.effective-prettier-vscode">
    <img alt="VS Code Marketplace Installs" src="https://img.shields.io/visual-studio-marketplace/i/sebastian-software.effective-prettier-vscode"></a>
  <a href="#badge">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"></a>
  <a href="https://twitter.com/PrettierCode">
    <img alt="Follow Prettier on Twitter" src="https://img.shields.io/twitter/follow/prettiercode.svg?label=follow+prettier&style=flat-square"></a>
</p>

## Installation

Install through VS Code extensions. Search for `Prettier - Code formatter`

[Visual Studio Code Market Place: Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=sebastian-software.effective-prettier-vscode)

Can also be installed in VS Code: Launch VS Code Quick Open (Ctrl+P), paste the following command, and press enter.

```
ext install sebastian-software.effective-prettier-vscode
```

### Default Formatter

To ensure that this extension is used over other extensions you may have installed, be sure to set it as the default formatter in your VS Code settings. This setting can be set for all languages or by a specific language.

```json
{
  "editor.defaultFormatter": "sebastian-software.effective-prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "sebastian-software.effective-prettier-vscode"
  }
}
```

### Prettier Resolution

This extension will use prettier from your project's local dependencies.

To install prettier in your project run:

```
npm install prettier -D
```

### Plugins

This extension supports [Prettier plugins](https://prettier.io/docs/en/plugins.html). If you have Prettier and a plugin registered in your `package.json`, this extension will attempt to register the language and provide automatic code formatting for the built-in and plugin languages.

## Configuration

It is recommended that you always include a [Prettier Configuration file](https://prettier.io/docs/en/configuration.html) in your project specifying all settings for your project. This will ensure that no matter how you run prettier - from this extension, from the CLI, or from another IDE with Prettier, the same settings will get applied.

Options are searched recursively down from the file being formatted so if you want to apply prettier settings to your entire project simply set a configuration in the root. Settings can also be configured through VS Code - however, these settings will only apply while running the extension, not when running prettier through the command line.

## Usage

### Using Command Palette (CMD/CTRL + Shift + P)

```
1. CMD + Shift + P -> Format Document
OR
1. Select the text you want to Prettify
2. CMD + Shift + P -> Format Selection
```

### Keyboard Shortcuts

Visual Studio Code provides [default keyboard shortcuts](https://code.visualstudio.com/docs/getstarted/keybindings#_keyboard-shortcuts-reference) for code formatting. You can learn about these for each platform in the [VS Code documentation](https://code.visualstudio.com/docs/getstarted/keybindings#_keyboard-shortcuts-reference).

If you don't like the defaults, you can rebind `editor.action.formatDocument` and `editor.action.formatSelection` in the keyboard shortcuts menu of vscode.

### Format On Save

Respects `editor.formatOnSave` setting.

You can turn on format-on-save on a per-language basis by scoping the setting:

```json
// Set the default
"editor.formatOnSave": false,
// Enable per-language
"[javascript]": {
    "editor.formatOnSave": true
}
```

### Format Selection

Format selection works on several languages depending on what Prettier itself supports. The following languages currently are supported:

```
javascript
javascriptreact
typescript
typescriptreact
json
graphql
```

## Linter Integration

The preferred way of integrating with linters is to let Prettier do the formatting and configure the linter to not deal with formatting rules. [You can see how this is done here](https://prettier.io/docs/en/integrating-with-linters.html). To continue to use Prettier and your linter we recommend you use the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) or [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) extensions directly.

You can enable Auto-Fix on Save for ESLint or Stylelint and still have formatting and quick fixes:

```
"editor.codeActionsOnSave": {
    // For ESLint
    "source.fixAll.eslint": true,
    // For Stylelint
    "source.fixAll.stylelint": true
}
```

> NOTE: If you are seeing conflicts between Prettier and ESLint this is because you don't have the right ESLint rules set as explained in the [Prettier documentation](https://prettier.io/docs/en/integrating-with-linters.html).

## Settings

### Extension Settings

These settings are specific to VS Code and need to be set in the VS Code settings file. See the [documentation](https://code.visualstudio.com/docs/getstarted/settings) for how to do that.

#### prettier.requireConfig (default: `false`)

Require a prettier configuration file to format files. Untitled files will still be formatted using the VS Code Prettier configuration even with this option set to `true`.

#### prettier.ignorePath (default: `.prettierignore`)

Supply the path to an ignore file such as `.gitignore` or `.prettierignore`.
Files which match will not be formatted. Set to `null` to not read ignore files.

**Note, if this is set, this value will always be used and local ignore files will be ignored.**

#### prettier.prettierPath

Supply a custom path to the prettier module.

## Error Messages

**Failed to load module. If you have prettier or plugins referenced in package.json, ensure you have run `npm install`**

When a `package.json` is present in your project and it contains prettier, plugins, or linter libraries this extension will attempt to load these modules from your `node_module` folder. If you see this error, it most likely means you need to run `npm install` or `yarn install` to install the packages in your `package.json`.

**Your project is configured to use an outdated version of prettier that cannot be used by this extension. Upgrade to the latest version of prettier.**

You must upgrade to a newer version of prettier.
