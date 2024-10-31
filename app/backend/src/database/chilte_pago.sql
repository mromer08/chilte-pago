CREATE DATABASE IF NOT EXISTS chiltepago;
USE chiltepago;

CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    balance DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    status ENUM('ACTIVO', 'BANEADO', 'ELIMINADO') NOT NULL DEFAULT 'ACTIVO',
    role_id INT NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS tokens (
    id INT AUTO_INCREMENT,
    validated_at DATETIME,
    token_string VARCHAR(255) NOT NULL,
    code INT,
    user_id INT NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS companies (
    code VARCHAR(255),
    secret_key VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    status ENUM('ELIMINADO', 'ACTIVO', 'SUSPENDIDO') NOT NULL DEFAULT 'ACTIVO',
    user_id INT,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    PRIMARY KEY (code),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS payment_methods (
    id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    type ENUM('credit_card', 'bank_account') NOT NULL,
    last_four VARCHAR(4),
    card_number VARCHAR(255) NOT NULL,
    pin VARCHAR(255) NOT NULL,
    status ENUM('VALIDA', 'BLOQUEADA', 'ELIMINADO') NOT NULL DEFAULT 'VALIDA',
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS fund_movements (
    id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    payment_method_id INT NOT NULL,
    type ENUM('INGRESO', 'EGRESO') NOT NULL,
    status ENUM('PROCESADA', 'FALLIDA') NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    commission_amount DECIMAL(10,2) NOT NULL,
    net_amount DECIMAL(10,2) NOT NULL,
    description VARCHAR(255),
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (payment_method_id) REFERENCES payment_methods (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS error_logs (
    id INT AUTO_INCREMENT,
    error_message VARCHAR(255) NOT NULL,
    fund_movement_id INT NOT NULL,
    resolved TINYINT(1) DEFAULT 0,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (fund_movement_id) REFERENCES fund_movements (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;


INSERT INTO roles (id, name, created_at, updated_at) values (2000, "CLIENTE", now(), now());
INSERT INTO roles (id, name, created_at, updated_at) values (1001, "ADMIN", now(), now());
-- INSERT INTO roles (id, name, created_at, updated_at) values (1002, "EMPRESA", now(), now());


INSERT INTO users (email, firstname, lastname, password, status, role_id, created_at, updated_at)
VALUES 
    ('tienda@seminarioShop.com', 'Tienda', 'Apellido1', '$2b$10$OwRmT1lyqKLxdv9fN6Va/OV2JaELi/jR6P1vgj5sWV0klwiI4fsxy', 'ACTIVO', 2000, NOW(), NOW()), -- Cliente 1
    ('cliente2@seminarioShop.com', 'Cliente2', 'Apellido2', '$2b$10$OwRmT1lyqKLxdv9fN6Va/OV2JaELi/jR6P1vgj5sWV0klwiI4fsxy', 'ACTIVO', 2000, NOW(), NOW()), -- Cliente 2
    ('admin@chiltepago.com', 'Admin', 'Supremo', '$2b$10$OwRmT1lyqKLxdv9fN6Va/OV2JaELi/jR6P1vgj5sWV0klwiI4fsxy', 'ACTIVO', 1001, NOW(), NOW()); -- Administrador

INSERT INTO companies (code, secret_key, name, status, user_id, created_at, updated_at)
VALUES ('TE1234', '1234', 'seminarioShop', 'ACTIVO', 1, NOW(), NOW());

INSERT INTO payment_methods (user_id, type, last_four, card_number, pin, status, created_at, updated_at)
VALUES 
    -- Métodos de pago para Cliente 1
    (1, 'credit_card', '3333', '4333333333333333', '1234', 'VALIDA', NOW(), NOW()),
    (2, 'credit_card', '4444', '4444444444444444', '1234', 'VALIDA', NOW(), NOW()),
    -- Opcionales: métodos de pago de tipo cuenta bancaria
    (2, 'bank_account', NULL, '1234567890', '0000', 'VALIDA', NOW(), NOW()),
    (1, 'bank_account', NULL, '0987654321', '0000', 'VALIDA', NOW(), NOW());
