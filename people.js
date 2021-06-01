'use strict';

const dynamoose = require('dynamoose');

const peopleSchema = new dynamoose.Schema({
    id:{type:String , required:true},
    name:{type:String , required:true},
    age:{type:Number , required:true}
});

module.exports = dynamoose.model('people',peopleSchema);