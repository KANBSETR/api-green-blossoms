const { Model } = require("firebase-admin/machine-learning");
const { db } = require("../firebase");

const { Router } = require("express");
const router = Router();


//Listar las plantas
router.get("/plantas", async (req, res) => {
    const querySnapshot = await db.collection('plantas').get();
    const plantas = querySnapshot.docs.map(doc => doc.data());
    console.log(plantas);
    //Mandar los datos al front
    res.json(plantas);
});

//Crear una planta
router.post("/agregar-planta", async (req, res) =>{
    const {nombrePlanta, apodo, descripcion, imagen} = req.body;
    await db.collection('plantas').doc().set({
        nombrePlanta,
        apodo,
        descripcion,
        imagen
    });
    res.redirect('http://localhost:8100'); //Habría que redirigir a la lista de las plantas
});

//Eliminar una planta
router.get("/eliminar-planta/:id", async (req, res) => {
    await db.collection('plantas').doc(req.params.id).delete();
    res.redirect('http://localhost:8100'); //Habría que redirigir a la lista de las plantas
});

//Obtener una planta
router.get("/obtener-planta/:id", async (req, res) => {
    const doc = await db.collection('plantas').doc(req.params.id).get();
    res.json(doc.data());
});

//Actualizar una planta
router.post("/actualizar-planta/:id", async (req, res) => {
    const {nombrePlanta, apodo, descripcion, imagen} = req.body;
    await db.collection('plantas').doc(req.params.id).update({
        nombrePlanta,
        apodo,
        descripcion,
        imagen
    });
    res.redirect('http://localhost:8100'); //Habría que redirigir a la lista de las plantas
});

module.exports = router;