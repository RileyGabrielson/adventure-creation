# Adventure Creation

A simple visual interface for creating 'Choose Your Own Adventure' styles data structures. Written in React typescript.

## Project Goals

### Single Responsibility

In the spirit of reusability, a major goal of this project was to create components that are responsible for exactly one thing. Each component is built to be as agnostic as possible, allowing for reuse with different data structures. Seperating the business logic into domains that the UI subscribes to even allows for the interface to be scrapped and replaced with a different UI framework, while keeping the same core domain logic.

### Dependencies

An overarching goal of this project was to use as few dependencies as possible, and to create custom solutions for theme, an observable pattern, hexagonal architecture, and react context. Besides environment dependencies such as jest, react, and node, the only 3rd party dependency is react-motion-ux, a css animation library. See package.json for a full list of dependencies.

## Available Scripts

In the project directory, you can run:

### Quick Start

To run this application, first build the node modules, then run the app:

```
npm install
npm start
```

Click the + button in the top bar to create new nodes.
Right click on moments to edit or make new edges/choices.
Left click on choices to edit or delete edges.

If you would like to view your new adventure, make sure that one of the nodes has the keyword `(start)` in the title, then click on view.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
