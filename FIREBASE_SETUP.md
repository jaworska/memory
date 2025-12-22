# Firebase Setup Guide

To enable global rankings that persist across all users, follow these steps:

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name (e.g., "memory-game")
4. Disable Google Analytics (optional)
5. Click "Create project"

## 2. Enable Realtime Database

1. In your Firebase project, click "Realtime Database" in the left menu
2. Click "Create Database"
3. Select a location (choose one close to your users)
4. Start in **test mode** (for development)
   - Note: For production, set up proper security rules
5. Click "Enable"

## 3. Get Your Firebase Config

1. Go to Project Settings (gear icon) → General tab
2. Scroll down to "Your apps"
3. Click the web icon `</>`
4. Register your app with a nickname
5. Copy the `firebaseConfig` object

## 4. Update Your Code

Open `src/firebase.js` and replace the placeholder config with your actual values:

```javascript
const firebaseConfig = {
  apiKey: "AIza...", // Your actual API key
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123",
};
```

## 5. Set Up Security Rules (Important!)

For production, update your database rules:

1. Go to Realtime Database → Rules tab
2. Replace with these rules:

```json
{
  "rules": {
    "scores": {
      ".read": true,
      ".write": true,
      ".indexOn": ["time"],
      "$scoreId": {
        ".validate": "newData.hasChildren(['name', 'time', 'clicks', 'date', 'level']) && newData.child('name').isString() && newData.child('time').isNumber() && newData.child('clicks').isNumber() && newData.child('date').isString() && newData.child('level').isString()"
      }
    }
  }
}
```

3. Click "Publish"

**IMPORTANT:** The `".indexOn": ["time"]` line is required for sorting scores by time. Without it, you'll get an index error.

## 6. Test Your App

1. Enter your name
2. Complete the memory game
3. Check if your score appears in rankings
4. Open the app in a different browser/device - you should see the same rankings

## How It Works

- When a player completes the game, their score (name, time, clicks) is saved to Firebase
- Rankings are automatically fetched and sorted by time
- All users see the same global top 10 rankings
- Data persists permanently in Firebase's cloud database

## Alternative: Use Environment Variables (Recommended for Production)

Create a `.env` file in your project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

Then update `src/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
```

Add `.env` to your `.gitignore` to keep credentials private!
