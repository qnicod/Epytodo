const User = require("../user/user.query.js");
const bcrypt = require('bcryptjs');
const saltRounds = 5;
const jwtAuth = require('../../utils/jwt.js');
const sql = require('../../config/db.js');

exports.register = (req, res) => {
    if (!req.body) {
        res.status(400).json({
            msg: "Content can not be empty!"
        });
    }
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        const user = new User({
            email: req.body.email,
            name: req.body.name,
            firstname: req.body.firstname,
            password: hash
        });
        User.create(user, (err) => {
            if (err)
                res.status(500).send({
                    msg: "account already exists"
                });
            res.status(200).json({ token: jwtAuth.generateTokenForUser(user) });
        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ msg: "Please provide an email and password" });
    }
    sql.query('SELECT * FROM user WHERE email = ?', email, async (err, result) => {
        console.log(result);
        if (err)
            console.log(err);
        if (!result || !(await bcrypt.compare(password, result[0].password))) {
            res.status(401).json({ msg: "Invalid Credentials" });
        } else {
            const user = result[0];
            res.status(200).json({ token: jwtAuth.generateTokenForUser(user)})
        }
    });
}