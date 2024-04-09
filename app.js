const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;


const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);


app.get('/blogs', async (req, res, next) => {
    try {
        await client.connect();
        const database = client.db('blog');
        const blogCollection = database.collection('blogs');
        const blogs = await blogCollection.find().toArray();
        return res.status(200).json(blogs);
    } 
    finally {
        //await client.close();
    }
});


app.post('/blogs', async (req, res, next) => {
  const { title, description, category} = req.body;
  try {
      await client.connect();
      const database = client.db('blog');
      const blogCollection = database.collection('blogs');
      
      const blog = await blogCollection.insertOne({
          title,
          description,
          category
      });

      return res.status(200).json(blog);
    } finally {
      //await client.close();
    }
});


app.delete('/blogs/:id', async (req, res, next) => {
    const { id: blogIdToDelete } = req.params;
    try {
        await client.connect();
        const database = client.db('blog');
        const blogCollection = database.collection('blogs');
        const query = {"_id": new ObjectId(blogIdToDelete)};
        const deleteResult = await blogCollection.deleteOne(query);
        return res.status(200).json(deleteResult);
    } finally {
        await client.close();
    }
});



app.post('/users', async (req, res, next) => {
    const { userName, email, password} = req.body;
    try {
        await client.connect();
        const database = client.db('blog');
        const userCollection = database.collection('users');
        
        const blog = await userCollection.insertOne({
            userName,
            email,
            password
        });
  
        return res.status(200).json(blog);
      } finally {
        //await client.close();
      }
  });git