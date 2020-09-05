# Visualiser

A canvas visualiser I made using Typescript with the intention to integrate it with Spotify, Deezer or Soundcloud. Can't do that for now due to API limitations but will come back to it at some point.

Music samples are taken from the Classic Youtube Audio Library archive which said you can use these songs in any project.

[Project page](https://paulpopus.dev/projects/music-visualiser)

## Installation

### Using lando

1. `lando start`

2. `lando yarn install` - install dependencies, Tailwind, Webpack and Typescript

3. `lando yarn dev` will watch and compile the .scss and .ts file from `src` to `dist`

4. `lando yarn build` for production build steps

### Non-lando

You need to be able to run npm or yarn (recommended) and node modules, however you decide to set this up.

1. `yarn install`

2. `yarn dev` will watch and compile the .scss and .ts file from `src` to `dist`

3. `yarn build` for production build steps
