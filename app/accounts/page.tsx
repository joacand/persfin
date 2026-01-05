"use client";

import { useEffect, useState } from "react";
import { LoadBudgetAccount } from "../Services/storageService";
import { UserBudget } from "../Models/account";
import PrimaryButton from "../Components/PrimaryButton";

export default function Accounts() {
    const [userBudget, setUserBudget] = useState<UserBudget | null>(null);

    useEffect(() => {
        LoadBudgetAccount().then(budget => {
            setUserBudget(budget);
        });
    }, []);

    if (!userBudget) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex gap-4 flex-col items-start ">
            <h2 className="text-3xl">Accounts</h2>
            <div className="flex flex-col flex-wrap items-start gap-4 bg-[#0B1A16] rounded p-4">
                {userBudget.accounts.length === 0 && <p>No accounts available.</p>}
                <div className="flex gap-2 flex-row flex-wrap">
                    {userBudget.accounts.map((account, index) => (
                        <div key={index} className="border border-gray-700 rounded-md p-4 cursor-pointer">
                            <p>{account.name} - {account.description}</p>
                            <p>Type: {account.type.type}</p>
                        </div>
                    ))}
                </div>
                <PrimaryButton>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" /></svg>
                    Add</PrimaryButton>
            </div>
        </div>
    );
}
