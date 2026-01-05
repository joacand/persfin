"use client";

import { useEffect, useState } from "react";
import { LoadBudgetAccount } from "../Services/storageService";
import { UserBudget } from "../Models/account";

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
        <div className="flex gap-10 flex-col">
            <h2 className="text-3xl">Accounts</h2>
            <div className="flex flex-col flex-wrap gap-2">
                {userBudget.accounts.length === 0 && <p>No accounts available.</p>}
                <div className="flex gap-2 flex-row flex-wrap">
                    {userBudget.accounts.map((account, index) => (
                        <div key={index} className="border border-dashed rounded-md p-4 cursor-pointer">
                            <p>{account.name} - {account.description}</p>
                            <p>Type: {account.type.type}</p>
                        </div>
                    ))}
                </div>
            </div>
            <button className="cursor-pointer border p-2">➕ Add</button>
        </div>
    );
}
