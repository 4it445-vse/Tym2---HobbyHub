'use strict';




var loopback = require('loopback');
var LoopBackContext = require('loopback-context');

var express = require('express');
var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "team02.hobbyhub@gmail.com",
        pass: "v0YUkI3MNl"
    }
});


module.exports = function(Activity) {



    Activity.createActivity = function(category_id, subcategory_id, name, city, address, date_and_time, user_count, about, cb) {
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
            if (!act) {
                return cb({message: 'subcategory_id not found', status: 404});
            }

            console.log("cbbb: ", typeof cb);
            Activity.create({
                "category_id": category_id,
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
        const app = require('../../server/server.js');
                var ctx = LoopBackContext.getCurrentContext();
        var currentUser = ctx && ctx.get('currentUserId');
        console.log('currentUser.username: ', currentUser); // voila!
        const { hasActivity } = app.models;
                Activity.findById(id, function(err, act) {
            if (err) {
                return cb(err);
            }
            if (!act) {
                return cb({message: 'Activity Not found', status: 404});
            }

            hasActivity.count({activity_id: id}, function(err, CustomersCount) {
                if (err) {
                    return cb(err);
                }
                console.log('users which has activity: ', CustomersCount); // voila!

                var response = {
                    CurrectCount: CustomersCount,
                    MaxCount: act.user_count
                };
                cb(err, response);
            });

        });
    };


    Activity.invite = function(id, email, cb) {

        var ctx = LoopBackContext.getCurrentContext();
        var currentUser = ctx && ctx.get('currentUserId');
        console.log('currentUser.username: ', currentUser); // voila!
        const app = require('../../server/server.js');
                const { Customer } = app.models;
                Customer.find({where: {email: email}}, function(err, user) {
            if (err) {
                return cb(err);
            }
            console.log('user by email: ', user[0]); // voila!
            if (!user[0])
                return cb({message: 'User with this email not found', status: 404});

            Activity.findById(id, function(err, act) {
                if (err) {
                    return cb(err);
                }
                if (!act) {
                    return cb({message: 'Activity Not found', status: 404});
                }
                console.log('act obj: ', act.id); // voila!

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
                    to: email, // list of receivers 
                    subject: 'Invite activity', // Subject line 
                    text: 'You were invited to the event. Please click on the link:  <a href="href="http://dev.frontend.team02.vse.handson.pro/activityDetail/' + act.id + '">href="http://dev.frontend.team02.vse.handson.pro/activityDetail/' + act.id + '</a>', // plaintext body 
                    html: '<b>You were invited to the activity. Please click on the link:  <a href="http://dev.frontend.team02.vse.handson.pro/activityDetail/' + act.id + '">' + act.name + '</a></b>' // html body 
                };

                // send mail with defined transport object 
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: ' + info.response);
                });

                cb(null, true);
            });
        });
    };



    Activity.remoteMethod(
            'createActivity',
            {
                description: 'Create new Activity MY',
                accepts: [
                    {arg: 'category_id', type: 'number', required: true},
                    {arg: 'subcategory_id', type: 'number', required: true},
                    {arg: 'name', type: 'string', required: true},
                    {arg: 'city', type: 'string', required: true},
                    {arg: 'address', type: 'string', required: true},
                    {arg: 'date_and_time', type: 'date', required: true},
                    {arg: 'user_count', type: 'number', required: true},
                    {arg: 'about', type: 'string', required: true}
                ],
                accessType: 'READ',
                returns: {root: true, type: 'boolean'},
                http: [
                    {verb: 'post', path: '/createActivity'}
                ]
            }
    );

    Activity.remoteMethod(
            'status',
            {
                description: 'Get activity status MY',
                accepts: {
                    arg: 'id',
                    type: 'number',
                    description: 'Activity id',
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

    Activity.remoteMethod(
            'invite',
            {
                description: 'Invite user to activity via e-mail MY',
                accepts: [{
                        arg: 'id',
                        type: 'number',
                        description: 'Activity id',
                        required: true,
                        http: {source: 'path'}
                    },
                    {arg: 'email',
                        type: 'string',
                        description: 'email',
                        required: true,
                        http: {source: 'path'}
                    }],
                accessType: 'READ',
                returns: {arg: 'invited', type: 'boolean'},
                // alternately, to return the boolean "unwrapped":
                // returns: { root: true, type: 'boolean' },
                http: [
                    {verb: 'get', path: '/:id/:email/invite', }
                ]
            }

    );

};
