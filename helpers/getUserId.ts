import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function getCurrentUserId(): Promise<string> {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    // 1. If there is no session, throw a standard error
    if (!session) {
        throw new Error("Unauthorized");
    }

    // 2. Return strictly the string ID
    return session.user.id;
}

export default getCurrentUserId;
