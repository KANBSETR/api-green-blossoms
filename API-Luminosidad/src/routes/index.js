const { db } = require("../firebase");
const { Timestamp } = require('firebase-admin/firestore');
const { Router } = require("express");
const router = Router();

// Listar todas las luminosidades
router.get("/luminosidad", async (req, res) => {
    const querySnapshot = await db.collection('luminosidad').get();
    const luminosidades = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(luminosidades);
});

// Crear una nueva luminosidad
router.post("/agregar-lumn", async (req, res) => {
    const { valor, fecha_hora } = req.body;
    const fecha = Timestamp.fromDate(new Date(fecha_hora));
    await db.collection('luminosidad').doc().set({
        valor,
        fecha
    });
    res.status(201).json({ message: 'Luminosidad agregada correctamente' });
});

// Eliminar una luminosidad
router.delete('/eliminar-lumn/:id', async (req, res) => {
    const lumnId = req.params.id;
    await db.collection('luminosidad').doc(lumnId).delete();
    res.status(200).json({ message: 'Luminosidad eliminada correctamente' });
});

// Obtener una luminosidad específica
router.get("/obtener-lumn/:id", async (req, res) => {
    const doc = await db.collection('luminosidad').doc(req.params.id).get();
    if (!doc.exists) {
        res.status(404).json({ message: 'Luminosidad no encontrada' });
    } else {
        res.json({ id: doc.id, ...doc.data() });
    }
});

// Actualizar una luminosidad
router.post("/actualizar-lumn/:id", async (req, res) => {
    const { valor, fecha_hora } = req.body;
    const fecha = Timestamp.fromDate(new Date(fecha_hora));
    const doc = await db.collection('luminosidad').doc(req.params.id).get();
    if (!doc.exists) {
        return res.status(404).json({ message: 'Luminosidad no encontrada' });
    }
    await db.collection('luminosidad').doc(req.params.id).update({
        valor,
        fecha
    });
    res.status(200).json({ message: 'Luminosidad actualizada correctamente' });
});

module.exports = router;