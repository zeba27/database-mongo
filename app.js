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
const uri = "mongodb+srv://zewaso4950:TJI7jEnXLf2ZCi1q@cluster0.49awfao.mongodb.net/";
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