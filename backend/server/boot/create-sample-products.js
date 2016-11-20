'use strict';

module.exports = function(app) {
 /* app.dataSources.mysqlds.autoupdate('testModel', function(err) {
    const { Testmodel } = app.models;
    if (!Testmodel) { return; }

    Testmodel.count({}, function(err, count) {
      if (count !== 0) { return };

      Testmodel.create([
        {
          id: 1,
          name: 'test',
        },

      ], function(err, categories) {
        if (err) throw err;

        console.log('Models created: \n', categories);
      });
    });
  });


    app.dataSources.mysqlds.autoupdate('EshopCategory', function(err) {
      const { EshopCategory } = app.models;
      if (!EshopCategory) { return; }

      EshopCategory.count({}, function(err, count) {
        if (count !== 0) { return };

        EshopCategory.create([
          {
            name: 'Car',
          },
          {
            name: 'Motorbike',
          }
        ], function(err, categories) {
          if (err) throw err;

          console.log('Models created: \n', categories);
        });
      });
    });

  app.dataSources.mysqlds.autoupdate('EshopProduct', function(err) {
    const { EshopProduct } = app.models;
    if (!EshopProduct) { return; }

    EshopProduct.count({}, function(err, count) {
      if (count !== 0) { return; }

      EshopProduct.create([
          {
            title: 'Škoda Superb',
            price: 750000,
            shortInfo: 'Luxury car produced in the Czech Republic.',
            categoryId: 1,
          },
          {
            title: 'Ford Focus',
            price: 600000,
            shortInfo: 'Sports car made in USA.',
            categoryId: 1,
          },
          {
            title: 'Moped',
            price: 1000,
            shortInfo: 'No comment.',
            categoryId: 2,
          },
      ], function(err, products) {
        if (err) throw err;

        console.log('Models created: \n', products);
      });
    });
  });


  app.dataSources.mysqlds.autoupdate('Customer', function(err) {
    const { Customer } = app.models;
    if (!Customer) { return; }

    Customer.count({}, function(err, count) {
      if (count !== 0) { return };

      Customer.create([
        {
		  username: 'testusername',
          email: 'test@mail.com',
          password: 'testtest'
        }
      ], function(err, categories) {
        if (err) throw err;

        console.log('Models created: \n', categories);
      });
    });
  });
*/


app.dataSources.mysqlds.autoupdate('Activity', function(err) {

  const { Activity } = app.models;
  if (!Activity) { return; }

  Activity.count({}, function(err, count) {
    if (count !== 0) { return };

    Activity.create([
      {
        user_id: 10,
        name: "test action name",
        city: "prague",
        address: "konevova 3",
        date_and_time: new Date(),
        user_count: 10,
        about: "it's the best activity in prague"
      }
    ], function(err, categories) {
      if (err) throw err;

      console.log('Models created: \n', categories);
    });
  });

 });
app.dataSources.mysqlds.autoupdate('Role', function(err) { });
app.dataSources.mysqlds.autoupdate('ACL', function(err) { });
app.dataSources.mysqlds.autoupdate('RoleMapping', function(err) { });
app.dataSources.mysqlds.autoupdate('AccessToken', function(err) { });

/*app.dataSources.mysqlds.autoupdate('User', function(err) {
  const { User } = app.models;
  if (!User) { return; }

  User.count({}, function(err, count) {
    if (count !== 0) { return };

    User.create([
      {
        email: 'test@mail.com',
        password: 'testtest'
      }
    ], function(err, categories) {
      if (err) throw err;

      console.log('Models created: \n', categories);
    });
  });
});*/


/*
  app.dataSources.mysqlds.autoupdate('EshopOrder', function(err) { });
  app.dataSources.mysqlds.autoupdate('EshopOrderItem', function(err) { });*/
};
