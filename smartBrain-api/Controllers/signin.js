const handleSignin = (req,res,bcrypt,db) =>{


    db.select('*').from('login').where({ email: req.body.email })
        .then(user => {
            

            if (user[0] === undefined) {
                res.status(404).json('Not found');
            } else {
                if (bcrypt.compareSync(req.body.password, user[0].hash)) {
                    return db.select('*').from('users')
                        .where({ email: req.body.email })
                        .then(data => {
                           
                            res.json(data[0]);
                        })
                } else {
                    res.status(404).json('Incorrect password');
                }
            }

        })
        .catch(err => res.json(err));

}
module.exports = {
    handleSignin:handleSignin
}