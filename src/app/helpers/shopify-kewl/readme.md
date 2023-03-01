# Setup

Ensure that you are using babel polyfill in your webpack config for both development and production modes.
It should look something like this:

```
entry: {
  theme: ["@babel/polyfill", path.resolve(__dirname, "src/app/index.ts")],
  checkout: ["@babel/polyfill", path.resolve(__dirname, "src/app/checkout.tsx")]
},
```
This is because ShopifyKewl uses async functions which need to be polyfilled.

Then you can use it like this:
```
import ShopifyKewl from '../../shopify-kewl';

 const kwl = new ShopifyKewl({
   store: 'test-store-1832',
   storeFrontKey: 'efe18c692d93b8bd40ff3982cdff6542'
 });
 const products = await kwl.productsByHandle(['s14-onl-li-4184l-navy', 'layered-contrast-dress-white-black', 'wingtip-loafer-orange'], ['images', 'handle', 'title']);
```

If you want to attach it to helpers or some other import you will need to change it from a default export in `shopify-kewl/index.ts`

then you can use it like this:
```
import * as Helpers from 'helpers'

const kwl = new Helpers.ShopifyKewl({
  store: 'test-store-1832',
  storeFrontKey: 'efe18c692d93b8bd40ff3982cdff6542'
});
const products = await kwl.productsByHandle(['s14-onl-li-4184l-navy', 'layered-contrast-dress-white-black', 'wingtip-loafer-orange'], ['images', 'handle', 'title']);
```


 - `store` is the myshopify subdomain.
 - `storeFrontKey` is the storefront key that can be made by creating a private app with access to the storefront api.
 - you can additonally add `graphPath` to use different versions of the storefront api

# Default queries

There are some default queries that are designed to make it easy to use for common tasks.
Grab products by handle
```
const products = await kwl.productsByHandle([product handles], [field to be returned]);
```

Get a single product by handle
```
const product = await kwl.productByHandle(handle);
```

# Custom queries

You can additionally create a custom query like this:

```
const query = `
  query {
    shop {
      name
    }
  }
`
const shop = await kwl.query(query);
```