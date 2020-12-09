const express = require('express')
const router = express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth.js')

router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findOne('id', req.payload.id)

        return res.status(200).send(user)
    } catch (e) {return res.status(500).send({error: true, message: e})}
})

router.get('/:id/', auth, async (req, res) => {
    try {
        const user = await User.findOne('id', req.params.id)
        if (!user) return res.status(404).send({error: true, message: 'User not found'})

        return res.status(200).send(user)
    } catch (e) {return res.status(500).send({error: true, message: e})}
})

router.post('/', auth, async (req, res) => {
    try {
        const inserted = await User.create(req.body)
        return res.status(200).send(inserted)
    } catch (e) {return res.status(500).send({error: true, message: e})}
})

router.patch('/', auth, async (req, res) => {
    try {
        const user = await User.findOne('id', req.body.id)
        if (!user) return res.status(404).send({error: true, message: 'User not found'})

        await User.update(req.body)

        return res.status(200).send(user)
    } catch (e) {return res.status(500).send({error: true, message: e})}
})

router.delete('/', auth, async (req, res) => {
    try {
        const user = await User.findOne('id', req.body.id)
        if (!user) return res.status(404).send({error: true, message: 'User not found'})

        await User.delete(req.body.id)

        return res.status(200).send(user)
    } catch (e) {res.status(500).send({error: true, message: e})}
})

router.get('/:id/related', auth, async (req, res) => {
    try {
        const users = await User.getRelatedUsers(req.params.id === 'me' ? req.payload.id : req.params.id)

        return res.status(200).send(users)
    } catch (e) {return res.status(500).send({error: true, message: e})}
})

router.get('/:id/marks', auth, async (req, res) => {
    try {
        const marks = await User.getAllMarks(req.payload.id)
        return res.status(200).send(marks)
    } catch (e) {return res.status(500).send({error: true, message: e})}
})

module.exports = router