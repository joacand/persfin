"use client";

import { signInAnonymously, signInWithPopup } from "firebase/auth";
import { useAuth } from "./AuthContext";
import { auth } from "../Services/firebase";
import PrimaryButton from "./PrimaryButton";
import { GithubAuthProvider } from "firebase/auth";

export default function LoginCheck({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();

    if (loading) { return (<p>Loading...</p>) }

    if (!user) {
        function signIn() {
            signInAnonymously(auth)
                .then(() => {
                    console.log("Signed in anonymously")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(`Failed to sign in: ${errorCode} ${errorMessage}`)
                });
        }

        function signInGithub() {
            const provider = new GithubAuthProvider();

            signInWithPopup(auth, provider)
                .then(() => {
                    console.log("Signed in through GitHub")
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(`Failed to sign in: ${errorCode} ${errorMessage}`)
                });
        }

        return (
            <p>
                Please log in
                <PrimaryButton onClick={() => signIn()}>Sign in anonymously</PrimaryButton>
                <PrimaryButton onClick={() => signInGithub()}>Sign in through Github</PrimaryButton>
            </p>
        );
    }

    return (
        <>
            {children}
        </>
    );
}