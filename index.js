const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
require('dotenv').config();
const cTable = require('console.table');

const { getDepartments, addDepartment } = require('./src/departmentRequests');
const { getRoles, addRole, getNewRoleDetails } = require('.src/roleRequests');
const { getEmployees, addEmployee, updateEmployee, getNewEmpDetails, getManagers, getEmpUpdateDetails } = require('./src/employeeRequests');

async function getTask() {
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



//create connection to db
const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'empDB'
});
console.log('Connected');

//create loop marker
let exitTracker = false;

    while (!exitTracker) {
    const prompt = await getTask();

    switch(prompt.task) {
        case 'View all Departments':{
            let sql = await getDepartments();
            const [rows, fields]= await connection.query(sql);
            console.table('Departments, rows');
            break;
        }
        case 'View all Roles': {
            let sql = await getRoles();
            const [rows, fields] = await connection.query(sql);
            console.table('Roles', rows);
            break;
        }
        case 'View all Employees': {
            let sql = await getEmployees();
            const [rows, fields] = await connection.query(sql);
            console.table('Employees', rows);
            break;
        }
        case "Add Department" :{
            const newDeptInput = await getNewDepartmentDetails();
            const addDept = await addDepartment(newDeptInput);
            const [newDept] = await connection.query(addDept.sql, addDept.params);
            console.log('Department ${addDept.params.dept_name} (ID:${newDept.insertId}) has been added');
            break;
        }
        case 'Add Role' : {
            let sql1: await getDepartments();
            const [depts, fields] = await connection.query(sql1);
            const newRoleInput = await getNewRoleDetails(depts);
            const addNewRole = await addRole(newRoleInput);
            const [newRole] = await connection.query(addNewRole.sql, addNewRole.params);
            console.log('Role ${addNewRole.params.title} (ID:${newRole.insertId}) has been added');
            break;
            }
    case 'Add Employee' : {
        let sql1 = await getRoles();
        const [roles, fields] = await connection.query(sql1);
        let sql2 = await getManagers();
        const [mgrs, mgrFields] = await connection.query(sql2);
        const newEmpInput = await getNewEmpDetails(roles, mrgs);
        const addEmp = await addEmployee(newEmpInput);
        const [newEmp] = await connection.query(addEmp.sql, addEmp.params);
        console.log('Employee ${addEmp.params.first_name} ${addEmp.params.last_name} (ID:${newEmp.insertID}) has been added');
        break;
        }

        case 'Update Employee Role' : {
            let sql1 = await getRoles();
            const [roles, fields] = await connection.query(sql1);
            let sql2 = await getEmployees();
            const [employees, empfields] = await connection.query(sql2);
            const updateEmpInput = await getEmpUpdateDetails('role', employees, roles);
            const updateEmp = await updateEmployee('role', updateEmpInput);
            const [updatedEmp] = await connection.query(updateEmp.sql, updateEmp.params);
            console.log(`Employee\'s Role has been updated!`);
            break;
        }

        case 'Exit' :{
            exitTracker = true;
            connection.end();
            break;
        }
    }
}

};

connection.connect(err => {
    if(err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    initApp();
});



getNewObjDetails = (objType) => {
    let questions = [];

    if (objType === 'dept'){
        questions = [{
            type: 'input',
            name: 'deptName',
            message: 'What is the name of the new department?'
        }
        // }];
    });
    return inquirer.prompt(questions);
};

 const taskHandler = (task) => {
     if(task === 'View all Departments') {
         connection.query(getDepartments(),function(err, rows){
             if(err) throw err;
             console.table('Departments', rows);
         };
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
    };
};
    else if(task ==='Add Roll') {
        console.log('the task is to add a role');
    }
    else if(task === 'Add Employee') {
        console.log('the tasks is to add an employee');
    }
    else if(task === "Update Employee Roll") {
        console.log('the task is to update an employees role');
    }
});


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
