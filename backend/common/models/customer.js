'use strict';

module.exports = function(Customer) {
  Customer.validatesPresenceOf('username');

  Customer.validatesLengthOf('username',{
      min: 5,
      max: 100,
      message: {
          min: 'username is too short',
          max: 'username is too long'
      }
  });


  
Customer.findByUsername = function(username, cb) {
 
console.log('username: ', username); // voila!
   console.log("cbbb: ", typeof cb);
   Customer.find({where: {username: username}}, function(err, user) {
      if (err) { return cb(err); }
      if (user.length > 0) cb(null, true);
      else
        cb(null, false);
	      
	  });
  };
  
  Customer.findByEmail = function(email, cb) {
 
console.log('email: ', email); // voila!
   console.log("cbbb: ", typeof cb);
   Customer.find({where: {email: email}}, function(err, user) {
      if (err) { return cb(err); }
      if (user.length > 0) cb(null, true);
      else
        cb(null, false);
	      
	  });
  };
  
  
    Customer.remoteMethod(
	 'findByUsername',
    {
      description : 'Get user by username MY',
      accepts: {
        arg: 'username',
        type: 'string',
        description: 'username',
        required: true,
        http: { source: 'path' }
      },
      accessType: 'READ',
      returns: { root: true, type: 'boolean' },
      // alternately, to return the boolean "unwrapped":
      // returns: { root: true, type: 'boolean' },
      http: [
        { verb: 'get', path: '/:username/findByUsername' }
      ]
    }
	
	);
	
      Customer.remoteMethod(
	 'findByEmail',
    {
      description : 'Get user by email MY',
      accepts: {
        arg: 'email',
        type: 'string',
        description: 'email',
        required: true,
        http: { source: 'path' }
      },
      accessType: 'READ',
      returns: { root: true, type: 'boolean' },
      // alternately, to return the boolean "unwrapped":
      // returns: { root: true, type: 'boolean' },
      http: [
        { verb: 'get', path: '/:email/findByEmail' }
      ]
    }
	
	);


  
};
