"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import { BudgetAction, UserBudget } from "../Models/account";
import { DefaultBudgetAccount, LoadBudgetAccount, SaveBudgetAccount } from "../Services/storageService";
import { accountReducer } from "../Services/accountReducer";

type BudgetContextType = {
    userBudget: UserBudget | null;
    dispatch: React.Dispatch<BudgetAction>;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export function BudgetProvider({ children }: { children: React.ReactNode }) {
    const [userBudget, dispatch] = useReducer(accountReducer, DefaultBudgetAccount());

    useEffect(() => {
        LoadBudgetAccount().then(budget => {
            dispatch({ type: "INIT", budgetAccount: budget });
        });
    }, []);

    useEffect(() => {
        if (userBudget) SaveBudgetAccount(userBudget);
    }, [userBudget]);

    return (
        <BudgetContext.Provider value={{ userBudget, dispatch }}>
            {children}
        </BudgetContext.Provider>
    );
}

export function useBudget() {
    const context = useContext(BudgetContext);
    if (context === undefined) {
        throw new Error("useBudget must be used within a BudgetProvider");
    }
    return context;
}
