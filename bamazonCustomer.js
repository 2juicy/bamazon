// const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    readProducts();
});

function readProducts() {
  console.log("Displaying all products...");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
        console.log("\n" + res[i].id + 
          ". " + res[i].product_name + 
          "\nPrice: $" + res[i].price);
    }
    connection.end();
  });
}
