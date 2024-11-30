const { db } = require("../firebase");

const { Router } = require("express");
const router = Router();


//Obtener la luminosidad
router.get("/luminosidad", async (req, res) => {
    const querySnapshot = await db.collection('luminosidad').get();
    const luminosidad = querySnapshot.docs.map(doc => doc.data());
    //Mandar los datos al front
    res.json(luminosidad);
});

//Obtener la luminosidad de una planta
router.get("/obtener-lumn/:id", async (req, res) => {
    const doc = await db.collection('luminosidad').doc(req.params.id).get();
    res.json(doc.data());
});

module.exports = router;