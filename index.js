const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };
  
  try {
    let requestBody = JSON.parse(event.body); //JSON Object String
    //let requestBody = event.body; //JSON Object
    await dynamo
          .put({
            TableName: "Members", 
            Item: {
              id: requestBody.id,
              name: requestBody.name
            }
          })
          .promise();  
    body = `Put item ${requestBody.id}`;
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