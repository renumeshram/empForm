import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session'
import rateLimit from 'express-rate-limit'
import MongoStore from 'connect-mongo';

import router from './routes/formRoutes.js';
import adminRouter from './routes/adminRoutes.js';


const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Trust Render proxy for correct IPs
app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 10* 60* 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP address, please try later."
})
app.use(limiter)

console.log("Origin", process.env.CORS_ORIGIN)

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
  }),
  cookie: { 
    secure: process.env.NODE_ENV === 'production', 
  } // set to true if using https
}));


app.use('/api', router);
app.use('/api/admin', adminRouter);

app.get("/health",(req,res)=>{
  res.json({message:"Severs is running"})
})

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to MongoDb");
    app.listen(PORT,()=> console.log(`Server is listening at port ${PORT}`)
    )
}).catch((err)=> console.log("Mongodb connection error.")
)