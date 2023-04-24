const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
app.use(express.json());
const port = 3001
const USERS = [
  { email: 'user1@example.com', password: 'password1' },
  { email: 'user2@example.com', password: 'password2' },
  { email: 'user3@example.com', password: 'password3' }
]; // create an empty array to store users

app.get('/profile ', function(req, res) {
  res.send('Hello World!')
})

app.post('/signup', function(req, res) {
  const { email, password } = req.body; // extract email and password from the request body

  // check if the user already exists
  const existingUser = USERS.find(user => user.email === email);
  if (existingUser) {
    return res.status(409).send('User already exists');
  }

  // create a new user object and add it to the USERS array
  const newUser = { email, password };
  USERS.push(newUser);

  // return success response to the client
  res.sendStatus(200);
});


 // assume we have some users in the USERS array

app.post('/login', function(req, res) {
  const { email, password } = req.body; // extract email and password from the request body

  // find the user with the given email
  const user = USERS.find(user => user.email === email);
  if (!user) {
    return res.status(401).send('Invalid email or password');
  }

  // check if the password is correct
  if (user.password !== password) {
    return res.status(401).send('Invalid email or password');
  }

  // generate a new token with the user's email as payload
  const token = jwt.sign({ email: user.email }, 'secret');

  // return success response to the client with the token
  res.status(200).json({ token });
});

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})