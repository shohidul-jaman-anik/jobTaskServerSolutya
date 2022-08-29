

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
const uri = "mongodb+srv://jobTask3:QTe9wpngM4Os6czB@cluster0.c9cdy8c.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();

        const userCollection = client.db("todoDashboard").collection("userData");
        
      app.get('/allUser',async(req,res)=>{
        const result = await userCollection.find().toArray()
         res.send(result)
      })
app.post('/addUser',async(req,res)=>{
    const data =req.body
    const result = userCollection.insertOne(data)
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
