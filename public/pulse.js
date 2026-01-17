var endpoint = "http://localhost:3000"; // the address of our backend server

var toggle = document.getElementById('toggle');
var person = JSON.parse(sessionStorage.getItem('loggedInUser'));
var theme; //variable that holds either dark or light
//↓saves 'forever' either "dark" or "light" across the other webpages
var savedTheme = localStorage.getItem("theme"); 

//
if (savedTheme) {
    theme = savedTheme;
    //if theme set as dark then run dark()
    if(theme === "dark")
        dark();
    //else if theme other(that would be light) then run light()
    else
        light();

    //this is to check if theme is checked or unchecked
    if(toggle) //if checked then theme should be dark, if not then it will turn it back
        toggle.checked = (theme === "dark");
}

//adding an event listener, prevents errors
if(toggle){
    toggle.addEventListener('change', changetheme);
}

//function to check if the toggle is checked or unchecked
function changetheme() {
    //if it is checked then the theme is set to "dark" and dark() runs
    if (toggle.checked) {
        theme = "dark";
        dark();
    } 
    //else if it is not then theme is set to "light" and light() runs
    else {
        theme = "light";
        light();
    }

    //saves theme in localStorage so it stays either on or off throughout the pages
    localStorage.setItem("theme", theme);
}
// this switches the body class between light and dark
function bodytoggle() {
    document.getElementById("darklight").classList.toggle("light");
    document.getElementById("darklight").classList.toggle("dark");
}

// set logo and hero image for dark mode
function dark() {
    // change logo to dark version
    document.getElementById("logoimg").src = "img/dark_logo.png";
       // if hero image exists, replace "light" in its src with current theme
    if (document.getElementById("heroimg") != null)
        document.getElementById("heroimg").src = document.getElementById("heroimg").src.replace("light", theme);
    bodytoggle();
}

// set logo and hero image for light mode
function light() {
    // change logo to light version
    document.getElementById("logoimg").src = "img/light_logo.png";
    // if hero image exists, replace "dark" in its src with current theme
    if (document.getElementById("heroimg") != null)
        document.getElementById("heroimg").src = document.getElementById("heroimg").src.replace("dark", theme);
    bodytoggle();
}

window.addEventListener("pageshow", () => {
    const savedTheme = localStorage.getItem("theme");
    const toggle = document.getElementById("toggle");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        document.body.classList.remove("light");
        toggle.checked = true;
    } 
    else {
        document.body.classList.add("light");
        document.body.classList.remove("dark");
        toggle.checked = false;
    }
});

//overlay
// open the full screen navigation overlay
function openNav() {
    document.getElementById("myNav").style.height = "100%";
}
// close the full screen navigation overlay
function closeNav() {
    document.getElementById("myNav").style.height = "0%";
}

// LOGIN FUNCTION
// login user with email and password
function logIn() {
    // read values from login form
    var userEmail = document.getElementById('email').value;
    var userPassword = document.getElementById('password').value;

// check if any required login field is empty
    if (userEmail === "" || userPassword === "") {
        var displayError = document.getElementById("error");
        displayError.style.display = "inline";
        displayError.style.color = "red";
        displayError.innerHTML = "Enter required fields!";
        // stop function if fields are empty
        return;
    }
    // send login request to backend
    fetch(endpoint+'/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // send email and password as JSON
        body: JSON.stringify({
            email: userEmail,
            password: userPassword
        })
    })

    .then(function(response) {
        // convert response to JSON
        return response.json();
    })

    .then(function(data) {
    // if login success, save user and go to activity log page
        if (data.success) {
            // save logged in user to session storage
            sessionStorage.setItem('loggedInUser', JSON.stringify(data.user));
            // redirect to activity log page
            window.location.href = "activitylog.html";
        } else {
            var displayError = document.getElementById("error");
            // show error message from server
            displayError.style.display = "inline";
            displayError.style.color = "red";
            displayError.innerHTML = data.message;
        }
    })
}

// SIGNUP FUNCTION 

