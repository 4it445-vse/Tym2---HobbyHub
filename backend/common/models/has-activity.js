'use strict';

var loopback = require('loopback');
var LoopBackContext = require('loopback-context');
var empty = require('is-empty');

module.exports = function(Hasactivity) {

    Hasactivity.subscribeToActivity = function(id, cb) {
        const app = require('../../server/server.js');
                var ctx = LoopBackContext.getCurrentContext();
        var currentUser = ctx && ctx.get('currentUserId');
        const { Activity } = app.models;
        var activity;

        Activity.findById(id, function(err, act) {
            if (err) {
                return cb(err);
            }
            if (!act) {
                return cb({message: 'Activity Not found', status: 404});
            }
            subscribeToActivityWithId(act.user_count, id, currentUser, cb);
        });

    };

    function subscribeToActivityWithId(user_count, id, currentUser, cb) {
        Hasactivity.find({where: {and: [{customer_id: currentUser}, {activity_id: id}]}}, function(err, sub) {
            if (err) {
                return cb(err);
            }

            if (!empty(sub)) {
                return cb({message: 'Subscribe already exist', status: 404});
            }

            Hasactivity.count(
                    {"activity_id": id},
            function(err, totalCount) {
                if (err) {
                    console.log("Total error ", err);
                    cb(err);
                }

                if (totalCount >= user_count)
                {
                    return cb({message: 'Action is full', status: 404});
                }
                else {
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
                }
            }
            );
        });
    };


    Hasactivity.unsubscribeActivity = function(id, cb) {
        const app = require('../../server/server.js');
                var ctx = LoopBackContext.getCurrentContext();
        var currentUser = ctx && ctx.get('currentUserId');
        const { Activity } = app.models;
        var activity;

        Activity.findById(id, function(err, act) {
            if (err) {
                return cb(err);
            }
            if (!act) {
                return cb({message: 'Activity Not found', status: 404});
            }

            Hasactivity.find({where: {and: [{customer_id: currentUser}, {activity_id: id}]}}, function(err, sub) {
                if (err) {
                    return cb(err);
                }

                if (!empty(sub)) {
                    console.log("Deleted Sub info", sub[0]);
                    Hasactivity.destroyById(sub[0].id, function() {
                        console.log("Deleted Hasactivity", sub[0]);
                        cb(null, 'Unsubscribed');
                    });
                }
                else
                    return cb({message: 'User was not subscribed', status: 404});
            });
        });
    };

    Hasactivity.remoteMethod(
            'subscribeToActivity',
            {
                description: 'Subscribe to Activity MY',
                accepts: {
                    arg: 'id',
                    type: 'number',
                    description: 'Activity id',
                    required: true

                },
                accessType: 'READ',
                returns: {root: true, type: 'boolean'},
                http: [
                    {verb: 'post', path: '/subscribeToActivity'}
                ]
            }
    );

    Hasactivity.remoteMethod(
            'unsubscribeActivity',
            {
                description: 'unsubscribe Activity MY',
                accepts: {
                    arg: 'id',
                    type: 'number',
                    description: 'Activity id',
                    required: true
                },
                accessType: 'READ',
                returns: {root: true, type: 'boolean'},
                http: [
                    {verb: 'post', path: '/unsubscribeActivity'}
                ]
            }
    );



    Hasactivity.getSubscribeCustomer = function(id, cb) {
        const app = require('../../server/server.js');
                const { Activity } = app.models;
                var ctx = LoopBackContext.getCurrentContext();
        var currentUser = ctx && ctx.get('currentUserId');

        Activity.findById(id, function(err, act) {
            if (err) {
                return cb(err);
            }
            if (!act) {
                return cb({message: 'Activity Not found', status: 404});
            }
        });

        Hasactivity.find({fields: {customer_id: true}, where: {activity_id: id}, "include": ["customer"]}, function(err, cus) {
            if (err) {
                return cb(err);
            }
            cb(null, cus);
        });
    };

    Hasactivity.remoteMethod(
            'getSubscribeCustomer',
            {
                description: 'Get subscribe customer to Activity',
                accepts: {
                    arg: 'id',
                    type: 'number',
                    description: 'Activity id',
                    required: true,
                    http: {source: 'path'}
                },
                accessType: 'READ',
                returns: {arg: 'username', type: 'string', required: true},
                http: [
                    {verb: 'get', path: '/:id/getSubscribeCustomer'}
                ]
            }
    );



};
