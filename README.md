Apisearch Javascript client
===========================

This repository is part of the ApiSearch project.

This library aims to provide to any Javascript developer nicely interfaces to 
manage search-only processes related to Apisearch, using 
basic ES6 modules.

Is UMD compatible if you are using module loaders, otherwise apisearch will be 
in the `window` object as `apisearch`. 
  

## Install

```shell
npm install apisearch --save
# or
yarn add apisearch
```

You can either download the library and use a relative path to your assets folder, 
or use a CDN like jsDelivr. 

```html
<script src="https://cdn.jsdelivr.net/npm/apisearch/dist/apisearch.min.js"></script>
```


## Getting started

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

## More resources:
 - [Github examples](https://github.com/alexhoma/javascript-search-client/blob/master/examples)
 - [Documentation](http://docs.apisearch.io)