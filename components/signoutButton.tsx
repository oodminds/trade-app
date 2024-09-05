"use client";
import { signOut } from "next-auth/react";
import React from "react";

function SignoutButton() {
    return (
        <div>
            <button
                onClick={() => {
                    signOut();
                }}
            >
                Sign out
            </button>
        </div>
    );
}

export default SignoutButton;
