const Sequelize = require("sequelize");

// conexão com o mysql
const sequelize = new Sequelize ('postapp', 'root', 'Ru211482692nl@',{
    host: 'localhost',
    dialect: "mysql",
    query:{raw:true}
})

module.exports ={
    Sequelize :Sequelize,
    sequelize : sequelize
}
