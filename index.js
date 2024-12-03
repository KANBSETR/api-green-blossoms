const express = require("express");
const httpProxy = require("http-proxy");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
const proxy = httpProxy.createProxyServer();
const morgan = require('morgan');


app.use(cors());
app.use(morgan('dev'));

//Plantas
app.use("/plantas", (req, res) => {
    proxy.web(req, res, { target: "http://localhost:3001/plantas" });
});

app.use("/agregar-planta", (req, res) => {
    proxy.web(req, res, { target: "http://localhost:3001/agregar-planta" });
});

app.use(
    "/eliminar-planta",
    createProxyMiddleware({
        target: "http://localhost:3001/eliminar-planta",
        changeOrigin: true,
    })
);

app.use(
    "/obtener-planta",
    createProxyMiddleware({
        target: "http://localhost:3001/obtener-planta",
        changeOrigin: true,
    })
);

app.use(
    "/actualizar-planta",
    createProxyMiddleware({
        target: "http://localhost:3001/actualizar-planta",
        changeOrigin: true,
    })
);





//Usuarios
app.use("/usuarios", (req, res) => {
    proxy.web(req, res, { target: "http://localhost:3002/usuarios" });
});

app.use("/agregar-usuario", (req, res) => {
    proxy.web(req, res, { target: "http://localhost:3002/agregar-usuario" });
});

app.use(
    "/eliminar-usuario",
    createProxyMiddleware({
        target: "http://localhost:3002/eliminar-usuario",
        changeOrigin: true,
    })
);

app.use(
    "/obtener-usuario",
    createProxyMiddleware({
        target: "http://localhost:3002/obtener-usuario",
        changeOrigin: true,
    })
);

app.use(
    "/actualizar-usuario",
    createProxyMiddleware({
        target: "http://localhost:3002/actualizar-usuario",
        changeOrigin: true,
    })
);

//Temperatura
app.use("/temperatura", (req, res) => {
    proxy.web(req, res, { target: "http://localhost:3003/temperatura" });
});

app.use("/agregar-temp", (req, res) => {
    proxy.web(req, res, { target: "http://localhost:3003/agregar-temp" });
});

app.use(
    "/eliminar-temp",
    createProxyMiddleware({
        target: "http://localhost:3003/eliminar-temp",
        changeOrigin: true,
    })
);


app.use(
    "/obtener-temp",
    createProxyMiddleware({
        target: "http://localhost:3003/obtener-temp",
        changeOrigin: true,
    })
);

app.use(
    "/actualizar-temp",
    createProxyMiddleware({
        target: "http://localhost:3003/actualizar-temp",
        changeOrigin: true,
    })
);

//Luminosidad
app.use("/luminosidad", (req, res) => {
    proxy.web(req, res, { target: "http://localhost:3004/luminosidad" });
});

app.use("/agregar-lumn", (req, res) => {
    proxy.web(req, res, { target: "http://localhost:3004/agregar-lumn" });
});

app.use(
    "/eliminar-lumn",
    createProxyMiddleware({
        target: "http://localhost:3004/eliminar-lumn",
        changeOrigin: true,
    })
);

app.use(
    "/obtener-lumn",
    createProxyMiddleware({
        target: "http://localhost:3004/obtener-lumn",
        changeOrigin: true,
    })
);

app.use(
    "/actualizar-lumn",
    createProxyMiddleware({
        target: "http://localhost:3004/actualizar-lumn",
        changeOrigin: true,
    })
);


//Humedad
app.use("/humedad", (req, res) => {
    proxy.web(req, res, { target: "http://localhost:3005/humedad" });
});

app.use("/agregar-hum", (req, res) => {
    proxy.web(req, res, { target: "http://localhost:3005/agregar-hum" });
});

app.use(
    "/eliminar-hum",
    createProxyMiddleware({
        target: "http://localhost:3005/eliminar-hum",
        changeOrigin: true,
    })
);

app.use(
    "/obtener-hum",
    createProxyMiddleware({
        target: "http://localhost:3005/obtener-hum",
        changeOrigin: true,
    })
);

app.use(
    "/actualizar-hum",
    createProxyMiddleware({
        target: "http://localhost:3005/actualizar-hum",
        changeOrigin: true,
    })
);

app.listen(3000, () => {
    console.log('API Gateway corriendo en http://localhost:3000');
});
