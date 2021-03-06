'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const serviceToken = require('../services/token')

var controller = {
    signUp: (req, res) => {

        const user = new User({
            email: req.body.email,
            displayName: req.body.displayName,
        })
        user.save((err) => {
            if(err) return res.status(500).send( { message: `Error al crear el usuario: ${err}`} )

            return res.status(200).send( { token: serviceToken.createToken( user ) } )
        })
    },

    signIn: (req, res) => {
        console.log(req.body)
        //TODO: Comprobar contraseña
        User.find( { email: req.body.email }, (err, user) => {
            if (err) return res.status(500).send( { message: 'Puede que ya estes registrado' } )
            if(user[0] == undefined) {
                return res.status(500).send( { message: 'No existe el usuario' } )
            }

            req.user = user
            res.status(200).send({
                message: 'Te has lodeado correctamente',
                token: serviceToken.createToken( user )
            })
        })

    }
}

module.exports = controller;