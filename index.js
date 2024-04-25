const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username
    user: "root",
    // Add MySQL password here
    password: "",
    database: "employee_db",
  },
  console.log(`Connected to the movies_db database.`)
);

function init() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "start",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
          "Quit", //,
          // "Remove Department",
          // "Remove Role",
          // "Remove Employee"
        ],
      },
    ])
    .then((answer) => {
      const choice = answer.start;

      if (choice === "View All Departments") {
        viewAllDepts();
      }
      if (choice === "View All Roles") {
        viewAllRoles();
      }
      if (choice === "View All Employees") {
        viewAllEmployees();
      }
      if (choice === "Add Department") {
        addDept();
      }
      if (choice === "Add Role") {
        addRole();
      }
      if (choice === "Add Employee") {
        addEmp();
      }
      if (choice === "Update Employee Role") {
        updateEmpRole();
      }
      if (choice === "Quit") {
        db.end();
      }
    });
}

init();

function viewAllDepts() {
  const sql = "SELECT * from department";

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("Error viewing departments:", err);
      return;
    }
    console.table(rows);
    init();
  });
}

function viewAllRoles() {
  const sql = "SELECT * from role";

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("Error viewing roles:", err);
      return;
    }
    console.table(rows);
    init();
  });
}

function viewAllEmployees() {
  const sql = "SELECT * from employee";

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("Error viewing employees:", err);
      return;
    }
    console.table(rows);
    init();
  });
}

function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newDept",
        message: "What is the name of the new department?",
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO department (dept_name)
VALUES (?)`;

      db.query(sql, answer.newDept, (err, res) => {
        if (err) {
          console.error("Error adding department:", err);
          return;
        }
        console.log(answer.newDept + " added successfully!");
        init();
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// function addRole() = ;

// function addEmp() = ;

// function updateEmpRole() = ;
