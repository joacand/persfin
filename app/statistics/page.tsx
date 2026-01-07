"use client";

import { useEffect, useState } from "react";
import Project, { Projection } from "../Services/viewProjector";
import { useBudget } from "../Components/BudgetProvider";
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Base from "../Components/Base";

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
        <Base>
            <h2 className="text-3xl">Statistics</h2>
            <div className="flex flex-col gap-4 bg-[#1B2227] rounded p-4">
                <p>Assets: {projection.assets} {userBudget.unit}</p>
                <p>Debts (liabilities): {projection.liabilities} {userBudget.unit}</p>
                <p>Net worth (equity): {projection.equity} {userBudget.unit}</p>
            </div>
            <div className="w-full h-[50vh]">
                <ResponsiveContainer width="100%" height="100%" className="bg-[#1B2227] rounded p-4">
                    <LineChart data={projection.graphData}>
                        <Line type="monotone" dataKey="assets" stroke="#4f46e5" name="Assets" />
                        <Line type="monotone" dataKey="equity" stroke="#16a34a" name="Net worth (equity)" />
                        <Line type="monotone" dataKey="liabilities" stroke="#dc2626" name="Debts (liabilities)" />
                        <XAxis
                            dataKey="dateTime"
                            scale="time"
                            type="number"
                            domain={['auto', 'auto']}
                            tickFormatter={(value) =>
                                new Date(value).toLocaleDateString()
                            } />
                        <YAxis unit={userBudget.unit} />
                        <Legend />
                        <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Base>
    );
}
