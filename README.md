# taco-surveyor
We survey you Taco knowledge to help you kick ass at lunch.

# Usage
Since this is a demo app, login is only simulated. There is no HTTPS connection and there are no passwords. Enter a user name and you will be that user. Logout and enter a new user name to switch users. Use the user name `admin` to become the Admin user who has question management and statistics capabilities.

# Install
## Get the code
All commands below have been tested with `npm v2.14.7` and `node vv4.2.2`. While older versions of npm/node should be compatible, no testing has been done to verify this.

```
git clone https://github.com/MatthewHerbst/taco-surveyor.git
npm install
```

## Setup your database
**! IT IS EXTREMELY RECOMMENDED THAT YOU CHANGE THE BELOW LISTED DEFAULT USER/PASSWORD IN A PRODUCTION ENVIRONMENT !**

At a minimum, you will require a MySQL database running on your localhost, port 3306. The database must have the user account `taco_master` with the password `taco_warlord`. These values can be modified in `index.js` at the project root.

In addition, the database must have table `taco_surveyor`, and user `taco_warlord` must have full privileges within this table.

If tables from a previous install (without a major version change) already exist the app should continue to work, picking up the existing data automatically when run.

The app has been tested with `MySQL v5.7.10`. While older versions of MySQL should be compatible, no testing has been done to verify this.

# Run

## First, choose your build type:
### Dev
Dev builds include watch tasks for auto-rebuilding on code change.
Dev builds do not remove comments and logging code from the build.
Dev builds do not perform minification of core JavaScript

`npm run dev`

The build is completed after you see the x bytes written message. The command will not return due to the watch tasks. Force-exit the command when you want to stop watching and get control of the command line back.

### Prod
Prod builds do not include any development tools such as watch and auto-building available in dev builds.
Prod builds remove all comments and logging code from the build.
Prod builds perform minification of core JavaScript. Source maps are provided.

`npm run prod`

The build is completed after you see the x bytes written message. The command will return once the build is complete.

## Start the server
Builds will be placed in `dist`, which acts as the document root.

After building, you may start the server/app with the following:

`npm start`

Visit http://localhost:3333 in your browser of choice.
