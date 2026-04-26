CREATE DATABASE portfolio_db;

USE portfolio_db;

-- Projects

CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    github VARCHAR(255),
    demo VARCHAR(255),
    image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Skills

CREATE TABLE skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    level INT DEFAULT 80,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(150) UNIQUE,
    password VARCHAR(255),
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Messages

CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(150),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

show tables;

INSERT INTO users (name, email, password)
VALUES (
  'Mayuresh',
  'mayuresh44',
  '$2b$10$iaja619oKN0mtbVO.IrZguHPJW/Ab3YOys5b1Dxc6NEkluVd0HrSO'
);

UPDATE users
SET email = 'mayuresh44@gmail.com'
WHERE id = 1;

select * from projects;
select * from skills;
select * from users;
select * from messages;


