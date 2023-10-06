// const mongoose = require ("mongoose");
// const express = require ("express");
const { UserModel} = require("../model/userModel")
// const JWT = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const emailValidator = require("email-validator")
// to register user or signup

const userSignUp = async (req, res, next) => {
    try {
        const newUser = await UserModel.create(req.body);
        res.status(200).json({
            message:"SignUp Sucess "
        })
        
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
               
    }
}

//to user signin

const userSignIn = async(req, res) => {
    const {username,password} = req.body;

    try {
        const getuserData = await UserModel.findOne({username}).select("+password");

        if (getuserData && getuserData.username) {
            const result = await bcrypt.compare(password,getuserData.password)
            if (result) {

                const token = await getuserData.jwtToken()

                const cookieOption = {
                    maxAge: 24 * 60 * 60 * 1000, //24hr
                    
                    httpOnly: true //  not able to modify  the cookie in client side
                };

                res.cookie("token", token, cookieOption);


                res.status(200).json({
                    success: true,
                    data: getuserData
                })
                
            } else {
                res.status(404).send({
                    message: "Password is Incorrect, Try Again!"
                });

                
            }
        }else{
            res.status(404).send({
                message :"No Account Found Associated with this username"
            })
        }

        
    } catch (error) {
        res.status(501).send({
            message: error.message
        })
        
    }


}

// get user details

const getUserDetails = async(req,res) => {
    const {id ,username} = req.user;

    try {
        const userData = await UserModel.findOne({username});
        res.status(200).send({
            msg:"Success",
            data:userData
        })
        
    } catch (error) {
        res.status(501).send({
           message: error.message
        })
    }
}

module.exports = {
    userSignUp,
    userSignIn,
    getUserDetails
}

