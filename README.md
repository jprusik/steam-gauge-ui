Steam Gauge UI
==============

**NOTE: THIS REPO IS A WORK-IN-PROGRESS REBUILD OF THE [STEAM GAUGE](https://github.com/jprusik/steam-gauge) FRONT-END AND PRESENTLY LACKS FEATURE PARITY AND OPTIMIZATIONS SUITABLE FOR PRODUCTION ENVIRONMENTS.**

[Steam Gauge](https://www.mysteamgauge.com) is a collection of web apps driven by technologies like [Flask](http://flask.pocoo.org) and [React](https://reactjs.org) in order to produce data-rich Steam account summaries.

This repository represents development of a dedicated React front-end app which serves as the user interface to the Steam Gauge back-end. This app is presently being migrated from Jinja/Python to React in order to improve overall app performance and make the codebase easier to maintain through the separation of concerns.

Requirements
------------

- [yarn](https://yarnpkg.com) or [npm](https://www.npmjs.com/) package manager
- (optional for development) [Node.js](https://nodejs.org/)
- other dependencies can be found in `package.json`

Usage
-----

- `yarn install` or `npm install` to download the app dependencies
- `yarn start` or `npm start` to run the react server
- `yarn build` or `npm run build` to build the app for production

Limitations & Known Issues
--------------------------

- Presently, there is no testing to mitigate regressions.

Author
------

Jonathan Prusik [@jprusik](https://github.com/jprusik)
www.classynemesis.com
