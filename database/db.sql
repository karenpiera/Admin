CREATE TABLE product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_estreno DATE,
    estrellas INT,
    genero VARCHAR(255),
    precio_alquiler DECIMAL(10, 2),
    atp BOOLEAN,
    estado VARCHAR(2)
);