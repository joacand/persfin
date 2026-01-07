"use client";

import { signInAnonymously, signInWithPopup } from "firebase/auth";
import { useAuth } from "./AuthContext";
import { auth } from "../Services/firebase";
import PrimaryButton from "./PrimaryButton";
import { GithubAuthProvider } from "firebase/auth";
import About from "../about/page";

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
            <About>
                <h3 className="text-xl font-semibold">Sign in</h3>
                <p>You can try it out <strong>anonymously</strong> without creating an account, or sign in with <strong>GitHub</strong> to save your data across sessions.</p>
                <div className="flex flex-row flex-wrap gap-4">
                    <PrimaryButton onClick={() => signIn()}>Try anonymously</PrimaryButton>
                    <PrimaryButton onClick={() => signInGithub()}>Sign in with GitHub</PrimaryButton>
                </div>
            </About >
        );
    }

    return (
        <>
            {children}
        </>
    );
}