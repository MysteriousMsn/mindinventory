const User = require('../model/user');
const moment = require('moment-timezone');
const schedule = require('node-schedule');

const sendNotificationToUser = async (fcm_token, message) => {
    // we can continue writing fcm code here
};

exports.notificationScheduler = async () => {
    //we can do a batch processing here incase of bulk data;
    // We can also add flag to update the status of notification sent

    const users = await User.find();
    if (!users.length) {
        console.log(`No user found for scheduling notification, please hit register endpoint`);
        return;
    }
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const morning_message = `Good morning, ${user.username}`;
        
        // to schedule notification at 8 am based on user's timezone
        const notification_time = moment.tz(user.timezone).startOf('day').add(8, 'hours');
        const job = schedule.scheduleJob(notification_time.toDate(), async () => {
            await sendNotificationToUser(user.fcm_token, morning_message);
        });
        console.log(`Notification scheduled for user with token ${user.fcm_token}`);
    }
}

