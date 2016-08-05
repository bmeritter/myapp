/**
 * Created by ritter on 16-7-31.
 */
"use strict";

const PostToBarcode = require('./core/PostToBarcode');
const BarcodeToPost = require('./core/BarcodeToPost');

const express = require('express');
const bodyPrser = require('body-parser');
let app = express();


let postToBarcode = new PostToBarcode();
let barcodeToPost = new BarcodeToPost();

app.use(bodyPrser.urlencoded({extend: true}));

app.post('/inputPost', function (req, res) {

    res.send(postToBarcode.changePost(req.body.code));
});

app.post('/inputBarcode', function (req, res) {

    res.send(barcodeToPost.changeBarcode(req.body.code));

});

app.post(function (req, res) {
    res.send(' 404 error!');
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

