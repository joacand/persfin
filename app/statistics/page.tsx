"use client";

import { useEffect, useState } from "react";
import Project, { Projection } from "../Services/viewProjector";
import { useBudget } from "../Components/BudgetProvider";

export default function Statistics() {
    const { userBudget } = useBudget();
    const [projection, setProjection] = useState<Projection | null>(null);

    useEffect(() => {
        if (userBudget) {
            const projection = Project(userBudget);
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setProjection(projection);
        }
    }, [userBudget]);

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
