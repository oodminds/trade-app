import SignoutButton from "@/components/signoutButton";
import { authConfig } from "@/lib/auth";

import { getServerSession } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import React from "react";

async function Home() {
    const session = await getServerSession(authConfig);

    if (!session) {
        return redirect("/");
    }

    return (
        <div>
            <div>Hi from home </div>
            <div>
                {session ? (
                    <div>
                        <div>{session?.user?.email}</div>
                    </div>
                ) : (
                    <div>no session</div>
                )}
            </div>
            <SignoutButton />
        </div>
    );
}

export default Home;
