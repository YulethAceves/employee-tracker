const inquirer = require("inquirer")
const mysql = require("mysql2")

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '0301',
        database: 'employeetracker_db'
    });
db.connect(function () {

    console.log(`Connected to the employeetracker_db database.`)
    stratEmployeeTracker()

})

function stratEmployeeTracker() {
    inquirer.prompt([
        {
            type: "list",
            choices: ["View Department", "View Roles", "View Employees", "Add Deparment", "Add Roles", "Add Employee", "Exit Application"],
            message: "what would you like to do?",
            name: "options"

        }
    ]).then(({ options }) => {
        switch (options) {
            case "View Department":
                view_department();
                break;
            case "View Roles":
                view_roles();
                break;
            case "View Employees":
                view_employees();
                break;
            case "Add Department":
                add_department();
                break;
            case "Add Roles":
                add_roles();
                break;
            case "Add Employee":
                add_employees();
                break;
            default:
                //db.end()
                process.exit(0)
        }
    })
}