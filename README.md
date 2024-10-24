# cine-test-hellocse.vue

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run serve
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```


### project tree

- 📦cine-test-hellocse.vue
- ┣ 📂.git
- ┃
- ┣ 📂public
- ┃ ┗ 📜favicon.ico
- ┣ 📂src
- ┃ ┣ 📂assets
- ┃ ┃ ┣ 📂images
- ┃ ┃ ┃ ┗ 📜avatar.png
- ┃ ┃ ┣ 📂style
- ┃ ┃ ┃ ┣ 📂themes
- ┃ ┃ ┃ ┃ ┣ 📜colors.scss
- ┃ ┃ ┃ ┃ ┣ 📜font.scss
- ┃ ┃ ┃ ┃ ┗ 📜vuetify.ts
- ┃ ┃ ┃ ┗ 📜index.scss
- ┃ ┃ ┗ 📜logo.svg
- ┃ ┣ 📂libs
- ┃ ┃ ┗ 📂utils
- ┃ ┃ ┃ ┣ 📜Errors.ts
- ┃ ┃ ┃ ┗ 📜Time.ts
- ┃ ┣ 📂locales
- ┃ ┃ ┣ 📜en.json
- ┃ ┃ ┗ 📜fr.json
- ┃ ┣ 📂modules
- ┃ ┃ ┣ 📂basic
- ┃ ┃ ┃ ┗ 📜AButton.vue
- ┃ ┃ ┣ 📂comments
- ┃ ┃ ┃ ┣ 📂_components
- ┃ ┃ ┃ ┃ ┗ 📜MovieCommentCard.vue
- ┃ ┃ ┃ ┗ 📂_views
- ┃ ┃ ┃ ┃ ┣ 📜MovieComment.vue
- ┃ ┃ ┃ ┃ ┗ 📜MovieCommentList.vue
- ┃ ┃ ┣ 📂movies
- ┃ ┃ ┃ ┣ 📂_components
- ┃ ┃ ┃ ┃ ┗ 📜InfiniteScrollButton.vue
- ┃ ┃ ┃ ┗ 📂_views
- ┃ ┃ ┃ ┃ ┣ 📜MovieDetail.vue
- ┃ ┃ ┃ ┃ ┗ 📜MovieList.vue
- ┃ ┃ ┣ 📂others
- ┃ ┃ ┃ ┣ 📜ACarousel.vue
- ┃ ┃ ┃ ┣ 📜ARating.vue
- ┃ ┃ ┃ ┗ 📜ATag.vue
- ┃ ┃ ┗ 📂shared
- ┃ ┃ ┃ ┣ 📂forms
- ┃ ┃ ┃ ┃ ┗ 📜AFormInput.vue
- ┃ ┃ ┃ ┗ 📂layout
- ┃ ┃ ┃ ┃ ┣ 📜ACard.vue
- ┃ ┃ ┃ ┃ ┣ 📜AGrid.vue
- ┃ ┃ ┃ ┃ ┗ 📜AGridList.vue
- ┃ ┣ 📂router
- ┃ ┃ ┗ 📜index.ts
- ┃ ┣ 📂services
- ┃ ┃ ┗ 📜api.ts
- ┃ ┣ 📂stores
- ┃ ┃ ┣ 📂comments
- ┃ ┃ ┃ ┣ 📂models
- ┃ ┃ ┃ ┃ ┗ 📜CommentModel.ts
- ┃ ┃ ┃ ┗ 📜comments.ts
- ┃ ┃ ┣ 📂models
- ┃ ┃ ┃ ┣ 📜Director.ts
- ┃ ┃ ┃ ┣ 📜Person.ts
- ┃ ┃ ┃ ┗ 📜Star.ts
- ┃ ┃ ┗ 📂movies
- ┃ ┃ ┃ ┣ 📂models
- ┃ ┃ ┃ ┃ ┣ 📜GenreModel.ts
- ┃ ┃ ┃ ┃ ┗ 📜MovieModel.ts
- ┃ ┃ ┃ ┗ 📜movies.ts
- ┃ ┣ 📜App.vue
- ┃ ┣ 📜i18n.ts
- ┃ ┣ 📜main.ts
- ┃ ┣ 📜shims-vue.d.ts
- ┃ ┗ 📜uuid.d.ts
- ┣ 📜.eslintrc.cjs
- ┣ 📜.gitignore
- ┣ 📜.prettierrc.json
- ┣ 📜env.d.ts
- ┣ 📜index.html
- ┣ 📜package-lock.json
- ┣ 📜package.json
- ┣ 📜README.md
- ┣ 📜tsconfig.app.json
- ┣ 📜tsconfig.json
- ┣ 📜tsconfig.node.json
- ┗ 📜vite.config.ts
