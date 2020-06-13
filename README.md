# SeoaBot V2 - Core Repository

> Warning: SeoaBot v2 is under construction!
>
> Wait For Beta, or Use [SeoaBot v1's Latest Repo](https://github.com/UnderC/Seoabot)

![SeoaV2 Logo](https://avatars1.githubusercontent.com/u/62461934)

## Installation
### pre-requirements
- `node` (v12.x or later)
- `npm` (v6.x or later) or `yarn` (v1.x or later)
- `mariadb` (v15.x or later)

### download code
```sh
git clone https://github.com/SeoaV2/SeoaBot-Core.git # Download Core
cd SeoaBot-Core
git submodule update --init --recursive # Download Commands, Locale, extensions, etc...
```

### update database
```
sudo mariadb
MariaDB [(none)]> source ./database.sql
```

### download dependencies
```sh
npm i
```
or
```sh
yarn
```

### create & edit settings file
```sh
cp settings.examples.json settings.json
vim settings.json # vim is the best editor
```

### run the code
```
node index
```
