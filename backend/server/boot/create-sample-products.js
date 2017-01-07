'use strict';

module.exports = function(app) {
debugger;

  app.dataSources.mysqlds.autoupdate('testModel', function(err) {
    const { Testmodel } = app.models;
    if (!Testmodel) { return; }

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
/*
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
*/

  app.dataSources.mysqlds.autoupdate('Customer', function(err) {
    const { Customer } = app.models;
    if (!Customer) { return; }

    Customer.count({}, function(err, count) {
      if (count !== 0) { return };

      Customer.create([
        {
		  username: 'testuser',
          email: 'test@mail.com',
          password: 'testtest'
        }
      ], function(err, categories) {
        if (err) throw err;

        console.log('Models created: \n', categories);
      });
    });
  });
  
  
  app.dataSources.mysqlds.autoupdate('hasActivity', function(err) {
    const { hasActivity } = app.models;
    if (!hasActivity) { return; }

    hasActivity.count({}, function(err, count) {
      if (count !== 0) { return };

      hasActivity.create([
        {
		"customer_id": 1,
		"activity_id": 2
		}
      ], function(err, hasActivity) {
        if (err) throw err;

        console.log('Models created: \n', hasActivity);
      });
    });
  });

  
    app.dataSources.mysqlds.autoupdate('ActivityCategory', function(err) {
    const { ActivityCategory } = app.models;
    if (!ActivityCategory) { return; }

    ActivityCategory.count({}, function(err, count) {
      if (count !== 0) { return };

      ActivityCategory.create([
        { "name": "sport1" },
		{ "name": "sport2" },
		{ "name": "sport3" },
		{ "name": "sport4" },
		{ "name": "sport5" },
		{ "name": "sport6" }
		
      ], function(err, ActivityCategory) {
        if (err) throw err;

        console.log('Models created: \n', ActivityCategory);
      });
    });
  });
  

      app.dataSources.mysqlds.autoupdate('ActivitySubcategory', function(err) {
    const { ActivitySubcategory } = app.models;
    if (!ActivitySubcategory) { return; }

    ActivitySubcategory.count({}, function(err, count) {
      if (count !== 0) { return };

      ActivitySubcategory.create([
        { "name": "SUBsport1", category_id: 1 },
		{ "name": "SUBsport2", category_id: 2 },
		{ "name": "SUBsport3", category_id: 2 },
		{ "name": "SUBsport4", category_id: 2 },
		{ "name": "SUBsport5", category_id: 3 },
		{ "name": "SUBsport6", category_id: 4 }
		
      ], function(err, ActivitySubcategory) {
        if (err) throw err;

        console.log('Models created: \n', ActivitySubcategory);
      });
    });
  });
  


app.dataSources.mysqlds.autoupdate('Activity', function(err) {
/*
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
*/
 });
app.dataSources.mysqlds.autoupdate('Role', function(err) { });
app.dataSources.mysqlds.autoupdate('ACL', function(err) { });
app.dataSources.mysqlds.autoupdate('RoleMapping', function(err) { });
app.dataSources.mysqlds.autoupdate('AccessToken', function(err) { });

app.dataSources.mysqlds.autoupdate('User', function(err) {
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
});



app.dataSources.mysqlds.autoupdate('HasInterest', function(err) {
    const { HasInterest } = app.models;
    if (!HasInterest) { return; }

    HasInterest.count({}, function(err, count) {
      if (count !== 0) { return };

      HasInterest.create([
        { "interest_id": 1, customer_id: 2 }
      ], function(err, HasInterest) {
        if (err) throw err;

        console.log('Models created: \n', HasInterest);
      });
    });
  });


app.dataSources.mysqlds.autoupdate('Interest', function(err) {
    const { Interest } = app.models;
    if (!Interest) { return; }

    Interest.count({}, function(err, count) {
      if (count !== 0) { return };

      Interest.create([
        { "interest": "Reading" },
		{ "interest": "Watching TV" },
		{ "interest": "Family Time" },
		{ "interest": "Going to Movies" },
		{ "interest": "Fishing" },
		{ "interest": "Computer" },
		{ "interest": "Gardening" },
		{ "interest": "Renting Movies" },
		{ "interest": "Walking" },
		{ "interest": "Exercise" },
		{ "interest": "Listening to Music" },
		{ "interest": "Entertaining" },
		{ "interest": "Hunting" },
		{ "interest": "Team Sports" },
		{ "interest": "Shopping" },
		{ "interest": "Traveling" },
		{ "interest": "Sleeping" },
		{ "interest": "Socializing" },
		{ "interest": "Sewing" },
		{ "interest": "Golf" },
		{ "interest": "Church Activities" },
		{ "interest": "Relaxing" },
		{ "interest": "Playing Music" },
		{ "interest": "Housework" },
		{ "interest": "Crafts" },
		{ "interest": "Watching Sports" },
		{ "interest": "Bicycling" },
		{ "interest": "Playing Cards" },
		{ "interest": "Hiking" },
		{ "interest": "Cooking" },
		{ "interest": "Eating Out" },
		{ "interest": "Dating Online" },
		{ "interest": "Swimming" },
		{ "interest": "Camping" },
		{ "interest": "Skiing" },
		{ "interest": "Working on Cars" },
		{ "interest": "Writing" },
		{ "interest": "Boating" },
		{ "interest": "Motorcycling" },
		{ "interest": "Animal Care" },
		{ "interest": "Bowling" },
		{ "interest": "Painting" },
		{ "interest": "Running" },
		{ "interest": "Dancing" },
		{ "interest": "Horseback Riding" },
		{ "interest": "Tennis" },
		{ "interest": "Theater" },
		{ "interest": "Billiards" },
		{ "interest": "Beach" },
		{ "interest": "Volunteer Work" }
		
      ], function(err, Interest) {
        if (err) throw err;

        console.log('Models created: \n', Interest);
      });
    });
  });




 
  app.dataSources.mysqlds.autoupdate('Profile', function(err) { });
  app.dataSources.mysqlds.autoupdate('EshopOrder', function(err) { });
  app.dataSources.mysqlds.autoupdate('EshopOrderItem', function(err) { });

};
