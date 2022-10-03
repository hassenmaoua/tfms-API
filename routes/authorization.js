const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authentication');

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
      const user = await User.findOne({ email });

      if (user && (await password) === user.password) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: '2h',
          }
        );

        // save user token
        user.token = token;

        var session = req.session;
        session.userid = {
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
        };

        // user
        res.status(200).json({
          status: true,
          message: 'Connecté',
          session: session,
          data: user,
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

router.get('/logout', async (req, res) => {
  try {
    req.session.destroy();
    res.status(200).json({ message: 'Deconnecter', seesion: req.session });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
