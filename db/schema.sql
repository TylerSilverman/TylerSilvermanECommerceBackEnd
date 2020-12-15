DROP DATABASE IF EXISTS ecommerce_db;

CREATE DATABASE ecommerce_db;

USE ecommerce_db;

CREATE TABLE category (
    id INT NOT NULL AUTO_INCREMENT,
    category_name VARCHAR(255) NOT NULL, 
    PRIMARY KEY (id)
)

CREATE TABLE product (
    id INT NOT NULL AUTO_INCREMENT,
    product_name INTEGER NOT NULL DEFAULT true,
    price DECIMAL NOT NULL, 
    stock INT NOT NULL DEFAULT 10,
    category_id INT REFERENCES ID,
    PRIMARY KEY (id), 
    FOREIGN KEY (id)
    )

    CREATE TABLE tag (
    id INT NOT NULL AUTO_INCREMENT,
    tag_id INT NOT NULL,
    PRIMARY KEY (id)
)



CREATE TABLE product_tag (
    id INT NOT NULL AUTO_INCREMENT,
    product_id INT REFERENCES ID,
    tag_id INT REFERENCES ID, 
    PRIMARY KEY (id)
)
