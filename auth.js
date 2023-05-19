const axios = require('axios');
const jwt = require("jsonwebtoken");
const jwtSecret = "a4bbc339-72f1-4095-80eb-f10e5709a5ef";

async function login(req, res) {
    const sessionUser = (await axios.post('http://localhost:4003/login', {
        email: req?.body?.email,
        password: req?.body?.password
    })).data;
    if (!!!sessionUser || sessionUser.password !== req.body.password) {
        return res.status(401).send("E-mail or password does not match");
    }
    const token = generateToken(sessionUser);
    console.log('User Authenticated');
    return res.status(200).json(token);
}

async function loginGoogle(req, res) {
    const sessionUser = (await axios.post('http://localhost:4003/login-google', req.body)).data;
    const token = generateToken(sessionUser);
    console.log('Google User Authenticated');
    return res.status(200).send(token);
}

function generateToken(sessionUser) {
    const maxAge = 3 * 60 * 60;
    return jwt.sign(
        {id: sessionUser._id, name: sessionUser.name, email: sessionUser.email},
        jwtSecret,
        {
            expiresIn: maxAge,
        }
    );
}

module.exports = { login, loginGoogle };
