DROP DATABASE IF EXISTS employeetracker_db;
CREATE DATABASE employeetracker_db;

USE employeetracker_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(100) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) not NULL,
    salary DECIMAL,
    department_id INT REFERENCES deparment(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) not NULL,
    last_name VARCHAR(30) not NULL,
    role_id INT REFERENCES roles(id),
    manager_id  INT NULL REFERENCES employee(id)ON DELETE SET NULL
); 

