# bxslider-electron-app

This is a minimal Electron application based on the [Quick Start Guide](http://electron.atom.io/docs/latest/tutorial/quick-start) and [bxslider-sample](https://github.com/tuantranf/bxslider-sample)

An basic Electron application needs just these files:

- `index.html` - A web page to render.
- `main.js` - Starts the app and creates a browser window to render HTML.
- `menu.js` - Application menu setting.
- `package.json` - Points to the app's main file and lists its details and dependencies.

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

### Setup
```bash
# Clone this repository
$ git clone https://github.com/tuantranf/bxslider-electron-app.git
# Go into the repository
$ cd bxslider-electron-app
# Install dependencies
$ npm install
# Run the app
$ npm start
```

### Package your application
 ```bash
$ npm run pack // for Mac OS & Windows
$ npm run pack:osx // for Mac OS
$ npm run pack:win32 // for Windows
```

#### License [MIT](LICENSE.md)
