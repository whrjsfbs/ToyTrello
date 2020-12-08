const mongoClient = require('mongodb').MongoClient
const client = new mongoClient(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

let mongoDB;

client.connect()
.then((db) => {
    var dbo = db.db("myDB");
    dbo.createCollection("users", function(err, res) {
    if (err) {
        switch (err.code) {
        case 48:
            console.log("users Collection Already Exist")  
            break;
        default:
            throw err;
        }
    }
    });
    mongoDB = db;
})
.catch((err) => {
    throw err;
})

module.exports = {
    getDB: function() {
        return mongoDB;
    }
}