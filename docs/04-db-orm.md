# 4th Practical Class: DB and ORM

# Docs

- [LoopBack docs](http://apidocs.strongloop.com/)

# Setup

`model-config.json`:

```json
  "EshopProduct": {
    "dataSource": "mysqlds",
    "public": true
  }
}
```

`datasources.json`:

```json
{
  "db": {
    "name": "db",
    "connector": "memory"
  },
  "mysqlds": {
    "name": "mysqlds",
    "connector": "mysql",
    "host": "localhost",
    "port": 3306,
    "database": "__DB__",
    "username": "__USER__",
    "password": "__PASS__"
  }
}
```


`boot/create-sample-products.js`:

```js
module.exports = function(app) {
  app.dataSources.mysqlds.autoupdate('EshopProduct', function(err) {
    const { EshopProduct } = app.models;
    if (!EshopProduct) { return; }

    EshopProduct.create([
        {
          title: 'Škoda Superb',
          price: 750000,
          shortInfo: 'Luxury car produced in the Czech Republic.',
        },
        {
          title: 'Ford Focus',
          price: 600000,
          shortInfo: 'Sports car made in USA.',
        },
        {
          title: 'Moped',
          price: 1000,
          shortInfo: 'No comment.',
        },
    ], function(err, products) {
      if (err) throw err;

      console.log('Models created: \n', products);
    });
  });
};
```
