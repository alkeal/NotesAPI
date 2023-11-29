
const AWS = require('aws-sdk');
const { sendResponse } = require('../../responses');
const  db = new AWS.DynamoDB.DocumentClient();




    exports.handler = async (event,context) => {

    try {
          const  nanoid = event.pathParameters.id
    
    var params = {
      TableName: 'notes-db',
      Key: {
        id :  nanoid
      }
    };
    await db.delete(params).promise()
        
        return sendResponse(200,{success : true, message : 'deleted note ${}' });
    } catch (error) {
        return sendResponse(500, {succes: false, errorMessage : 'error ${error.message}'});
    }
    }
