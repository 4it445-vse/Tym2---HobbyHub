'use strict';

module.exports = function(Activitysubcategory) {

    Activitysubcategory.getSubCategories = function(id, cb) {

        Activitysubcategory.find({fields: {id: true, name: true}, "where": {"category_id": id}}, function(err, subcat) {
            if (err) {
                return cb(err);
            }
            cb(null, subcat);
        });
    };


    Activitysubcategory.remoteMethod(
            'getSubCategories',
            {
                description: 'Get categories a sub categories',
                accessType: 'READ',
                accepts: {
                    arg: 'id',
                    type: 'number',
                    description: 'Category id',
                    required: true,
                    http: {source: 'path'}
                },
                returns: {arg: 'categories', type: 'boolean'},
                http: [
                    {verb: 'get', path: '/:id/getSubCategories'}
                ]
            }

    );



};
