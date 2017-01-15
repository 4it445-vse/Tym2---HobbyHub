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
			if ( activity < 0 || activity > 5 ||
			activity < 0 || activity > 5 ||
			reliability < 0 || reliability > 5 ||
			sympathy < 0 || sympathy > 5 ||
			friendliness < 0 || friendliness > 5 ) {
				return cb({message: 'Parameters must be between 0-5', status: 402});
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

	
	
    Rating.status = function(id, cb) {
        const app = require('../../server/server.js');
                var ctx = LoopBackContext.getCurrentContext();
        var currentUser = ctx && ctx.get('currentUserId');
        console.log('currentUser.username: ', currentUser); // voila!
        const { Customer } = app.models;
            Customer.findById(id, function(err, cstmr) {
            if (err) {
                return cb(err);
            }
            if (!cstmr) {
                return cb({message: 'Customer Not found', status: 404});
            }

			Rating.findOne({where: {and: [{evaluator_user_id: currentUser}, {evaluated_user_id: id}]}}, function(err, rating) {
            if (err) {
                return cb(err);
            }

            console.log('rating: ', rating); // voila!
            if (empty(rating)) {
				return cb(null, false);
            }
			else
            {
                console.log('Vote found:', rating);
                cb(null, rating);
			}
        });

        });
    };
	
	
    Rating.remoteMethod(
            'status',
            {
                description: 'Get Rating status MY',
                accepts: {
                    arg: 'id',
                    type: 'number',
                    description: 'Evaluated user id',
                    required: true,
                    http: {source: 'path'}
                },
                accessType: 'READ',
                returns: {arg: 'stats', type: 'object', root: true},
                http: [
                    {verb: 'get', path: '/:id/status'}
                ]
            }

    );

	
	 Rating.average = function(id, cb) {
        const app = require('../../server/server.js');
                var ctx = LoopBackContext.getCurrentContext();
        var currentUser = ctx && ctx.get('currentUserId');
        console.log('currentUser.username: ', currentUser); // voila!
        const { Customer } = app.models;
            Customer.findById(id, function(err, cstmr) {
            if (err) {
                return cb(err);
            }
            if (!cstmr) {
                return cb({message: 'Customer Not found', status: 404});
            }

			Rating.find({where: {and: [{evaluator_user_id: currentUser}, {evaluated_user_id: id}]}}, function(err, ratings) {
            if (err) {
                return cb(err);
            }
			console.log('Rating.type: ', typeof ratings); // voila!
			
			let activity  = 0;
			let reliability  = 0;
			let sympathy  = 0;
			let friendliness  = 0;
			
			if (ratings.length) {
			ratings.forEach((rating) => {
            activity += rating.activity;
			reliability += rating.reliability;
			sympathy += rating.sympathy;
			friendliness += rating.friendliness;
          });
			activity = activity / ratings.length;
			reliability = reliability / ratings.length;
			sympathy = sympathy / ratings.length;
			friendliness = friendliness / ratings.length;
		  }
		    
			
			var response = {
				Activity: activity,
                Reliability: reliability,
				Sympathy: sympathy,
				Friendliness: friendliness
			};
			
            console.log('rating: ', ratings); // voila!
            cb(null, response);
        });

        });
    };
	
	
    Rating.remoteMethod(
            'average',
            {
                description: 'Get average Rating MY',
                accepts: {
                    arg: 'id',
                    type: 'number',
                    description: 'Evaluated user id',
                    required: true,
                    http: {source: 'path'}
                },
                accessType: 'READ',
                returns: {arg: 'stats', type: 'object', root: true},
                http: [
                    {verb: 'get', path: '/:id/average'}
                ]
            }

    );
	

};
