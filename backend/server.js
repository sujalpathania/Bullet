// backend/server.js
/*const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path=require('path')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const authRoutes = require('./routes/auth');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

app.use(express.static(path.join(__dirname, '../frontend/view')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

// Example route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '../frontend/view/navbar.html');
});
app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '../frontend/view/signup.html');
});

// Example API endpoint
app.post('/submit-form', (req, res) => {
    const { name, email } = req.body;
    // Save to MongoDB here
    res.json({ message: "Form data received", data: { name, email } });
});

app.listen(PORT, () => {
    console.log("http://localhost:5000");
});*/
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const authRoutes = require('./routes/auth');
const authRoutes2=require('./routes/contact')
const trialRouter = require('./routes/trial');



// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', authRoutes2);
app.use('/trial', trialRouter);


// Serve static files like CSS from 'public'
app.use(express.static(path.join(__dirname, '../frontend/public')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

// Serve HTML files from 'view'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/view/index.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/view/signup.html'));
});
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/view/about.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/view/login.html'));
});
app.get("/contact",(req,res)=>{
    res.sendFile(path.join(__dirname,'../frontend/view/contact.html'))
})
app.get("/features",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/view/features.html"))
})
app.get("/standard",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/view/standard.html"))
})
app.get("/classic",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/view/classic.html"))
})
app.get("/hunter",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/view/hunter.html"))
})
app.get("/super",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/view/super.html"))
})
app.get("/himalayan",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/view/himalayan.html"))
})
app.get("/meteor",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/view/meteor.html"))
})
app.get("/gt",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/view/gt.html"))
})
app.get("/interceptor",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/view/interceptor.html"))
})
app.get("/trialform", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/view/trialform.html"));
});
app.get("/discoverc",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/view/discoverc.html"))
})
app.get("/discoveri",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/view/discoveri.html"))
})
app.get("/discoverh",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/view/discoverh.html"))
})

// Example API endpoint
app.post('/submit-form', (req, res) => {
    const { name, email } = req.body;
    res.json({ message: "Form data received", data: { name, email } });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

