'use strict';

module.exports = function(Customer) {
    Customer.validatesPresenceOf('username');

    Customer.validatesLengthOf('username', {
        min: 5,
        max: 100,
        message: {
            min: 'username is too short',
            max: 'username is too long'
        }
    });


    Customer.findByUsername = function(username, cb) {
        Customer.find({where: {username: username}}, function(err, user) {
            if (err) {
                return cb(err);
            }
            if (user.length > 0)
                cb(null, true);
            else
                cb(null, false);
        });
    };

    Customer.findByEmail = function(email, cb) {
        Customer.find({where: {email: email}}, function(err, user) {
            if (err) {
                return cb(err);
            }
            if (user.length > 0)
                cb(null, true);
            else
                cb(null, false);
        });
    };


    Customer.remoteMethod(
            'findByUsername',
            {
                description: 'Get user by username MY',
                accepts: {
                    arg: 'username',
                    type: 'string',
                    description: 'username',
                    required: true,
                    http: {source: 'path'}
                },
                accessType: 'READ',
                returns: {root: true, type: 'boolean'},
                http: [
                    {verb: 'get', path: '/:username/findByUsername'}
                ]
            }

    );

    Customer.remoteMethod(
            'findByEmail',
            {
                description: 'Get user by email MY',
                accepts: {
                    arg: 'email',
                    type: 'string',
                    description: 'email',
                    required: true,
                    http: {source: 'path'}
                },
                accessType: 'READ',
                returns: {root: true, type: 'boolean'},
                http: [
                    {verb: 'get', path: '/:email/findByEmail'}
                ]
            }

    );

    Customer.updatePassword = function(ctx, emailVerify, oldPassword, newPassword, cb) {
        var newErrMsg, newErr;
        try {
            this.findOne({where: {id: ctx.req.accessToken.userId, email: emailVerify}}, function(err, user) {
                if (err) {
                    cb(err);
                } else if (!user) {
                    newErrMsg = "No match between provided current logged user and email";
                    newErr = new Error(newErrMsg);
                    newErr.statusCode = 401;
                    newErr.code = 'LOGIN_FAILED_EMAIL';
                    cb(newErr);
                } else {
                    user.hasPassword(oldPassword, function(err, isMatch) {
                        if (isMatch) {
                            user.updateAttributes({'password': newPassword}, function(err, instance) {
                                if (err) {
                                    cb(err);
                                } else {
                                    cb(null, true);
                                }
                            });
                        } else {
                            newErrMsg = 'User specified wrong current password !';
                            newErr = new Error(newErrMsg);
                            newErr.statusCode = 401;
                            newErr.code = 'LOGIN_FAILED_PWD';
                            return cb(newErr);
                        }
                    });
                }
            });
        } catch (err) {
            logger.error(err);
            cb(err);
        }
    };

    Customer.remoteMethod(
            'updatePassword',
            {
                description: "Allows a logged user to change his/her password. MY",
                http: {verb: 'put'},
                accepts: [
                    {arg: 'ctx', type: 'object', http: {source: 'context'}},
                    {arg: 'emailVerify', type: 'string', required: true, description: "The user email, just for verification"},
                    {arg: 'oldPassword', type: 'string', required: true, description: "The user old password"},
                    {arg: 'newPassword', type: 'string', required: true, description: "The user NEW password"}
                ],
                returns: {arg: 'passwordChange', type: 'boolean'}
            }
    );


    Customer.updateEmail = function(ctx, newEmail, cb) {
        var newErrMsg, newErr;
        console.log("updateEmail method print userId ctx: ", ctx.req.accessToken.userId);
        try {
            this.findOne({where: {id: ctx.req.accessToken.userId}}, function(err, user) {
                user.updateAttributes({'email': newEmail}, function(err, instance) {
                    if (err) {
                        cb(err);
                    } else {
                        cb(null, true);
                    }
                });
            });
        } catch (err) {
            logger.error(err);
            cb(err);
        }
    };

    Customer.remoteMethod(
            'updateEmail',
            {
                description: "Allows update customer email. MY",
                http: {verb: 'put'},
                accepts: [
                    {arg: 'ctx', type: 'object', http: {source: 'context'}},
                    {arg: 'newEmail', type: 'string', required: true, description: "New customer email"}
                ],
                returns: {arg: 'EmailChange', type: 'boolean'}
            }
    );





};
