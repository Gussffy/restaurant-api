CREATE TABLE IF NOT EXISTS Pratos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao VARCHAR(255) NULL,
  categoria VARCHAR(100) NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  CONSTRAINT chk_preco CHECK (preco >= 0)
);

CREATE TABLE IF NOT EXISTS Clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  telefone VARCHAR(20) NULL,
  senha VARCHAR(255) NOT NULL,
  endereco VARCHAR(255) NULL
);

CREATE TABLE IF NOT EXISTS Pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT NOT NULL,
  data DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status ENUM('Aberto', 'Em_preparacao', 'Pronto', 'Entregue', 'Cancelado') NOT NULL DEFAULT 'Aberto',
  CONSTRAINT fk_pedidos_cliente FOREIGN KEY (cliente_id) REFERENCES Clientes(id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS ItensPedido (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id INT NOT NULL,
  prato_id INT NOT NULL,
  quantidade INT NOT NULL,
  CONSTRAINT chk_quantidade CHECK (quantidade > 0),
  CONSTRAINT fk_itens_pedido FOREIGN KEY (pedido_id) REFERENCES Pedidos(id) ON DELETE CASCADE,
  CONSTRAINT fk_itens_prato FOREIGN KEY (prato_id) REFERENCES Pratos(id) ON DELETE RESTRICT
);

INSERT INTO Pratos (nome, descricao, categoria, preco) VALUES
  ('Pizza Margherita', 'Molho de tomate, mussarela e manjericão', 'Pizza', 39.90),
  ('Pizza Pepperoni', 'Molho de tomate, mussarela e pepperoni', 'Pizza', 45.90),
  ('Hambúrguer Artesanal', 'Pão brioche, blend 180g e cheddar', 'Lanche', 28.50),
  ('Salada Caesar', 'Alface, frango grelhado, parmesão e molho caesar', 'Salada', 32.00),
  ('Refrigerante Lata', 'Refrigerante 350ml', 'Bebida', 6.50);

INSERT INTO Clientes (nome, email, telefone, senha, endereco) VALUES
  ('João Silva', 'joao.silva@email.com', '(11) 99999-0001', 'senha123', 'Rua das Flores, 100 - São Paulo/SP'),
  ('Maria Souza', 'maria.souza@email.com', '(11) 99999-0002', 'senha123', 'Av. Paulista, 200 - São Paulo/SP'),
  ('Carlos Pereira', 'carlos.pereira@email.com', '(11) 99999-0003', 'senha123', NULL);

INSERT INTO Pedidos (cliente_id, data, status) VALUES
  (1, '2026-08-10 12:30:00', 'Entregue'),
  (2, '2026-08-10 13:45:00', 'Em_preparacao'),
  (3, '2026-08-10 14:10:00', 'Aberto');

INSERT INTO ItensPedido (pedido_id, prato_id, quantidade) VALUES
  (1, 1, 2),
  (1, 5, 2),
  (2, 3, 1),
  (2, 5, 1),
  (3, 4, 1);
