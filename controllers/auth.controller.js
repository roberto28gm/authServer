
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');


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
        const token = await generateJWT(dbUser.id, dbUser.name);

        // create database user
        await dbUser.save();

        // response OK
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            email: email,
            token: token
        });


        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Register Error'
        });
    }
    
}


const login = async (req, res) => {
    const { email, password} = req.body;

    try {
        const dbUser = await User.findOne({email: email});
        
        if(dbUSer){
            const validPassword = bcrypt.compareSync(password, dbUser.password);

            if(!validPassword) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Email or password incorrect'
                });
            }
            const token = await generateJWT(dbUser.id, dbUser.name);
            console.log(dbUser);
            return res.json({
                ok: true,
                uid: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                token: token
            });
        } else {
            return res.status(400).json({
                ok: false,
                msg: 'Email or password incorrect'
            });
        }
        

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Login failed'
        });
    }

}


const renew = async (req, res) => {
    const { uid } = req;
    const dbUser = await User.findById(uid);
    const newToken = await generateJWT(uid, dbUser.name);
    
    return res.json({
        ok: true,
        uid: uid,
        name: dbUser.name,
        email: dbUser.email,
        token: newToken
    });
}


module.exports = {
    register,
    login,
    renew
}