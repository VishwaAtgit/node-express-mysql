const { createUser, getUser, getUserById, updateUser, deleteUser, getUserByUserEmail } = require('./user.service');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken')
module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt)
        createUser(body, (err, results) => {
            if(err) {
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if(err) {
                return res.status(500).json({
                    success: 0,
                    message: 'unable to find the user by given id'
                })
            }
            if(!results) {
                return res.json({
                    success: 0,
                    message: 'Record not found'
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    getUsers: (req, res) => {
        getUser((err, results) => {
            if(err) {
                return res.send(500).json({
                    success: 0,
                    message: 'unable to fetch users'
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt)
        updateUser(body, (err, results) => {
            if(err){
                res.send(500).json({
                    success: 0,
                    message: 'unable to update user'
                })
            }
            return res.status(200).json({
                success: 1,
                message: 'updated successfully'
            })
        })
    },
    deleteUser: (req, res) => {
        deleteUser(req.body, (err, results) => {
            if(err){
                res.send(500).json({
                    success: 0,
                    message: 'unable to delete user'
                })
            }
            return res.status(200).json({
                success: 1,
                message: 'deleted successfully'
            })
        })
    },
    login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results) => {
            if(err) {
                res.send(500).json({
                    success: 0,
                    message: 'unable to login'
                })
            }
            if(!results) {
                return res.json({
                    success: 0,
                    message: 'invalid email or password'
                })
            } 
            const result = compareSync(body.password, results.passWord)
            if(result) {
                results.password = undefined
                const jsonToken = sign({result: results}, 'qwe1234', {expiresIn: '1h'})
                return res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsonToken
                })
            }
             else {
                return res.json({
                    success: 1,
                    message: "Invalid email or password",
                })
             }
        })
    }
}