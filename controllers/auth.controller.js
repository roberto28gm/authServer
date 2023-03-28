
const User = require('../models/User');
const bcrypt = require('bcryptjs');


const register =  async(req, res) => {
    const { email, name, password} = req.body;

    try {
        // verify email
        const user = await User.findOne({ email: email});
        if(user) {
            return res.status(400).json({
                ok: false,
                msg: 'User already exists'
            });
        }

        // create user model
        const dbUser = new User(req.body);

        // hash password
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(password, salt);

        // generate jwt

        // create database user
        await dbUser.save();

        // response OK
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name
        });


        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Register Error'
        });
    }
    
}

const login = (req, res) => {
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