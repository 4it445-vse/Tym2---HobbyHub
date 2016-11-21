'use strict';




var loopback = require('loopback');
var LoopBackContext = require('loopback-context');

module.exports = function(Activity) {



 Activity.createActivity = function(name, city, address, date_and_time, user_count, about, cb) {
 
	var ctx = LoopBackContext.getCurrentContext();
	console.log("first STEEEEPPP: ", typeof ctx);
    var currentUser = ctx && ctx.get('currentUserId');
	 console.log("second STEEEEPPP: ", typeof currentUser);
    console.log('currentUser.username: ', currentUser); // voila!
 
 console.log("cbbb: ", typeof cb);
  Activity.create({
	  "name": name,
	  "city": city,
	  "address": address,
	  "date_and_time": date_and_time,
	  "user_count": user_count,
	  "about": about,
	  "customer_id": currentUser
		}, function(err, act) {
		if (err)
		  return cb(err);
		
		console.log('A `Activity` instance has been created from a boot script:', act);

		cb(null, act);
		}
  );
  };

	
	
	
  Activity.status = function(id, cb) {

  var ctx = LoopBackContext.getCurrentContext();
    var currentUser = ctx && ctx.get('currentUserId');
    console.log('currentUser.username: ', currentUser); // voila!
  
    Activity.findById(id, function(err, act) {
      if (err) {
        return cb(err);
      }
      if(!act){
        return cb({message:'Not found', status:404});
      }

      // Hmm... wonder who this is? Check the current context!
      // console.log( loopback.getCurrentContext().get('accessToken') );

   //   var hour = (new Date()).getHours();
      var status = (5 == act.user_count);
      cb(null, status);
    });
  };

  Activity.remoteMethod(
      'createActivity',
    {
      description : 'Create new Activity MY',
	  accepts: [
		{arg: 'name', type: 'string', required: true},
		{arg: 'city', type: 'string', required: true},
		{arg: 'address', type: 'string', required: true},
		{arg: 'date_and_time', type: 'date', required: true},
		{arg: 'user_count', type: 'number', required: true},
		{arg: 'about', type: 'string', required: true}
      ],
      accessType: 'READ',
      //returns: { arg: 'statusIS', type: 'boolean' },
      // alternately, to return the boolean "unwrapped":
       returns: { root: true, type: 'boolean' },
      http: [
        { verb: 'post', path: '/createActivity' }
      ]
    }
    );
	
	  Activity.remoteMethod(
	 'status',
    {
      description : 'Get activity status MY',
      accepts: {
        arg: 'id',
        type: 'number',
        description: 'Activity id',
        required: true,
        http: { source: 'path' }
      },
      accessType: 'READ',
      returns: { arg: 'statusIS', type: 'boolean' },
      // alternately, to return the boolean "unwrapped":
      // returns: { root: true, type: 'boolean' },
      http: [
        { verb: 'get', path: '/:id/status' }
      ]
    }
	
	);
	
	
	

	Activity.subscribeToActivity = function(id, cb) {
	var ctx = LoopBackContext.getCurrentContext();
    var currentUser = ctx && ctx.get('currentUserId');
    console.log('currentUser.username: ', currentUser); // voila!
  
    Activity.findById(id, function(err, act) {
      if (err) {
        return cb(err);
      }
      if(!act){
        return cb({message:'Not found', status:404});
      }
	});
	
	Customer.Activity.create({
		"customer_id": currentUser,
		"activity_id": id
		}, function(err, sub) {
		if (err)
		  return cb(err);
		
		console.log('New subscribeToActivity has been created:', sub);

		cb(null, sub);
		}
  );
  
  };

	
	Activity.remoteMethod(
	 'subscribeToActivity',
    {
      description : 'Subscribe to Activity',
      accepts: {
        arg: 'id',
        type: 'number',
        description: 'Activity id',
        required: true,
        http: { source: 'path' }
      },
      accessType: 'READ',
      returns: { arg: 'statusIS', type: 'boolean' },
      // alternately, to return the boolean "unwrapped":
      // returns: { root: true, type: 'boolean' },
      http: [
        { verb: 'get', path: '/:id/subscribeToActivity' }
      ]
    }
	
	);


};
