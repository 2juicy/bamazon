//Global Vars
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
    startInquirer();
});
//Gives manager a menu option
function startInquirer() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Menu Options',
            choices: ["View Products", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }]).then(function (res) {
            switch (res.choice) {
                case "View Products":
                    viewProducts(res.choice);
                    break;

                case "View Low Inventory":
                    lowProducts();
                    break;

                case "Add to Inventory":
                    viewProducts(res.choice);
                    break;

                case "Add New Product":
                    addProduct();
                    break;
            }
        }); //promise end
}//end inquirer function
//View Products function
function viewProducts(x) {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("Displaying products from " + res[0].department_name);
        for (let i = 0; i < res.length; i++) {
            console.log("\n" + res[i].id +
                ". " + res[i].product_name +
                "\nPrice: $" + res[i].price +
                "\nQuantity: " + res[i].quantity);
        }
        if (x === 'Add to Inventory'){
            addInventory(res);
        } else {
        connection.end();
        }
    });
}
//View Low Products function
function lowProducts() {
    connection.query("SELECT * FROM products WHERE quantity < 5" , function (err, res) {
        if (err) throw err;
        console.log("Displaying products from " + res[0].department_name);
        for (let i = 0; i < res.length; i++) {
            console.log("\n" + res[i].id +
                ". " + res[i].product_name +
                "\nPrice: $" + res[i].price +
                "\nQuantity: " + res[i].quantity);
        }
        connection.end();
    });
}
//Add New Inventory function
function addInventory(x) {
  inquirer.prompt([
    {
      type: 'input',
      name: 'product',
      message: 'Which product would you like to add more?(Enter product #)'
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'Enter the amount you would like to add?'
    }
  ]).then(function (inquirerRes) {
      let query = "UPDATE products SET quantity = quantity + ? WHERE id = ?";
      connection.query(query, [inquirerRes.quantity, x[inquirerRes.product - 1].id], function (err) {
        if (err) throw err;
        console.log("You added " + inquirerRes.quantity + ' to ' + x[inquirerRes.product - 1].product_name);
      });
    connection.end();
  });
}