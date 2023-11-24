const { sendResponse } = require ('../../responses/index');
const AWS = require('aws-sdk');
const { send } = require('process');
const db = new AWS.DynamoDB.DocumentClient();


  





exports.handler = async (event, contect ) => {


  const {Items} = await db.scan({

    TableName: 'notes-db',
     




  }).promise();


 return sendResponse(200, {success: true, notes : Items});






}