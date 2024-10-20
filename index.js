import * as dotenv from 'dotenv'
dotenv.config();

import express from 'express'
const app = express()
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'

import mongoose from 'mongoose'

import massageModel from './models/massage-model.js';

app.use(cors({
  origin: [process.env.CLIENT_URL, "https://plpo.ru", "https://gorodaivesi.ru", "http://localhost:3055"],
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({
  extended: true
}));


// ROUTES
// app.use('/auth', userRouter)
// app.use('/tasks', tasksRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/massage/all', async (req, res) => {
  return res.json(await massageModel.find({}))
})

// START SERVER
function startServer() {
  try {
    app.listen(process.env.PORT, () => { console.log(`Server is running on http://localhost:${process.env.PORT}`); })
  } catch (err) {
    console.error('Error while starting server: ', err);
  }
}
function mongoConnect() {
  console.log('connect to: ', process.env.MONGO_URL);
  mongoose.connect(process.env.MONGO_URL)

  const db = mongoose.connection;
  db.once('open', function () {
    console.log('mongo connected')
  });
}


mongoConnect()
startServer()