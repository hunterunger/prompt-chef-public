import { ModelType } from "./dataTypes";

export default function promptCost(prompt: string, model: ModelType) {
    // split by spaces and dashes
    const totalWords = prompt.split(/[\s-]+/).length;

    let dividend;
    let minCost = 1;
    switch (model) {
        case "gpt3":
            dividend = 100;
            minCost = 1;
            break;
        case "gpt4":
            dividend = 20;
            minCost = 2;
            break;
        case "chat-gpt":
            dividend = 100;
            minCost = 1;
            break;
        case "stable-diffusion":
            dividend = 40;
            minCost = 2;
            break;
        case "stable-diffusion-v1":
            dividend = 40;
            minCost = 2;
            break;
        case "stable-diffusion-v1-5":
            dividend = 40;
            minCost = 2;
            break;
        case "stable-diffusion-xl-beta-v2-2-2":
            dividend = 40;
            minCost = 3;
            break;
        default:
            dividend = 100;
            minCost = 1;
            break;
    }

    // every 100 words is worth 1
    const cost = Math.max(Math.ceil(totalWords / dividend), minCost);

    return cost;
}
