const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const rateLimit = require("express-rate-limit");
// Initialize Middleware
app.use(express.json({ extended: false }));
app.use(cookieParser());
const AuthRoutes = require('./routes/users');
const FakeUserRoutes = require('./routes/fakeusers');

const apiLimiter = rateLimit({
  windowMs: 24 * 60 * 10000,
  max: 10
});

app.use('/generate', apiLimiter);

const PORT = process.env.PORT || 5000;

app.use('/', AuthRoutes);
app.use('/', FakeUserRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));