const { Model } = require("firebase-admin/machine-learning");
const { db } = require("../firebase");

const { Router } = require("express");
const router = Router();


//Obtener la temperatura
router.get("/temperatura", async (req, res) => {
    const querySnapshot = await db.collection('temperatura').get();
    const plantas = querySnapshot.docs.map(doc => doc.data());
    //Mandar los datos al front
    res.json(plantas);
});

//Obtener temperatura de una planta
router.get("/obtener-temp/:id", async (req, res) => {
    const doc = await db.collection('temperatura').doc(req.params.id).get();
    res.json(doc.data());
});

module.exports = router;