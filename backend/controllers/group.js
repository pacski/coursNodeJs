const bcrypt = require('bcryptjs')
const { request } = require('../app')
const Group = require('./../models/group')
const jsontoken = require('jsonwebtoken')
const server = require('../server')

exports.listOwnGroup = (req, res, next) => {
    console.log('req.body.userId:', req.body.userId)
    Group.find({userId: req.body.userId}).populate('owner')
        .then((messages) => {
            if (messages) {
                res.status(200).json(messages)
            }
    })
}
exports.list = (req, res, next) => {
    Group.find().populate('owner')
        .then((messages) => {
            if (messages) {
                res.status(200).json(messages)
            }
    })
}
exports.create = (req, res, next) => {
    const groupObject = req.body
    delete groupObject._id;
    const p = new Group({
        ...groupObject,
    })
    p.save()
        .then(() => res.status(201).json({ message: 'ok' }))
        .catch(error => res.status(400).json({ error}))
}
exports.delete = (req, res, next) => {
       Group.findOne({_id:req.params.id})
        .then( message => {
            Group.deleteOne({_id: req.params.id})
                .then(()=> res.status(200).json({message: 'ok'}))
                .catch(error => res.status(400).json({error: 'erroooos'}))
        })
        .catch(error => res.status(500).json({error:"test"}))  
}
exports.update = (req,res,next)=>{
    const groupObject = req.body
    Group.updateOne({_id: req.params.id},{...req.body, _id: req.params.id})
        .then(()=> res.status(200).json({message: 'ok'}))
        .catch(()=> res.status(400).json({ error}))
}