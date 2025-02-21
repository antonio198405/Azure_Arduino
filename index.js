const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Permite que la web acceda a la API

// Estado de los relés
let estadosRele = { R1: 0, R2: 0, R3: 0, R4: 0 };

// 🔹 Endpoint para recibir comandos desde la web y enviarlos a Arduino
app.post("/control", (req, res) => {
    const { rele, estado } = req.body;
    if (estadosRele.hasOwnProperty(rele)) {
        estadosRele[rele] = estado;
        return res.json({ mensaje: `Relé ${rele} cambiado a ${estado}` });
    }
    return res.status(400).json({ error: "Rele inválido" });
});

// 🔹 Endpoint para obtener el estado de los relés
app.get("/estados", (req, res) => {
    res.json(estadosRele);
});

// 🔹 Servir archivos estáticos (frontend)
app.use(express.static("public"));

// 🔹 Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🌍 Servidor corriendo en puerto ${PORT}`));
