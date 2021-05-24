const inquirer = require("inquirer");

async function  getRoles()  {
    console.log('Fetching Roles ...');
    let sql = `SELECT * FROM roles`;

    return sql;
};

async function getNewRoleDetails(departmentArray) {
    let departments = departmentArray.map(department => { return `${department.dept_name} (ID: ${department.id})`});

    let questions = [
        {
            type: 'input',
            name: 'title',
            message: 'What is the name of the new  role? (30 characters or fewer)',
            validate: roleNameInput => {
                if(!roleNameInput){
                    console.log('You must enter a name for the new role');
                    return false;
                } else if (roleNameInput.length > 30) {
                    console.log(`The role name must be fewer than 30 characters. The name you entered has ${roleNameInput.length} characers`);
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this role?',
            validate:  roleSalaryInput => {
                if(isNaN(parseInt(roleSalaryInput))){
                    console.log('You must enter a number value for the role salary');
                    return false;
                } else {
                    return true; 
                }
            }
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'What department will this role belong to?',
            choices: departments
        }
    ];

    return inquirer.prompt(questions);

};

async function addRole(newRoleInput) {
    console.log('Adding Role ...');
    let sql = `INSERT INTO roles SET ?`;
    let department_id = newRoleInput.department_id.split(': ')[1];
    let params = {
        title: newRoleInput.title,
        salary: parseInt(newRoleInput.salary),
        department_id: parseInt(department_id)
    };
    return {
        sql,
        params
    };
};

module.exports = {getRoles, addRole, getNewRoleDetails};