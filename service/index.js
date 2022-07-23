const path = require("path");
const dotenv = require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
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
const cors = require("cors");

var corsOptions = {
  origin: "http//:www.exemple.com",
  optionSuccessStatus: 200,
};

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "employee managment API",
      version: "1.0.0",
      description: "managment employee data",
      contact: {
        name: "shai badarna",
      },
      server: ["http://localhost:3000"],
    },
  },
  apis: ["index.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors(corsOptions));
app.use(express.json());

/**
 * @swagger
 * definitions:
 *  Employee:
 *   type: object
 *   properties:
 *    name:
 *     type: string
 *     description: name of the employee
 *     example: 'Shai Badarna'
 *    date_of_joining:
 *     type: string
 *     description: date of joining of the employee
 *     example: '2023-07-23'
 *    email:
 *     type: string
 *     description: email of the employee
 *     example: 'shay@gmail.com'
 *    gender:
 *     type: string
 *     description: gender of the employee
 *     example: 'male'
 *    bio:
 *     type: string
 *     description: biography of the employee
 *     example: 'press officer in profesional retraining as software developer'
 *    designation:
 *     type: string
 *     description: designation of the employee
 *     example: 'developer'
 *  Team:
 *   type: object
 *   properties:
 *    name:
 *     type: string
 *     description: name of the team
 *     example: 'back end'
 *    email:
 *     type: string
 *     description: email of the team
 *     example: 'backend@gmail.com'
 *    description:
 *     type: string
 *     description: description of the team
 *     example: 'node JS developers'
 *  Employee_Assignment:
 *   type: object
 *   properties:
 *    employee_id:
 *     type: integer
 *     description: id of the employee
 *     example: 2
 *    team_id:
 *     type: integer
 *     description: id of the team
 *     example: 2
 */


/**
  * @swagger
  * /employee:
  *  post:
  *   summary: create employee
  *   description: create employee
  *   requestBody:
  *    content:
  *     application/json:
  *      schema:
  *       $ref: '#/definitions/Employee'
  *   responses:
  *    200:
  *     description: employee created succesfully bro
  *    500:
  *     description: couldn't create employee
  */
app.post("/employee", createEmployee);

/**
 * @swagger
 * /team:
 *  post:
 *   summary: create team
 *   description: create team
 *   parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      description: body of the team
 *      schema:
 *       $ref: '#/definitions/Team'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Team'
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description : error
 */
app.post("/team", createTeam);

/**
 * @swagger
 * /employeeassignment:
 *  post:
 *   summary: create employee assignment
 *   description: create employee assignment
 *   parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      description: employee assignment of the team
 *      schema:
 *       $ref: '#/definitions/Employee_Assignment'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Employee_Assignment'
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error
 */
app.post("/employeeassignment", createEmployeeAssignment);

/**
 * @swagger
 * /employees:
 *  get:
 *   summary: get all employees
 *   description: get all employees
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error
 */
app.get("/employees", getAllEmployees);

/**
 * @swagger
 * /teams:
 *  get:
 *   summary: get all teams
 *   description: get all teams
 *   responses:
 *    200:
 *     description: success
 */
app.get("/teams", getAllTeams);

/**
 * @swagger
 * /employee/{employee_id}:
 *  get:
 *   summary: get employee by id
 *   description: get employee by id
 *   parameters:
 *    - in: path
 *      name: employee_id
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of the employee
 *      example: 2
 *   responses:
 *    200:
 *     description: success
 */
app.get("/employees/:id", getEmployee);

/**
 * @swagger
 * /team/{team_id}:
 *  get:
 *   summary: get team
 *   description: get team
 *   parameters:
 *    - in: path
 *      name: team_id
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of the team
 *      example: 2
 *   responses:
 *    200:
 *     description: success
 */
app.get("/teams/:id", getTeam);

/**
 * @swagger
 * /employee/{id}:
 *  put:
 *   summary: update employee
 *   description: update employee
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of the employee
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *       $ref: '#/definitions/Employee'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Employee'
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Team'
 */
app.put("/employee/:id", updateEmployee);

/**
 * @swagger
 * /team/{id}:
 *  put:
 *   summary: update team
 *   description: update team
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of the team
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *       $ref: '#/definitions/Team'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Team'
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Team'
 */
app.put("/team/:id", updateTeam);

/**
 * @swagger
 * /employee/{employee_id}:
 *  delete:
 *   summary: delete employee
 *   description: delete employee
 *   parameters:
 *    - in: path
 *      name: employee_id
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of the employee
 *      example: 2
 *   responses:
 *    200:
 *     description: success
 */
app.delete("/employee/:id", deleteEmployee);

/**
 * @swagger
 * /team/{team_id}:
 *  delete:
 *   summary: delete team
 *   description: delete team
 *   parameters:
 *    - in: path
 *      name: team_id
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of the team
 *      example: 2
 *   responses:
 *    200:
 *     description: success
 */
app.delete("/team/:id", deleteTeam);

/**
 * @swagger
 * /employeeassign/{employee_id}/{team_id}:
 *  delete:
 *   summary: delete employee assignment
 *   description: delete employee assignment
 *   parameters:
 *    - in: path
 *      name: employee_id
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of the employee
 *      example: 12
 *    - in: path
 *      name: team_id
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of the team
 *      example: 12
 *   responses:
 *    200:
 *     description: success
 */
app.delete("/employeeassignment", deleteEmployeeAssignment);

app.listen(PORT, (req, res) => {
  console.log("server listening in port 3000");
});
