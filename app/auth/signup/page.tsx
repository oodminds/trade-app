import SignoutButton from "@/components/signoutButton";
import { Sign } from "crypto";
import { getServerSession } from "next-auth";
import { getSession, signOut } from "next-auth/react";

import React from "react";

async function SignupUser() {
    const session = await getServerSession();

    function clickHandler() {
        signOut();
    }

    console.log("session : ", session);

    return (
        <div>
            {session ? (
                <div>
                    <div>{session?.user?.email}</div>
                    <div>
                        <SignoutButton />
                    </div>
                </div>
            ) : (
                <div>no session</div>
            )}
        </div>
    );
}

export default SignupUser;
