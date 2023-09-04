const User = require('../modelos/User');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

//Crear usuario
exports.signup = (req , res) => {
    //console.log('req.body' , req.body);
    
    const user = new User(req.body);
    user.save((error , user) => {
        //console.log("reached signup endpoint")
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({user})
    })
}


//singin - login
exports.signin = (req , res) => {
    //find 
    const {nombre , password} = req.body
    User.findOne({nombre} , (error , user) => {
        if(error || !user) {
            return res.status(400).json({
                error: 'El usuario no existe'
            });
        }
        
        if(!user.authenticate(password)) {
            return res.status(401).json({
                error: 'El usuario y/o contraseña no existen'
            });
        }
        const token = jwt.sign({_id: user._id} , process.env.JWT_SECRET)
        res.cookie('t' , token , {expire: new Date() + 9999})
        const {_id , nombre , cargo} = user
        console.log('Token: ' , token , ' User: ' , user)
        return res.json({token , user:{_id , nombre , cargo}}) 
    });
}

//Cerrar sesion
exports.signout = (req , res) => {
    res.clearCookie('t')
    res.json({message: "Signout success"});
};

exports.userById = (req , res , next , id) => {
    User.findById(id).exec((err , user) => {
        if(err||!user) {
            return res.status(400).json({
                error: "User not found"
            });
        }
        req.profile = user;
        next()
    });
}

//listar los usuarios
exports.list = (req , res) => {
    let order = req.query.order ? req.query.order: 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy: 'nombre';

    User.find()
        .sort([[sortBy , order]])
        .exec((err , user) => {
            if (err) {
                return res.status(400).json({
                    error: "Users no found"
                })
            }
            //console.log('list de usuarios:' , user)
            res.json(user);
        })
}

//Borrar user
exports.remove = (req , res) => {
    let user = req.user
    user.remove((err , deleteduser) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: "El usuario se a eliminado"
        })
    })
}
