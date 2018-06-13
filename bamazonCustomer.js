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
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      console.log("\n" + res[i].id +
        ". " + res[i].product_name +
        "\nPrice: $" + res[i].price);
    }

    startInquirer(res);

  });
}

function startInquirer(x) {
  inquirer.prompt([
    {
      type: 'input',
      name: 'product',
      message: 'Which product would you like to purchase?(Enter product #)'
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'Enter the amount you would like to purchase?'
    }
  ]).then(function (inquirerResults) {
    if (x[inquirerResults.product - 1].quantity <= 0 || inquirerResults.quantity > x[inquirerResults.product - 1].quantity) {
      console.log('Not enough left in stock to purchase.');
      connection.end();
    } else {
      let query = "UPDATE products SET quantity = quantity - ? WHERE id = ?"
      connection.query(query, [inquirerResults.quantity, x[inquirerResults.product - 1].id], function (err, res) {
        if (err) throw err;
        console.log("Successfully purchased " + inquirerResults.quantity + ' copy/copies of ' + x[inquirerResults.product - 1].product_name + '.');
      });
    }
    connection.end();
  });

}
