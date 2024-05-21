import express from 'express';
import connectDB from './config/connectDB';
import authRouter from './routes/auth.route';
import todoRouter from './routes/todo.route';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
dotenv.config()

const corsOptions = {
  origin: 'https://todo-task-ashy.vercel.app',
  credentials: true, // enable set cookie
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 
    'PATCH', 'HEAD'],
}

const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use("/api/auth", authRouter);
app.use('/api/todo', todoRouter)

connectDB(); // Call the connectDB function to establish database connection

app.listen(8080, () => {
    console.log('Server running on port 8080');
});
