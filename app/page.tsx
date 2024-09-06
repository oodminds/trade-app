import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";

import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await getServerSession(authConfig);

    if (!session) {
        return redirect("/api/auth/signin");
    }

    redirect("/home");

    return (
        <div>
            <div>
                <Link href={"/auth/login"}> Click me to go to login</Link>
            </div>
        </div>
    );
}
