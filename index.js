const express = require('express');
const app = express();
const mongooseConnect = require('./helper/mongooseConnect');
const User = require('./model/user');
const { notificationScheduler } = require('./cron/notification_cron');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
mongooseConnect();
notificationScheduler();

app.get('/register', async(req, res)=>{
    try {
        // const payload = {
        //     username: req.body.username,
        //     email: req.body.email,
        //     password: req.body.password,
        //     timezone: req.body.timezone,
        //     fcm_token: 'token_one',
        // }
        
        // inserting dummy user payload
        const payload = [
        {
            username: "user one",
            email: "userone@yopmail.com",
            password: "123456",
            timezone: "America/New_York",
            fcm_token: 'token_one',
        },
        {
            username: "user two",
            email: "usertwo@yopmail.com",
            password: "123456",
            timezone: "Europe/Berlin",
            fcm_token: 'token_two',
        },
        {
            username: "user three",
            email: "userthree@yopmail.com",
            password: "123456",
            timezone: "Canada/Central",
            fcm_token: 'token_three',
        }
    ]
        const registeredUser = await User.insertMany(payload);
        return res.status(200).json({data: registeredUser});
    } catch (error) {
        return res.status(500).json({
            message: `Something went wrong`,
        });  
    }
})

app.listen(3000, () => {
    console.log(`Listening to 3000`);
});