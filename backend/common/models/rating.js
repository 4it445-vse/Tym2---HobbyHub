'use strict';


var loopback = require('loopback');
var LoopBackContext = require('loopback-context');
var empty = require('is-empty');

module.exports = function(Rating) {

    Rating.vote = function(user_id, activity, reliability, sympathy, friendliness, cb) {

        const app = require('../../server/server.js');
                var ctx = LoopBackContext.getCurrentContext();
        var currentUser = ctx && ctx.get('currentUserId');
        const { Customer } = app.models;
                console.log('currentUser.username: ', currentUser); // voila!
        var customer;

        Customer.findById(user_id, function(err, act) {
            if (err) {
                return cb(err);
            }
            if (!act) {
                return cb({message: 'Customer Not found', status: 404});
            }
            vote2(currentUser, user_id, activity, reliability, sympathy, friendliness, cb);
            // console.log('act.user_count: ', act); // voila!
            // console.log('act.user_count: ', act.user_count); // voila!
        });

    };

    function vote2(currentUser, user_id, activity, reliability, sympathy, friendliness, cb) {
        //console.log('activity user_count: ', user_count); // voila!
        Rating.findOne({where: {and: [{evaluator_user_id: currentUser}, {evaluated_user_id: user_id}]}}, function(err, rating) {
            if (err) {
                return cb(err);
            }

            console.log('rating: ', rating); // voila!
            if (!empty(rating)) {
			
					rating.updateAttributes({
					"activity": activity,
					"reliability": reliability,
					"sympathy": sympathy,
					"friendliness": friendliness
					}, function (err, instanceRating) {
					  if (err) {
						cb(err);
					  } else {
						cb(null, rating);
					  }
					});
					
            }
			else
            {Rating.create({
                "evaluator_user_id": currentUser,
                "evaluated_user_id": user_id,
                "activity": activity,
                "reliability": reliability,
                "sympathy": sympathy,
                "friendliness": friendliness
            }, function(err, rating) {
                if (err)
                    return cb(err);

                console.log('New vote has been created:', rating);

                cb(null, rating);
            }
            );
			}
        });

    };

	Rating.remoteMethod(
	 'vote',
    {
      description : 'Vote for customer MY',
      accepts: [{
        arg: 'user_id',
        type: 'number',
        description: 'Evaluated user id',
        required: true
      },
	  {
        arg: 'activity',
        type: 'number'
      },
	   {
        arg: 'reliability',
        type: 'number'
      },
	   {
        arg: 'sympathy',
        type: 'number'
      },
	   {
        arg: 'friendliness',
        type: 'number'
      }],
      accessType: 'READ',
       returns: { root: true, type: 'boolean' },
      http: [
        { verb: 'post', path: '/vote' }
      ]
    }
	);


};
