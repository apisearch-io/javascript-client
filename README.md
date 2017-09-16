Apisearch Javascript client
===========================

> This repository is part of the ApiSearch project. To get more information
> about it, please visit http://apisearch.io. This a project created with love
> by [Puntmig Development SLU](http://puntmig.com)

This library aims to provide to any Javascript developer nicely interfaces to 
manage search-only processes related to Apisearch from the frontend side, using 
basic ES6 modules.

# Install

## npm

```shell
npm install apisearch --save 
```

## html tag \<script\>

```html
<script src="/your/assets/apisearch.min.js"></script>
```

# Basic usage
```javascript
// 1.- create the api client
apisearch.client(
  'repository_name', 
  'https://apisearch.io/server/endpoint/', 
  'your_api_key'
);

// 2.- build a query
let query = apisearch
  .query
  .create('Your query text');

// 3.- go search!
apisearch.search(query, function (result) {
   console.log(result) 
});
```

# Query

## Aggregations
By default aggregations are enabled, so you can disable and enable it 
again with the following chained methods.
```javascript
let query = apisearch
  .query
  .createMatchAll()
  .enableAggregations()
  .disableAggregations()
;
```

## Highlights
By default highlights are disabled. You can enable or disable it with 
the following chained methods.
```javascript
let query = apisearch
  .query
  .create('ironman')
  .enableHighlights()
;
```
You can then access to the highlighted text with the property `highlights`
in the resulted items like this.
```javascript
apisearch.search(query, function(result) {
   result.forEach(item => {
       console.log(item.highlights);
   });
});
// output -> "Hey look! it's <pre>ironman</pre>!" 
```

## Suggestions
Suggestions are also disabled by default. Enable or disable it using the
following methods.
```javascript
apisearch.query
  .create('spiderm')
  .enableSuggestions()
  .disableSuggestions()
;
```

# Developer resources:
* `npm run dev`: will start a watcher on *src/* and bundle the code 
in every change.
* `npm run build`: will bundle and minify all code.
* `npm run test` or `npm t`: will run the test suite using Mocha.