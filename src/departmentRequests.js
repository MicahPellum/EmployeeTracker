getDepartments = () => {
    console.log('Fetching departments...');
    let query = 'SELECT * FROM departments';
    return query;
};

addDepartment = () => {
    console.log('Adding department...');
    let query = 'INSERT INTO departments SET ?';
    return query;
};

module.exports = {getDepartments, addDepartment};