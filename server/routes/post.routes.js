const express = require('express')
const router = express.Router({mergeParams: true})
const Post = require('../models/Post')
const auth = require('../middleware/auth.middleware')

router
    .route('/')
    .get(async (req, res) => {
        try {
            const list = await Post.find()
            res.status(200).send(list)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже'
            })
        }
    })
    .post(async (req, res) => {
        try {
            const newPost = await Post.create({
                ...req.body,
                userId: req.user._id
            })
            res.status(201).send(newPost)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже'
            })
        }
    })

router
    .route('/:postId')
    .get(async (req, res) => {
        try {
            const {postId} = req.params
            const post = await Post.findById(postId)
            res.status(200).send(post)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже'
            })
        }
    })
    .patch(auth, async (req, res) => {
        try {
            const {postId} = req.params
            const updatedPost = await Post.findById(postId)
            if (updatedPost.userId.toString() === req.user._id) {
                await updatedPost.updateOne(req.body, {new: false})
                res.send(null)
            } else {
                res.status(403).json({message: 'Нет доступа на редактирование'})
            }
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже'
            })
        }
    })
    .delete(async (req, res) => {
        try {
            const {postId} = req.params
            const removedPost = await Post.findById(postId)
            if (removedPost.userId.toString() === req.user._id) {
                await removedPost.deleteOne()
                res.send(null)
            } else {
                res.status(403).json({message: 'Нет доступа на удаление'})
            }
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже'
            })
        }
    })

module.exports = router