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
            name: "Base Budget Account",
            accounts: [
                { name: "Initial equity", description: "Initial Equity Account", type: { type: "Equity" }, id: crypto.randomUUID() },
                { name: "Bank Savings", description: "Bank Savings Account", type: { type: "Asset" }, id: crypto.randomUUID() },
                { name: "Loans", description: "Loan Account", type: { type: "Liability" }, id: crypto.randomUUID() },
                { name: "Income", description: "Income Revenue Account", type: { type: "Revenue" }, id: crypto.randomUUID() },
                { name: "Expense", description: "Default Expense Account", type: { type: "Expense" }, id: crypto.randomUUID() }
            ],
            transactions: []
        } as UserBudget;
    return defaultBudget;
}
