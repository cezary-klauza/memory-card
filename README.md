# Memory Card Game

Memory Card Game is a browser-based card-matching game built with React. Players flip cards to find matching pairs, and the game tracks the number of attempts, time, and matched pairs. The game includes multiple difficulty levels and customizable card illustrations.

## Table of Contents

- [Folder Structure](#folder-structure)
- [Game Logic](#game-logic)
  - [Home Page](#home-page)
  - [Game Page](#game-page)
  - [Timer Setup](#timer-setup)
  - [Card Component](#card-component)
- [Constants](#constants)
- [Conclusion](#conclusion)

## Folder Structure

### SCSS Styles

- `/src/styles/`: Root folder for all SCSS files.
  - **Mixins and Fonts**: `/src/styles/_typography.scss` - Contains mixins for typography and font settings.
  - **Color Variables**: `/src/styles/_variables.scss` - Defines SCSS variables for colors used throughout the app.
  - **Main Stylesheet**: `/src/styles/main.scss` - Imports all other SCSS files, fonts, and global styles.

#### Pages Styles:

- `/src/styles/pages/`:
  - `_game.scss`: Styles specific to the game page.
  - `_home.scss`: Styles for the home page.

#### Component Styles:

- `/src/styles/components/`:
  - `_button.scss`: Styles for buttons.
  - `_gamesHistory.scss`: Styles for the game history component.
  - `_logo.scss`: Styles for the logo component.
  - `_selectList.scss`: Styles for the selection list component.

### React Components and Pages

#### Main App File

- `/src/App.tsx`: Contains the app's root, including the logo and React Router setup for navigating between pages.

#### Pages

- `/src/pages/Home.tsx`: Displays the homepage, where players can select the game difficulty and view their game history.
- `/src/pages/Game.tsx`: Displays the actual game board with cards and tracks the game state.

#### Components

- `/src/components/`:
  - `Button.tsx`: A reusable button component.
  - `Card.tsx`: The game card component that handles card flipping and matching logic.
  - `GameHistory.tsx`: Displays the player's past games.
  - `Logo.tsx`: Displays the game logo.
  - `SelectList.tsx`: A component for selecting game settings (difficulty, illustrations, etc.).

### Constants

- `/src/constants/index.ts`: Defines constant values such as card illustrations and difficulty levels.

### Zustand Stores

- `/src/stores/`:
  - `gameStore.ts`: Manages the game's state (card selection, matched cards, timer, etc.).
  - `settingsStore.ts`: Manages game settings such as difficulty level and card illustrations.

---

## Game Logic

### Home Page

On the home page (`/src/pages/Home.tsx`), players can:

- Select the difficulty level.
- Choose the card illustration set.
- View their previous games (using the `GameHistory` component).

The selected difficulty and illustrations are stored using the `settingsStore`:

```typescript
export const useSettingStore = create<SettingsState & SettingsAction>(
  (set) => ({
    difficulty: undefined,
    illustrations: undefined,
    setDifficulty: (difficulty) => set({ difficulty }),
    setIllustrations: (name) => {
      const newIllustrations = illustrations.find(
        (item) => item.title === name
      );
      set({ illustrations: newIllustrations });
    },
    clear: () => set({ difficulty: undefined, illustrations: undefined }),
  })
);
```

## Game Page

On the game page (`/src/pages/Game.tsx`), the game logic is managed by `gameStore`:

```typescript
export const useGameStore = create<GameState & GameActions>((set) => ({
  list: [],
  selected: [],
  matched: [],
  fails: 0,
  time: 0,

  setList: (list) => {
    const newList = list.concat(list).sort(() => 0.5 - Math.random());
    set({ list: newList });
  },
  select: (index, image) => {
    set((state) =>
      state.selected.length === 1
        ? state.selected[0].image === image
          ? { selected: [], matched: [...state.matched, image] }
          : {
              selected: [...state.selected, { index, image }],
              fails: state.fails + 1,
            }
        : { selected: [{ index, image }] }
    );
  },
  clear: () => set({ selected: [] }),
  startTimer: () => set((state) => ({ time: state.time + 1 })),
  end: () => set({ selected: [], matched: [], list: [], fails: 0, time: 0 }),
}));
```

## Timer Setup

To track the game duration, a timer is implemented using `useRef` and `useEffect` hooks. The timer is updated every second using the `startTimer` method from the `gameStore`, which increments the time state.

Add the following code to manage the timer's lifecycle (start on game load and clear when the game ends or the component unmounts):

```typescript
import { useEffect, useRef } from "react";
import { useGameStore } from "../stores/gameStore";

const GamePage = () => {
  const { startTimer, time, end } = useGameStore();
  const timer = useRef<number | null>(null); // Declare the timer reference

  // Set up the timer in useEffect
  useEffect(() => {
    // Start the timer when the component is mounted
    timer.current = window.setInterval(startTimer, 1000);

    // Clear the timer when the component is unmounted or when the game ends
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [startTimer]);

  return (
    <div>
      <header>
        <h1>Memory Card Game</h1>
        <p>Time: {time} seconds</p> {/* Display the timer */}
      </header>
      {/* Rest of your game page code */}
    </div>
  );
};
```

This code ensures:

- The timer starts when the game page is loaded.
- The timer is cleared when the component is unmounted or when the game ends.
- The time is displayed in the header of the game page, updating every second.

## Card Component

The card is clickable, and when clicked, it calls the `select` method with the card's index and image. The card becomes "active" (flips and shows its image) if it is part of the matched state or selected state.

```typescript
useEffect(() => {
  setIsActive(
    matched.includes(img) || selected.some((item) => item.index === index)
  );
}, [img, index, matched, matched.length, selected, selected.length]);
```

The animation of the card flipping is handled by Framer Motion.

```typescript
<motion.div
  initial={{ opacity: 0 }}
  animate={isActive ? { opacity: 1 } : { opacity: 0 }}
>
```

## Constants

The constants file (`/src/constants/index.ts`) defines:

- **Illustrations**: A list of available illustration sets, each with an icon, title, and corresponding list of images.

```typescript
export const illustrations = [
    { icon: 'numbers.svg', title: 'Numbers', list: [...] },
    // other sets
];
```

- **Difficulty Levels**: Difficulty levels are represented by icons and titles.

```typescript
export const difficulty = [
  { icon: "clover.svg", title: "Easy" },
  { icon: "smile.svg", title: "Normal" },
  { icon: "fire.svg", title: "Hard" },
];
```

## Conclusion

The Memory Card Game provides a customizable gameplay experience, allowing users to choose difficulty levels and card illustrations. Game state and settings are managed using Zustand, with smooth animations powered by Framer Motion. The timer is managed using `useRef` and `useEffect` to track game duration, and the project is well-structured with a clear separation of concerns for styles, components, and game logic.