// create a new user account
function signUp() {
    // read values from signup form
    var userFirstName = document.getElementById('fname').value;
    var userLastName = document.getElementById('lname').value;
    var userEmail = document.getElementById('email').value;
    var userPassword = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmpass').value;
    // check if any required signup field is empty

    if (userFirstName === "" || userLastName === "" || userEmail === "" || userPassword === "" || confirmPassword === "") {
        var displayError = document.getElementById("error");
        displayError.style.display = "inline";
        displayError.style.color = "red";
        displayError.innerHTML = "Enter required fields!";
        return;
    }
    // make sure both password fields match
    if (userPassword !== confirmPassword) {
        var displayError = document.getElementById("error");
        displayError.style.display = "inline";
        displayError.style.color = "red";
        displayError.innerHTML = "Passwords do not match!";
        return;
    }
    // send signup request to backend
    fetch(endpoint+'/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // send user info as JSON
        body: JSON.stringify({
            firstName: userFirstName,
            lastName: userLastName,
            email: userEmail,
            password: userPassword
        })
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // if signup success, save user and go to profile page
        if (data.success) {
            sessionStorage.setItem('loggedInUser', JSON.stringify(data.user));
            alert("You created a new account " + data.user.firstName + "!");
            window.location.href = "profile.html";
        } else {
            // show error from server
            var displayError = document.getElementById("error");
            displayError.style.display = "inline";
            displayError.style.color = "red";
            displayError.innerHTML = data.message;
        }
    })
}

// UPDATE PASSWORD FUNCTION 

// change password for existing user
function updatePassword() {
    // get current logged in user
    var loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    // get values from update password form
    var userEmail = document.getElementById('email').value;
    var newPassword = document.getElementById('newPassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    // check all fields are filled
    if (userEmail === "" || newPassword === "" || confirmPassword === "") {
        var displayError = document.getElementById("error");
        displayError.style.display = "inline";
        displayError.style.color = "red";
        displayError.innerHTML = "Please fill all fields!";
        return;
    }
    // make sure email entered matches logged in user
    if (userEmail !== loggedInUser.email) {
        var displayError = document.getElementById("error");
        displayError.style.display = "inline";
        displayError.style.color = "red";
        displayError.innerHTML = "Email does not match your account!";
        return;
    }
    // check new password and confirm password are same
    if (newPassword !== confirmPassword) {
        var displayError = document.getElementById("error");
        displayError.style.display = "inline";
        displayError.style.color = "red";
        displayError.innerHTML = "Passwords do not match!";
        return;
    }
    // send update password request to backend
    fetch(endpoint+'/update-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // send email and new password
        body: JSON.stringify({
            email: userEmail,
            newPassword: newPassword
        })
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // if password updated, save user and send to login page
        if (data.success) {
            sessionStorage.setItem('loggedInUser', JSON.stringify(data.user));
            alert("Password updated successfully!");
            window.location.href = "login.html";
        } else {
            alert(data.message);
        }
    })
}

// PROFILE UPDATE FUNCTION

// update profile data like weight, height, etc
function updateProfile() {
    // get logged in user
    var loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    // if no user in session, force login first
    if (!loggedInUser) {
        alert("Please log in first!");
        window.location.href = "login.html";
        return;
    }
    // get values from profile form
    var weight = document.getElementById('weight').value;
    var height = document.getElementById('height').value;
    var dob = document.getElementById('dob').value;
    var calorie = document.getElementById('calorie').value;
    var studyCheckbox = document.getElementById('myCheckbox');
    // if checkbox is checked, use value from studyBox, else set to "none"
    var study = studyCheckbox.checked ? document.getElementById('studyBox').value : "none";

    // make sure all required profile fields are filled
    if (weight === "" || height === "" || dob === "" || calorie === "") {
        var displayError = document.getElementById("error");
        displayError.style.display = "inline";
        displayError.style.color = "red";
        displayError.innerHTML = "Please fill all fields!";
        return;
    }
    // send update profile request to backend
    fetch(endpoint+'/update-profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // send profile data
        body: JSON.stringify({
            email: loggedInUser.email,
            weight: weight,
            height: height,
            dob: dob,
            calorie: calorie,
            study: study
        })
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // if success, store updated user and go to activity log
        if (data.success) {
            sessionStorage.setItem('loggedInUser', JSON.stringify(data.user));
            alert("Profile updated successfully!");
            window.location.href = "activitylog.html";
        } else {
            alert(data.message);
        }
    })
}

