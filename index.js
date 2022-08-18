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
    const sql = `DELETE FROM tasks WHERE id=${id}`
    conn.query(sql,(err,data)=>{
        if(err){
            console.log(err)
        }
    })
        res.redirect('/')

})


app.post('/tasks/insert',(req,res)=>{
    const tarefa = req.body.tarefa
    const sql = `INSERT INTO tasks (tasks) VALUES('${tarefa}')`
    conn.query(sql,(err)=>{
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
    const sql = `UPDATE tasks SET tasks ='${task}' WHERE id=${id}`
    conn.query(sql , (err,data)=>{
        if(err){
            console.log(err)
            return
        }
        res.redirect('/')
    })
    
})

app.get('/tasks/edit/:id',(req,res)=>{
    const id = req.params.id
    
    const sql = `SELECT * FROM tasks WHERE ID = ${id}`
    conn.query(sql,(err,data)=>{
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