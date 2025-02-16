# multi-select-filter

This is Maryna Akatieva's Frontend Developer Assessment: Multi-Select Filter for Bol.com.

## The architecture

The project is a Vue 3 application with the following key components:

1. **Component-Based Architecture**:
   - Built using Vue 3's Single File Components (SFCs) like `App.vue`, `Page.vue`, and `Filter.vue`.

2. **State Management**:
   - Managed using Pinia, with the main store in `core.ts` handling product groups and selections.
   - The Pinia store stores only data related to the app, not to the filter. The `Filter` component is designed to be reusable, so its own data is encapsulated within it. The filter can potentially be used for any array of data, not just product groups.

3. **Data Fetching**:
   - Data is fetched from a JSON file using the Fetch API, encapsulated in `api.ts`.

4. **Styling**:
   - Uses SCSS for styling, with global styles in `base.scss` and scoped styles in components.

5. **Build and Configuration**:
   - Uses Vite for the build process, with TypeScript for type safety.

6. **Testing**:
   - Unit tests are written using Vitest and Vue Test Utils, with tests for `Filter` in `Filter.spec.ts`.

7. **Persistence**:
   - Selected product groups are persisted using `localStorage` in the Pinia store.

8. **Accessibility**:
   - The filter can be used with the keyboard, ensuring accessibility for all users.

## Design decisions

1. The second part of the "The selected items should be displayed on top of the list, separated from the search results" requirement was not implemented.
I suggest keeping the selected items integrated with the search results rather than separating them. Displaying selected options that do not match the search query may confuse users, especially if many are selected. In such cases, matching search results could be pushed down and become less visible, potentially leading users to believe the search function is broken.
My proposal is to let users see their selected items at the top by simply clearing the search input, which would then show all selected options sorted at the top of the list.
Alternatively, if a separate display for selected options is required, I'd consider creating a dedicated block (for example, next to the filter label "Productgroep") where selected options are shown in a horizontal row.

2. Keyboard navigation. To enhance the user experience, I disabled the default tab navigation and implemented the [ARIA Authoring Practices for listboxes](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-scrollable/). This ensures that the Tab key moves focus into and out of the listbox, while the Up and Down Arrow keys are used to navigate and select options. This approach prevents users from having to tab through hundreds of options before reaching the submit button, offering a more efficient and intuitive selection process.

3. To prevent content shift, selected options are moved to the top of the list only after the form is submitted.

## Project Setup

Ensure you have Node.js installed. Refer to the [.nvmrc](.nvmrc) file for the required version.

```sh
npm install
```

### Starts the development mode with hot-reloading enabled

```sh
npm run dev
```

### Compiles and minifies the project for production mode

```sh
npm run build
```

### Previews the production build locally

```sh
npm run preview
```

### Runs unit tests with [Vitest](https://vitest.dev/)

```sh
npm run test
```

The instructions I followed can be found [here](/docs/instructions.md)
