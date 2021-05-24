const inquirer = require("inquirer");


async function getDepartments() {
    console.log('Fetching departments...');
    let sql = 'SELECT * FROM departments';
    return sql;
};

async function getNewDepartmentDetails() {
    let questions = [{
        type: 'input',
        name: 'dept_name',
        message: 'What is the name of the new department? (30 characters or fewer)',
        validate: deptNameInput => {
            if(!deptNameInput){
                console.log('You must enter a name for the new department');
                return false;
            } else if (deptNameInput.length > 30) {
                console.log(`The department name must be fewer than 30 characters. The name you entered has ${deptNameInput.length} characers`);
                return false;
            } else {
                return true;
            }
        }
    }];

    return inquirer.prompt(questions);

};

async function addDepartment(deptName) {
    console.log('Adding department ...');
    let sql = `INSERT INTO departments SET ?`;
    let params = deptName;
    return {
        sql,
        params
    };
};

module.exports = {getDepartments, addDepartment, getNewDepartmentDetails};