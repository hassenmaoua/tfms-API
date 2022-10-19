require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authentication');
const { TOKEN_KEY } = process.env;

// Get User by EMAIL
router.get('/getbyemail/:email', async (req, res) => {
  try {
    const email = req.params['email'];
    const user = await User.findOne({ email });

    if (user) {
      res.status(200).json({
        status: true,
        message: 'Succes',
        data: user,
      });
    } else {
      res.status(404).json({
        status: false,
        message: 'Aucune donnée disponible',
      });
    }
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user email
    if (!email) {
      return res.status(400).send({
        status: false,
        message: "La saisie d'email est obligatoire",
      });
    }

    // Validate user password
    if (!password) {
      return res.status(400).send({
        status: false,
        message: 'La saisie du mot de passe est obligatoire',
      });
    }

    const foundUser = await User.findOne({ email });

    // Validate if user exist in our database
    if (!foundUser) {
      return res.status(404).send({
        status: false,
        message: "Email n'existe pas",
      });
    }

    // Validate if password is correct
    if (password != foundUser.password) {
      return res.status(406).send({
        status: false,
        message: 'Mot de passe incorrect',
      });
    }

    if (password === foundUser.password) {
      // Create token
      const accessToken = jwt.sign(
        {
          data: {
            _id: foundUser._id,
            label: foundUser.nom + ' ' + foundUser.prenom,
            identifiantFiscal: foundUser.identifiantFiscal,
          },
          profile: {
            _id: foundUser._id,
            nom: foundUser.nom,
            prenom: foundUser.prenom,
            email: foundUser.email,
            photo: foundUser.photo,
          },
        },
        TOKEN_KEY,
        { expiresIn: '1d' }
      );

      // save user token
      var currentUser = await User.findById(foundUser._id);
      currentUser.refreshToken = accessToken;
      await currentUser.save();

      // user
      return res
        .status(200)
        .cookie('jwt', accessToken, {
          maxAge: 24 * 60 * 60 * 1000,
        })
        .send({
          status: true,
          message: 'Connecté',
          accessToken: accessToken,
        });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }

  // Our register logic ends here
});

router.get('/refresh', async (req, res) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt)
      return res
        .status(401)
        .send({ message: 'No Cookies, Invalid Authorization' });

    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.json({ status: true, accessToken: refreshToken });

    /*
    jwt.verify(refreshToken, TOKEN_KEY, (err, decoded) => {
      if (err || foundUser.email !== decoded.profile.email)
        return res.status(403).send({ message: 'User not match' });
      const accessToken = jwt.sign(
        {
          data: {
            _id: foundUser._id,
            label: foundUser.nom + ' ' + foundUser.prenom,
          },
          profile: {
            _id: foundUser._id,
            nom: foundUser.nom,
            prenom: foundUser.prenom,
            email: foundUser.email,
            photo: foundUser.photo,
          },
        },
        TOKEN_KEY,
        {
          expiresIn: '10s',
        }
      );
      });*/
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});

router.post('/verify', async (req, res) => {
  try {
    const refreshToken = req.body.jwt;

    if (!refreshToken)
      return res
        .status(401)
        .send({ message: 'No Token, Invalid Authorization' });

    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser) {
      return res.status(404).send({ message: 'User not found' });
    }

    jwt.verify(refreshToken, TOKEN_KEY, (err, decoded) => {
      if (err || foundUser.email !== decoded.profile.email)
        return res.status(403).send({ message: 'User not match' });
    });

    res.status(201);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get('/logout', async (req, res) => {
  // On client, also delete the accessToken
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(204); //No Content Successful request
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken });

    if (!foundUser) {
      res.clearCookie('jwt');
      return res.sendStatus(204);
    }

    foundUser.refreshToken = '';
    await foundUser.save();
    res.clearCookie('jwt'); // secure: true - only servers on https

    return res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/user', auth, async (req, res) => {
  if (req.user) res.status(200).send(req.user.profile);
  else res.status(404).send({ message: 'No profile found' });
});

module.exports = router;
