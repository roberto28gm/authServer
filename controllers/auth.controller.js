const { validationResult } = require("express-validator");


const register = (req, res) => {
    const { email, name, password} = req.body;
    return res.json({
        ok: true,
        msg: 'User created /new'
    });
}

const login = (req, res) => {
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    const { email, password} = req.body;
    
    return res.json({
        ok: true,
        msg: 'Login user /'
    });
}

const renew = (req, res) => {
    return res.json({
        ok: true,
        msg: 'Renew /'
    });
}

module.exports = {
    register,
    login,
    renew
}