const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');



require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middlewares

app.use(cors());
app.use(express.json());

// productPulse
// 9zkcP5Iai6TnKEmV




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ikmm0oq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // await client.connect();


    const userCollection = client.db("productPulseDB").collection("users");
    const productCollection = client.db("productPulseDB").collection("products");
    const reviewCollection = client.db("productPulseDB").collection("reviews");
    const sellCollection = client.db("productPulseDB").collection("sold");


     // Get data

    // Users

    app.get("/users", async (req, res) => {
        const cursor = userCollection.find();
        const result = await cursor.toArray();
        res.send(result);
      });

      app.get('/users/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) }
        const result = await userCollection.findOne(query)
        res.send(result);
    });

    // products

    
    app.get("/products", async (req, res) => {
      const cursor = productCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });


    app.get('/products/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await productCollection.findOne(query)
      res.send(result);
  });

  // Reviews

  app.get("/reviews", async (req, res) => {
    const cursor = reviewCollection.find();
    const result = await cursor.toArray();
    res.send(result);
  });

  app.get('/reviews/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await reviewCollection.findOne(query)
    res.send(result);
});

// Sold

app.get("/sold", async (req, res) => {
  const cursor = sellCollection.find();
  const result = await cursor.toArray();
  res.send(result);
});

app.get('/sold/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) }
  const result = await sellCollection.findOne(query)
  res.send(result);
});


      // Post Data

    // Users

    app.post("/users", async(req, res) => {
        const user = req.body;
        const result = await userCollection.insertOne(user);
        res.send(result);
      });


      // reviews

      app.post("/reviews", async(req, res) => {
        const addedReview = req.body;
        const result = await reviewCollection.insertOne(addedReview);
        res.send(result);
      });

      // sold

      app.post("/sold", async(req, res) => {
        const myProduct = req.body;
        const result = await sellCollection.insertOne(myProduct);
        res.send(result);
      });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get("/", (req, res) => {
    res.send("Product Pulse server is running");
  });
  
  app.listen(port, () => {
    console.log(`Product Pulse server is running on port ${port}`);
  });