// LOAD PROFILE DATA WHEN PERSON VISITS THE PROFILE PAGE AFTER SIGNUP

// fill profile form with data from sessionStorage
function loadProfileData() {
    var loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    // if not logged in, send to login page
    if (!loggedInUser) {
        alert("Please log in first!");
        window.location.href = "login.html";
        return;
    }

    // if weight field exists, set it from user data
    if (document.getElementById('weight')) {
        document.getElementById('weight').value = loggedInUser.weight || "";
    }

    // if height field exists, set it from user data
    if (document.getElementById('height')) {
        document.getElementById('height').value = loggedInUser.height || "";
    }
    // if dob field exists, set it from user data
    if (document.getElementById('dob')) {
        document.getElementById('dob').value = loggedInUser.dob || "";
    }

    // if calorie field exists, set it from user data
    if (document.getElementById('calorie')) {
        document.getElementById('calorie').value = loggedInUser.calorie || "";
    }

    // handle study checkbox and text box based on stored user data
    if (document.getElementById('myCheckbox') && document.getElementById('studyBox')) {
        if (loggedInUser.study && loggedInUser.study !== "none") {
            document.getElementById('myCheckbox').checked = true;
            document.getElementById('studyBox').disabled = false;
            document.getElementById('studyBox').value = loggedInUser.study;
        }
    }
}

// PROFILE PAGE CHECKBOX FUNCTIONALITY

// enable / disable study textbox when checkbox is clicked
function profile() {
    var checkbox = document.getElementById('myCheckbox');
    var textbox = document.getElementById('studyBox');

    if (checkbox && textbox) {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
            // when checked, allow typing in textbox
                textbox.disabled = false;
            } else {
             // when unchecked, disable textbox and clear value
                textbox.disabled = true;
                textbox.value = "";
            }
        });
    }
}

// LOG ACTIVITY

// add a new activity for the logged in user
function logActivity() {
    // get logged in user or force login
    var loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        alert("Please log in first!");
        window.location.href = "login.html";
        return;
    }

    // get values from activity form
    var activityType = document.getElementById('types').value;
    var date = document.getElementById('date').value;
    var time = document.getElementById('appt').value;
    var intensity = document.getElementById('Intensity').value;
    var hours = document.getElementById('hours').value;
    var minutes = document.getElementById('minutes').value;
    var journal = document.getElementById('journal').value;

    // check required fields for activity
    if (!date || !time || hours === null || minutes === null) {
        alert("Please fill all required fields (Date, Time, Hours, Minutes)!");
        return;
    }

    // do not allow 0h 0m duration
    if (parseInt(hours) === 0 && parseInt(minutes) === 0) {
        alert("Please select a duration greater than 0!");
        return;
    }

    // send activity data to backend
    fetch(endpoint+'/log-activity', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // send email and activity details
        body: JSON.stringify({
            email: loggedInUser.email,
            activityType: activityType,
            date: date,
            time: time,
            intensity: intensity,
            hours: hours,
            minutes: minutes,
            journal: journal
        })
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // if success, update user and show calories burned
        if (data.success) {
            sessionStorage.setItem('loggedInUser', JSON.stringify(data.user));
            alert('Activity logged successfully!\nCalories burned: ' + data.activity.caloriesBurned + ' calories');
            // clear the form fields
            resetActivityForm();
        } else {
            alert(data.message);
        }
    })
}

// RESET ACTIVITY FORM FUNCTION
// reset all fields in activity form to default
function resetActivityForm() {
    document.getElementById('types').selectedIndex = 0;
    document.getElementById('Intensity').selectedIndex = 0;
    document.getElementById('date').value = '';
    document.getElementById('appt').value = '';
    document.getElementById('hours').selectedIndex = 0;
    document.getElementById('minutes').selectedIndex = 0;
    document.getElementById('journal').value = '';
}

