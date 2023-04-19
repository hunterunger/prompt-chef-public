import axios from "axios";
import { FirebaseOptions, getApp, initializeApp } from "firebase/app";
import {
    Auth,
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    User,
    UserCredential,
} from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

export const firebaseConfig = {
    // add your config here
};

function createFirebaseApp(config: FirebaseOptions) {
    try {
        return getApp();
    } catch {
        const app = initializeApp(config);
        return app;
    }
}

export function firestoreDb() {
    const db = getFirestore();
    return db;
}

const firebaseApp = createFirebaseApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);

// emulator connection
if (process.env.NEXT_PUBLIC_USE_FIRESTORE_EMULATOR) {
    const db = getFirestore();
    console.log("Connecting to emulators frontend");
    connectFirestoreEmulator(db, "localhost", 8080);
}

// Initialize Analytics and get a reference to the service

isSupported().then((supported: boolean) => {
    if (supported) {
        const analytics = getAnalytics(firebaseApp);
        console.log(
            analytics.app.automaticDataCollectionEnabled
                ? "Analytics enabled"
                : "Analytics disabled"
        );
    }
});

export async function handleGoogleLogin(auth: Auth) {
    await signInWithPopup(auth, new GoogleAuthProvider()).then(
        (result: UserCredential) => {
            const { user } = result;
            // Initialize the user account (fills in the user's data if it doesn't exist)

            initAccount(user);
        },
        (error: any) => {
            console.error(error);
        }
    );
}

export async function initAccount(user: User) {
    if (user) {
        const authtoken = await user.getIdToken(true);
        axios.post(
            "/api/init-account",
            {},
            {
                headers: {
                    authtoken: authtoken,
                },
            }
        );
    }
}
