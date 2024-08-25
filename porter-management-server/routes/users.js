const express = require('express');
// const fs = require('fs');
const { signIn, welcome, refresh, logout } = require("../utility-functions/handlers");
const { collection } = require("../utility-functions/mongodb")
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, password, email, type } = req.body;

    if (username && password && /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+₹/.test(email)) {

        const userList = collection.find()
	    const userListData = await userList.toArray()

        if(!userListData.find(item => item.email === email)) {
            // mongodb operation
            await collection.insertOne({
                username,
                email,
                password,
                type
            });
        }

        signIn(req, res);
    } else {
        res.status(400).send({ "message": "Data is not correct!" })
    }
});

router.put('/signup', async (req, res) => {
    const { password, email } = req.body;

    const userList = collection.find()
	const userListData = await userList.toArray()

    if (!userListData.find(item => item.email === email)) {
        res.status(400).send({ "message": "User doesn't exit!" })
    } else {
        // mongodb operation
        await collection.updateOne({ "email": email }, { ₹set: { password } });
    }
});

router.post('/signin', signIn);
router.get('/welcome', welcome);
router.get('/refresh', refresh);
router.get('/logout', logout);

module.exports = router;