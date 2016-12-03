'use strict';

var loopback = require('loopback');
var LoopBackContext = require('loopback-context');
var empty = require('is-empty');

module.exports = function(Hasactivity) {
	const app = require('../../server/server.js');
	var ctx = LoopBackContext.getCurrentContext();
    var currentUser = ctx && ctx.get('currentUserId');
    console.log('currentUser.username: ', currentUser); // voila!
	
	Hasactivity.subscribeToActivity = function(id, cb) {
	const { Activity } = app.models;
	
	var activity;
  
    Activity.findById(id, function(err, act) {
      if (err) {
        return cb(err);
      }
      if(!act){
        return cb({message:'Activity Not found', status:404});
      }
	subscribeToActivityWithId(act.user_count, id, cb);
	  console.log('act.user_count: ', act); // voila!
	  console.log('act.user_count: ', act.user_count); // voila!
	});
	
	};
	
	function subscribeToActivityWithId(user_count, id, cb){
		console.log('activity user_count: ', user_count); // voila!
	Hasactivity.find({where: {and: [{customer_id: currentUser}, {activity_id: id}] }}, function(err, sub) {
      if (err) { return cb(err); }
	  
	  console.log('sub: ', sub); // voila!
		if(!empty(sub)){
		return cb({message:'Subscribe already exist', status:404});}

		  });


    /*  if (act.user_count) { return cb(err); }
	  
	  console.log('sub: ', sub); // voila!
		if(!empty(sub)){
		return cb({message:'Subscribe already exist', status:404});}
*/
		  
		Hasactivity.create({
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
	
	

  

  
  
  Hasactivity.remoteMethod(
	 'subscribeToActivity',
    {
      description : 'Subscribe to Activity',
      accepts: {
        arg: 'id',
        type: 'number',
        description: 'Activity id',
        required: true
       
      },
      accessType: 'READ',
       returns: { root: true, type: 'boolean' },
      http: [
        { verb: 'post', path: '/subscribeToActivity' }
      ]
    }
	);

	
	
	Hasactivity.getSubscribeCustomer = function(id, cb) {
	const app = require('../../server/server.js');
	const { Activity } = app.models;
	var ctx = LoopBackContext.getCurrentContext();
    var currentUser = ctx && ctx.get('currentUserId');
    console.log('currentUser.username: ', currentUser); // voila!
  
    Activity.findById(id, function(err, act) {
      if (err) {
        return cb(err);
      }
      if(!act){
        return cb({message:'Activity Not found', status:404});
      }
	});
	
	Hasactivity.find({fields: {customer_id: true}, where: {activity_id: id}, "include":["customer"]}, function(err, cus) {
      if (err) { return cb(err); }
	  
	  console.log('sub: ', cus); // voila!
		cb(null, cus);
	  });
	};
	  
  Hasactivity.remoteMethod(
	 'getSubscribeCustomer',
    {
      description : 'Get subscribe customer to Activity',
      accepts: {
        arg: 'id',
        type: 'number',
        description: 'Activity id',
        required: true,
        http: { source: 'path' }
      },
      accessType: 'READ',
       returns:  {arg: 'username', type: 'string', required: true},
      http: [
        { verb: 'get', path: '/:id/getSubscribeCustomer' }
      ]
    }
	);
	
	
	
};
