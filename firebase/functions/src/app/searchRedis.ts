import { Response, Request } from "firebase-functions/v1";
import { createClient } from "redis";
import { redisUrlDenfinition } from "../util/secretDefinitions";
import { unflatten } from "flat";
import { DatabaseRecipeType } from "../util/typeHints";

export default async function searchRedis(req: Request, res: Response) {
    if (!req.query.query || typeof req.query.query !== "string") {
        res.status(400).send("Missing query parameter");
        return;
    }

    const query = alphaNumericOnly(req.query.query.trim());

    const redisUrl = redisUrlDenfinition.value();

    if (!redisUrl) {
        console.log("No Redis URL found");
        res.status(500).send("Internal server error.");
        return;
    }

    const client = createClient({
        url: redisUrl,
    });

    await client.connect();

    // assume the index exists
    // try {
    //     await client.ft.create(
    //         "idx:publicRecipes",
    //         {
    //             "recipe.name": {
    //                 type: SchemaFieldTypes.TEXT,
    //                 AS: "name",
    //             },
    //             "recipe.prompt": {
    //                 type: SchemaFieldTypes.TEXT,
    //                 AS: "prompt",
    //             },
    //             owner: {
    //                 type: SchemaFieldTypes.TEXT,
    //                 // AS: "own",
    //             },
    //         },
    //         {
    //             ON: "HASH",
    //             PREFIX: "published:",
    //         }
    //     );
    // } catch (e: any) {
    //     if (e.message === "Index already exists") {
    //         console.log("Index exists already, skipped creation.");
    //     } else {
    //         console.error(e);
    //         res.status(500).send("Internal server error.");
    //         return;
    //     }
    // }

    const results = await client.ft.search("idx:publicRecipes", `*${query}*`);

    console.log(results.total + " results found");

    await client.disconnect();

    if (results.total === 0) {
        res.status(200).send([]);
        return;
    }
    const searchResults = results.documents.map((v: any) => {
        const unflattened: DatabaseRecipeType = unflatten(v.value);

        unflattened.recipe.publicDocId = v.id.replace("published:", "");

        return unflattened;
    });

    res.status(200).send(searchResults);
}

function alphaNumericOnly(str: string) {
    return str.replace(/[^a-z0-9]/gi, "");
}
