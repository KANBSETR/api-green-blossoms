const { db } = require("../firebase");
const { Timestamp } = require('firebase-admin/firestore');
const { Router } = require("express");
const router = Router();

// Listar todas las humedades
router.get("/humedad", async (req, res) => {
    const querySnapshot = await db.collection('humedad').get();
    const humedades = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); 
    res.json(humedades);
});

// Crear una nueva humedad
router.post("/agregar-hum", async (req, res) => {
    const { valor, fecha_hora } = req.body;
    const fecha = Timestamp.fromDate(new Date(fecha_hora)); 
    await db.collection('humedad').doc().set({
        valor,
        fecha
    });
    res.status(201).json({ message: 'Humedad agregada correctamente' });
});

// Eliminar una humedad
router.delete('/eliminar-hum/:id', async (req, res) => {
    const humId = req.params.id;
    await db.collection('humedad').doc(humId).delete();
    res.status(200).json({ message: 'Humedad eliminada correctamente' });
});

// Obtener una humedad específica
router.get("/obtener-hum/:id", async (req, res) => {
    const doc = await db.collection('humedad').doc(req.params.id).get();
    if (!doc.exists) {
        res.status(404).json({ message: 'Humedad no encontrada' });
    } else {
        res.json({ id: doc.id, ...doc.data() });
    }
});

// Actualizar una humedad
router.post("/actualizar-hum/:id", async (req, res) => {
    const { valor, fecha_hora } = req.body;
    const fecha = Timestamp.fromDate(new Date(fecha_hora));
    const doc = await db.collection('humedad').doc(req.params.id).get();
    if (!doc.exists) {
        return res.status(404).json({ message: 'Humedad no encontrada' });
    }
    await db.collection('humedad').doc(req.params.id).update({
        valor,
        fecha
    });
    res.status(200).json({ message: 'Humedad actualizada correctamente' });
});

module.exports = router;