'use strict'


///
exports.mongoAddress=function(connection){
// console.log(connection,'con')
  //   return `mongodb+srv://devstacksuraj:X2d57II66BmX5JDv@cluster0.bjjofta.mongodb.net/certsManager?retryWrites=true&w=majority`;
  // }
    
  // return mongodb+srv://certsManager:REEEEEEEC212112SDSDSD22_@certs.crwa1op.mongodb.net/certsManager?retryWrites=true&w=majority`;
    // return `mongodb://${connection.username}:${connection.password}@${connection.host}:${connection.port}/${connection.name}`   
  return `mongodb+srv://certsManager:REEEEEEEC212112SDSDSD22_@certs.crwa1op.mongodb.net/certsManager?retryWrites=true&w=majority`;
}
exports.mongoAddress2 = function (connection) {
  // console.log(connection, "mongo2established.....................1");
  // console.log(
  //   `mongodb+srv://${connection.username}:${connection.password}@${
  //     connection.host
  //   }/${connection.name ? connection.name : ""}?retryWrites=true&w=majority`
  // );
  if (connection.protocol == "https") {
    return `mongodb+srv://${connection.username}:${connection.password}@${
      connection.host
    }/${connection.name ? connection.name : ""}?retryWrites=true&w=majority`;
  }
  //--------->  return `mongodb+srv://certsManager:REEEEEEEC212112SDSDSD22_@certs.crwa1op.mongodb.net/dev1conucle?retryWrites=true&w=majority`;

  //   return `mongodb://${connection.username}:${connection.password}@${connection.host}:${connection.port}/${connection.name}`
};

exports.gettersConfig={toObject : {getters: true}, toJSON : {getters: true}}

exports.connectionConfig={useNewUrlParser: true, useUnifiedTopology: true}







