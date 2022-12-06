const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {validationResult} = require('express-validator');
const Auth = require('../models/auth');

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return  res.status(422).json({message: 'Invalid inputs passed, please check your data.'});
    }

    const {name, email, password, confirmPassword} = req.body;
    let existingUser;

    try {
        existingUser = await Auth.findOne({email : email});
    } catch (err) {
        return res.status(500).json({message: 'Signing up failed, please try again later.'});
    }

    if (existingUser) {
        return res.status(422).json({message: 'User exists already, please login instead or Create a new User.'});
    }

    isValidPassword = false;

    if(password.length < 7 || password.length > 20) {
        return res.status(422).json({message: 'Password must be between 7 and 20 characters.'});
    }

    if(password === confirmPassword) {
        isValidPassword = true;
    } else {
        return res.status(422).json({message: 'Passwords do not match.'});
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        return res.status(500).json({message: 'Could not create user, please try again later.'});
    }

    const createUser = new Auth({
        name,
        email,
        password: hashedPassword,
        thoughts: [],
        // followers: [],
    });

    try {
        await createUser.save();
    } catch (err) {
        return res.status(500).json({message: 'Signing up failed, please try again later.'});
    }

    let token;
    try {
        token = jwt.sign(
            {userId: createUser.id, email: createUser.email},
            process.env.JWT_KEY,
            {expiresIn: '1h'}
        );
    } catch (err) {
        return res.status(500).json({message: 'Signing up failed, please try again later.'});
    }

    res.status(201).json({userId: createUser.id, email: createUser.email, token: token});
};

const login = async (req, res, next) => {
    const {email, password} = req.body;

    let existingUser;

    try {
        existingUser = await Auth.findOne({email : email});
    } catch (err) {
        return res.status(500).json({message: 'Logging in failed, please try again later.'});
    }

    if (!existingUser) {
        return res.status(403).json({message: 'Invalid credentials, could not log you in.'});
    }

    let isValidPassword = false;

    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        return res.status(500).json({message: 'Could not log you in, please check your credentials and try again.'});
    }

    if (!isValidPassword) {
        return res.status(403).json({message: 'Invalid credentials, could not log you in.'});
    }

    let token;

    try {
        token = jwt.sign(
            {userId: existingUser.id, email: existingUser.email},
            process.env.JWT_KEY,
            {expiresIn: '1h'}
        );
    } catch (err) {
        return res.status(500).json({message: 'Logging in failed, please try again later.'});
    }

    res.json({userId: existingUser.id, email: existingUser.email, token: token});

};

exports.signup = signup;
exports.login = login;