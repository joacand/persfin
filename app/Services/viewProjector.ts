"use client";

import { UserBudget } from "../Models/account";

export type Projection = {
    assets: number,
    liabilities: number,
    equity: number,
    graphData: Array<{ dateTime: number, assets: number, liabilities: number, equity: number }>
}

export default function Project(userBudget: UserBudget): Projection {
    const projection: Projection = { assets: 0, liabilities: 0, equity: 0, graphData: [] };

    let sumRevenue = 0;
    let sumExpenses = 0;

    for (const transaction of userBudget.transactions) {
        for (const entry of transaction.entries) {
            const accountType = entry.account.type.type;
            const amount = entry.amount;

            switch (accountType) {
                case "Asset":
                    projection.assets += (entry.type === "Debit" ? amount : -amount);
                    break;
                case "Liability":
                    projection.liabilities += (entry.type === "Credit" ? amount : -amount);
                    break;
                case "Equity":
                    projection.equity += (entry.type === "Credit" ? amount : -amount);
                    break;
                case "Revenue":
                    sumRevenue += (entry.type === "Credit" ? amount : -amount);
                    break;
                case "Expense":
                    sumExpenses += (entry.type === "Debit" ? amount : -amount);
                    break;
            }

            const date =
                transaction.date instanceof Date
                    ? transaction.date
                    : new Date(transaction.date);

            const tempEquity = projection.equity + (sumRevenue - sumExpenses);

            const existingEntry = projection.graphData.find(d => d.dateTime === date.getTime());
            if (existingEntry) {
                existingEntry.assets = projection.assets;
                existingEntry.liabilities = projection.liabilities;
                existingEntry.equity = tempEquity;
            } else {
                projection.graphData.push({
                    dateTime: date.getTime(),
                    assets: projection.assets,
                    liabilities: projection.liabilities,
                    equity: tempEquity
                });
            }
        }
    }

    projection.equity += (sumRevenue - sumExpenses);

    return projection;
}