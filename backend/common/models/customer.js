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

      cb(null, user);
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


  
};
