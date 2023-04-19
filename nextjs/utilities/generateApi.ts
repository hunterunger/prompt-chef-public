import { ImageModelType, ModelType, TextModelType } from "./dataTypes";
import endpoints from "./endpoints";
import { postWithAuth } from "./postWithAuth";

export async function requestTextGen(prompt: string, model: ModelType) {
    const url = endpoints.startTextGen;

    const request = await postWithAuth(url, {
        prompt,
        model,
    });

    return request;
}

export async function requestImageGen(prompt: string, model: ModelType) {
    const url = endpoints.startImageGen;

    const request = await postWithAuth(url, {
        prompt,
        model,
    });

    return request;
}
