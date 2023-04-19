import getSecret from "../util/getSecrets";
import axios from "axios";

export async function generateImageStabilityAi(
    config: StabilityImageGenConfig,
    engine_id: string
) {
    const engineId = engine_id;

    const STABILITY_API_KEY = await getSecret("STABILITY_API_KEY");
    const api_host = "https://api.stability.ai";
    // https://api.stability.ai/v1/generation/{engine_id}/text-to-image
    const url = `${api_host}/v1/generation/${engineId}/text-to-image`;

    if (typeof STABILITY_API_KEY !== "string") {
        throw Error("No STABILITY_API_KEY credentials found");
    }

    // do stuff
    const response = await axios.post(url, config, {
        headers: {
            Authorization: "Bearer " + STABILITY_API_KEY,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });

    // only return the first image
    return response.data["artifacts"] as StabilityImageGenResponse;
}

// DDIM DDPM K_DPMPP_2M K_DPMPP_2S_ANCESTRAL K_DPM_2 K_DPM_2_ANCESTRAL K_EULER K_EULER_ANCESTRAL K_HEUN K_LMS
type StabilityImageGenConfig = {
    height?: number;
    width?: number;
    text_prompts: {
        text: string;
        weight: number | 1;
    }[];
    cfg_scale?: number;
    clip_guidance_preset?: string;
    sampler?:
        | "DDIM"
        | "DDPM"
        | "K_DPMPP_2M"
        | "K_DPMPP_2S_ANCESTRAL"
        | "K_DPM_2"
        | "K_DPM_2_ANCESTRAL"
        | "K_EULER"
        | "K_EULER_ANCESTRAL"
        | "K_HEUN"
        | "K_LMS";
    samples?: number;
    seed?: number;
    steps?: number;
};

type StabilityImageGenResponse = {
    base64: string;
    finishReason: string;
    seed: number;
}[];
