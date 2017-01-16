'use strict';


var loopback = require('loopback');
var LoopBackContext = require('loopback-context');
var empty = require('is-empty');

module.exports = function(Customerhascomment) {

    Customerhascomment.createComment = function(to_user_id, text, cb) {

        const app = require('../../server/server.js');
                var ctx = LoopBackContext.getCurrentContext();
        var currentUser = ctx && ctx.get('currentUserId');
        const { Customer } = app.models;
                console.log('currentUser.username: ', currentUser); // voila!
        var customer;

        Customer.findById(to_user_id, function(err, customer) {
            if (err) {
                return cb(err);
            }
            if (!customer) {
                return cb({message: 'Customer Not found', status: 404});
            }
            createComment2(currentUser, to_user_id, text, cb);
            // console.log('act.user_count: ', act); // voila!
            // console.log('act.user_count: ', act.user_count); // voila!
        });

    };

    function createComment2(currentUser, to_user_id, text, cb) {
        //console.log('activity user_count: ', user_count); // voila!
        Customerhascomment.create({
                "from_user_id": currentUser,
                "to_user_id": to_user_id,
                "text": text
            }, function(err, comment) {
                if (err)
                    return cb(err);
                console.log('New comment has been created:', comment);
                cb(null, comment);
            }
            );

    };
	
	Customerhascomment.remoteMethod(
	 'createComment',
    {
      description : 'Create new comment for customer MY',
      accepts: [{
        arg: 'to_user_id',
        type: 'number',
        description: 'To user id',
        required: true
      },
	  {
        arg: 'text',
        type: 'string'
      }],
      accessType: 'READ',
       returns: { root: true, type: 'boolean' },
      http: [
        { verb: 'post', path: '/createComment' }
      ]
    }
	);

};
