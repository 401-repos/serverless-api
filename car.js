'use strict';

const dynamoose = require('dynamoose');

const carShcema = new dynamoose.Schema({
    id:{type:String , required:true},
    name:{type:String , required:true},
    color:{type:String , required:true}
});

module.exports = dynamoose.model('car',carShcema);