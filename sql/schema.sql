DROP DATABASE IF EXISTS burgers_db;
CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    burger_name VARCHAR(300) NOT NULL,
    devoured BOOLEAN NOT NULL,
    image_url VARCHAR(500) NOT NULL
);