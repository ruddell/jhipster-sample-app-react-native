# JHipsterReactNativeApp

> Generated by [JHipster React Native](https://github.com/ruddell/generator-jhipster-react-native) v4.1.3

<div>
    <a href="https://github.com/ruddell/generator-jhipster-react-native">
        <img src="https://raw.githubusercontent.com/ruddell/generator-jhipster-react-native/9f7665e3cafd6032de4a73d469789855b55a4f33/docs/images/jh-rn-logo.png" alt="JHipster React Native" height="200">
    </a>
</div>

JHipster React Native is designed to be used with a JHipster backend.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Generating Entities](#entities)
3. [E2E Tests](#e2e-tests)
4. [Tips](#tips)

## Getting Started

To start the Expo packager, run:

```bash
npm start
```

To run on iOS, after the Expo packager starts:

- Press `i`
- To choose the emulator, press `Shift+i`

To run on Android, after the Expo packager starts:

- Press `a`
- To choose the emulator, press `Shift+a`

To run on Web, after the Expo packager starts:

- Press `w`

You can find out more about the Expo CLI and other Expo Features in the [Expo documentation](https://docs.expo.io/).

## Generate Entities

To generate entities:

```bash
jhipster entity <name>
```

Or to import JDL:

```bash
jhipster jdl <file.jdl>
```

## E2E Tests

See the example end-to-end test in [`e2e/home-screen.spec.js`](e2e/home-screen.spec.js).

To run the e2e tests:

```bash
npm run test:e2e
```

## Tips

- When running your JHipster backend locally for Android, make sure to run `adb reverse tcp:8080 tcp:8080` so the app can communicate with your backend.
- When running your JHipster backend on Web, make sure to enable CORS in your backend's `src/main/resources/config/application-*.yml` files.
