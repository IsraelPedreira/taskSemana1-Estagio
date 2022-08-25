const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodemysql2', 'root','israel',{
    host:'localhost',
    dialect:'mysql',
})

try{
    sequelize.authenticate()
    console.log('Conectado ao MySQL')
}catch(error){
    console.log("Houve um erro ao connectar ", error )
}

module.exports = sequelize