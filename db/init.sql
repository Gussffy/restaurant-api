CREATE DATABASE IF NOT EXISTS dev_api;
USE dev_api;

CREATE TABLE IF NOT EXISTS Clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  idade INT NOT NULL,
  UF CHAR(2) NOT NULL
);

INSERT INTO Clientes (nome, idade, UF) VALUES
  ('João Silva', 30, 'SP'),
  ('Maria Souza', 25, 'RJ'),
  ('Carlos Pereira', 40, 'MG');