const express = require('express');
const app = express();
const PORT = 3000;

const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;

    console.log(`[GLOBAL LOG] ${timestamp} | ${method} to ${url}`);
    
    next();
};

app.use(requestLogger);

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log('[PRE-PROCESS] Request timestamp attached.');
    next();
});

const adminAuth = (req, res, next) => {
    const isAdmin = req.headers['admin-token'] === 'secret-key';
    
    if (isAdmin) {
        console.log('[AUTH] Admin verified.');
        next();
    } else {
        console.log('[AUTH] Access denied: Invalid token.');
        res.status(403).send('Access Denied: You are not an admin.');
    }
};

app.get('/', (req, res) => {
    res.send(`Welcome! Request processed at: ${req.requestTime}`);
});

app.get('/admin', adminAuth, (req, res) => {
    res.send('Welcome to the Secret Admin Dashboard!');
});

app.get('/error', (req, res, next) => {
    console.log('[FLOW] Manual trigger for error middleware.');
    const err = new Error('Something went wrong!');
    next(err); 
});

app.use((err, req, res, next) => {
    console.error(`[ERROR LOG]: ${err.message}`);
    res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
    console.log(`---------------------------------------------------`);
    console.log(`Middleware demo running at http://localhost:${PORT}`);
    console.log(`---------------------------------------------------`);
});