'use strict'
const express=require('express')
const morgan=require('morgan')
const cors=require('cors')
const cookie = require('cookie-parser')
const utils=require("./utils.js")
const server=require("./server.json")


exports.port=utils.port(server)
exports.host=utils.host(server)
exports.address=utils.address(server)
exports.message=function(){
    console.log(`${process.env.npm_package_name}:${process.env.npm_package_version} running at ${module.exports.address}`)
}


// exports.cors=cors({
//     origin: function(origin, callback){
//             callback(null, true)
//         },
//         credentials: true
// })

exports.cors =(cors());
// exports.cors = cors({
//   origin: function (origin, callback) {
//     // Check if the origin is allowed
//     // if (origin && origin === 'http://localhost:9010') {
//       if (origin ) {
//       callback(null, true); // Allow the request
//     } else {
//       callback(new Error('Not allowed by CORS')); // Block the request
//     }
//   },
//   credentials: true // Include credentials in CORS request
// });

exports.cookie=cookie()
exports.urlEncoded=express.urlencoded({extended: true})
exports.json=express.json()

exports.morgan=morgan('dev')