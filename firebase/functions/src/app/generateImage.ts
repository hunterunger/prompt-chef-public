import { Response, Request } from "firebase-functions/v1";
import { ImageGeneratorRequestType } from "../util/typeHints";
import { imageModels } from "../util/aiModels";
import generateImageAsync from "../apis/generateImageAsync";
import { stringToImage } from "../util/stringToImage";
import { finishJob, makeDocId, uploadImage } from "../util/manageJobs";

export default async function generateImageEndpoint(
    request: Request,
    response: Response
) {
    const imageRequest = request.body as ImageGeneratorRequestType;
    const authtoken = request.headers.authtoken;

    // only allow POST to /generateImage
    if (request.method !== "POST") {
        response.status(405).send("Method Not Allowed");
        return;
    } // make sure all the required fields are there
    if (
        !imageRequest.prompt ||
        !imageRequest.jobId ||
        typeof authtoken !== "string" ||
        !imageRequest.model ||
        !imageModels.includes(imageRequest.model)
    ) {
        console.log("Bad request", imageRequest);
        response.status(400).send("Bad Request");
        return;
    }

    console.log("Received image request: ", imageRequest);

    const generatedImageData = await generateImageAsync(
        imageRequest.prompt,
        imageRequest.model,
        imageRequest.jobId,
        authtoken
    );

    console.log("Uploading image...");
    if (generatedImageData.result) {
        // convert the image string to a buffer
        const imageBuffer = stringToImage(generatedImageData.result.base64);

        // upload to firebase storage bucket
        await uploadImage(
            imageBuffer,
            generatedImageData.auth?.uid || "nouid",
            imageRequest.jobId
        );
    }

    await finishJob({
        uid: generatedImageData.auth?.uid || "nouid",
        status: generatedImageData.status,
        jobId: imageRequest.jobId,
        kind: "image",
        result:
            makeDocId(
                generatedImageData.auth?.uid || "nouid",
                imageRequest.jobId
            ) + ".jpg",
        prompt: imageRequest.prompt,
        message: generatedImageData.message,
    });

    console.log("Finished job", imageRequest.jobId);

    // the response is not important because the client will get the text from the database and use this endpoint in the background
    response.send(generatedImageData);
}
