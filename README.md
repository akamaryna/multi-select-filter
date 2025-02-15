# multi-select-filter

This is my Frontend Developer Assessment: Multi-Select Filter for Bol.com.

Instructions I followed ca be found [here](/docs/instructions.md)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test
```

### Notes for reviewers
The second part of the "The selected items should be displayed on top of the list, separated from the search results" requirement was not implemented.
I suggest keeping the selected items integrated with the search results rather than separating them. Displaying selected options that do not match the search query may confuse users, especially if many are selected. In such cases, matching search results could be pushed down and become less visible, potentially leading users to believe the search function is broken.

My proposal is to let users see their selected items at the top by simply clearing the search input, which would then show all selected options sorted at the top of the list.

Alternatively, if a separate display for selected options is required, I'd consider creating a dedicated block (for example, next to the filter label "Productgroep") where selected options are shown in a horizontal row.
