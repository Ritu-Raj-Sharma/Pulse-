# Pulse

Pulse is a simple web app for tracking your physical activities. Log workouts like running or swimming, record duration, intensity, and calories burned, and look back at your activity history — all with a clean interface that supports both light and dark themes.

This was built as a first-year project.

## Features

- **Sign up & log in** — create an account and access your personal data
- **Log activities** — record activity type, date, time, intensity, duration, calories burned, and a short journal note
- **Activity history** — view past activities and filter them by date
- **Profile** — store details like weight, height, and date of birth
- **Password reset** — update your password if you forget it
- **Light / dark theme** — toggle between themes; your choice is remembered across pages

## Tech Stack

- **Backend:** Node.js with [Express](https://expressjs.com/)
- **Frontend:** Plain HTML, CSS, and JavaScript (no framework)
- **Testing:** [Vitest](https://vitest.dev/)

> Note: user data is stored in memory in `server.js`, so it resets each time the server restarts. There's no database yet.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ritu-Raj-Sharma/Pulse-.git
   cd Pulse-
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the app

Start the server (auto-restarts on changes using nodemon):

```bash
npm run devStart
```

Then open your browser and go to:

```
http://localhost:3000
```

### Running tests

```bash
npx vitest
```

## Project Structure

```
Pulse-/
├── server.js              # Express server and API routes
├── verification.test.js   # Tests for input validation
├── package.json
└── public/                # Frontend (served as static files)
    ├── homePage.html
    ├── login.html
    ├── signup.html
    ├── profile.html
    ├── activitylog.html
    ├── activityHistory.html
    ├── newpassword.html
    ├── pulse.css
    ├── pulse.js           # Frontend logic + theme handling
    ├── verification.js    # Input validation functions
    └── img/               # Images and icons
```

## API Endpoints

| Method | Endpoint                  | Description                    |
|--------|---------------------------|-------------------------------|
| POST   | `/login`                  | Log a user in                 |
| POST   | `/signup`                 | Create a new account          |
| POST   | `/update-password`        | Reset a user's password       |
| POST   | `/update-profile`         | Update profile details        |
| POST   | `/log-activity`           | Save a new activity           |
| GET    | `/get-activities-by-date` | Fetch activities for a date   |

## Author

Ritu Raj Sharma
