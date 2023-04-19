import { firestore } from "firebase-admin";
import { EventContext } from "firebase-functions/v1";

export default async function purgeOldJobsEndpoint(context: EventContext) {
    const db = firestore();
    const jobs = await db.collection("jobs").get();
    const now = new Date();

    jobs.forEach((job) => {
        const jobData = job.data();
        const jobTime = jobData.timestamp.toDate();
        const diff = now.getTime() - jobTime.getTime();
        const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

        // check if status has been flagged for review
        if (jobData.status === "flagged") {
            return;
        }

        if (diffDays > 7) {
            console.log("purging job", job.id);
            job.ref.delete();
        }
    });
}
