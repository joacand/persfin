"use client";

import { useState } from "react";
import { UserBudget } from "../Models/account";

export default function BudgetView() {
    const [userBudget, setUserBudget] = useState<UserBudget>(
        {
            name: "Test budget",
            accounts: [],
            transactions: []
        });

    if (!userBudget) { return <p>Loading...</p> }

    return (
        <div className="flex gap-2 flex-col">
            <h1 className="text-2xl"><strong>{userBudget.name}</strong> Budget Overview</h1>
            <p>Temp</p>
        </div>
    );
}