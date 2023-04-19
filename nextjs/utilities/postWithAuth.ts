import axios from "axios";
import { getAuth } from "firebase/auth";

export async function postWithAuth(url: string, body: any) {
    const authtoken = await getAuth().currentUser?.getIdToken();

    const request = await axios.post(url, body, {
        headers: {
            authtoken,
        },
    });

    return request;
}
