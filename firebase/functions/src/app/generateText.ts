import { finishJob } from "../util/manageJobs";
import generateTextAsync from "../apis/generateTextAsync";
import { TextGeneratorRequestType } from "../util/typeHints";
import { Response, Request } from "firebase-functions/v1";

export default async function generateTextEndpoint(
    request: Request,
    response: Response
) {
    const textRequest = request.body as TextGeneratorRequestType;
    const authtoken = request.headers.authtoken;

    // only allow POST to /generateText
    if (request.method !== "POST") {
        response.status(405).send("Method Not Allowed");
        return;
    }
    // make sure all the required fields are there
    if (
        !textRequest.prompt ||
        !textRequest.jobId ||
        !textRequest.model ||
        typeof authtoken !== "string"
    ) {
        response.status(400).send("Bad Request");
        return;
    }

    const generatedTextData = await generateTextAsync(
        textRequest.prompt,
        textRequest.model,
        authtoken
    );

    console.log("Finalizing job...");

    finishJob({
        uid: generatedTextData.auth?.uid || "nouid",
        status: generatedTextData.status,
        jobId: textRequest.jobId,
        kind: "text",
        result: generatedTextData.result,
        prompt: textRequest.prompt,
        message: generatedTextData.message,
    });

    console.log("Finished job", textRequest.jobId);

    // the response is not important because the client will get the text from the database and use this endpoint in the background
    response.send(generatedTextData);
}
