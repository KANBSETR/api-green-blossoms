const { db } = require("../firebase");

const { Router } = require("express");
const router = Router();


//Obtener la humedad
router.get("/humedad", async (req, res) => {
    const querySnapshot = await db.collection('humedad').get();
    const humedad = querySnapshot.docs.map(doc => doc.data());
    //Mandar los datos al front
    res.json(humedad);
});

//Obtener la humedad de una planta
router.get("/obtener-hum/:id", async (req, res) => {
    const doc = await db.collection('humedad').doc(req.params.id).get();
    res.json(doc.data());
});

module.exports = router;