const router = require("express").Router()
const request = require("request");
const crypto = require('crypto');
const { API_KEY, API_SECRET, API_URL } = require('../utils/constants')

// гет-запрос формата: http://localhost:8000/path?path=путь
router.get('/:path', (req, res) => {
    let path = req.query.path
    if (req.query.symbol) {
        path = `/api/v1/trade/bucketed?binSize=1m&partial=false&count=100&reverse=true&symbol=${req.query.symbol}`
    }
    const expires = Math.round(new Date().getTime() / 1000) + 60; // 1 min in the future
    const verb = 'GET'
    const signature = crypto.createHmac('sha256', API_SECRET)
        .update(verb + path + expires)
        .digest('hex');

    const headers = {
        'content-type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'api-expires': expires,
        'api-key': API_KEY,
        'api-signature': signature
    };
    const requestOptions = {
        headers: headers,
        url: API_URL + path,
        method: verb,
    };
    request(requestOptions, function (error, response, body) {
        if (error) {
            res.send({ error })
        }
        if (body) {
            res.send(JSON.parse(body))
        }
    });
})

router.post('/:path', (req, res) => {
    const path = req.query.path
    const expires = Math.round(new Date().getTime() / 1000) + 60; // 1 min in the future
    const verb = 'POST'
    const postBody = JSON.stringify(req.body);

    const signature = crypto.createHmac('sha256', API_SECRET)
        .update(verb + path + expires + postBody)
        .digest('hex');
    const headers = {
        'content-type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'api-expires': expires,
        'api-key': API_KEY,
        'api-signature': signature
    };
    const requestOptions = {
        headers: headers,
        url: API_URL + path,
        method: verb,
        body: postBody
    };
    request(requestOptions, function (error, response, body) {
        if (error) {
            res.send({ error })
        }
        if (body) {
            res.send(JSON.parse(body))
        }
    });
})

module.exports = router

