const bcrypt = require('bcrypt');
const Users = require('../model/userModel');


const register = async (req, res, next) => {

    try {

        console.log(req.body);
        const { username, email, password } = req.body;

        console.log('-> router called from controller');
        const usernameCheck = await Users.findOne({ username });

        // check for existance of username
        if (usernameCheck) {
            res.status(200).json({ msg: "Username already exists", status: false });
            return;
        }

        // check for existance of email
        const emailCheck = await Users.findOne({ email })
        if (emailCheck) {
            res.status(200).json({ msg: "Email already exists", status: false });
            return;
        }

        // encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user into database
        const user = await Users.create({
            username, email, password: hashedPassword
        });

        console.log('before deleting password', user);
        
        delete user.password;

        console.log('after deleting password', user);

        res.status(200).json({ msg: `${user.username} registered successfully`, status: true, user });
    }

    catch (err) {
        console.log(err);
        console.error(err);
    }
}




module.exports = { register }