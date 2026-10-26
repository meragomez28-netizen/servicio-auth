// Servicio web de registro e inicio de sesión
const express = require("express");
const app = express();

// Permite recibir datos en formato JSON
app.use(express.json());

// "Base de datos" en memoria (lista de usuarios)
const usuarios = [];

// ---------- REGISTRO ----------
app.post("/registro", (req, res) => {
  const { usuario, contrasena } = req.body;

  // Validación: campos obligatorios
  if (!usuario || !contrasena) {
    return res.status(400).json({ mensaje: "Usuario y contraseña son obligatorios" });
  }

  // Validación: el usuario no debe existir
  if (usuarios.find((u) => u.usuario === usuario)) {
    return res.status(409).json({ mensaje: "El usuario ya existe" });
  }

  // Guardar el nuevo usuario
  usuarios.push({ usuario, contrasena });
  res.status(201).json({ mensaje: "Usuario registrado correctamente" });
});

// ---------- INICIO DE SESIÓN ----------
app.post("/login", (req, res) => {
  const { usuario, contrasena } = req.body;

  // Buscar un usuario que coincida con las credenciales
  const encontrado = usuarios.find(
    (u) => u.usuario === usuario && u.contrasena === contrasena
  );

  if (encontrado) {
    // Autenticación correcta
    return res.status(200).json({ mensaje: "Autenticación satisfactoria" });
  }

  // Autenticación incorrecta
  res.status(401).json({ mensaje: "Error en la autenticación" });
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => console.log("Servicio activo en http://localhost:3000"));
