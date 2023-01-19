-- Run this to create entire database structure w/ example data

-- Drop it if desired
-- DROP DATABASE [IF EXISTS] rawrs;

CREATE DATABASE [IF NOT EXISTS] rawrs;
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
  course_name VARCHAR(20) NOT NULL
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
