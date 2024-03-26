'use strict'
const env=require("./env")
const merge=require('merge')
const where = require("lodash.where")

exports.port=function(obj){
    return obj.port
}


exports.host=function(obj){
    return obj.host
}

exports.address=function(obj){
    return `${obj.protocol}://${obj.host}:${obj.port}`
}

exports.message=function(){
    console.log(`server running at ${server.address}`)
}

exports.isJson=function(obj){
    try {
      var parsed=JSON.stringify(obj)
      return true
    } catch (e) {
       return false
    }
}

exports.merge=function(obj1, obj2){

    try{
        if(!Boolean(obj1)){
            obj1={}
         }
    
         if(!Boolean(obj2)){
            obj2={}
         }
        return merge(obj1, obj2)
    }catch(e){
        return new Error("Invalid JSON obj")
    }
}


exports.isArray=function(arr){
    return Array.isArray(arr)
}

exports.arrayfy=function(arr){
    if(module.exports.isArray(arr)){
        return arr
    }else{
        return new Array(arr)
    }
}



exports.url=function(host, path){
    return (host.charAt(host.length - 1) == '/'?host:host+'/')+ (path.charAt(0)=='/'?path.substring(1, path.length -1):path)
}

exports.handler=function(err,res){
    if(err){
        console.log("Error: ", err)
    }else{
        console.log(res)
    }
}




exports.filter=function(arr, filter){
    return where(arr,filter)
}



exports.requestHandler=function(status, msg, errStatus, errMsg, data, res, err ){
    if(err){
        
        // Log err to winston
        console.log( "Request error: ", err)
        return res.status(errStatus).send({
            message: errMsg,
            data: err
        })
    }else{  

        return res.status(status).send({
            message: msg,
            data
        })
       
    } 
}


exports.requestFailedHandler=function(req,res, msg, status){
    let message=msg?msg:"Error: Request failed with internal error"
    let statusCode=status?status:404

    return res.status(statusCode).send(message)
}


exports.runTime=function(){
    return env("RUNTIME_ENV")?env("RUNTIME_ENV"):"local"
}


exports.apiHandler=function (res, callback) {
    return callback(null, res.data)
}


exports.apiErrorHandler=function(err, callback){
    const {code, message}=err.toJSON()
    console.log(err.toJSON())
    return callback({code, message})
}




