const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const tasksRoutes = require('./routes/tasksRoutes')
const hbs = exphbs.create({
    partialsDir:['views/partials']
})


app.use(express.urlencoded({
    extended: true,
})),
app.use(express.json())
app.use(express.static('public'))
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.use('/',tasksRoutes)



app.use((req,res,next)=>{
    res.status(404)
    res.render('404')
})



conn
    .sync()
    .then(()=>{
        app.listen(3000)
    })
    .catch((err)=>{
        console.log('Houve um erro: ', err)
    })