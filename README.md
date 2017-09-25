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
let api = apisearch('your_api_key');

// 2.- build a query
let query = api.query
  .create('Your query text');

// 3.- go search!
api.search(query, function(result) {
   console.log(result) 
});
```

You can checkout more examples running these files on your browser:
[example files](https://github.com/alexhoma/apisearch-js-client/tree/master/examples) 

# Query

## Aggregations

By default aggregations are enabled, so you can disable and enable it 
again with the following chained methods.

```javascript
let query = api.query
  .createMatchAll()
  .enableAggregations()
  .disableAggregations()
;
```

## Highlights

By default highlights are disabled. You can enable or disable it with 
the following chained methods.

```javascript
let query = api.query
  .create('ironman')
  .enableHighlights()
;
```

You can then access to the highlighted text with the property `highlights`
in the resulted items like this.

```javascript
api.search(query, function(result) {
   result.forEach(function(item) {
       console.log(item.highlights);
   });
});

// output -> "Hey look! it's <pre>ironman</pre>!" 
```

## Suggestions

Suggestions are also disabled by default. Enable or disable it using the
following methods.

```javascript
let query = api.query
  .create('spider')
  .disableSuggestions()
  .enableSuggestions()
;

// output -> "Spiderman"
```

## Exclude items by uuid

Items can be excluded manually for the search. For example, when printing a 
related carousel given an item, and filtering by the type, would be useful 
to exclude the current element from the list.

Using the built in apisearch method called: `apisearch.createUUID(uuid)`, 
you will be ableto create a secure ItemUUID object.

> Remember that an item uuid is composed by the id of the item and the type.
> In this case "spiderman" means the ID and "marvel" means the type.

```javascript
let query = api.query
  .createMatchAll()
  .excludeUUID(
      apisearch.createUUID('spiderman', 'marvel')
  );
```

You can also exclude several items at once:

```javascript
let query = api.query
  .createMatchAll()
  .excludeUUIDs(
      apisearch.createUUID('spiderman', 'marvel'),
      apisearch.createUUID('hulk', 'marvel'),
      apisearch.createUUID('daredevil', 'marvel')
  );
```

## Promote items by uuid

As well as items can be exclided, they can also be promoted to give them more 
weight on the search, so they will appear first than the other ones.

Using the built in apisearch method called: `apisearch.createUUID(uuid)`, 
you will be ableto create a secure ItemUUID object.

```javascript
let query = api.query
  .createMatchAll()
  .promoteUUID(
      apisearch.createUUID('spiderman', 'marvel')
  );
```

If you need to promote a list of items, you don't need to chain the promoteUUID
method every time, you can use the following method and pass the promoted items 
as an array like this:

```javascript
let query = api.query
  .createMatchAll()
  .promoteUUIDs(
      apisearch.createUUID('spiderman', 'marvel'),
      apisearch.createUUID('ironman', 'marvel'),
      apisearch.createUUID('thor', 'marvel')
  );
```

# Demos
Just open the 
[example files](https://github.com/alexhoma/apisearch-js-client/tree/master/examples) 
on your browser:

# Developer resources:

* `npm run dev`: will start a watcher on `./src/**/*`, bundle at every code 
change and export it on `./dist/apisearch.js`.
* `npm run build`: will bundle and minify all code and export it on 
`./dist/apisearch.min.js`.
* `npm run test` or `npm t`: will run the test suite using Mocha.