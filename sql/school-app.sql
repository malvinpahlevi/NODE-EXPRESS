create table class
(
    ClassID   int auto_increment
        primary key,
    ClassName varchar(100) null,
    Lecturer  varchar(100) null,
    Subject   varchar(100) null,
    StudentID int          null
);

create table student
(
    StudentID int auto_increment
        primary key,
    FirstName varchar(100) null,
    LastName  varchar(100) null,
    Age       int(2)       null,
    Sex       char(2)      null
);

create definer = root@localhost view v_class_student as
select `cls`.`ClassName` AS `ClassName`, `cls`.`Lecturer` AS `Lecturer`, `s`.`FirstName` AS `FirstName`
from (`school-app`.`class` `cls` join `school-app`.`student` `s` on (`cls`.`StudentID` = `s`.`StudentID`));

create
definer = root@localhost procedure SUBMIT_STUDENT(IN firstName varchar(100), IN lastName varchar(100),
                                                      IN age int(2), IN sex char(2), OUT status varchar(20),
                                                      OUT result varchar(100))
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
BEGIN
ROLLBACK;
##SET status = '99';
        ##SET result = 'Failed'; ##SELECT ('An error occurred. Contact your administrator.') AS 'Warning';
END;

START TRANSACTION;

## DECLARE DEFAULT OUTPUT
    SET status = '00';
    SET result = '';

    ## VALIDATION
    IF firstName = '' OR IFNULL(age, 0) = 0 OR sex = '' THEN
        SET status = '01';
        SET result = 'Invalid, parameter cannot empty!';
END IF;

    ## IS VALID - INSERT
    IF status = '00' THEN
        INSERT INTO student (FirstName, LastName, Age, Sex) VALUES (firstName, lastName, age, sex);

        SET status = '00';
        SET result = 'Submit Success';
END IF;


COMMIT;
END;

