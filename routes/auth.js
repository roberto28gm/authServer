const { Router } = require('express');
const { check } = require('express-validator');
const { register, login, renew } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

// Register
router.post('/new', [
    check('email', 'Email required').isEmail(),
    check('password', 'Password required. Min length 5').isLength({min: 5}),
    check('name', 'Name required').not().isEmpty(),
    validateFields
    
], register);

// Login
router.post('/',[
    check('email', 'Email required').isEmail(),
    check('password', 'Password required. Min length 5').isLength({min: 5}),
    validateFields
], login);

// Validate and Renew Token
router.get('/renew', validateJWT, renew);


module.exports = router;