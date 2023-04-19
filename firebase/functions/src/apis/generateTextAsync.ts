import { ensureValidLoginServerside } from "../util/firebaseTools";
import getSecret from "../util/getSecrets";
import { Configuration, OpenAIApi } from "openai";
import { DecodedIdToken } from "firebase-admin/auth";
import { ModelType } from "../util/typeHints";

export default async function generateTextAsync(
    prompt: string,
    model: ModelType,
    authtoken: string | undefined
): Promise<{
    result?: string;
    auth?: DecodedIdToken;
    status: "pending" | "success" | "failure" | "flagged";
    message: string;
}> {
    // make sure the authtoken is there
    if (typeof authtoken != "string") {
        return {
            status: "failure",
            message: "No authtoken provided.",
        };
    }

    // check if the user is logged in
    const isAuthed = await ensureValidLoginServerside(authtoken);
    if (!isAuthed) {
        return {
            status: "failure",
            message: "User not logged in.",
        };
    }

    // get the openai api key
    const OPENAI_API_KEY = await getSecret("OPENAI_API_KEY");
    if (!OPENAI_API_KEY) {
        throw new Error("OPENAI_API_KEY not found");
    }

    const configuration = new Configuration({
        organization: "org-123", // add your organization id here
        apiKey: OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    // generate text
    const returnBody: {
        status: "pending" | "success" | "failure" | "flagged";
        message: string;
        result?: string | undefined;
        auth?: DecodedIdToken;
    } = {
        status: "pending",
        auth: isAuthed,
        message: "Generating text...",
    };

    if (model === "gpt3") {
        // generate text with gpt3
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 300,
        });

        returnBody.result = completion.data.choices[0].text;
        returnBody.status = "success";
        returnBody.message = "Successfully generated text with GPT-3";
    } else if (model === "chat-gpt") {
        // generate text with chat gpt
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
        });

        returnBody.result = completion.data.choices[0].message?.content;
        returnBody.status = "success";
        returnBody.message = "Successfully generated text with Chat GPT";
    } else if (model === "gpt4") {
        const completion = await openai.createChatCompletion({
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }],
        });

        returnBody.result = completion.data.choices[0].message?.content;
        returnBody.status = "success";
        returnBody.message = "Successfully generated text with Chat GPT";
    } else if (model === "bard") {
        // BARD is not yet implemented
        returnBody.status = "failure";
        returnBody.message = "Not implemented yet";
    } else {
        // fallback to gpt3 again
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 300,
        });

        returnBody.result = completion.data.choices[0].text;
        returnBody.status = "success";
        returnBody.message =
            "Failed to find model requested, fell back to GPT-3";
    }

    if (!returnBody.result) {
        return {
            status: "failure",
            message: "Server appears to be down.",
            auth: isAuthed,
        };
    }

    return returnBody;
}
