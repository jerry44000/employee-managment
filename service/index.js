const path = require("path");
const dotenv = require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});
const express = require("express");
const app = express();
const pool = require("./config/db.js");
const PORT = 3000;

app.use(express.json());

app.post("/employee", async (req, res) => {
  try {
    const { name, date_of_joining, designation, gender, email, bio } = req.body;
    const employeeData = await pool.query(
      "INSERT INTO EMPLOYEE(name,date_of_joining,designation,gender,email,bio) VALUES($1,$2,$3,$4,$5,$6) returning *",
      [name, date_of_joining, designation, gender, email, bio]
    );
    res.json(employeeData.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/team", async (req, res) => {
  try {
    const { name, email, description } = req.body;
    const teamData = await pool.query(
      "INSERT INTO TEAM(name,email,description) VALUES($1,$2,$3) returning *",
      [name, email, description]
    );
    res.json(teamData.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/employeeassignment", async (req, res) => {
  try {
    const { employee_id, team_id } = req.body;
    const employeeassignmentData = await pool.query(
      "INSERT INTO EMPLOYEE_ASSIGNMENT(employee_id,team_id) VALUES($1,$2) returning *",
      [employee_id, team_id]
    );
    res.json(employeeassignmentData.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/employees", async (req, res) => {
  try {
    const employeeData = await pool.query("SELECT * FROM EMPLOYEE");
    res.json(employeeData.rows);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/teams", async (req, res) => {
  try {
    const teamData = await pool.query("SELECT * FROM TEAM");
    res.json(teamData.rows);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let data = {};
    const employeeData = await pool.query(
      "SELECT * FROM EMPLOYEE WHERE id =$1",
      [id]
    );
    const teams = await pool.query(
      "SELECT * FROM TEAM WHERE ID IN (SELECT team_id from EMPLOYEE_ASSIGNMENT where EMPLOYEE_ID=$1 )",
      [id]
    );
    data = employeeData.rows[0];
    if (data) {
      data.teams = teams.rows;
    } else {
      data = {
        info: "No data found",
      };
    }
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/teams/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let data = {};
    const teamData = await pool.query("SELECT * FROM TEAM WHERE id =$1", [id]);
    const employees = await pool.query(
      "SELECT * FROM EMPLOYEE WHERE ID IN (SELECT team_id from EMPLOYEE_ASSIGNMENT where TEAM_ID=$1 )",
      [id]
    );
    data = teamData.rows[0];
    if (data) {
      data.employees = employees.rows;
    } else {
      data = {
        info: "No data found",
      };
    }
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.put("/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date_of_joining, designation, gender, email, bio } = req.body;
    const employeeData = await pool.query(
      "UPDATE EMPLOYEE SET name=$1, date_of_joining=$2, designation=$3, gender=$4, email=$5, bio=$6 where id= $7 returning *",
      [name, date_of_joining, designation, gender, email, bio, id]
    );
    res.json(employeeData.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.put("/team/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, description } = req.body;
    const teamData = await pool.query(
      "UPDATE TEAM SET name=$1, email=$2, description=$3 where id= $4 returning *",
      [name, email, description, id]
    );
    res.json(teamData.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.delete("/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let data = {};
    const employeeassignmentData = await pool.query(
      "DELETE from EMPLOYEE_ASSIGNMENT where employee_id=$1 returning *",
      [id]
    );
    const employeeData = await pool.query(
      "DELETE from EMPLOYEE where id=$1 returning *",
      [id]
    );
    data = employeeData.rows[0];
    if (data) {
      data.teams = employeeassignmentData.rows;
    } else {
      data = {
        info: "no employee",
      };
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
app.listen(PORT, (req, res) => {
  console.log("server listening in port 3000");
});
