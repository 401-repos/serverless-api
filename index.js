'use strict'
const uuid = require('uuid').v4
const People = require('./people.js');
const Car = require('./car.js');
let model;
exports.handler = async function (event) {
    let path;
    if (event.pathParameters.path) {
        path = event.pathParameters.path.toLowerCase()
    } else {
        return {
            body:JSON.stringify( {path:"Wrong Path"})
        }
    }
    if (path == 'people') {
        model = People;
    } else if (path == 'car') {
        model = Car;
    }
    const method = event.requestContext.http.method.toLowerCase();
    const id = event.pathParameters ? event.pathParameters.id : false;
    let ret;
    console.log("path" , path , "method" , method);
    try {

        if (method == 'get') {
            if (id) {
                ret = await model.query('id').eq(id).exec();
            } else {
                ret = await model.scan().exec();
            }
        } else if (method == 'post') {
            let body = JSON.parse(event.body)
            if(body.age){
                let obj ={
                    name: body.name,
                    id:uuid(),
                    age:body.age
                }
                console.log("Before Creation",obj);
                ret = await model.create(obj);
                console.log("After Creation");
            }
            if(body.color){
                let obj ={
                    name:body.name,
                    id:uuid(),
                    color:body.color
                }
                console.log("Before Creation",obj);
                ret = await model.create(obj);
                console.log("After Creation");
            }
        } else if (method == 'put') {
            let body = JSON.parse(event.body)
            if(body.age){
                let obj ={
                    name: body.name,
                    age:body.age
                }
                console.log("Before Creation",obj);
                ret = await model.update({
                    'id': id
                }, obj);
                console.log("After Creation");
            }
            if(body.color){
                let obj ={
                    name:body.name,
                    color:body.color
                }
                console.log("Before Creation",obj);
                ret = await model.update({
                    'id': id
                }, obj);
                console.log("After Creation");
            }
            
        } else if (method == 'delete') {
            ret = await model.delete({
                'id': id
            });
        } else {
            console.log("Un supported Method");
        }
    } catch (error) {
        console.log("Error in the database");
        console.log(error.message);
    }

    console.log(ret);
    return {
        body: JSON.stringify(ret)
    }
}