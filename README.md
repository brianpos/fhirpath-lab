# fhirpath-lab

## Overview
The fhirpath-lab is a dedicated tool for testing out fhirpath expressions against the various
fhirpath execution engines available - dotnet (Firely), java (HAPI) and javascript (nlm)

It also has support for browsing StructureDefinitions, SearchParameters and Questionnaires to be able to test out the various expressions in those contexts.

It will leverage Library resource instances to store fhirpath expressions, along with references
to test resource data to evaluate with them

| Resource | Usage Notes |
| - | - |
| Library | FhirPath Expression and references to test data/outcomes |
| List | favourites data |
| StructureDefinition | Source resources for invariant fhirpath expressions |
| Questionnaire | Source resource for validation, pre-population, answerExpressions |
| SearchParameter | Source resource for search parameter expressions |

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### An expression that tests out most of the syntax highlighter cases
/* a multi-line comment - FHIR syntax highlighers */
1 // integer
| -2 // negative integer
| 3.141592650 // decimal
| @2020-12-01 // date
| @2015-02-04T14:34:28+09:00 // datetime
| @T12:45:28 // time portion
| 'some string' // string
| '\tsom\\e \'st\'r\ning' // string with a quote inside it (and newline)
| '\u00A9' // unicode copyright symbol
| 'string' & ' another string' // string contactenation
| 1 weeks // quantity
| 1 'mg' // quantity
| gender // simple identifier
| meta.versionId // backbone property
| name[0].text // array indexer
| today() // top level function
| 1.toString() // const calling a string
| birthDate.toString() // type conversion(function) on property
| `deceased` // quoted identifier
| text.`div` // identifier that is a reserved word
| _testme // idenfier starting with an underscore (not a fhir property)
| deceased.ofType(Boolean) // type selector
// | deceased as boolean // 'as'
// | deceased.as(boolean)
| (deceased is Boolean)
| name.where($this.use = 'usual').text // $this keyword in use
| iif(true, 'iif true', 'iif false') // iif function
| %ucum // an environment variable (from the spec)
| %`ucum` + '/test' // delimitted environment variable
| 5-6 // a numeric expression
| iif(true or false xor true, 'boolean tv', 'boolean fv') // booleans
| 6*6 //numeric multiplication
| name.select('x: '+ family.combine(given).join(', '))
