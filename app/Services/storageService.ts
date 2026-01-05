"use client";

import { UserBudget } from "../Models/account";

export function LoadBudgetAccountSync(): UserBudget {
    const existingItem = localStorage.getItem("perfin.userBudget");
    if (existingItem) {
        return JSON.parse(existingItem) as UserBudget;
    }
    return DefaultBudgetAccount();
}

export async function LoadBudgetAccount(): Promise<UserBudget> {
    // Temporary
    //if (process.env.NODE_ENV === "development") {
    //    return DefaultBudgetAccount();
    //}
    const existingItem = localStorage.getItem("perfin.userBudget");
    if (existingItem) {
        return JSON.parse(existingItem) as UserBudget;
    }
    return DefaultBudgetAccount();
}

export async function SaveBudgetAccount(budget: UserBudget): Promise<void> {
    localStorage.setItem("perfin.userBudget", JSON.stringify(budget));
}

export function DefaultBudgetAccount(): UserBudget {
    const defaultBudget =
        {
            name: "Daily Budget",
            accounts: [
                { name: "Initial equity", description: "Initial Equity Account", type: { type: "Equity" } },
                { name: "Bank Savings", description: "Bank Savings Account", type: { type: "Equity" } },
                { name: "Income", description: "Income Revenue Account", type: { type: "Revenue" } },
                { name: "Expense", description: "Default Expense Account", type: { type: "Expense" } }
            ],
            transactions: []
        } as UserBudget;
    return defaultBudget;
}
