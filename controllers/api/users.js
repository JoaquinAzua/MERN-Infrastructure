const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


module.exports = {
    create,
    createJWT,
    login,
    checkToken,
}

function checkToken(req, res){
    console.log('req.user: ', req.user);
    res.json(req.exp);
}


async function create(req, res) {
    try {
        // add the user to database
        const user = await User.create(req.body);
        // create a token using 'user' obj
        // token will be a string
        const token = createJWT(user);
        // respond to request with JSON of token
        res.json(token);
    } catch(err) {
        //client will check for non-2xx status code
        // 400 = bad request
        res.status(400).json(err);
    }
}

// helper functions 
function createJWT(user){
    return jwt.sign(
       // data payload
       {user},
       process.env.SECRET,
       { expiresIn: '24h' } 
    );
}

async function login(req, res) {
    try {
        // find the user to database
        const user = await User.findOne({email: req.body.email});
        if (!user) throw new Error();
        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) throw new Error();
        res.json( createJWT(user) );
    } catch {
        //client will check for non-2xx status code
        // 400 = bad request
        res.status(400).json('Bad Credentials');
    }
}