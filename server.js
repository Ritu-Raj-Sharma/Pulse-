// Dummy userdata 
let userData = [
    {
        email: "random@gmail.com",
        password: "randompassword",
        firstName: "Random first name",
        lastName: "Random last name",
        weight: 70,
        height: 170,
        dob: "2001-01-01",
        calorie: 900,
        study: "none",
        activities: [
            {
                id: 1764182279791,
                activityType: "running",
                date: "2025-11-25",
                time: "01:39 PM",
                intensity: "light",
                duration: {
                    hours: 1,
                    minutes: 15,
                    totalMinutes: 75
                },
                caloriesBurned: 600,
                journal: "Did some running, felt good!",
                loggedAt: "2025-11-26T18:42:13.596Z"
            },
            {
                id: 1764182817709,
                activityType: "swimming",
                date: "2025-11-25",
                time: "01:39 PM",
                intensity: "moderate",
                duration: {
                    hours: 1,
                    minutes: 15,
                    totalMinutes: 75
                },
                caloriesBurned: 600,
                journal: "Did some Swimming, felt good!",
                loggedAt: "2025-11-26T18:42:13.596Z"
            }
        ]
    },
    {
        email: "rituraj@my.yorku.ca",
        password: "hijklmnop",
        firstName: "Ritu Raj",
        lastName: "Sharma",
        weight: 70,
        height: 170,
        dob: "2001-01-29",
        calorie: 800,
        study: 3,
        activities: [
            {
                id: 1764182279791,
                activityType: "running",
                date: "2025-11-25",
                time: "01:39 PM",
                intensity: "light",
                duration: {
                    hours: 1,
                    minutes: 15,
                    totalMinutes: 75
                },
                caloriesBurned: "600",
                journal: "Did some running, felt good!",
                loggedAt: "2025-11-26T18:42:13.596Z"
            },
            {
                id: 1764182817709,
                activityType: "swimming",
                date: "2025-11-26",
                time: "01:39 PM",
                intensity: "moderate",
                duration: {
                    hours: 1,
                    minutes: 15,
                    totalMinutes: 75
                },
                caloriesBurned: 600,
                journal: "Did some Swimming, felt good!",
                loggedAt: "2025-11-26T18:42:13.596Z"
            },
            {
                id: 1764182925561,
                activityType: "studying",
                date: "2025-11-26",
                time: "02:50 PM",
                intensity: "light",
                duration: {
                    hours: 1,
                    minutes: 15,
                    totalMinutes: 75
                },
                caloriesBurned: 112.5,
                journal: "Did some Swimming, felt good!",
                loggedAt: "2025-11-26T18:42:13.596Z"
            }
        ]
    }
];
// Dummy Calorie burn rate
const calorieRates = {
    running: {
        light: 8,
        moderate: 10,
        heavy: 13
    },
    gym: {
        light: 3,
        moderate: 6,
        heavy: 8
    },
    swimming: {
        light: 6,
        moderate: 8,
        heavy: 11
    },
    cycling: {
        light: 4,
        moderate: 7,
        heavy: 10
    },
    studying: {
        light: 1.5,
        moderate: 1.5,
        heavy: 1.5
    }
};
// Creating the express for server side
const path = require('path');
const express = require("express");
const app = express();

app.use(express.json());

// POST route to handle login requests
app.post('/login', function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
// check if user input and match with dummy data
    let user = null;
    for (let i = 0; i < userData.length; i++) {
        if (userData[i].email === email) {
            user = userData[i];
            break;
        }
    }
// if user exists then checks for password
    if (user) {
        if (user.password === password) {
            res.json({
                success: true,
                message: "Login successful",
                user: user
            });
        } 
        else {
            res.json({
                success: false,
                message: "Wrong password! Please try again.",
                user: user
            });
        }
    } 
    else {
        res.json({
            success: false,
            message: "User not registered!"
        });
    }
});

// POST route to handle signup requests
app.post('/signup', function(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
// check if user input and match with dummy data
    let existingUser = null;
    for (let i = 0; i < userData.length; i++) {
        if (userData[i].email === email) {
            existingUser = userData[i];
            break;
        }
    }
// Checks if already user exists 
    if (existingUser) {
        // sends the responds to client side
        res.json({
            success: false,
            message: "User already exists with this email"
        });
    } 
    else {
        const newUser = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            weight: 0,
            height: 0,
            dob: "",
            calorie: 0,
            study: "none",
            activities: []
        };

        userData.push(newUser);

        res.json({
            success: true,
            message: "Account created successfully",
            user: newUser
        });
    }
});

// POST route to handle password update requests
app.post('/update-password', function(req, res) {
    const email = req.body.email;
    const newPassword = req.body.newPassword;
// check if user input and match with dummy data
    let userIndex = -1;
    for (let i = 0; i < userData.length; i++) {
        if (userData[i].email === email) {
            userIndex = i;
            break;
        }
    }
// if user exists then updates for new password
    if (userIndex !== -1) {
        userData[userIndex].password = newPassword;
// sends the responds to client side
        res.json({
            success: true,
            message: "Password updated successfully",
            user: userData[userIndex]
        });
    } 
    else {
        res.json({
            success: false,
            message: "User not found"
        });
    }
});

