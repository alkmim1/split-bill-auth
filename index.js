const express = require('express');
const session = require('express-session');
const passport = require('passport');
const axios = require('axios');
require('./auth');

function isLoggedIn(req, res, next) {
   req.user ? next() : res.sendStatus(401);
}

const app = express();
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
   res.send('<a href="/auth/google">Authenticate with Google</a>')
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
)

app.get('/auth/google/callback',
    passport.authenticate('google', {
       successRedirect: '/protected',
       failureRedirect: '/auth/failure',
    })
)

app.get('/auth/failure', (req, res) => {
   res.send('Authentication failed!')
})

app.get('/protected', isLoggedIn, async (req, res) => {
    const response = await axios.post('http://localhost:4003/login-google', { user: req.user });
    res.status(response.status).send(response.data);
});

app.get('/logout', (req, res) => {
   req.logout();
   res.send('Logged out');
})

app.listen(5000, () => console.log('Listening on: 5000'))