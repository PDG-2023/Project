# Frontend Styleguide

<!-- TOC -->

- [Frontend Styleguide](#frontend-styleguide)
  - [Eslint/Prettier](#eslintprettier)
    - [IDEs integration](#ides-integration)
      - [JetBrains (Webstorm)](#jetbrains-webstorm)
      - [Visual studio code](#visual-studio-code)
  - [Stylelint](#stylelint)
    - [IDEs integration](#ides-integration-1)
      - [JetBrains (Webstorm)](#jetbrains-webstorm-1)

<!-- TOC -->

> This file describe the styleguide applied to this application.  
> To know read global styleguide, go [here](../../docs/styleguide.md).

## Eslint/Prettier

_Eslint_ with _Prettier_ is configured to format all code (and more) of this application.

The formatter can be run with the following command:

```bash
npm run lint:code:fix
```

> The command is run from `apps/frontend/` directory of this project.
>
> To understand others npm commands.  
> See [here](../README.md#commands).

### IDEs integration

Eslint can be easily run _on save_ on IDEs.

#### JetBrains (Webstorm)

These IDEs can automatically detect Eslint.
In case they do not, it is possible to set it manually:

![webstorm.integration](./images/styleguide/eslint-integration.webstorm.png)

> It is not necessary to enable _Prettier_ individually, _Eslint_ already integrates it.

#### Visual studio code

[TODO]

## Stylelint

Like _Eslint_, _Stylelint_ is also used for this application

The formatter can be run with the following command:

```bash
npm run lint:style:fix
```

> The command is run from `apps/frontend/` directory of this project.
>
> To understand others npm commands.  
> See [here](../README.md#commands).

### IDEs integration

Stylelint can be integrated in IDEs.

#### JetBrains (Webstorm)

To integrate within _Webstorm_:

![webstorm.integration](./images/styleguide/stylelint-integration.webstorm.png)

However, this does not enable modification _on save_.
It needs to add a file watcher:

![webstorm.file-watcher](./images/styleguide/stylelint-file-watcher.webstorm.png)

With the given options:

![webstorm.on-save](./images/styleguide/stylelint-on-save.webstorm.png)

## Note on integrations

The manual manipulations of the previous sections should not be necessary
if the IDE is opened directly in the application folder.
