const { db } = require("../firebase");

const { Router } = require("express");
const router = Router();


//Listar las plantas
router.get("/plantas", async (req, res) => {
    const querySnapshot = await db.collection('plantas').get();
    const plantas = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //Mandar los datos al front
    res.json(plantas);
});

//Crear una planta
router.post("/agregar-planta", async (req, res) => {
    const { nombrePlanta, apodo, descripcion, imagen } = req.body;
    await db.collection('plantas').doc().set({
        nombrePlanta,
        apodo,
        descripcion,
        imagen
    });
    res.status(302).json({ message: 'Planta agregada correctamente' });
});


//Eliminar una planta
router.delete('/eliminar-planta/:id', async (req, res) => {
    const plantaId = req.params.id;
    await db.collection('plantas').doc(plantaId).delete();
    res.status(200).json({ message: 'Planta eliminada correctamente' });
});



//Obtener una planta
router.get("/obtener-planta/:id", async (req, res) => {
    const doc = await db.collection('plantas').doc(req.params.id).get();

    res.json({ id: doc.id, ...doc.data() });

});

//Actualizar una planta
router.post("/actualizar-planta/:id", async (req, res) => {
    const { nombrePlanta, apodo, descripcion, imagen } = req.body;
    await db.collection('plantas').doc(req.params.id).update({
        nombrePlanta,
        apodo,
        descripcion,
        imagen
    });
    res.status(200).json({ message: 'Planta actualizada correctamente' });
});


module.exports = router;