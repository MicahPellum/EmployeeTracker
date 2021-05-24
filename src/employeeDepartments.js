const inquirer = require("inquirer");

async function  getEmployees()  {
    console.log('Fetching Employees ...');
    let sql = `SELECT e.id, e.first_name, e.last_name, title, dept_name AS department, salary, CONCAT(m.first_name, ' ', m.last_name) as manager FROM employees e 
    LEFT JOIN roles ON e.role_id = roles.id
    LEFT JOIN departments on roles.department_id = departments.id
    LEFT JOIN employees m on m.id = e.manager_id`;

    return sql;
};

async function getManagers() { 
    console.log('Fetching Managers ...');
    let sql = `SELECT DISTINCT e.manager_id as id, CONCAT(m.first_name, ' ', m.last_name) as name FROM employees e
    LEFT JOIN employees m ON e.manager_id = m.id WHERE e.manager_id IS NOT NULL`;

    return sql;
}

async function getEmpUpdateDetails(updateType, empArray, roleArray) {
    let employees = empArray.map(emp => {
        return {
            name: emp.first_name + ' ' + emp.last_name,
            value: emp.id
        }
    });
    let roles = roleArray.map(role => { 
        return {
            name: role.title,
            value: role.id
        };
    });
    switch(updateType) {
        case 'role' : {
            let questions = [
                
                {
                    type: 'list',
                    name: 'id',
                    message: 'What employee would you like to update?',
                    choices: employees
                },
                {
                            type: 'list',
                            name: 'role_id',
                            message: 'What is the employee\'s new role?',
                            choices: roles
                        }
            ]
            return inquirer.prompt(questions);
            break;
        }
    }
};

async function getNewEmpDetails(roleArray, mgrArray) {
    let roles = roleArray.map(role => { 
        return {
            name: role.title,
            value: role.id
        };
    });
    let mgrs = mgrArray.map(mgr => { 
        if(mgr.id !== 'null'){
            return {
                name: mgr.name,
                value: mgr.id
            };
        }
    });
    let questions = [
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employee\'s first name? (30 characters or fewer)',
            validate: firstNameInput => {
                if(!firstNameInput){
                    console.log('You must enter a first name for the new employee');
                    return false;
                } else if (firstNameInput.length > 30) {
                    console.log(`The first name must be fewer than 30 characters. The name you entered has ${firstNameInput.length} characers`);
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the employee\'s last name? (30 characters or fewer)',
            validate: lastNameInput => {
                if(!lastNameInput){
                    console.log('You must enter a name for the new role');
                    return false;
                } else if (lastNameInput.length > 30) {
                    console.log(`The last name must be fewer than 30 characters. The name you entered has ${lastNameInput.length} characers`);
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'What role will this employee have?',
            choices: roles
        },
        {
            type: 'confirm',
            name: 'has_mgr',
            message: 'Will this employee have a manager?'
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Select the appropriate manager',
            choices: mgrs,
            when:  ({has_mgr}) => {
                if(has_mgr) {
                    return true;
                } 
                else { return false; }
            }
        }
    ];

    return inquirer.prompt(questions);

};

async function addEmployee(newEmpInput) {
    console.log('Adding Role ...');
    let sql = `INSERT INTO employees SET ?`;
    let role_id = newEmpInput.role_id;
    let manager_id = null;
    if(newEmpInput.manager_id){
        manager_id = newEmpInput.manager_id;
        };
    let params = {
        first_name: newEmpInput.first_name,
        last_name: newEmpInput.last_name,
        role_id: role_id,
        manager_id: manager_id
    };
    return {
        sql,
        params
    };
};

async function updateEmployee(updateType, empUpdateInput) {
    console.log('Updating Employee ...');
    let sql = `UPDATE employees SET ? WHERE ?`;
    let params = [];
    switch(updateType){
        case 'role' : {
            params = [
                {
                    role_id: empUpdateInput.role_id
                }, 
                {
                    id: empUpdateInput.id
                }
            ]
            return {
                sql,
                params
            }
            break;
        }
    }

}

module.exports = {getEmployees, addEmployee, getNewEmpDetails, getManagers, updateEmployee, getEmpUpdateDetails};