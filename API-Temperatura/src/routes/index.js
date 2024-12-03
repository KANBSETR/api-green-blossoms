const { Model } = require("firebase-admin/machine-learning");
const { db } = require("../firebase");
const { Timestamp } = require('firebase-admin/firestore');
const { Router } = require("express");
const router = Router();



// Listar todas las temperaturas
router.get("/temperatura", async (req, res) => {
    const querySnapshot = await db.collection('temperatura').get();
    const temperaturas = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(temperaturas);
});

// Crear una nueva temperatura
router.post("/agregar-temp", async (req, res) => {
    const { valor, fecha_hora } = req.body;
    const fecha = Timestamp.fromDate(new Date(fecha_hora));
    await db.collection('temperatura').doc().set({
        valor,
        fecha
    });
    res.status(201).json({ message: 'Temperatura agregada correctamente' });
});

// Eliminar una temperatura
router.delete('/eliminar-temp/:id', async (req, res) => {
    const tempId = req.params.id;
    await db.collection('temperatura').doc(tempId).delete();
    res.status(200).json({ message: 'Temperatura eliminada correctamente' });
});

// Obtener una temperatura específica
router.get("/obtener-temp/:id", async (req, res) => {
    const doc = await db.collection('temperatura').doc(req.params.id).get();
    if (!doc.exists) {
        res.status(404).json({ message: 'Temperatura no encontrada' });
    } else {
        res.json({ id: doc.id, ...doc.data() }); // Incluye el id en la respuesta
    }
});

// Actualizar una temperatura
router.post("/actualizar-temp/:id", async (req, res) => {
    const { valor, fecha_hora } = req.body;
    const fecha = Timestamp.fromDate(new Date(fecha_hora));
    const doc = await db.collection('temperatura').doc(req.params.id).get();
    if (!doc.exists) {
        return res.status(404).json({ message: 'Temperatura no encontrada' });
    }
    await db.collection('temperatura').doc(req.params.id).update({
        valor,
        fecha
    });
    res.status(200).json({ message: 'Temperatura actualizada correctamente' });
});

module.exports = router;
