USE employeetracker_db;

    INSERT INTO department(department_name) VALUES
    ("Sales"),("IT"),("HR");

    INSERT INTO roles(title,salary,department_id) VALUES 
    ("Sales Manager",29847,1),
    ("IT Manager",192733,2),
    ("HR Manager",32432,3),
    ("Sales representative",12543,1),
    ("Developer",15648,2),
    ("Recluter",22354,3);

--  this is for managers
    INSERT employee(first_name,last_name,role_id) VALUES
    ("Yuleth","Aceves",1),
    ("Maria","Rodriguez",3),
    ("Isaac","Braun",2);

-- this is for people working under mamagers
    INSERT employee(first_name,last_name,role_id,manager_id) VALUES
    ("Ben","Novosel",4,1),
    ("Steve","Smith",5,3),
    ("Tammy","Aceves",6,2);

