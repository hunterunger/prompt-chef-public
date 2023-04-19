import { DocumentSnapshot } from "firebase-admin/firestore";
import { Change, EventContext } from "firebase-functions/v1";
import { createClient } from "redis";
import getSecret from "../util/getSecrets";
import { flatten } from "flat";

export default async function syncPublishedToRedis(
    snapshot: Change<DocumentSnapshot>,
    context: EventContext
) {
    console.log("Syncing published recipe to Redis");

    const { docId } = context.params;

    const redisUrl = await getSecret("REDIS_URL");

    if (!redisUrl) {
        console.log("No Redis URL found");
        return;
    }

    const client = createClient({
        url: redisUrl,
    });

    client.on("error", (err) => console.log("Redis Client Error", err));

    await client.connect();

    const recipe = snapshot.after.data();
    if (snapshot.after.exists && recipe) {
        // format unsupported field types (Date, GeoPoint, etc.)
        recipe.updatedTimestamp = recipe.updatedTimestamp
            .toDate()
            .toISOString();

        console.log("Recipe exists, setting in Redis", docId);

        // await client.json.set(docId, ".", recipe);

        // clean up relevant fields
        delete recipe.recipe.inputs;

        // flatten the object
        const flattened: any = flatten(recipe, { safe: true });
        await client.hSet("published:" + docId, flattened);
    } else {
        console.log("Recipe does not exist, deleting from Redis", docId);
        await client.del(docId);
    }

    await client.disconnect();
}
