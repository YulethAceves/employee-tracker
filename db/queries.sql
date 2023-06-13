USE employeetracker_db;

SELECT * FROM DEPARTMENT;

SELECT * FROM ROLES;

SELECT * FROM EMPLOYEE;

SELECT e.id, first_name, last_name, r.title, r.salary, d.department_name, e.manager_id FROM 
employee e  left join roles r on role_id = r.id
left join department d on d.id = r.department_id;