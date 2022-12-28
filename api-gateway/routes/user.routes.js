const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const services = require('../services.json');


router.use((req, res) => {


    if (!req.path.includes('socket.io')) {
        var paramPath = req.path.split('/');
        var Paths = [paramPath[1], paramPath.slice(2).join('/')];


        axios({
            method: req.method,
            url: services[Paths[0]].url + Paths[1],
            data: req.body,
            params: req.query
        })
            .then(function (responses) {
                return res.send(responses.data)
            })
            .catch(function (error) {
                return res.send(error.response.status, error.response.data)
            })
    }

})





module.exports = router;