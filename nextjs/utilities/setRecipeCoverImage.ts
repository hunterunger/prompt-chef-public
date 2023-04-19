import endpoints from "./endpoints";
import { postWithAuth } from "./postWithAuth";

export default async function setRecipeCoverImage(
    jobId: string,
    recipeId: string,
    uid: string
) {
    const url = endpoints.setCoverImage;

    const request = await postWithAuth(url, {
        jobId,
        recipeId,
        uid,
    });

    return request;
}
