import NavBar from "@/components/navBar";

import TradeInput from "@/components/tradeInput";
import { authConfig } from "@/lib/auth";
import axios from "axios";

import { getServerSession } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import React, { useState } from "react";

async function Home() {
    const session = await getServerSession(authConfig);

    if (!session) {
        return redirect("/");
    }

    return (
        <>
            {typeof session === "undefined" ? (
                <div>Loading...</div>
            ) : session ? (
                <div>
                    <div>
                        <NavBar image={`${session?.user?.image}`} />
                    </div>
                    <TradeInput session={session} />
                </div>
            ) : (
                <div>no session</div>
            )}
        </>
    );
}

export default Home;
