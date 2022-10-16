const AWS = require("aws-sdk");
const crypto = require('crypto');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };
  
  try {
    let requestBody = JSON.parse(event.body); //event.body as string
    //let requestBody = event.body; //event.body as json object
    let newID = crypto.createHash('md5').update(requestBody.email).digest('hex');
    await dynamo
          .put({
            TableName: "Members",
            Item: {
              id: newID,
              name: requestBody.name,
              title: requestBody.title,
              email: requestBody.email,
              phone: requestBody.phone,
              gender: requestBody.gender,
              started: requestBody.started,
              timezone: requestBody.timezone,
              level: requestBody.level,
              track: requestBody.track
            }
          })
          .promise();  
    body = `Created item with id: ${newID}`;
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  }; 
    
}