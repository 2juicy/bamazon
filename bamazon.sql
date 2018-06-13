DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(30) NULL,
  department_name VARCHAR(10) NULL,
  price DECIMAL(10,2) NULL,
  quantity INTEGER(10),
  PRIMARY KEY (id)
);
INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("INSURGENCY: SANDSTORM", "GAMING", 24.29, 155);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("SUPER BOMBERMAN R", "GAMING", 35.99, 244);

INSERT INTO products(product_name, department_name, price, quantity)
VALUES ("NBA 2K19", "GAMING", 53.99, 77);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("EVE ONLINE: METEOR PACK", "GAMING", 6.74, 333);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("VAMPYR", "GAMING", 44.99, 11);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("BUS SIMULATOR 18", "GAMING", 31.49, 998);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("DEAD CELLS", "GAMING", 17.99, 18);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("LORDS OF THE FALLEN - GAME OF THE YEAR EDITION", "GAMING", 4.31, 543);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("HUMAN: FALL FLAT", "GAMING", 6.74, 21);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("SERIAL CLEANER", "GAMING", 5.39, 217);

