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
        // let hashedPassword;
        // await bcrypt.hash(password, 10, (err, result)=>{
        //     if(err){
        //         console.log(err);
        //     }
        //     else{
        //         hashedPassword = result;
        //     }
        // });
        const hashedPassword = await bcrypt.hash(password, 10);


        // create user into database
        const user = await Users.create({
            username, email, password: hashedPassword
        });

        console.log('before deleting password', user);
        
        delete user.password;

        console.log('after deleting password', user);

        res.status(200).json({ msg: `${user.username} registered successfully`, status: true });
    }

    catch (err) {
        console.log(err);
        console.error(err);
        return res.status(501).json({msg: 'Internal server error'});
    }
}


const login = async (req, res, next)=>{
    console.log(req.body);

    try{
        
        const {username, password} = req.body;

        const user = await Users.findOne({username});

        if(!user){
            return res.status(404).json({ msg: 'Username not found' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const result = await bcrypt.compare(password, user.password );
        console.log('pasword match',result);

        if(!result){
            return res.status(200).json({msg: 'Incorrect password', status: false});
        }

        return res.status(200).json({msg: `${user.username} loggedin successfully`, status: true, user});

    }
 
    catch (err) {
        console.log(err);
        console.error(err);
        return res.status(501).json({msg: 'Internal server error'});
    }
}


module.exports = { register, login }