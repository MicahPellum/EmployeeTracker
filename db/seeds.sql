INSERT INTO departments (dept_name) VALUES ('Engineering');
INSERT INTO departments (dept_name) VALUES ('Finance');
INSERT INTO departments (dept_name) VALUES ('Sales');
INSERT INTO departments (dept_name) VALUES ('Legal');

-- Role seeds
INSERT INTO roles (title, salary, department_id) VALUES ('Lead Engineer', 150000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('Software Engineer', 80000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('Accountant', 90000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ('Sales Lead', 80000, 3);
INSERT INTO roles (title, salary, department_id) VALUES ('Salesperson', 60000, 3);
INSERT INTO roles (title, salary, department_id) VALUES ('Lawyer', 175000, 4);

-- Employee seeds
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Bill','Test',1, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Caspian','Pellum', 2, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Harley','Pellum', 2, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Janie','Schaaf', 2, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Paul','Schaaf', 3, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Kevin','Bench', 4, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Madison','Bench', 5, 6);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Diana','Garcia', 5, 6);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Alec','Aguilar', 5, 6);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Madison','Bird', 6, NULL);