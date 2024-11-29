
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();


// middleware
app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://khalidsaif9080:OZ9dgEQhy9vnbmgK@cluster0.fqi16.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //mongodb database integration
    const database = client.db("userDB");
    const userCollection = database.collection("users");

    // GET - data get kore database theke nie ashbo
    app.get('/users', async (req, res) => {
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // UPDATE(PUT) - Update data from database
    // 1st a data ta pathailm db theke server a.
    app.get('/users/:id', async (req, res) => {
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      const user = await userCollection.findOne(query)
      res.send(user);
    });



    // POST - Establish post connection 
    app.post('/users', async (req, res) => {
        
        const user = req.body; // Correctly access the request body
        console.log('New user', user);

        // Send a response back to the client
        const result = await userCollection.insertOne(user);
        res.send(result);
    });



    // DELETE - Delete data from database
    app.delete('/users/:id',async(req,res)=>{
      const id= req.params.id;
      console.log('please delete from database',id);

      // for single data delete
      const query = {_id : new ObjectId(id)};
      const result= await userCollection.deleteOne(query);
      res.send(result);
    })

    // PUT - Update data from database
    app.put('/users/:id', async(req,res)=>{
      const id = req.params.id;
      const user = req.body;
      console.log(id,user);

      //data backend theke database a set hobe 
      const filter = {_id : new ObjectId(id)};
      const options ={upsert: true};
      const updatedUser = {
        $set: {
          name: user.name,
          email: user.email,
        },
      };
      const result = await userCollection.updateOne(filter, updatedUser, options);
      res.send(result);
      })

    


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Simple CRUD is running..');
});

app.listen(port, () => {
    console.log(`Simple CRUD Server is running on port: ${port}`);
}); 


// Monodb -> usename: khalidsaif9080 password: OZ9dgEQhy9vnbmgK  [khalidsaif9080:OZ9dgEQhy9vnbmgK]