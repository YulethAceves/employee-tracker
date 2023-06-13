const inquirer = require("inquirer")
const mysql = require("mysql2");

const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: '0301',
        database: 'employeetracker_db'
    });
db.connect(function () {

    console.log(`Connected to the employeetracker_db database.`)
    startEmployeeTracker()

})

function startEmployeeTracker() {
    inquirer.prompt([
        {
            type: "list",
            choices: ["View Department", "View Roles", "View Employee", "Add Department", "Add Roles", "Add Employee", "Update employee rike", 
            "Exit Application"],
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
            case "View Employee":
                view_employee();
                break;
            case "Add Department":
                add_department();
                break;
            case "Add Roles":
                add_roles();
                break;
            case "Add Employee":
                add_employee();
                break;
            case "Update employee role":
                updateEmployee();
                break;
            default:
                db.end()
                process.exit(0)
        }
    });
};

function view_department() {
    db.query('SELECT * FROM department;', function (err, res) {
        if (err) {
            console.error(err)
            throw err;
        }
        console.table(res);
        startEmployeeTracker();
    });
};

const view_roles = () => {
    db.query('SELECT * FROM roles;', function (err, res) {
        if (err) throw err;
        console.table(res);
        startEmployeeTracker();
    });
};

const view_employee = () => {
    db.query("SELECT e.id, first_name, last_name, r.title, r.salary, d.department_name, e.manager_id FROM employee e  left join roles r on role_id = r.id left join department d on d.id = r.department_id;",
       function (err, res) {
            if (err) throw err;
            console.table(res);
            startEmployeeTracker();
        }
    );
};

const add_department = () => {
    inquirer.prompt([
        {
            name: 'department',
            type: 'input',
            message: 'What is the department name?',
        },
    ])
        .then(answer => {
            db.query(
                'INSERT INTO department (department_name) VALUES (?)',
                [answer.department],
                function (err, res) {
                    if (err) throw err;
                    console.log('Department added!');
                    startEmployeeTracker();
                }
            );
        });
};

const add_roles = () => {
    inquirer.prompt([
        {
            name: 'roletitle',
            type: 'input',
            message: 'What is the role title?',
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What is the salary for this role?',
        },
        {
            name: 'deptId',
            type: 'input',
            message: 'What is the department ID number?',
        },
    ])
        .then(answer => {
            db.query(
                'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)',
                [answer.roletitle, answer.salary, answer.deptId],
                function (err, res) {
                    if (err) throw err;
                    console.log('Job added!');
                    startEmployeeTracker();
                }
            );
        });
};

const add_employee = () => {
    inquirer.prompt([
        {
            name: 'nameFirst',
            type: 'input',
            message: "What is the employee's first name?",
        },
        {
            name: 'nameLast',
            type: 'input',
            message: "What is the employee's last name?",
        },
        {
            name: 'roleId',
            type: 'input',
            message: "What is the employee's role id?",
        },
        {
            name: 'managerId',
            type: 'input',
            message: 'What is the manager Id?',
        },
    ])
        .then(answer => {
            db.query(
                'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
                [answer.nameFirst, answer.nameLast, answer.roleId, answer.managerId],
                function (err, res) {
                    if (err) throw err;
                    console.log('Employee added!');
                    startEmployeeTracker();
                }
            );
        });
};

const updateEmployee = () => {
    inquirer
        .prompt([
            {
                name: 'id',
                type: 'input',
                message: 'Enter employee id',
            },
            {
                name: 'roleId',
                type: 'input',
                message: 'Enter new role id',
            },
        ])
        .then(answer => {
            db.query(
                'UPDATE employee SET role_id=? WHERE id=?',
                [answer.roleId, answer.id],
                function (err, res) {
                    if (err) throw err;
                    console.log('Employee updated!');
                    startEmployeeTracker();
                }
            );
        });
};
