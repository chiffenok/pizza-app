const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-auth');

const Pizza = require('../../models/Pizzas');
const User = require('../../models/User');

let count = 0;

router.get('/', async (req, res) => {
    Pizza.find()
        .sort({ date: -1 })
        .then((pizzas) => res.status(200).json(pizzas))
        .catch((err) => {
            res.status(500).json({ err });
        });
});

router.post('/', async (req, res) => {
    const newPizza = new Pizza({
        name: req.body.name,
    });

    newPizza
        .save()
        .then((pizza) => res.status(201).json(pizza))
        .catch((err) => {
            res.status(500).json({ err });
        });
});

router.put('/:id', checkAuth, async (req, res) => {
    try {
        let pizza1 = await Pizza.findById(req.params.id);
        //let user = await User.findById(req.userData.userId);

        if (!pizza1) return res.status(404).json({ msg: 'Pizza not found' });
        //if (!user) return res.status(404).json({ msg: 'User not found' });

        //console.log(user);
        /* Make sure user owns contact
      if (contact.user.toString() !== req.user.id) {
        return res.status(401).json({msg: 'Not authorized'});
      }*/
        let user = await User.update(
            { _id: req.userData.userId },
            { $inc: { givenLikes: +1 } }
        );

        Pizza.update({ _id: req.params.id }, { $inc: { likesCount: +1 } })
            .exec()
            .then((result) => {
                res.status(200).json({
                    msg: 'You liked the Pizza',
                    info: result.likesCount,
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    error: err,
                });
            });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
