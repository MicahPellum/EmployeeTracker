const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
require('dotenv').config();
const cTable = require('console.table');

const { getDepartments, addDepartment } = require('./src/departmentRequests');
const { isBuffer } = require('util');

//create connection to db
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'empDB'
});

connection.connect(err => {
    if(err) throw err;
    initApp();
});

getTask = () => {
    let questions = [
        {
            type:'list',
            name:'task',
            message: 'Which task would you like to complete?',
            choices: ['View all Departments','View all Roles','View all Employees','Add Department', 'Add Role','Add Employee','Update Employee Role', 'Exit']
        }
    ];

    return inquirer.prompt(questions);
};

async function main () {

getNewObjDetails = (objType) => {
    let questions = [];

    if (objType === 'dept'){
        questions = [{
            type: 'input',
            name: 'deptName',
            message: 'What is the name of the new department?'
        }];
    };
    return inquirer.prompt(questions);
};

 const taskHandler = (task) => {
     if(task === 'View all Departments') {
         connection.query(getDepartments(),function(err, rows){
             if(err) throw err;
             console.table('Departments', rows);
         )};
     connection.end();
 }
    else if(task === 'View all Roles') {
        console.log('the take is to get roles');
    }
    else if(task === 'View all Employees') {
        console.log('the take is to get employees');
    }
    else if(task === 'Add Department') {
        const query = addDepartment();
        getNewObjDetails('dept')
        .then(userInput => {
            connection.query(query,
                {
                    dept_name: userInput.deptName
                },
                function(err, res){
                    if(err) throw err;
                    console.table('A new department has been created. /n Department Name: ${userInput.deptName} /n Department ID: ${res.insertId}');
                    connection.end();
                });

        });
    });
}
    else if(task ==='Add Roll') {
        console.log('the task is to add a role');
    }
    else if(task === 'Add Employee') {
        console.log('the tasks is to add an employee');
    }
    else if(task === "Update Employee Roll") {
        console.log('the task is to update an employees role');
    }
};


afterConnection = () => {
    getTask()
        .then(response => {
            taskHandler(response.task);
        })
        .catch(err => {
            console.log(err);
            connection.end;
        });
    };
