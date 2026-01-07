import { Account, BudgetAction, Entry, ModifierType, Transaction, UserBudget } from "../Models/account";

export function accountReducer(state: UserBudget | null, action: BudgetAction): UserBudget | null {

    if (action.type === "INIT") {
        return action.budgetAccount;
    }

    if (!state) { return state; }

    switch (action.type) {
        case "RESET": {
            return null;
        }
        case "ADD_TRANSACTION": {
            return addTransaction(state, action.transaction);
        }
        case "ADD_TRANSACTIONS": {
            throw new Error("Function not implemented.");
        }
        case "ADD_ACCOUNT": {
            return addAccount(state, action.account);
        }
        case "REMOVE_ACCOUNT": {
            return removeAccount(state, action.account);
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
        return newBudget;
    }

    function addAccount(budget: UserBudget, account: Account): UserBudget {
        const newBudget = {
            ...budget,
            accounts: [...budget.accounts, account]
        };
        return newBudget;
    }

    function removeAccount(budget: UserBudget, account: Account): UserBudget {
        const accountToRemove = budget.accounts.find(a => a.id === account.id);
        if (!accountToRemove) { return budget; }

        if (budget.transactions.some(t => t.entries.some(e => e.accountId === account.id))) {
            return {
                ...budget,
                errors: [`Cannot remove account "${account.name}" because it has transactions.`]
            };
        }

        const newAccounts = budget.accounts.filter(t => t.id !== account.id);
        const newBudget = {
            ...budget,
            accounts: newAccounts
        };
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
                accountId: entry.accountId,
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
        return newBudget;
    }

    function removeTransaction(state: UserBudget, transaction: Transaction): UserBudget {
        const newTransactions = state.transactions.filter(t => t.id !== transaction.id);
        const newBudget = {
            ...state,
            transactions: newTransactions
        };
        return newBudget;
    }
}
