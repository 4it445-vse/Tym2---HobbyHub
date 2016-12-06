'use strict';




var loopback = require('loopback');
var LoopBackContext = require('loopback-context');

var express=require('express');
var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "team02.hobbyhub@gmail.com",
        pass: "v0YUkI3MNl"
    }
});


module.exports = function(Activity) {



 Activity.createActivity = function(subcategory_id, name, city, address, date_and_time, user_count, about, cb) {
 	const app = require('../../server/server.js');
	const { ActivitySubcategory } = app.models;
	
	var ctx = LoopBackContext.getCurrentContext();
	console.log("first STEEEEPPP: ", typeof ctx);
    var currentUser = ctx && ctx.get('currentUserId');
	console.log("second STEEEEPPP: ", typeof currentUser);
    console.log('currentUser.username: ', currentUser); // voila!
 
	ActivitySubcategory.findById(subcategory_id, function(err, act) {
	if (err) {
		return cb(err);
	}
	if(!act){
		return cb({message:'subcategory_id not found', status:404});
	}

	console.log("cbbb: ", typeof cb);
	Activity.create({
		"subcategory_id": subcategory_id,
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
	});
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

  
  Activity.invite = function(id, cb) {

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

	  
	 
	 var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'team02.hobbyhub@gmail.com',
        pass: 'v0YUkI3MNl'
    }
};

var transporter = nodemailer.createTransport(smtpConfig);
	 
	// setup e-mail data with unicode symbols 
	var mailOptions = {
		from: 'team02.hobbyhub@gmail.com', // sender address 
		to: 'zhiliaev.anatolii@gmail.com', // list of receivers 
		subject: 'Hello ?', // Subject line 
		text: 'Hello world ??', // plaintext body 
		html: '<b>Hello world ??</b>' // html body 
	};
	 
	// send mail with defined transport object 
	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			return console.log(error);
		}
		console.log('Message sent: ' + info.response);
	});
	  
	/*  
	  
	var mailOptions={
			to : 'zhiliaev.anatolii@gmail.com',
			subject : 'testtest',
			text : 'texttext'
		}
		console.log(mailOptions);
console.log('tttttttt: ' + typeof (smtpTransport));
	smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
         return cb({message:'Cannot send email', status:404});
     }else{
            console.log("Message sent: " + response.message);
       cb(null, 'sent');
         }
});*/
		
      var status = (5 == act.user_count);
      cb(null, status);
    });
  };
  
  

  Activity.remoteMethod(
      'createActivity',
    {
      description : 'Create new Activity MY',
	  accepts: [
	    {arg: 'subcategory_id', type: 'number', required: true},
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
	
	Activity.remoteMethod(
	 'invite',
    {
      description : 'Invite user to activity via e-mail MY',
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
        { verb: 'get', path: '/:id/invite' }
      ]
    }
	
	);
	
	
	
/*
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
*/

};
