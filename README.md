const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Inscription
router.post('/signup', async (req, res) => {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
        username,
        password: hashedPassword,
        email
    });
    
    try {
        await user.save();
        res.status(201).send('Utilisateur créé avec succès');
    } catch (error) {
        res.status(400).send('Erreur lors de la création de l\'utilisateur');
    }
});

// Connexion
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('Identifiants invalides');
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token });
});

module.exports = router;

module.exportsconst express = require('express');
const Subscription = require('../models/Subscription');

const router = express.Router();

// Création/refus d'un abonnement (implémentez la logique Stripe ou PayPal ici)
router.post('/', async (req, res) => {
    const { userId, subscriptionType } = req.body;

    const subscription = new Subscription({
        userId,
        subscriptionType
    });

    await subscription.save();
    res.status(201).send('Abonnement créé');
});

module.exports = router;

router.post<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>thesoungali.com</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Bienvenue sur thesoungali.com</h1>
        <a href="signup.html">Inscrivez-vous</a>
    </header>

    <main>
        <h2>Informations partagées</h2>
        <div id="posts">Voici des informations partagées.</div>
    </main>
</body>
</html>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscription</title>
</head>
<body>
    <h1>Inscription</h1>
    <form id="signupForm">
        <input type="text" id="username" placeholder="Nom d'utilisateur" required />
        <input type="email" id="email" placeholder="Email" required />
        <input type="password" id="password" placeholder="Mot de passe" required />
        <button type="submit">Créer un compte</button>
    </form>
    <script>
        document.getElementById('signupForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: document.getElementById('username').value,
                    email: document.getElementById('email').value,
                    password: document.getElementById('password').value
                })
            });
            if (response.ok) {
                alert('Inscription réussie !');
                window.location.href = 'index.html';
            } else {
                alert('Erreur lors de l\'inscription.');
            }
        });
    </script>
</body>
</html>

