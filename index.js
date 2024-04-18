const inquirer = require("inquirer");

function init() {
  inquirer.prompt([
    {
      type: "list",
      name: "start",
      message: "What would you like to do?",
      choice: [
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
    }.then((choice) => {
      if (choice === "View All Departments") {
        viewAllDepts();
      }
      if (choice === "View All Roles") {
        viewAllRoles();
      }
      if (choice === "View All Employees") {
        viewAllEmps();
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
        endCheck();
      }
      // if (choice === "Remove Employee") {
      //   ();
      // }
      // if (choice === "Remove Role") {
      //   ();
      // }
      // if (choice === "Remove Department") {
      //   ();
      // }
    }),
  ]);
}

init();

// const viewAllEmployees = ;
