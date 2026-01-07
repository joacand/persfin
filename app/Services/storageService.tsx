"use client";

import { doc, getDoc, serverTimestamp, setDoc, Timestamp } from "firebase/firestore";
import { UserBudget } from "../Models/account";
import { db } from "./firebase";

function budgetDocRef(userId: string) {
    return doc(db, "users", userId, "budget", "main");
}

export async function LoadBudgetAccount(userId: string): Promise<UserBudget> {
    const ref = budgetDocRef(userId);
    const snap = await getDoc(ref);

    if (snap.exists()) {

        const rawBudget = snap.data().data as UserBudget;
        const budget: UserBudget = {
            ...rawBudget,
            transactions: rawBudget.transactions.map(tx => ({
                ...tx,
                date: (tx.date as unknown as Timestamp).toDate()
            }))
        };

        return budget;
    }

    const defaultBudget = DefaultBudgetAccount();
    await SaveBudgetAccount(userId, defaultBudget);
    return defaultBudget;
}

export async function SaveBudgetAccount(userId: string, budget: UserBudget): Promise<void> {
    const ref = budgetDocRef(userId);5
    await setDoc(ref, {
        data: {
            ...budget,
            transactions: budget.transactions.map(tx => ({
                ...tx,
                date: Timestamp.fromDate(tx.date)
            }))
        },
        updatedAt: serverTimestamp()
    });
}

export function DefaultBudgetAccount(): UserBudget {
    return {
        name: "Default Budget Account",
        accounts: [
            { name: "Initial Equity", description: "Initial Equity Account", type: { type: "Equity" }, id: crypto.randomUUID() },
            { name: "Bank Savings", description: "Bank Savings Account", type: { type: "Asset" }, id: crypto.randomUUID() },
            { name: "Investments", description: "Investment Account", type: { type: "Asset" }, id: crypto.randomUUID() },
            { name: "Credit Card Account", description: "Credit Card Account", type: { type: "Liability" }, id: crypto.randomUUID() },
            { name: "Loans", description: "Loan Account", type: { type: "Liability" }, id: crypto.randomUUID() },
            { name: "Income", description: "Income Revenue Account", type: { type: "Revenue" }, id: crypto.randomUUID() },
            { name: "Expense", description: "Default Expense Account", type: { type: "Expense" }, id: crypto.randomUUID() }
        ],
        isDefault: true,
        unit: "kr",
        transactions: []
    };
}
