const inquirer = require("inquirer");
const mysql = require("mysql2/promise");

let db = {};

mysql
  .createConnection(
    {
      host: "localhost",
      // MySQL username
      user: "root",
      // Add MySQL password here
      password: "",
      database: "employee_db",
    },
    console.log(`Connected to the movies_db database.`)
  )
  .then((val) => (db = val));

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

async function addRole() {
  try {
    const [departmentsList] = await db.query("SELECT * FROM department");
    const departmentChoices = departmentsList.map((department) => ({
      name: department.dept_name,
      value: department.id,
    }));

    const answer = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What is the name of the new role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for this role?",
      },
      {
        type: "list",
        name: "department",
        message: "What department is this role in?",
        choices: departmentChoices,
      },
    ]);

    const newRole = [answer.title, answer.salary, answer.department];
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;

    await db.query(sql, newRole);
    console.log(answer.title + " role added successfully!");
    init();
  } catch (error) {
    console.error("Error:", error);
  }
}

// ------ Keeping to work out other issue later ------

// async function addRole() {
//   const sql = "SELECT * FROM department";
//   const [departmentsList] = await db.query(sql);
//   const departmentChoices = departmentsList.map((department) => ({
//     name: department.dept_name,
//     value: department.id,
//   }));

//   inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "title",
//         message: "What is the name of the new role?",
//       },
//       {
//         type: "input",
//         name: "salary",
//         message: "What is the salary for this role?",
//       },
//       {
//         type: "list",
//         name: "department",
//         message: "What department is this role in?",
//         choices: departmentChoices,
//       },
//     ])
//     .then((answer) => {
//       const newRole = [answer.title, answer.salary, answer.department];
//       const sql = `INSERT INTO role (title, salary, department_id)
// VALUES (?, ?, ?)`;

//       db.query(sql, newRole, (err, res) => {
//         if (err) {
//           console.error("Error adding role:", err);
//           return;
//         }
//         console.log(answer.title + " role added successfully!");
//         init();
//       });
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }

async function addEmp() {
  try {
    // Needs to be updated for role and manager
    const [departmentsList] = await db.query("SELECT * FROM department");
    const departmentChoices = departmentsList.map((department) => ({
      name: department.dept_name,
      value: department.id,
    }));
    const [managersList] = await db.query("SELECT * FROM ");
    const managerChoices = managersListList.map((manager) => ({
      name: department.dept_name,
      value: department.id,
    }));

    const answer = await inquirer.prompt([
      {
        type: "input",
        name: "firstname",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "lastname",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        name: "role",
        message: "What is the employee's role?",
        choices: roleChoices,
      },
      {
        type: "list",
        name: "manager",
        message: "Who is the employee's manager?",
        choices: None,
        managerChoices,
      },
    ]);

    const newEmp = [
      answer.firstname,
      answer.lastname,
      answer.role,
      answer.manager,
    ];
    const sql = `INSERT INTO role (firstname, lastname, role, manager) VALUES (?, ?, ?, ?)`;

    await db.query(sql, newEmp);
    console.log(answer.title + " employee added successfully!");
    init();
  } catch (error) {
    console.error("Error:", error);
  }
}

// function updateEmpRole() = ;
