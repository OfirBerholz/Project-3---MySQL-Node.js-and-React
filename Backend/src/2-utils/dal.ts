import mysql from "mysql";
import config from "./config";

//* Creating a connection object:
const connection = mysql.createPool({
  host: config.mysqlHost, // Computer
  user: config.mysqlUser, // Database Username
  password: config.mysqlPassword, // Database Password (Northwind doesn't contain a password)
  database: config.mysqlDatabase, // Database name
});

console.log("We're connected to MySQL");

function execute(sql: string, values): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    // To Promisify as asynchronous function

    //* Execute the sql on MySQL:
    connection.query(sql, values, (err, result) => {
      // Query = שאילתא
      //* If there is an error:
      if (err) {
        reject(err);
        return;
      }

      //* NO error - report data:
      resolve(result);
    });
  });
}

export default {
  execute,
};
