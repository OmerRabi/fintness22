const FitnessSchema = require('../schema/');

module.exports = {

    getRetention: (type) => {
        return FitnessSchema.aggregate().
        match({
            "$or": [{
                    "type": "INITIAL_PURCHASE"
                },
                {
                    "type": "RENEWAL"
                }
            ],
            "product_id": type
        }).
        group({
            "_id": {
                "$dateToString": {
                    "format": "%Y-%m",
                    "date": {
                        "$toDate": "$event_timestamp_ms"
                    }
                }
            },
            "initial_purchase_count": {
                "$sum": {
                    "$cond": [{
                            "$eq": [
                                "$type",
                                "INITIAL_PURCHASE"
                            ]
                        },
                        1,
                        0
                    ]
                }
            },
            "renewal_count": {
                "$sum": {
                    "$cond": [{
                            "$eq": [
                                "$type",
                                "RENEWAL"
                            ]
                        },
                        1,
                        0
                    ]
                }
            }
        }).
        project({
            "_id": 0,
            "initial_purchase_month": "$_id",
            "renewal_count": 1,
            "initial_purchase_count": 1,
            "retention_percentage": {
                "$multiply": [{
                        "$divide": [
                            "$renewal_count",
                            "$initial_purchase_count"
                        ]
                    },
                    100
                ]
            }
        }).
        sort({
            "initial_purchase_month": 1
        });
    },

    getRevenue: (type) => {
        return FitnessSchema.aggregate().
        match({
            "product_id": type,
        }).
        group({
            "_id": {
                "product_id": "$product_id",
                "yearMonth": {
                    "$dateToString": {
                        "format": "%Y-%m",
                        "date": {
                            "$toDate": "$event_timestamp_ms"
                        }
                    }
                }
            },
            "revenue": {
                "$sum": {
                    "$convert": {
                        "input": "$price",
                        "to": "decimal"
                    }
                }
            }
        }).
        sort({
            "_id": 1
        })
    },

    insertMany: async (data) => {
        const array = data.map(fitObj => {
            const fit = new FitnessSchema(fitObj);
            return fit;
        })
        return FitnessSchema.insertMany(array);
    }

}