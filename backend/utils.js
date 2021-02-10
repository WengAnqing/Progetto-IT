const jwt= require( "jsonwebtoken" );

exports.generateToken = function(user) {
    return jwt.sign(
        {
            Codice_Utente: user.Codice_Utente,
            Email: user.Email,
        },
        process.env.JWT_SECRET || 'IlMioSegreto',
        {expiresIn: '1d', }
    );
};

exports.verifyToken = function(req,res,next) {
    var token = req.header('authorization');
    if (token) {
        token = token.replace(/^Bearer\s+/, "");
        jwt.verify(token, process.env.JWT_SECRET || 'IlMioSegreto', (err, decode)=>{
            if(err){
                res.send('token scaduto,login per favore.');
            }else{
                req.user=decode;
                next();
            }
        })
    }else{
        res.send('No token');
    }
};