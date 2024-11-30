const { Model } = require("firebase-admin/machine-learning");
const { db } = require("../firebase");

const { Router } = require("express");
const router = Router();


//Listar los usuarios
router.get("/usuarios", async (req, res) => {
    const querySnapshot = await db.collection('usuarios').get();
    const usuarios = querySnapshot.docs.map(doc => doc.data());
    //Mandar los datos al front
    res.json(usuarios);
});

//Crear un usuario
router.post("/agregar-usuario", async (req, res) =>{
    const {usuario, correo, contrasena} = req.body;
    await db.collection('usuarios').doc().set({
        usuario,
        correo,
        contrasena
    });
    res.redirect('http://localhost:8100');
});

//Eliminar un usuario
router.get("/eliminar-usuario/:id", async (req, res) => {
    await db.collection('usuarios').doc(req.params.id).delete();
    res.redirect('http://localhost:8100');
});

//Obtener un usuario
router.get("/obtener-usuario/:id", async (req, res) => {
    const doc = await db.collection('usuarios').doc(req.params.id).get();
    res.json(doc.data());
});

//Actualizar un usuario 
router.post("/actualizar-usuario/:id", async (req, res) => {
    const {usuario, correo, contrasena} = req.body;
    await db.collection('usuarios').doc(req.params.id).update({
        usuario,
        correo,
        contrasena
    });
    res.redirect('http://localhost:8100'); //Habría que redirigir a la lista de las usuarios
});

module.exports = router;