const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
require('dotenv').config()

const port = process.env.PORT || 5000


// middlewhare
app.use(cors())
app.use(express.json())


// const uri = "mongodb+srv://jobTask3:QTe9wpngM4Os6czB@cluster0.c9cdy8c.mongodb.net/?retryWrites=true&w=majority";
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.c9cdy8c.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();

        const userCollection = client.db("todoDashboard").collection("userData");

        // Get All Data
        app.get('/allUser', async (req, res) => {
            const result = await userCollection.find().toArray()
            res.send(result)
        })

        // Get A Single User Data
        app.get('/allUser/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { id: ObjectId(id)}
            const result = await userCollection.findOne(filter)
            res.send(result)
        })

        // Post Data
        app.post('/addUser', async (req, res) => {
            const data = req.body
            const result = userCollection.insertOne(data)
            res.send(result)
        })

        // Delete api
        app.delete('/allUser/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await userCollection.deleteOne(query)
            res.send(result)
        })


        // update user
        app.put('/user/:id', async (req, res) => {
            const id = req.params.id
            console.log(id)
            const data = req.body
            console.log(data)
            const query = { _id: ObjectId(id) }
            const upsert = { upsert: true }
            const updateDoc = {
                $set: data
            }
            const result = await userCollection.updateOne(query, updateDoc, upsert)
            res.send(result)
        })

    }

    finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello From !')
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
