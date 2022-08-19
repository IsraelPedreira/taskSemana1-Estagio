const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mysql = require('mysql2')
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


app.get('/tasks/remove/:id',(req,res)=>{
    const id = req.params.id
    const sql = `DELETE FROM ?? WHERE id=?`
    const data = ['tasks', id]
    conn.query(sql,data,(err,data)=>{
        if(err){
            console.log(err)
        }
    })
        res.redirect('/')

})


app.post('/tasks/insert',(req,res)=>{
    const tarefa = req.body.tarefa
    const sql = `INSERT INTO ?? (??) VALUES(?)`
    const data =['tasks','tasks', tarefa]
    conn.query(sql,data,(err)=>{
        if(err){
            console.log(err)
            return
        }
        res.redirect('/')
    })
    
})


app.post('/tasks/edit',(req,res)=>{
    const id = req.body.id
    const task = req.body.editTask
    const sql = `UPDATE ?? SET ?? =? WHERE id=?`
    const data = ['tasks','tasks', task , id]
    conn.query(sql ,data, (err,data)=>{
        if(err){
            console.log(err)
            return
        }
        res.redirect('/')
    })
    
})

app.get('/tasks/edit/:id',(req,res)=>{
    const id = req.params.id
    const sql = `SELECT * FROM ?? WHERE ID = ?`
    const data = ['tasks', id]
    conn.query(sql,data,(err,data)=>{
        if(err){
            console.log(err)
            return
        }
        const tasks = data[0]
        
        res.render('editTask',{tasks})

    })
    
})


app.get('/',(req,res)=>{
    const sql = `SELECT * FROM tasks`

    conn.query(sql,(err, data)=>{
        if(err){
            console.log(err)
            return
        }
        const tasks = data
        const id = tasks.id
        res.render('home',{tasks,id })
        
    })
    
})

app.use((req,res,next)=>{
    res.status(404)
    res.render('404')
})

const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'israel',
    database:'nodemysql'
})

conn.connect((err)=>{
    if(err){
        console.log(err)
    }
    console.log('Concetou ao mysql')
    app.listen(3000)
})