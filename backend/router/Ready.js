const { Router } = require('express');

module.exports = function (app) {
    const router = Router()

    router.get('/', async function (req, res, next) {
        res.status(200).json({ "code" : 200 , "message" : "Hello!" });
    });

    return router;
}