const inquirer = require("inquirer");
const mysql = require("mysql2");

let db = mysql.createConnection(
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

function addRole() {
  db.query("SELECT * FROM department", (err, departmentsList) => {
    if (err) {
      console.error("Error getting departments:", err);
      return;
    }

    const departmentChoices = departmentsList.map((department) => ({
      name: department.dept_name,
      value: department.id,
    }));

    inquirer
      .prompt([
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
      ])
      .then((answer) => {
        const newRole = [answer.title, answer.salary, answer.department];
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;

        db.query(sql, newRole, (err, result) => {
          if (err) {
            console.error("Error adding role:", err);
            return;
          }
          console.log(answer.title + " role added successfully!");
          init();
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
}

function addEmp() {
  db.query("SELECT * FROM role", (err, rolesList) => {
    if (err) {
      console.error("Error getting roles:", err);
      return;
    }
    const roleChoices = rolesList.map((role) => ({
      name: role.title,
      value: role.id,
    }));

    db.query("SELECT * FROM employee", (err, managersList) => {
      if (err) {
        console.error("Error getting managers:", err);
        return;
      }
      const managerChoices = [
        { name: "None", value: null },
        ...managersList.map((manager) => ({
          name: `${manager.first_name} ${manager.last_name}`,
          value: manager.id,
        })),
      ];

      inquirer
        .prompt([
          {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?",
            validate: (input) =>
              input.trim() !== "" || "First name is required",
          },
          {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?",
            validate: (input) => input.trim() !== "" || "Last name is required",
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
            choices: managerChoices,
          },
        ])
        .then((answer) => {
          const newEmp = [
            answer.first_name.trim(),
            answer.last_name.trim(),
            answer.role,
            answer.manager,
          ];

          const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;

          db.query(sql, newEmp, (err, result) => {
            if (err) {
              console.error("Error adding employee:", err);
              return;
            }
            console.log(
              `Employee ${answer.first_name} ${answer.last_name} added successfully!`
            );
            init();
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  });
}
function updateEmpRole() {
  db.query("SELECT * FROM employee", (err, employeeList) => {
    if (err) {
      console.error("Error getting employees:", err);
      return;
    }

    const employeeChoices = employeeList.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));

    db.query("SELECT * FROM role", (err, roleList) => {
      if (err) {
        console.error("Error getting roles:", err);
        return;
      }

      const roleChoices = roleList.map((role) => ({
        name: role.title,
        value: role.id,
      }));

      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "Which employee's role do you want to update?",
            choices: employeeChoices,
          },
          {
            type: "list",
            name: "role",
            message:
              "Which role do you want to assign to the selected employee?",
            choices: roleChoices,
          },
        ])
        .then((answer) => {
          const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
          db.query(sql, [answer.role, answer.employee], (err, result) => {
            if (err) {
              console.error("Error updating employee role:", err);
              return;
            }
            console.log("Employee role updated successfully!");
            init();
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  });
}
