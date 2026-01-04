"use client";

import { useState } from "react";
import { UserBudget } from "../Models/account";

export default function BudgetView() {
    const [userBudget, setUserBudget] = useState<UserBudget>(
        {
            name: "Test budget",
            accounts: [
                { name: "Initial equity", description: "Initial equity account", type: { type: "Equity" } },
                { name: "Income", description: "Income account", type: { type: "Revenue" } }
            ],
            transactions: []
        });

    if (!userBudget) { return <p>Loading...</p> }

    return (
        <div className="flex gap-2 flex-col">
            <h2 className="text-2xl"><strong>{userBudget.name}</strong> Budget Overview</h2>
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
    );
}