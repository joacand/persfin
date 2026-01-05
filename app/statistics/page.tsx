"use client";

import { useEffect, useState } from "react";
import { LoadBudgetAccount } from "../Services/storageService";
import { UserBudget } from "../Models/account";
import Project, { Projection } from "../Services/viewProjector";

export default function Statistics() {
    const [userBudget, setUserBudget] = useState<UserBudget | null>(null);
    const [projection, setProjection] = useState<Projection | null>(null);

    useEffect(() => {
        LoadBudgetAccount().then(budget => {
            setUserBudget(budget);
            const projection = Project(budget);
            setProjection(projection);
        });
    }, []);

    if (!userBudget || !projection) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex gap-4 flex-col">
            <h2 className="text-3xl">Statistics</h2>
            <div className="flex flex-col gap-4 bg-[#0B1A16] rounded p-4">
                <p>Assets: {projection.assets}</p>
                <p>Liabilities: {projection.liabilities}</p>
                <p>Net worth: {projection.equity}</p>
            </div>
        </div>
    );
}
