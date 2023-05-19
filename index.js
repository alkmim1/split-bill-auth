const express = require('express');
const cors = require('cors');
const {login, loginGoogle} = require("./auth");

const app = express();
app.use(express.json());
const corsOptions ={
   origin:'http://localhost:3000',
   credentials:true,
   optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.post('/auth', async (req, res) => {
   try {
      const response = await login(req, res);
      res.status(200).json(response.token);
   } catch (err) {
      console.log(err);
      res.status(500).json(JSON.stringify(err));
   }
})

app.post('/auth/google', async (req, res) => {
   try {
      const response = await loginGoogle(req, res);
      res.status(200).json(response.token);
   } catch (err) {
      console.log(err);
      res.status(500).json(JSON.stringify(err));
   }
})

app.listen(5000, () => console.log('Listening on: 5000'))