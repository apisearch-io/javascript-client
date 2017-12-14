Apisearch Javascript client
===========================

> This repository is part of the ApiSearch project. To get more information
> about it, please visit http://apisearch.io. This a project created with love
> by [Puntmig Development SLU](http://puntmig.com)

This library aims to provide to any Javascript developer nicely interfaces to 
manage search-only processes related to Apisearch, , using 
basic ES6 modules.

Is UMD compatible if you are using module loaders, otherwise apisearch will be 
in the `window` object as `apisearch`. 

# Table of contents

- [Install](#Install)
  - npm
  - script tag / CDN
  - CDN
- [Quick start](#Quick-start)
- [The Query object](#The-query-object)
  - Building a query
  - Filters
  - Filter types
  - Filtering by type
  - Filtering by id
  - Filtering by location
  - Filtering by range
  - Filtering by field
  - Aggregations
  - Sort by field
  - Sort by location
  - Sort randomly
  - Enabling Suggestions
  - Excluding items
  - Enabling highlighting
  

# Install

## npm & yarn

```shell
npm install apisearch --save
# or
yarn add apisearch
```

## html tag \<script\>

You can either download the library and use a relative path to your assets folder, 
or use a CDN like jsDelivr. 

```html
<script src="https://cdn.jsdelivr.net/npm/apisearch/dist/apisearch.min.js"></script>
```


# Quick start

Let's see a simple example on how to make queries: Instance the apisearch client, 
build a query, and search! Super easy right?
```javascript
const api = apisearch({
    appId: 'music',
    index: 'default',
    token: '1cc7a3e0-bda5-11e7-abc4-cec278b6b50a'
});

const query = api.query.create('Your search query');

api.search(query, function(result, error) {
    if (error) {
        console.log(error);
        return;
    }
    
    console.log(result);
});
```

You can checkout more examples here:
 - [Html script using Underscore as a templating engine.](https://github.com/alexhoma/javascript-search-client/blob/master/examples/javascript.html)
 - [Using module loaders](https://github.com/alexhoma/apisearch-js-client/tree/master/examples)


# Apisearch client anatomy

This are the mandatory and optional parameters that
to configure our Apisearch client:

```javascript
const api = apisearch({
    appId: !string,
    apiKey: !string,
    options: {
        endpoint: ?string,       // (default "http://puntmig.net")
        apiVersion: ?string,     // (default "v1")
        timeout: ?integer,       // in seconds (default 1000)
        overrideQueries: ?bool,  // (default true)
        cache: ?bool             // in memory cache (default true)
    }
});
```

# The query object

## Building a Query

Let's start with something really easy.
```javascript
const query = api.query.create('Something');
```

That simple. This small query will look for all entities in the repository, 
Scoring each of the results containing the word "something" by hit scoring. 
The best the first.

> Sorting by scoring means that, the best appearance the word "something"
> has inside each result, the better punctuation has.

Let's make something a little bit harder. Let's take only the first 100 
elements of the second page (from the result 101 to the 200). By default, 
is none of these last values are defined, you will request the first 10 
results.

```javascript
let query = api.query.create(
  'something',  // The query string
  2,            // The page we want to retrieve
  100           // How many items do we want per page?
); 
```

That's it, that easy :)

If you want to match all elements, you can just pass an empty string as 
the first parameter or use the search-everything factory method. 
In this second method you will query the first 1000 elements.

```javascript
let emptyStringQuery = api.query.create('');
let querySearchEverything = api.query.createMatchAll();
```

Finally, you can create a query to find one ore more specific elements 
from your database. For this reason, there are two special factory 
methods specifically create to make these two scenarios so easy.

We, will use ItemUUIDs here in both cases.

```javascript
let queryOneUUID = api.query
  .createByUUID(
    api.createObject.uuid('item_id_1', 'item_type')
  );

let queryManyUUIDs = api.query
  .createByUUIDs(
    api.createObject.uuid('item_id_1', 'item_type'), 
    api.createObject.uuid('item_id_2', 'item_type'), 
    api.createObject.uuid('item_id_3', 'item_type')
  );
```

The order is not important here, and the result format will be exactly 
the same than any other type of queries.

## Filters

Once a new Query is created you can start by filtering your results. 
This library provides a developer friendly way for defining filters by 
exposing you a nice set of chained methods.

## Filter by types

We will mainly talk about two different filter types, and it is very 
important for you to understand both, why are they important and 
where to use each one.

First of all, **Apisearch works with Universes**. We will call Universe 
to the total set of Results. No matter the type, no matter the ID. 
Each Item accessible by our API is part of our Universe.

In our website, or in our app, inside each landing page or screen we 
will want to work with the entire Universe or with a subset of it, 
so this first step will require us to use the filterUniverse methods:

```javascript
let query = api.query
  .createMatchAll()
  .filterUniverseByTypes(['A', 'B']);
```

Once our Universe is properly defined, then we have to let the user 
navigate through this universe by using the standard filters.

```javascript
let query = api.query
  .createMatchAll()
  .filterUniverseByTypes(['A', 'B'])
  .filterBy(
    'brand',       // filter name
    'brand',       // field
    ['Superbrand'] // values
  );
```

Each filter strategy is documented for both universe and regular filters. 
As you will see both methods will always change a little bit (regular 
filters will always have a name as first parameter in order to relate 
later with a possible aggregation).

## Filtering by Type

So, try to imagine an environment when, even you have types A, B and C, 
you only want to work with A and B. In this environment C is not welcomed, 
and you don't want C Items to be in any set of results.

Then, all queries inside this environment will need to filter the entire 
universe by types A and B. Let's see how to do it.

```javascript
let query = api.query
  .createMatchAll()
  .filterUniverseByTypes(['A', 'B']);
```

All possible results will only include A and B. Think about this filter as 
a permanent filter executed before all others.

Then you can use regular Filtering by type by using this method:

```javascript
let query = api.query
  .createMatchAll()
  .filterUniverseByTypes(['A', 'B'])
  .filterByTypes(['A']);
```

But alert ! This seems to be exactly the same, right? Well, in this case 
we are filtering by Types A and B, and then by type A, so results would 
only include A types. That would be completely equivalent to filter the 
entire universe once by type A.

Well, indeed. This would only work if your application has not aggregations 
nor any kind of interaction with your user, where can filter manually 
by clicking some kind of links.

Once Universe is filtered, and if you aggregate your values (in this case, 
types), Results will contain only types A, but aggregations will still 
contain all of them that are actually existing in the filtered Universe, 
so in this case user would see something like this.

[x] Type A
[ ] Type B

We could even have something like that:

```javascript
let query = api.query
  .createMatchAll()
  .filterUniverseByTypes(['A', 'B'])
  .filterByTypes(['A', 'B']);
```

With a result like that:

  - [x] Type A
  - [x] Type B

While if we have this implementation, ignoring our Universe filter, 
considering that our filter is already working properly:

```javascript
let query = api.query
  .createMatchAll()
  .filterByTypes(['A', 'B']);
```

Then, our result would be something like that, so our Universe is 
not filtered anymore and is composed by the total set of Items, 
including the C types.

  - [x] Type A
  - [x] Type B
  - [ ] Type C

On the other hand, if we only want the set of results matching your 
filter types without the aggregations, we can also set a second 
boolean parameter to disable aggregations (by default is set to true).

```javascript
let query = api.query
  .createMatchAll()
  .filterByTypes(
    ['A', 'B'],
    false
  );
```

A third and last parameter can be set to sort the aggregations result. 
By default, this parameter is set to `SORT_BY_COUNT_DESC.

```javascript
let query = api.query
  .filterByTypes(
    ['A', 'B'],
    true,
    'SORT_BY_COUNT_DESC'  
  );
````

## Filtering by Id

You can filter Universe as well by ids. In that case, you can image that, 
no matter what or how filters you add. Your result set will be of 
maximum 3 items.

```javascript
let query = api.query
  .createMatchAll()
  .filterByIds(['10', '11', '12']);
```

## Filter by location

You can filter your universe as well by Location if your Items are 
Geolocated. This will allow you to work only with some Items positioned 
in a certain area. You can use any of **Location Ranges** explained 
previously.

```javascript
let query = api.query
  .filterUniverseByLocation(
      api.createObject.coordinateAndDistance(
          api.createObject.coordinate(40.9, -70.0),
          '50km'
      )
  )
```

Location is something that you should filter by just once. And because 
you can't aggregate by locations, it has'nt make sense at all to 
have both filters, universe and regular, so they both mean exactly 
the same.

## Filter by range

You can filter your universe as well by range. Depending if the filter 
uses a date range or not, you should use one of these methods. 
Let's imagine a landing page where to list all T-shirts with low 
price (up to 20 euros). We want to add only elements created during 
last month

```javascript
// Dates Atom 
let from =  (new Date('01 October 2017 08:00 UTC')).toISOString();
let to =  (new Date('01 October 2017 20:00 UTC')).toISOString();

let query = api.query
  .createMatchAll()
  .filterUniverseByRange('price', ['0..20'], 'FILTER_MUST_ALL')
  .filterUniverseByDateRange('created_at', [`${from}..${to}`], 'FILTER_MUST_ALL');
```

Furthermore, once defined your subset of available values, you can 
use the range filter the same way as others.

This filter is considerably useful when filtering by price, by 
rating or by any other numeric value (discount percentage...). 
Let's work with the example of price.

Let's consider that we want all items with a price value from 50 
to 60, and from 90 to 100 euros. Let's consider as well that this 
price value is part of the indexed metadata. Let's build the 
filter.

```javascript
let query = api.query
  .createMatchAll()
  .filterByRange(
    'price',
    'price',
    [],
    ['50..60', '90..100']  
  );
```

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
      api.createObject.uuid('spiderman', 'marvel')
  );
```

You can also exclude several items at once:

```javascript
let query = api.query
  .createMatchAll()
  .excludeUUIDs(
      api.createObject.uuid('spiderman', 'marvel'),
      api.createObject.uuid('hulk', 'marvel'),
      api.createObject.uuid('daredevil', 'marvel')
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
      api.createObject.uuid('spiderman', 'marvel')
  );
```

If you need to promote a list of items, you don't need to chain the promoteUUID
method every time, you can use the following method and pass the promoted items 
as an array like this:

```javascript
let query = api.query
  .createMatchAll()
  .promoteUUIDs(
      api.createObject.uuid('spiderman', 'marvel'),
      api.createObject.uuid('ironman', 'marvel'),
      api.createObject.uuid('thor', 'marvel')
  );
```

# Demos
Just open the 
[example files](https://github.com/alexhoma/apisearch-js-client/tree/master/examples) 
on your browser:

# Developer resources:

* `npm run dev` or `yarn dev`: will start a watcher on `./src/**/*`, bundle at every code 
change and export it on `./dist/apisearch.js`.
* `npm run build` or `yarn build`: will bundle and minify all code and export it on 
`./dist/apisearch.min.js`.
* `npm run dist` or `yarn dist`: cleans the `dist` directory and bundles the dev 
and build version. Ready for release.
* `npm t` or `yarn test`: will run the test suite using Mocha and Chai.