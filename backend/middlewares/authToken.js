const jwt = require('jsonwebtoken');
const CONFIG = require('../helpers/config')

module.exports = function(req , res , next){
    //console.log('req.headers: ' , req.headers)
    //console.log('req.headers.authorization: ' , req.headers.authorization)
    //console.log('req.path: ' , req.path)
    if(req.path != '/api/auth/signin'){
        if(req.headers.authorization){
            //next();
            const token = req.headers.authorization.split(' ')[1].trim()
            jwt.verify(token , process.env.JWT_SECRET , function(error , decoded){
                console.log(error, decoded)
                if(error) return res.status(500).send({error});
                next();
            });
        }else res.status(403).send(console.error('No cuentas con los permisos correspondientes'))
    }else res.status(405).send(console.log('No cuentas con los permisos correspondientes'))
}