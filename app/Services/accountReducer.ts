import { BudgetAction, Entry, ModifierType, Transaction, UserBudget } from "../Models/account";
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
            return revertTransaction(state, action.transaction);
        }
        case "REMOVE_TRANSACTION": {
            return removeTransaction(state, action.transaction);
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

    function revertTransaction(state: UserBudget, transaction: Transaction): UserBudget {
        const newTransactions = [...state.transactions];
        const transactionToModify = newTransactions.find(t => t.id === transaction.id);
        if (!transactionToModify) { return state; }

        const reversedEntries: Entry[] = transactionToModify.entries.map(entry => {
            return {
                type: entry.type === "Debit" ? "Credit" : "Debit" as ModifierType,
                account: entry.account,
                amount: entry.amount
            }
        }
        );
        const reversedTransaction: Transaction = {
            id: crypto.randomUUID(),
            date: new Date(),
            description: `Revert: ${transactionToModify.description || ""}`,
            entries: reversedEntries
        };
        const finalTransactions = [...newTransactions, reversedTransaction];
        const newBudget = {
            ...state,
            transactions: finalTransactions
        };
        SaveBudgetAccount(newBudget);
        return newBudget;
    }

    function removeTransaction(state: UserBudget, transaction: Transaction): UserBudget {
        const newTransactions = state.transactions.filter(t => t.id !== transaction.id);
        const newBudget = {
            ...state,
            transactions: newTransactions
        };
        SaveBudgetAccount(newBudget);
        return newBudget;
    }
}
