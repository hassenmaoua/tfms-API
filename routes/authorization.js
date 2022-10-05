const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authentication');

// Get User by EMAIL
router.get('/getbyemail/:email', auth, async (req, res) => {
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
    // Validate user input
    if (!(email && password)) {
      res.status(400).json({
        status: false,
        message: "La saisie d'email et du mot de passe est obligatoire",
      });
    } else {
      // Validate if user exist in our database
      const foundUser = await User.findOne({ email });

      if (foundUser && (await password) === foundUser.password) {
        // Create token
        const accessToken = jwt.sign(
          {
            user_id: foundUser._id,
            email,
          },
          process.env.TOKEN_KEY,
          {
            expiresIn: '60s',
          }
        );
        const refreshToken = jwt.sign(
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

          process.env.TOKEN_KEY,
          {
            expiresIn: '1d',
          }
        );

        // save user token
        var currentUser = await User.findById(foundUser._id);
        currentUser.refreshToken = refreshToken;
        const updatedUser = await currentUser.save();

        var session = req.session;
        session.userid = {
          nom: foundUser.nom,
          prenom: foundUser.prenom,
          email: foundUser.email,
        };
        // user
        return res
          .cookie('jwt', refreshToken, {
            maxAge: 24 * 60 * 60 * 1000,
          })
          .status(200)
          .json({
            status: true,
            message: 'Connecté',
            accessToken: refreshToken,
          });
      } else {
        res.status(400).json({
          status: false,
          message: "Informations d'identification non valides",
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }

  // Our register logic ends here
});

router.get('/refresh', async (req, res) => {
  try {
    const cookies = req.cookies;

    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken });

    if (!foundUser) {
      return res.sendStatus(403);
    }

    jwt.verify(refreshToken, process.env.TOKEN_KEY, (err, decoded) => {
      if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
      const accessToken = jwt.sign(
        {
          user_id: foundUser._id,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: '60s',
        }
      );
      res.json({ accessToken });
    });
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/logout', async (req, res) => {
  // On client, also delete the accessToken
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.status(204); //No Content Successful request
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken });

    if (!foundUser) {
      res.clearCookie('jwt', { httpOnly: false });
      return res.sendStatus(204);
    }

    var currentUser = await User.findById(foundUser._id);
    currentUser.refreshToken = '';
    const updatedUser = await currentUser.save();

    res.clearCookie('jwt', { httpOnly: false }); // secure: true - only servers on https
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
