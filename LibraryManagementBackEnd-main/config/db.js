const mongoose = require("mongoose")
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zqjxe.mongodb.net/${process.env.DB_DBNAME}?retryWrites=true&w=majority`, (err) => {
    if (err) console.log(err)
    else {
        console.log("Connected to DB")
    }
})

// async function main() {

//     const { MongoClient } = require("mongodb")
//     const uri = "mongodb://localhost:27017/library_management_system"
    
//     const client = new MongoClient(uri)

//     try {
//         await client.connect()
//         await list(client)
//     } catch (err) {
//         console.error(err)
//     } finally {
//         await client.close()
//     }
// }

// main().catch(console.error)

// async function list(client) {
//     const listDB = await client.db().admin().listDatabases();
//     listDB.databases.forEach(db => console.log(db))
// }