// LOAD ACTIVITY HISTORY PAGE

// set up the activity history page when loaded
function initializeActivityHistoryPage() {
    var loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    // force login if user is not found
    if (!loggedInUser) {
        alert("Please log in first!");
        window.location.href = "login.html";
        return;
    }
    // set date input to today's date
    var today = new Date().toISOString().split('T')[0];
    if (document.getElementById('date')) {
        document.getElementById('date').value = today;
        // load activities for today by default
        loadActivitiesByDate(today);
    }

    // when user changes date, load activities for that date
    if (document.getElementById('date')) {
        document.getElementById('date').addEventListener('change', function(event) {
            loadActivitiesByDate(event.target.value);
        });
    }
}

// LOAD ACTIVITIES

// get all activities for one specific date
function loadActivitiesByDate(date) {
    var loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    // again, check if user is logged in
    if (!loggedInUser) {
        alert("Please log in first!");
        window.location.href = "login.html";
        return;
    }

    // call backend to fetch activities for given date and user email
    fetch(endpoint+'/get-activities-by-date?email=' + encodeURIComponent(loggedInUser.email) + '&date=' + date, {
        method: 'GET'
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // if success, show activities and update stats and analysis
        if (data.success) {
            displayActivities(data.activities, date);
            updateSummaryStats(data.stats);
            updateCriticalAnalysis(data.stats);
        } else {
            alert(data.message);
        }
    })
}

// DISPLAY ACTIVITIES

// show all activities in the analysis section
function displayActivities(activities, date) {
    // container where activities will be shown
    var activityContainer = document.querySelector('.analysis_box');
    // if container not found, log error and stop
    if (!activityContainer) {
        console.error("Activities container not found");
        return;
    }
    // clear any previous activity cards
    var existingActivities = document.querySelectorAll('.activity-card');
    existingActivities.forEach(function(card) {
        card.remove();
    });

    // if no activities on this date, show a simple message
    if (activities.length === 0) {
        var emptyMessage = document.createElement('p');
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.color = '#999';
        emptyMessage.innerHTML = 'No activities logged for this date';
        activityContainer.appendChild(emptyMessage);
        return;
    }

    // create a card for each activity and add it to the page
    activities.forEach(function(activity) {
        var activityCard = createActivityCard(activity);
        var header = activityContainer.querySelector('.an_header');
        // insert card after header if header exists
        if (header) {
            header.after(activityCard);
        } else {
            activityContainer.appendChild(activityCard);
        }
    });
}

// CREATE ACTIVITIES

// build one activity card element with details
function createActivityCard(activity) {
    var card = document.createElement('div');
    card.className = 'activity-card';
    // inline styles for layout of card
    card.style.cssText = `
        padding: 16px;
        margin: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
    `;
    // left side section for details text
    var detailsSection = document.createElement('div');
    detailsSection.style.cssText = `
        flex: 1;
        min-width: 200px;
    `;

    // activity type and time in heading
    var typeAndTime = document.createElement('h4');
    typeAndTime.style.margin = '0 0 8px 0';
    typeAndTime.innerHTML = activity.activityType + ' - ' + activity.time;

    // show duration, calories, and intensity in one line
    var durationAndCalories = document.createElement('p');
    durationAndCalories.style.cssText = `
        margin: 4px 0;
        font-size: 14px;
    `;
    durationAndCalories.innerHTML = '⏱️ ' + activity.duration.hours + 'h ' + activity.duration.minutes + 'm | 🔥 ' + activity.caloriesBurned + ' cal | 💪 ' + activity.intensity;

    // if user wrote a journal note, show it in italic
    if (activity.journal) {
        var journal = document.createElement('p');
        journal.style.cssText = `
            margin: 8px 0 0 0;
            font-size: 13px;
            font-style: italic;
        `;
        journal.innerHTML = '"' + activity.journal + '"';
        detailsSection.appendChild(journal);
    }

    // add main info to details section
    detailsSection.appendChild(typeAndTime);
    detailsSection.appendChild(durationAndCalories);

    // add details section to card
    card.appendChild(detailsSection);
    return card;
}

