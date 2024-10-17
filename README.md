# Bingo Card App

This app allows players to join a Bingo game using a game code, fetch multiple Bingo cards, and check if a card is a winning card.

## How to Use

1. **Enter Game Code**: On the home page, enter the game code and click "Enter Game".
2. **View Bingo Cards**: The app will fetch and display Bingo cards for the entered game code.
3. **Check Win**: Click the "Check Win" button on each card to check if it is a winning card.
4. **Get Another Card**: Click the "Get Another Card" button to fetch a new Bingo card.

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs the dependencies.

### `npm run dev`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run lint`

Lints the codebase using ESLint.

## Project Structure

- **src/App.jsx**: The main component where users enter the game code.
- **src/PlayerDashboard.jsx**: The component that displays Bingo cards and allows users to check for wins.
- **src/routes.jsx**: Defines the routes for the application.
- **src/main.jsx**: The entry point of the application.
- **src/index.css**: Global CSS styles for the application.
- **src/App.css**: CSS styles specific to the App component.

## Detailed Explanation

### App.jsx

This component renders a form where users can enter a game code and join a game.

### PlayerDashboard.jsx

This component fetches and displays Bingo cards for the entered game code. It also allows users to check if a card is a winning card and fetch new cards.

### routes.jsx

Defines the routes for the application. It includes the home route (`/`) and the player dashboard route (`/bingo/play/:gameCode`).

### main.jsx

The entry point of the application. It sets up the React application with routing.

### index.css

Global CSS styles for the application.

### App.css

CSS styles specific to the App component.

## Example Usage

1. **Start the Development Server**:
   ```sh
   npm run dev