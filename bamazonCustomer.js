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
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.log("Displaying products from " + res[0].department_name);
    for (let i = 0; i < res.length; i++) {
      console.log("\n" + res[i].id +
        ". " + res[i].product_name +
        "\nPrice: $" + res[i].price);
    }
    startInquirer(res);
  });
}
//Start asking customer which product and quantity.
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
  ]).then(function (inquirerRes) {
    if (x[inquirerRes.product - 1].quantity <= 0 || inquirerRes.quantity > x[inquirerRes.product - 1].quantity) {
      console.log('Insufficient quantity!');
      connection.end();
    } else {
      let query = "UPDATE products SET quantity = quantity - ? WHERE id = ?"
      connection.query(query, [inquirerRes.quantity, x[inquirerRes.product - 1].id], function (err) {
        if (err) throw err;
        let total = ((x[inquirerRes.product - 1].price) * inquirerRes.quantity).toFixed(2);
        console.log("The total of your purchase is $" + total + 
          "\nSuccessfully purchased " + inquirerRes.quantity + ' copy/copies of ' + x[inquirerRes.product - 1].product_name + '.');
      });
    }
    connection.end();
  });
}