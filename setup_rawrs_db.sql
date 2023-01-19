-- Run this to create entire database structure w/ example data

-- Drop it if desired
-- DROP DATABASE [IF EXISTS] rawrs;

DROP DATABASE IF EXISTS rawrs;
CREATE DATABASE  rawrs;
USE rawrs;

CREATE TABLE user(
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  role CHAR(10),
  email VARCHAR(320) NOT NULL
);

CREATE TABLE course(
  course_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  course_name VARCHAR(50) NOT NULL -- Made this string longer
);

CREATE TABLE professor_course(
  course_id INT NOT NULL,
  professor_id INT NOT NULL,
  PRIMARY KEY (course_id, professor_id)
);

CREATE TABLE student(
  student_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(35) NOT NULL,
  last_name VARCHAR(35) NOT NULL,
  email VARCHAR(320) NOT NULL
);

CREATE TABLE student_course(
  course_id INT NOT NULL,
  student_id INT NOT NULL,
  PRIMARY KEY (course_id, student_id)
);

CREATE TABLE login(
	login_id INT NOT NULL PRIMARY KEY,    
    student_id INT NOT NULL,
    login_timestamp TIMESTAMP NOT NULL,
    FOREIGN KEY (student_id) REFERENCES student(student_id)
);

CREATE TABLE acquisition(
	acquisition_id INT NOT NULL PRIMARY KEY,
    acquisition_start_timestamp TIMESTAMP NOT NULL,
    acquisition_finished_timestamp TIMESTAMP NOT NULL,
    acqusition_status VARCHAR(10) NOT NULL,
    resource_file_name VARCHAR(256),
    resource_file_ext VARCHAR(10),
    resource_url VARCHAR(2048),
    resource_http_code INT
);

INSERT INTO user VALUES(1, "Ben O. Verbich", "Please", "prof", "bigben@hotmail.com");
INSERT INTO user VALUES(2, "Adolf Oliver Nipple", "Both", "prof", "olfnip@gmail.com");
INSERT INTO user VALUES(3, "Phil Mahoochie", "Please", "admin", "philmaplease@bullhornmail.com");
INSERT INTO user VALUES(4, "Long Henry", "4.53 Inches", "prof", "longerthanu@hotmail.com");
INSERT INTO user VALUES(5, "Craven Moorehead", "ravenhead", "prof", "moorehead@hotmail.com");
INSERT INTO user VALUES(6, "Dang Lin-Wang", "airtimer", "prof", "airtime@hotmail.com");
INSERT INTO user VALUES(7, "E. Norma Scock", "scock", "prof", "scock@hotmail.com");
INSERT INTO user VALUES(8, "Ben N. Syder", "mhm", "prof", "nsyder@hotmail.com");

INSERT INTO course VALUES(1, "Introduction to Database Modeling");
INSERT INTO course VALUES(2, "Personality Psychology");
INSERT INTO course VALUES(3, "Abnormal Psychology");
INSERT INTO course VALUES(4, "Developmental Psychology");
INSERT INTO course VALUES(5, "Psychology 101");
INSERT INTO course VALUES(6, "Senior Capstone Project 1");
INSERT INTO course VALUES(7, "Senior Capstone Project 2");

INSERT INTO student VALUES(1, "Harry", "Azcrac", "azcrac@gmail.com");
INSERT INTO student VALUES(2, "Mike", "Rotchburns", "burninrotch@hotmail.com");
INSERT INTO student VALUES(3, "Peter", "Pantz", "peterinpantz@gmail.com");
INSERT INTO student VALUES(4, "Oliver", "Closeoff", "oliveroff@gmail.com");
INSERT INTO student VALUES(5, "Kenny", "Dewitt", "dewittin@gmail.com");
INSERT INTO student VALUES(6, "Ivana", "Tinkle", "ivanaTinkle@hotmail.com");
INSERT INTO student VALUES(7, "Harry", "Cox", "harcox@gmail.com");
INSERT INTO student VALUES(8, "Eaton", "Beaver", "beaver@hotmail.com");

INSERT INTO professor_course VALUES(1, 1);
INSERT INTO professor_course VALUES(2, 1);
INSERT INTO professor_course VALUES(3, 1);
INSERT INTO professor_course VALUES(4, 2);
INSERT INTO professor_course VALUES(5, 2);
INSERT INTO professor_course VALUES(6, 2);
INSERT INTO professor_course VALUES(7, 3);

INSERT INTO student_course VALUES(1,1);
INSERT INTO student_course VALUES(1,2);
INSERT INTO student_course VALUES(1,3);
INSERT INTO student_course VALUES(1,4);
INSERT INTO student_course VALUES(2,1);
INSERT INTO student_course VALUES(2,2);
INSERT INTO student_course VALUES(2,3);
INSERT INTO student_course VALUES(2,4);
INSERT INTO student_course VALUES(3,1);
INSERT INTO student_course VALUES(3,2);
INSERT INTO student_course VALUES(3,3);
INSERT INTO student_course VALUES(3,4);
INSERT INTO student_course VALUES(4,5);
INSERT INTO student_course VALUES(4,6);
INSERT INTO student_course VALUES(4,7);
INSERT INTO student_course VALUES(5,5);
INSERT INTO student_course VALUES(5,6);
INSERT INTO student_course VALUES(5,7);
INSERT INTO student_course VALUES(6,5);
INSERT INTO student_course VALUES(6,6);
INSERT INTO student_course VALUES(6,7);

-- Would be good to have some different values for timestamp
INSERT INTO login VALUES(1, 1, CURRENT_TIMESTAMP());
INSERT INTO login VALUES(2, 1, CURRENT_TIMESTAMP());
INSERT INTO login VALUES(3, 2, CURRENT_TIMESTAMP());
INSERT INTO login VALUES(4, 3, CURRENT_TIMESTAMP());
INSERT INTO login VALUES(5, 4, CURRENT_TIMESTAMP());
INSERT INTO login VALUES(6, 5, CURRENT_TIMESTAMP());

INSERT INTO acquisition VALUES(1, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), "?", "barely_legal", ".mp4", "http://rit.president.munson.com/hidden_hobbies?resolution=4k", 404);
INSERT INTO acquisition VALUES(2, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), "?", "", "", "", 404);
INSERT INTO acquisition VALUES(3, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), "?", "uncle_tony", ".png", "https://rit.edu/~cjc7342/assets", 500);
INSERT INTO acquisition VALUES(4, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), "?", "", "", "", 503);
INSERT INTO acquisition VALUES(5, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), "?", "", "", "", 69);

-- acquisition_id INT NOT NULL PRIMARY KEY,
-- acquisition_start_timestamp TIMESTAMP NOT NULL,
-- acquisition_finished_timestamp TIMESTAMP NOT NULL,
-- acqusition_status VARCHAR(10) NOT NULL,
-- resource_file_name VARCHAR(256),
-- resource_file_ext VARCHAR(10),
-- resource_url VARCHAR(2048),
-- resource_http_code INT