// POST route to handle profile update requests
app.post('/update-profile', function(req, res) {
    const email = req.body.email;
    const weight = req.body.weight;
    const height = req.body.height;
    const dob = req.body.dob;
    const calorie = req.body.calorie;
    const study = req.body.study;
// check if user input and match with dummy data
    let userIndex = -1;
    for (let i = 0; i < userData.length; i++) {
        if (userData[i].email === email) {
            userIndex = i;
            break;
        }
    }
// if user found add the profie data to their account
    if (userIndex !== -1) {
        userData[userIndex].weight = weight;
        userData[userIndex].height = height;
        userData[userIndex].dob = dob;
        userData[userIndex].calorie = calorie;
        userData[userIndex].study = study;

        res.json({
            success: true,
            message: "Profile updated successfully",
            user: userData[userIndex]
        });
    } 
    else {
        res.json({
            success: false,
            message: "User not found"
        });
    }
});

// POST route to log a new activity
app.post('/log-activity', function(req, res) {
    const email = req.body.email;
    const activityType = req.body.activityType;
    const date = req.body.date;
    const time = req.body.time;
    const intensity = req.body.intensity;
    const hours = req.body.hours;
    const minutes = req.body.minutes;
    const journal = req.body.journal;
// checks for user if they exist
    let userIndex = -1;
    for (let i = 0; i < userData.length; i++) {
        if (userData[i].email === email) {
            userIndex = i;
            break;
        }
    }

    if (userIndex === -1) {
        return res.json({
            success: false,
            message: "User not found"
        });
    }

    const totalMinutes = (parseInt(hours) * 60) + parseInt(minutes);
    const caloriePerMinute = calorieRates[activityType][intensity];
    const caloriesBurned = Math.round(caloriePerMinute * totalMinutes);
// creats a new activity
    const activity = {
        id: Date.now(),
        activityType: activityType,
        date: date,
        time: time,
        intensity: intensity,
        duration: {
            hours: parseInt(hours),
            minutes: parseInt(minutes),
            totalMinutes: totalMinutes
        },
        caloriesBurned: caloriesBurned,
        journal: journal,
        loggedAt: new Date().toISOString()
    };
// if user exists putting the activitites details to their account
    if (!userData[userIndex].activities) {
        userData[userIndex].activities = [];
    }

    userData[userIndex].activities.push(activity);
// sends the responds to client side
    res.json({
        success: true,
        message: "Activity logged successfully",
        activity: activity,
        user: userData[userIndex]
    });
});

// GET route to retrieve activities by specific date
app.get('/get-activities-by-date', function(req, res) {
    const email = req.query.email;
    const date = req.query.date;
// check for the user info
    let user = null;
    for (let i = 0; i < userData.length; i++) {
        if (userData[i].email === email) {
            user = userData[i];
            break;
        }
    }

    if (!user) {
        return res.json({
            success: false,
            message: "User not found"
        });
    }
// retrieve user activites on specific date and adds it to the website page
    const activitiesOnDate = [];
    for (let i = 0; i < user.activities.length; i++) {
        if (user.activities[i].date === date) {
            activitiesOnDate.push(user.activities[i]);
        }
    }
// total calories calcualted
    let totalCalories = 0;
    for (let i = 0; i < activitiesOnDate.length; i++) {
        totalCalories = totalCalories + activitiesOnDate[i].caloriesBurned;
    }
//total minutes calcualted
    let totalMinutes = 0;
    for (let i = 0; i < activitiesOnDate.length; i++) {
        totalMinutes = totalMinutes + activitiesOnDate[i].duration.totalMinutes;
    }
//total hours calcualted
    const totalHours = Math.floor(totalMinutes / 60);

    const stats = {
        totalActivities: activitiesOnDate.length,
        totalCalories: totalCalories,
        totalMinutes: totalMinutes,
        totalHours: totalHours,
        activitiesByType: {}
    };

    const studyActivities = [];
    for (let i = 0; i < activitiesOnDate.length; i++) {
        if (activitiesOnDate[i].activityType === 'studying') {
            studyActivities.push(activitiesOnDate[i]);
        }
    }
//total study hours calcualted
    let studyHours = 0;
    for (let i = 0; i < studyActivities.length; i++) {
        studyHours = studyHours + (studyActivities[i].duration.hours + studyActivities[i].duration.minutes / 60);
    }
//total study minutes calculated 
    let totalStudyMinutes = 0;
    for (let i = 0; i < studyActivities.length; i++) {
        totalStudyMinutes = totalStudyMinutes + studyActivities[i].duration.totalMinutes;
    }
// total exercise minutes calculated
    const totalExerciseMinutes = totalMinutes - totalStudyMinutes;
    const totalExerciseHours = Math.round((totalExerciseMinutes / 60) * 10) / 10;
// total activites exercised calculated
    let totalExercised = 0;
    for (let i = 0; i < activitiesOnDate.length; i++) {
        if (activitiesOnDate[i].activityType !== 'studying') {
            totalExercised = totalExercised + 1;
        }
    }
// sends the responds to client side
    res.json({
        success: true,
        activities: activitiesOnDate,
        stats: {
            totalActivities: stats.totalActivities,
            totalCalories: stats.totalCalories,
            totalMinutes: stats.totalMinutes,
            totalHours: stats.totalHours,
            studyHours: Math.round(studyHours * 10) / 10,
            totalExercised: totalExercised,
            totalExerciseTime: totalExerciseHours
        }
    });
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, function() {
    console.log("listening at Port 3000");
});
