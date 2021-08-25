const handeImage = (req,res,db) =>{
    const id = req.body.id


    return db('users').where({ id: id }).increment('rank', 1)
        .returning('rank')
        .then((response) => {
            res.json(response[0]);
        }).catch((err) => {
            res.status(400).json('error');
        });
}
module.exports = {
    handeImage:handeImage
}