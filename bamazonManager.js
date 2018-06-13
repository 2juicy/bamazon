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
                case "View PRoducts":
                    DisplayRoot();
                    break;

                case "View Low Inventory":
                    displayPortfolio();
                    break;

                case "Add to Inventory":
                    display404();
                    break;

                case "Add New Product":
                    display404();
                    break;
            }




            connection.end();
        }); //promise end




}//end function