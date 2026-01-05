import { BudgetAction, Transaction, UserBudget } from "../Models/account";
import { SaveBudgetAccount } from "./storageService";

export function accountReducer(state: UserBudget, action: BudgetAction): UserBudget {
    switch (action.type) {
        case "INIT": {
            return action.budgetAccount;
        }
        case "ADD_TRANSACTION": {
            return addTransaction(state, action.transaction);
        }
        case "ADD_TRANSACTIONS": {
            throw new Error("Function not implemented.");
        }
        case "ADD_ACCOUNT": {
            throw new Error("Function not implemented.");
        }
        case "REMOVE_ACCOUNT": {
            throw new Error("Function not implemented.");
        }
        case "UPDATE_ACCOUNT": {
            throw new Error("Function not implemented.");
        }
        case "REVERT_TRANSACTION": {
            throw new Error("Function not implemented.");
        }
    }

    function addTransaction(budget: UserBudget, transaction: Transaction): UserBudget {
        const errors = validateTransaction(transaction);
        if (errors !== "") {
            return { ...budget, errors: [errors] };
        }
        const newBudget = {
            ...budget,
            transactions: [...budget.transactions, transaction]
        };
        SaveBudgetAccount(newBudget);
        return newBudget;
    }

    function validateTransaction(transaction: Transaction): string {
        if (transaction.entries.length < 2) {
            return "A transaction must have at least two entries.";
        }
        if (!isBalanced(transaction)) {
            return "The sum of debits must equal the sum of credits.";
        }
        return "";
    }

    function isBalanced(transaction: Transaction): boolean {
        return transaction.entries.reduce((sum, entry) => {
            return entry.type === "Debit" ? sum + entry.amount : sum - entry.amount;
        }, 0) === 0;
    }
}
