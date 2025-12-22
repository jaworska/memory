import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, get, query, orderByChild, limitToFirst } from 'firebase/database';

// TODO: Replace with your Firebase config
// Get this from: Firebase Console > Project Settings > Your apps > Config
const firebaseConfig = {
    apiKey: "AIzaSyAZUYMByDjvaL6RhlLuuwIUwX47-hAXVDE",
    authDomain: "memory-game-76c66.firebaseapp.com",
    databaseURL: "https://memory-game-76c66-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "memory-game-76c66",
    storageBucket: "memory-game-76c66.firebasestorage.app",
    messagingSenderId: "55186150554",
    appId: "1:55186150554:web:77927344586f3e54253b23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Save score to Firebase
export const saveScore = async (playerName, time, clicks, level) => {
    try {
        const scoresRef = ref(database, 'scores');
        await push(scoresRef, {
            name: playerName,
            time: time,
            clicks: clicks,
            date: new Date().toISOString(),
            level: level
        });
        return true;
    } catch (error) {
        console.error("Error saving score:", error);
        return false;
    }
};

// Get rankings from Firebase
export const getRankings = async () => {
    try {
        const scoresRef = ref(database, 'scores');
        const topScoresQuery = query(scoresRef, orderByChild('time'), limitToFirst(100));
        const snapshot = await get(topScoresQuery);

        if (snapshot.exists()) {
            const scores = [];
            snapshot.forEach((child) => {
                scores.push(child.val());
            });
            return scores.sort((a, b) => a.time - b.time);
        }
        return [];
    } catch (error) {
        console.error("Error getting rankings:", error);
        return [];
    }
};
