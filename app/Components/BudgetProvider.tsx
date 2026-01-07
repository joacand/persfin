"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import { BudgetAction, UserBudget } from "../Models/account";
import { LoadBudgetAccount, SaveBudgetAccount } from "../Services/storageService";
import { accountReducer } from "../Services/accountReducer";
import { useAuth } from "./AuthContext";

type BudgetContextType = {
    userBudget: UserBudget | null;
    dispatch: React.Dispatch<BudgetAction>;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export function BudgetProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [userBudget, dispatch] = useReducer(accountReducer, null);

    useEffect(() => {
        if (!user) { return; }
        LoadBudgetAccount(user.uid).then(budget => {
            dispatch({ type: "INIT", budgetAccount: budget });
        });
    }, [user]);

    useEffect(() => {
        if (!user) { return; }
        if (userBudget) SaveBudgetAccount(user.uid, userBudget);
    }, [user, userBudget]);

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
