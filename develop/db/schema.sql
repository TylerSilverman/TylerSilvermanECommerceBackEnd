-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;


DROP DATABASE IF EXISTS ecommerce_db;

CREATE DATABASE ecommerce_db;

USE ecommerce_db;

CREATE TABLE category (
    id INT NOT NULL AUTO_INCREMENT,
    category_name VARCHAR(50) NOT NULL, 
    PRIMARY KEY (id)
)

CREATE TABLE Product (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    price DECIMAL NOT NULL, 
    stock INT NOT NULL SET DEFAULT 10,
    category_id INT REFERENCE id,
    PRIMARY KEY (id)
)

CREATE TABLE ProductTag (
    id INT NOT NULL AUTO_INCREMENT,
    product_id INT 
    tag_name VARCHAR(50) NOT NULL, 
    PRIMARY KEY (id)
)

CREATE TABLE Tag (
    id INT NOT NULL AUTO_INCREMENT,
    tag_id NOT NULL,
    PRIMARY KEY (id)

)

