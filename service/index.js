const path = require("path");
const dotenv = require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});
const express = require("express");
const app = express();
const {
  createEmployee,
  createTeam,
  createEmployeeAssignment,
} = require("./routes/create.js");
const {
  getAllEmployees,
  getAllTeams,
  getEmployee,
  getTeam,
} = require("./routes/read.js");
const { updateEmployee, updateTeam } = require("./routes/update.js");
const {
  deleteEmployee,
  deleteTeam,
  deleteEmployeeAssignment,
} = require("./routes/delete.js");
const PORT = 3000;

app.use(express.json());

// Create employee
app.post("/employee", createEmployee);
// Create team
app.post("/team", createTeam);
// Create employee assignment
app.post("/employeeassignment", createEmployeeAssignment);

// Get all employees
app.get("/employees", getAllEmployees);
// Get all teams
app.get("/teams", getAllTeams);
// Get employee by id
app.get("/employees/:id", getEmployee);
// Get team by id
app.get("/teams/:id", getTeam);

// Update employee by id
app.put("/employee/:id", updateEmployee);
// Update team by id
app.put("/team/:id", updateTeam);

// Delete employee
app.delete("/employee/:id", deleteEmployee);
// Delete team
app.delete("/team/:id", deleteTeam);
// delete assignment
app.delete("/employeeassignment", deleteEmployeeAssignment);

app.listen(PORT, (req, res) => {
  console.log("server listening in port 3000");
});
