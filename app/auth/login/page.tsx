"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import React from "react";

function LoginPage() {
    const router = useRouter();
    return (
        <div>
            <button
                onClick={() => {
                    signIn("google");
                }}
            >
                Click me to login with google
            </button>
        </div>
    );
}

export default LoginPage;
