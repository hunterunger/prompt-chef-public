import { ModelType } from "./dataTypes";

export const imageModels = [
    "stable-diffusion",
    "stable-diffusion-v1",
    "stable-diffusion-v1-5",
    "stable-diffusion-xl-beta-v2-2-2",
];

export const textModels = ["gpt3", "gpt4", "chat-gpt"];

export function getModelType(model: ModelType) {
    if (textModels.includes(model)) {
        return "text";
    } else if (imageModels.includes(model)) {
        return "image";
    } else {
        throw new Error("invalid model");
    }
}

export function getModelsForType(type: "text" | "image") {
    if (type === "text") {
        return textModels;
    } else if (type === "image") {
        return imageModels;
    } else {
        throw new Error("invalid type");
    }
}
