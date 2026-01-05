import { UserBudget } from "../Models/account";

export type Projection = {
    assets: number,
    liabilities: number,
    equity: number
}

export default function Project(userBudget: UserBudget): Projection {
    const projection: Projection = { assets: 0, liabilities: 0, equity: 0 };

    let sumRevenue = 0;
    let sumExpenses = 0;

    for (const transaction of userBudget.transactions) {
        console.log(`Projecting transaction ${transaction.id}`);
        for (const entry of transaction.entries) {
            console.log(`  Entry: ${entry.type} ${entry.amount} to ${entry.account.name} (${entry.account.type.type})`);
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
        }
    }

    projection.equity += (sumRevenue - sumExpenses);

    return projection;
}