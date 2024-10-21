const express = require('express')
const routes = require('./routes/index')
const {genericMiddleware} = require('./middlewares')
const db = require('./models')
const app = express()
const PORT = 3001

app.use(express.json())

app.use(genericMiddleware.requestTime);

app.use('/api/fabricantes',routes.fabricanteRoute)
app.use('/api/productos',routes.productoRoute)
app.use('/api/componentes',routes.componenteRoute)
app.listen(PORT, async ()=>{
    console.log(`Aplicacion iniciada en el puerto ${PORT}`)
    
    db.sequelize.sync({force:true})
})