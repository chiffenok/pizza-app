const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../../models/User');
const TOCKEN_EXPIRES_IN = 300;

router.post('/signup', (req, res) => {
    User.find({ email: req.body.email })
        .exec()
        .then((user) => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'Mail exists',
                });
            } else {
                bcrypt.hash(req.body.password, 10, function (err, hash) {
                    if (err) {
                        return res.status(500).json({
                            error: err,
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                        });
                        user.save()
                            .then((result) => {
                                res.status(201).json({ user });
                            })
                            .catch((err) => {
                                res.status(500).json({ err });
                            });
                    }
                });
            }
        });
});

router.post('/login', (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then((user) => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed email',
                });
            }
            bcrypt.compare(
                req.body.password,
                user[0].password,
                (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: 'Auth failed',
                        });
                    }
                    if (result) {
                        const token = jwt.sign(
                            {
                                email: user[0].email,
                                userId: user[0]._id,
                            },
                            process.env.JWT_KEY || 'test',
                            {
                                expiresIn: TOCKEN_EXPIRES_IN,
                            }
                        );
                        return res.status(200).json({
                            message: 'Auth successful',
                            token: token,
                            tokenExpiresIn: TOCKEN_EXPIRES_IN
                        });
                    }
                    res.status(401).json({
                        message: 'Auth failed pass',
                    });
                }
            );
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});

router.get('/', (req, res, next) => {
    User.find()
        .select('email givenLikes')
        .sort({givenLikes: -1})
        .exec()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});

module.exports = router;
