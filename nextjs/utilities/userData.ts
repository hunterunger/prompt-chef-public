import { RecipeType, UserDataType } from "./dataTypes";
// firebase firestore
import {
    deleteDoc,
    deleteField,
    doc,
    getDoc,
    getFirestore,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { firebaseAuth, firestoreDb } from "./firebase_frontend";

export async function getRecipe(
    key: string,
    setTo?: RecipeType
): Promise<RecipeType | undefined> {
    const library = await getLocalLibrary();

    // set to local storage or firestore if logged in
    if (setTo) {
        if (firebaseAuth.currentUser) {
            // merge with existing library
            console.log("Saving personal recipe to firestore");
            const userDocSnapshot = doc(
                firestoreDb(),
                "users",
                firebaseAuth.currentUser.uid
            );
            await setDoc(
                userDocSnapshot,
                {
                    library: { ...library, [key]: setTo },
                },
                { merge: true }
            );
            // clear local storage because it's now in firestore
            localStorage.setItem("library", "{}");
        } else {
            // when not logged in, set to local storage
            localStorage.setItem(
                "library",
                JSON.stringify({ ...library, [key]: setTo })
            );
        }
        return setTo;
    }

    const item = library[key];
    if (item) {
        return item;
    }

    // when the recipe is not located locally, try to get from firestore
    if (firebaseAuth.currentUser) {
        console.log("Loading user data from firestore");

        const userDocSnapshot = await getDoc(
            doc(firestoreDb(), "users", firebaseAuth.currentUser.uid)
        );

        if (userDocSnapshot.exists()) {
            const userDoc = userDocSnapshot.data();
            if (userDoc?.library) {
                const library = userDoc.library;
                if (library[key]) {
                    return library[key];
                }
            }
        }
    } else {
        return undefined;
    }
}

export async function getLocalLibrary(): Promise<{
    [key: string]: RecipeType;
}> {
    const library = localStorage.getItem("library");
    if (!library) {
        localStorage.setItem("library", JSON.stringify({}));
        return {};
    }
    return JSON.parse(library);
}

export async function getLibrary(): Promise<
    | {
          [key: string]: RecipeType;
      }
    | undefined
> {
    if (firebaseAuth.currentUser) {
        console.log("Getting personal firestore library");

        const userDocSnapshot = await getDoc(
            doc(firestoreDb(), "users", firebaseAuth.currentUser.uid)
        );
        if (userDocSnapshot.exists()) {
            const userDoc = userDocSnapshot.data();
            if (userDoc?.library) {
                return userDoc.library;
            }
        }
    }
    return {};
}

export async function getUserData(
    uid: string,
    setTo?: UserDataType | {}
): Promise<UserDataType | undefined> {
    const userDocSnapshot = doc(firestoreDb(), "users", uid);

    if (setTo) {
        console.log("Saving user data to firestore");
        setDoc(userDocSnapshot, setTo, { merge: true });
    } else {
        console.log("Loading user data from firestore");
        const data = await getDoc(userDocSnapshot);
        return data.data() as UserDataType;
    }
}

export async function deleteLocalRecipe(key: string) {
    const library = await getLocalLibrary();
    delete library[key];
    localStorage.setItem("library", JSON.stringify(library));
}

export async function deleteRecipe(key: string, publishedKey?: string) {
    if (!firebaseAuth.currentUser) {
        return;
    }

    console.log("Deleting personal recipe from firestore");

    const db = firestoreDb();

    const userDocSnapshot = doc(db, "users", firebaseAuth.currentUser.uid);

    await updateDoc(userDocSnapshot, {
        [`library.${key}`]: deleteField(),
    });

    // now delete the published recipe
    if (publishedKey) {
        await unpublishRecipe(publishedKey);
    }
}

export async function unpublishRecipe(publishedKey: string) {
    const db = firestoreDb();
    console.log("Deleting published recipe from firestore");
    const publishedDocSnapshot = doc(db, "publicRecipes", publishedKey);
    await deleteDoc(publishedDocSnapshot);
}
