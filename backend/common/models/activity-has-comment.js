'use strict';


var loopback = require('loopback');
var LoopBackContext = require('loopback-context');
var empty = require('is-empty');

module.exports = function(Activityhascomment) {

    Activityhascomment.createComment = function(to_activity_id, text, cb) {

        const app = require('../../server/server.js');
                var ctx = LoopBackContext.getCurrentContext();
        var currentUser = ctx && ctx.get('currentUserId');
        const { Activity } = app.models;
                var activity;

        Activity.findById(to_activity_id, function(err, activity) {
            if (err) {
                return cb(err);
            }
            if (!activity) {
                return cb({message: 'Activity Not found', status: 404});
            }
            createComment2(currentUser, to_activity_id, text, cb);
        });

    };

    function createComment2(currentUser, to_activity_id, text, cb) {
        Activityhascomment.create({
            "from_user_id": currentUser,
            "activity_id": to_activity_id,
            "text": text
        }, function(err, comment) {
            if (err)
                return cb(err);
            console.log('New comment has been created:', comment);
            cb(null, comment);
        }
        );

    }
    ;

    Activityhascomment.remoteMethod(
            'createComment',
            {
                description: 'Create new comment for activity MY',
                accepts: [{
                        arg: 'activity_id',
                        type: 'number',
                        description: 'Activity id',
                        required: true
                    },
                    {
                        arg: 'text',
                        type: 'string'
                    }],
                accessType: 'READ',
                returns: {root: true, type: 'boolean'},
                http: [
                    {verb: 'post', path: '/createComment'}
                ]
            }
    );

}
;