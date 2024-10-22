const express = require('express')
const { fabricanteRoute, productoRoute, componenteRoute } = require('./routes/index');
const genericMiddleware = require('./middlewares/generic.middleware')
const db = require('./models')
const app = express()
const PORT = 3001

app.use(express.json());

app.use(genericMiddleware.requestTime());

app.use(fabricanteRoute)
app.use(productoRoute)
app.use(componenteRoute)
app.listen(PORT, async ()=>{
    console.log(`Aplicacion iniciada en el puerto ${PORT}`)
    
    //db.sequelize.sync({force:true})
})