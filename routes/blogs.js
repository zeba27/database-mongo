const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb+srv://zewaso4950:TJI7jEnXLf2ZCi1q@cluster0.49awfao.mongodb.net/";
const client = new MongoClient(uri);


router.get('/', async (req, res, next) => {
    try {
        await client.connect();
        const database = client.db('blog');
        const taskCollection = database.collection('blogs');
        const tasks = await taskCollection.find().toArray();
        return res.status(200).json(tasks);
    } finally {
        await client.close();
    }
});