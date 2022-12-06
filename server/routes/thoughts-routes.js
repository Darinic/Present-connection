const express = require('express');
const {check} = require('express-validator');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

const thoughtsControllers = require('../controllers/thoughts-controllers');

router.get('/', thoughtsControllers.getThoughts);

router.get('/:tid', thoughtsControllers.GetThoughtById);

router.use(checkAuth);

router.post('/newThought',
[
    check('author').isLength({min: 3, max: 30}),
    check('thought').isLength({min: 20, max: 200}),
    check('hashtag1').isLength({min: 2, max: 10}),
    check('hashtag2').isLength({min: 2, max: 10}),
],
thoughtsControllers.createThought
);


module.exports= router;
