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
    balance DECIMAL(10, 2) DEFAULT 0,
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

CREATE TABLE IF NOT EXISTS applications (
    id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    client_id VARCHAR(255) NOT NULL UNIQUE,
    secret_key VARCHAR(255) NOT NULL,
    status ENUM('ELIMINADO', 'ACTIVO', 'SUSPENDIDO') NOT NULL DEFAULT 'ACTIVO',
    payment_method_id INT,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS payment_methods (
    id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    type ENUM('credit_card', 'bank_account') NOT NULL,
    last_four VARCHAR(4),
    card_number VARCHAR(255) NOT NULL,
    pin VARCHAR(255) NOT NULL,
    status ENUM('VALIDA', 'INVALIDA', 'ELIMINADO') NOT NULL DEFAULT 'VALIDA',
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT,
    user_id INT,
    application_id INT NOT NULL,
    payment_method_id INT,
    description VARCHAR(255),
    amount DECIMAL(10, 2) NOT NULL,
    status ENUM('CREADO', 'CONFIRMADO', 'AUTORIZADO') NOT NULL DEFAULT 'CREADO',
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (application_id) REFERENCES applications (id) ON DELETE NO ACTION ON UPDATE CASCADE,
    FOREIGN KEY (payment_method_id) REFERENCES payment_methods (id) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS error_logs (
    id INT AUTO_INCREMENT,
    error_message VARCHAR(255) NOT NULL,
    order_id INT,
    type VARCHAR(255) NOT NULL,
    resolved TINYINT(1) DEFAULT false,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS fund_movements (
    id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    payment_method_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    commission_amount DECIMAL(10, 2) NOT NULL,
    net_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (payment_method_id) REFERENCES payment_methods (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

INSERT INTO roles (id, name, created_at, updated_at) values (2000, "CLIENTE", now(), now());
INSERT INTO roles (id, name, created_at, updated_at) values (1001, "ADMIN", now(), now());
