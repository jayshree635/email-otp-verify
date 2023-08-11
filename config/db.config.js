const config = require('./config')
const {Sequelize} = require('sequelize')

//database

const sequelize = new Sequelize(config.database.database,config.database.username,config.database.password,{
    dialect : config.database.dialect,
    host : config.database.host
})

try {
    sequelize.authenticate()
    console.log("database connect successfully....");
} catch (error) {
    console.log(error);
}

let db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize

//..................model............
//......user
db.User = require('../model/user/user.model')(sequelize,Sequelize);

// //.......userSession
db.UserSession = require('../model/user/userSession.model')(sequelize,Sequelize);

// //........admin



// //user and userSession
db.User.hasMany(db.UserSession,{foreignKey : 'user_id'});
db.UserSession.belongsTo(db.User,{foreignKey : 'user_id'});



db.sequelize.sync()
module.exports = db