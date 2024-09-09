const User = require('../models/User')
const bcrypt = require('bcrypt')
const createToken = require('../utils/createToken')
const hashingFun = require('../utils/hashThePassword')


const signup = async (req, res) => {

    const {
        name,
        email,
        password,
        location,
        numTel
    } = req.body

    try {

        const existe = await User.findOne({ email })

        if (existe) {
            throw Error('This email already existe')
        }



        const hashPassword = await hashingFun(password)

        let user = await User.create({
            name,
            email,
            password: hashPassword,
            location,
            numTel
        })

        const token = createToken(user._id)

        user = await User.findById(user._id).select('-password')

        res.status(201).json({ user, token })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }


}


const login = async (req, res) => {

    const {
        email,
        password
    } = req.body


    try {

        const existe = await User.findOne({ email })

        if (!existe) {
            throw Error('Invalid email or password')
        }

        const match = await bcrypt.compare(password, existe.password)

        if (!match) {
            throw Error('Invalid email or password')
        }

        const token = createToken(existe._id)

        const user = await User.findById(existe._id).select('-password')

        res.status(201).json({ user, token })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }


}


const getUsers = async (req, res) => {

    const { numTel, email } = req.query;

    const users = {};


    if (numTel) {
        users['numTel'] = { $regex: numTel, $options: 'i' };
    }


    if (email) {
        users['email'] = { $regex: email, $options: 'i' };
    }


    try {


        const data = await User.find(users)

        if (!data || data.length === 0) {
            throw Error('There is no data here');
        }

        res.status(200).json(data)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }


}


const updateUser = async (req, res) => {

    const { userId } = req.params

    const {
        name,
        email,
        password,
        location,
        numTel,
        newPassword
    } = req.body

    try {



        const user = await User.findById(userId)

        if (!user) {
            throw Error('There is no user with this id to update')
        }


        if (password) {
            const match = await bcrypt.compare(password, user.password)


            if (!match) {
                throw Error('Invalid password')
            }
        }




        const updatedData = {
            name: name ? name : user.name,
            email: email ? email : user.email,
            password: newPassword ? await hashingFun(newPassword) : user.password,
            location: location ? location : user.location,
            numTel: numTel ? numTel : user.numTel
        }


        const data = await User.findByIdAndUpdate(userId, updatedData, { new: true }).select('-password')


        res.status(200).json(data)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }


}


const deleteUser = async (req, res) => {

    const userId = req.params

    try {
        const user = await User.findById(userId)

        if (!user) {
            throw Error('There is no user with this id to delete')
        }

        await User.findByIdAndDelete(userId)

        res.status(201).json('You have successfully deleted this user')

    } catch (error) {
        res.status(500).json({ error: error.message })
    }


}


const likedProduct = async (req, res) => {
    const userId = req.user;  // Assuming `req.user` contains the authenticated user's ID
    const { productId } = req.params;
    const { like } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (like === true) {
            // Add the product to the likedProduct array if not already there
            if (!user.likedProduct.includes(productId)) {
                user.likedProduct.push(productId);
            }
        } else if (like === false) {
            // Remove the product from the likedProduct array
            user.likedProduct.pull(productId);
        }

        // Save the updated user documents
        await user.save();

        res.status(200).json({ message: like ? 'Product liked successfully' : 'Product removed from liked products' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




module.exports = { signup, login, getUsers, updateUser, deleteUser, likedProduct }