const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Load voters from JSON file
const dataPath = path.join(__dirname, 'voters.json');
let votersData = JSON.parse(fs.readFileSync(dataPath, 'utf-8')).voters;

// ---------- MIDDLEWARES ----------

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Delay middleware
const delayMiddleware = async (req, res, next) => {
  console.log(`Delaying request for 2 seconds...`);
  await delay(2000); // 2000 milliseconds = 2 seconds
  next();
};

// Apply to all routes


app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

app.use(session({
  secret: 'supersecret123',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // set true if HTTPS
    maxAge: 1000 * 60 * 60
  }
}));

app.use(delayMiddleware);

// ---------- ROUTES ----------

// Login
// server.js



app.post('/login', (req, res) => {
  const { voterId, password } = req.body;

  const user = votersData.find(u => u.voterId === voterId && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  req.session.userId = user.voterId;

  // Return both name and voterId to satisfy your TypeScript UserType
  res.json({
    voterId: user.voterId,
    name: user.name
  });
});

// /me route
app.get('/me', (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.status(401).json({ message: 'Not logged in' });

  const user = votersData.find(u => u.voterId === userId);
  res.json({
    voterId: user.voterId,
    name: user.name,
    fatherName: user.fatherName,
    dob: user.dob,
    citizenshipNo: user.citizenshipNo,
    phoneNo: user.phoneNo,
    province: user.province,
    district: user.district,
    constituency: user.constituency,
    pollingStation: user.pollingStation
  });
});

// Logout
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: 'Logout failed' });
    res.clearCookie('connect.sid'); // default session cookie name
    res.json({ message: 'Logged out' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