// UPDATE SUMMARY STATISTICS

// update the summary numbers (total sessions, hours, calories, study)
function updateSummaryStats(stats) {
    var totalElement = document.getElementById('total');
    if (totalElement) {
        // total number of exercise sessions
        totalElement.value = stats.totalExercised || 0;
    }

    var hoursElement = document.getElementById('hours');
    if (hoursElement) {
        // convert total minutes to whole hours
        hoursElement.value = Math.floor(stats.totalMinutes / 60) || 0;
    }

    var caloriesElement = document.getElementById('calories');
    if (caloriesElement) {
        // round calories to 1 decimal place
        caloriesElement.value = Math.round(stats.totalCalories * 10) / 10 || 0;
    }

    var studyElement = document.getElementById('study');
    if (studyElement) {
        // total study hours for that date
        studyElement.value = stats.studyHours || 0;
    }
}

// UPDATE CRITICAL ANALYSIS

// update extra analysis like steps, distance, total calories, total time
function updateCriticalAnalysis(stats) {
    // estimate steps from running activities
    var stepsElement = document.getElementById('steps_value');
    if (stepsElement) {
        var runningActivities = document.querySelectorAll('.activity-card');
        var estimatedSteps = 0;

        // for each card that has "Running", add steps based on total minutes
        runningActivities.forEach(function(card) {
            if (card.innerHTML.includes('Running')) {
                // simple rule: 100 steps per minute of running
                estimatedSteps += stats.totalMinutes * 100;
            }
        });
        // if we have steps, format with commas, else show 0
        stepsElement.innerHTML = estimatedSteps > 0 ? estimatedSteps.toLocaleString() : 0;
    }

    // estimate distance from total minutes of exercise
    var distanceElement = document.getElementById('distance_value');
    if (distanceElement) {
        // simple rule: 0.15 km per minute
        var distanceKm = Math.round(stats.totalMinutes * 0.15 * 10) / 10;
        distanceElement.innerHTML = distanceKm > 0 ? distanceKm + ' km' : '-';
    }

    // show total calories burned
    var totalCaloriesElement = document.getElementById('total_calories');
    if (totalCaloriesElement) {
        totalCaloriesElement.innerHTML = Math.round(stats.totalCalories * 10) / 10 || '-';
    }
    // show total exercise time in hours and minutes
    var exerciseTimeElement = document.getElementById('total_exercise');
    if (exerciseTimeElement) {
        var hours = Math.floor(stats.totalMinutes / 60);
        var minutes = stats.totalMinutes % 60;
        exerciseTimeElement.innerHTML = hours > 0 || minutes > 0 ? hours + 'h ' + minutes + 'm' : '-';
    }
}

// INITIALIZE PAGE ON LOAD

// when page is fully loaded, set up profile and history pages
document.addEventListener('DOMContentLoaded', function() {
    // always set up profile checkbox behavior
    profile();

    // if we are on profile page, load profile data
    if (window.location.pathname.includes('profile.html')) {
        loadProfileData();
    }

    // if we are on activity history page, initialize it
    if (window.location.pathname.includes('activityHistory.html')) {
        initializeActivityHistoryPage();
    }
});

// Home page accordian functionality

// open and close accordion panels on the home page
function accordionFun() {
    var acc = document.getElementsByClassName("accordion");

    // add click listener to every accordion button
    for (var i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            // toggle active css class
            this.classList.toggle("active");
            // the panel is the next sibling element
            var panel = this.nextElementSibling;
            // if panel is open, close it
            if (panel.style.maxHeight && panel.style.maxHeight !== "0px") {
                panel.style.maxHeight = "0px";
                panel.style.paddingTop = "0px";
                panel.style.paddingBottom = "0px";
            } else {
                // if panel is closed, open it and add padding
                panel.style.maxHeight = panel.scrollHeight + "px";
                panel.style.paddingTop = "18px";
                panel.style.paddingBottom = "18px";
            }
        });
    }
}

//export {logIn, signUp, updatePassword, updateProfile, logActivity}
