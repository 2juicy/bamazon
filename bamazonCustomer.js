//Global variables.
const inquirer = require("inquirer");
const mysql = require("mysql");
//Server information
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});
//Action when connected to server.
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    readProducts();
});
//Displays all the products for sale in a list.
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
    startInquirer();
  });
}

function startInquirer(){
  inquirer.prompt([{
        type: 'input',
        name: 'product',
        message: 'Which product would you like to purchase?(Enter product #)'
    }]).then(function (res) {
        console.log(res.product);
    });


}
