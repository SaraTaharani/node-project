const express = require('express');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const router = express.Router()
const usersController = require("../controllers/usersController")
const todosRouter = require("./todosRouter")
const postsRouter = require('./postsRouter');
const { getUserFullDetails } = require('../models/usersModel');
router.use('/:userId/posts/', postsRouter);

router.post("/logIn", async (req, res) => {
    try {
        const body = (req.body)
        const user = await usersController.CheckIfExist(body.username, body.password);
        res.send(user);
    }
    catch (err) {
        res.status(500).send(err);
    }

})

router.post("/signUp", async (req, res) => {
    try {
        const body = (req.body)
        const userId = await usersController.CheckIfDoesNotExist(body.username, body.password);
        if (userId!=0)
        res.status(200).send(await getUserFullDetails(userId));
        else
        res.status(400).send("The user is already exist");  
    }
    catch (err) {
        res.status(500).send(err);
    }
})

router.put("/", async (req, res) => {
    try {
        const body = (req.body)
        console.log(body);
        const result = await usersController.UPDATE(body.username, body.name, body.email, body.phone, body.address.city, body.address.street);
       res.status(200).send(await getUserFullDetails(result))
    }
    catch (err) {
        throw err;
    }
})






































// router.route('/')
// .get(async (req, res) => {
//     const user=usersController.CheckIfExist(req.query.username, req.query.password)
//    res.send(user)
// })
//     .post(async (req, res) => {
//         // const user=req.body
//         // const username = user.username;
//         // const password = user.password;
//         const returnedUser = await usersController.CheckIfExist(req.query.username, req.query.password);
//         res.send(returnedUser);
//         // const response = await usersController.CREATE(user.name, user.username, user.email,user.phone)//addressId
//         // res.send(await usersController.ReadById(response.insertId));
//     });
//     router.route('/:userId/info').get( async (req, res) => {
//         const userId = req.params.userId;
//         const user = await usersController.ReadById(userId);
//         res.send(user);
//     })
//     // router.route('/username=:username&password=:password').get( async (req, res) => {
//     //     const username = req.params.username;
//     //     const password = req.params.password;
//     //     const user = await usersController.ReadById(userId);
//     //     res.send(user);
//     // })
//     // router.route('/').get( async (req, res) => {
//     //     const user=req.body
//         // const username = user.username;
//         // const password = user.password;
//     //     const returnedUser = await usersController.CheckIfExist(username,password);
//     //     res.send(returnedUser);
//   //  })
//     // app.put(async (req, res) => {
//     //     const userId = req.params.userId;
//     //     const user = req.body;
//     //     const response = await usersController.UPDATE(user.name, user.username, user.email,user.phone)//addressId)
//     //     res.send(await usersController.ReadById(userId));
//     // });

module.exports = router;

