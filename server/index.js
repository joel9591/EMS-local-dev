import express from "express";
import cors from "cors";
import { adminRouter } from "./Routes/AdminRoute.js";
import { EmployeeRouter } from "./Routes/EmployeeRoute.js";
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import "./birthday_feature/notificationScheduler.js";
import messages from "./Routes/chat.js";
import 'dotenv/config';
import { verifyToken } from "./middlewares/authMiddleware.js";

const app = express();
 
app.use(cors({
    origin: "http://localhost:5173",  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true  
}));

app.use(express.json());
app.use(cookieParser());
app.use('/auth',adminRouter);
app.use('/employee', EmployeeRouter);
app.use("/messages", messages);
app.use('/admin', adminRouter);
app.use(express.static('Public'));


app.get('/verify', verifyToken, (req, res) => {
    return res.json({ Status: true, role: req.role, id: req.id });
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
