# taco-surveyor
We survey great Tacos to help you kick ass at lunch.

# Install
All commands below have been tested with `npm v2.14.7` and `node vv4.2.2`. While older versions of npm/node should be compatible, no testing has been done to verify this.

```
git clone https://github.com/MatthewHerbst/taco-surveyor.git
npm install
```

# Run

## First, choose your build type:
### Dev
Dev builds include watch tasks for auto-rebuilding on code change.
Dev builds do not remove comments and logging code from the build.

`npm run dev`

The build is completed after you see the x bytes written message. The command will not return due to the watch tasks. Force-exit the command when you want to stop watching and get control of the command line back.

### Prod
Prod builds do not include any development tools such as watch and auto-building available in dev builds.
Prod builds remove all comments and logging code from the build.

`npm run prod`

The build is completed after you see the x bytes written message. The command will return once the build is complete.

# Start the server

Builds will be placed in `dist`, which acts as the document root.

`npm start` will start the server. Visit http://localhost:3333 in your browser of choice.
