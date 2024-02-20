const aws = require("aws-sdk");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const aws_access_key = process.env.AWSACCESSKEY;
const aws_secret_key = process.env.AWSSECRETKEY;
const region = process.env.REGION;

const tableName = process.env.TABLENAME;

const dynamoDB = new aws.DynamoDB.DocumentClient({
  region: region,
  accessKeyId: aws_access_key,
  secretAccessKey: aws_secret_key,
});

const insertDataInDB = async () => {
  try {
    const params = {
      TableName: tableName,
      Item: {
        employee_id: "5",
        address: "New Colony Babaganj",
        is_employee: true,
        name: "Ketan Khandelwal 2",
      },
    };

    const insert_query = await dynamoDB.put(params).promise();
    console.log(insert_query, "resssssssssssssssssssssssssss");
  } catch (err) {
    console.log(err);
  }
};

// insertDataInDB();

const scanTable = async () => {
  try {
    const params = {
      TableName: tableName,
    };

    const scan_table = await dynamoDB.scan(params).promise();
    console.log(scan_table.$response.data, "response");
    console.log(scan_table.Count, "Countsss");
    console.log(scan_table.Items, "itemsss");

    console.log(scan_table.LastEvaluatedKey, "Lassttttttt");

    console.log(scan_table.ScannedCount, "Scanned");
  } catch (error) {
    console.log(error);
  }
};

// scanTable();

const getDataFromTable = async () => {
  try {
    const params = {
      TableName: tableName,
      Key: {
        employee_id: "3",
      },
    };
    const get_data = await dynamoDB.get(params).promise();
    console.log(get_data);
  } catch (error) {
    console.log(error);
  }
};

// getDataFromTable();

const updateData = async () => {
  try {
    const params = {
      TableName: tableName,
      Key: {
        employee_id: "5",
      },
      UpdateExpression: "set address = :address,  is_employee = :is_employee", //  a query
      ExpressionAttributeValues: {
        ":address": "India",
        ":is_employee": false,
      },
      ReturnValues: "UPDATED_NEW",
    };

    const result = await dynamoDB.update(params).promise();

    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

// updateData();

const deleteData = async () => {
  try {
    const params = {
      TableName: tableName,
      Key: {
        employee_id: "4",
      },
    };

    const result = await dynamoDB.delete(params).promise();
    console.log(result.$response.data);
  } catch (error) {
    console.log(error);
  }
};

deleteData();

