export type UserBudget = {
    name: string;
    accounts: Account[];

    // List of all transactions made. A transaction is validated before accepted.
    // Views can be built from this to list account values and A=E+L.
    transactions: Transaction[];
}

export type Account = {
    name: string;
    description: string;
    type: AccountType;
}

// Transaction (debit and credit) between at least two accounts.
// Invariant: Sum of debit equals the sum of credits.
export type Transaction = {
    date: Date;
    description?: string;

    // At least two with separate accounts.
    entries: Entry[];
}

export type Entry = {
    type: ModifierType;
    account: Account;
    amount: number;
}

// Actions for the reducer
export type BudgetAction =
    | { type: "ADD_TRANSACTION", transaction: Transaction }
    | { type: "ADD_TRANSACTIONS", transactions: Transaction[] }
    | { type: "REVERT_TRANSACTION", transaction: Transaction } // Reverts a transaction by adding a new transaction with opposite entries.
    | { type: "ADD_ACCOUNT", account: Account }
    | { type: "UPDATE_ACCOUNT", account: Account } // Type changes not allowed.
    | { type: "REMOVE_ACCOUNT", account: Account } // Only allowed if no transactions exist for this account.

export type ModifierType = "Debit" | "Credit";

export type AccountType =
    | { type: "Asset" }
    | { type: "Liability" }
    | { type: "Equity" }
    | { type: "Revenue" }
    | { type: "Expense" };
