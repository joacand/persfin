"use client";

import { useEffect, useReducer, useState } from "react";
import { Entry, Transaction } from "../Models/account";
import { DefaultBudgetAccount, LoadBudgetAccount } from "../Services/storageService";
import { accountReducer } from "../Services/accountReducer";

export default function BudgetView() {
    const [userBudget, dispatch] = useReducer(accountReducer, DefaultBudgetAccount());
    const [entries, setEntries] = useState<Entry[]>([]);

    const [fromAccountIndex, setFromAccountIndex] = useState<number | "">("");
    const [toAccountIndex, setToAccountIndex] = useState<number | "">("");
    const [amount, setAmount] = useState<number>(0);
    const [description, setDescription] = useState<string>("");

    useEffect(() => {
        LoadBudgetAccount().then(budget => {
            dispatch({ type: "INIT", budgetAccount: budget });
        });
    }, []);

    if (!userBudget) { return <p>Loading...</p> }

    function addEntry() {
        if (userBudget == null) return;
        // TODO: Add status text to user from validation errors
        if (amount <= 0) return;
        if (fromAccountIndex === toAccountIndex) return;
        if (fromAccountIndex === "" || toAccountIndex === "") return;

        console.log(`Adding entry from ${fromAccountIndex} to ${toAccountIndex} amount ${amount}`);
        const fromAccount = userBudget.accounts[fromAccountIndex];
        const toAccount = userBudget.accounts[toAccountIndex];

        const newEntries = [...entries];
        newEntries.push({ type: "Credit", account: fromAccount, amount: amount });
        newEntries.push({ type: "Debit", account: toAccount, amount: amount });
        setEntries(newEntries);

        clearInputs();
    }

    function finishTransaction() {
        if (userBudget == null) return;
        console.log(`Finishing transaction`);

        dispatch({
            type: "ADD_TRANSACTION", transaction: {
                id: crypto.randomUUID(),
                date: new Date(),
                entries,
                description
            }
        });

        setEntries([]);
        clearInputs();
    }

    function clearInputs() {
        setFromAccountIndex("");
        setToAccountIndex("");
        setAmount(0);
    }

    function trySetAmount(e: React.ChangeEvent<HTMLInputElement>) {
        const value = parseFloat(e.target.value);
        if (!isNaN(value) && value >= 0) {
            setAmount(value);
        }
    }

    function revertTransaction(transaction: Transaction) {
        dispatch({
            type: "REVERT_TRANSACTION", transaction
        });
    }

    function removeTransaction(transaction: Transaction) {
        dispatch({
            type: "REMOVE_TRANSACTION", transaction
        });
    }

    return (
        <div className="flex gap-4 flex-col">
            <h2 className="text-3xl">{userBudget.name}</h2>
            <div className="flex flex-col gap-2 border border-dashed p-4">
                <h2 className="text-xl">Create Transaction</h2>
                <div className="flex flex-row gap-2">
                    <h3>From:</h3>
                    <select value={fromAccountIndex} onChange={e => setFromAccountIndex(e.target.value === "" ? "" : Number(e.target.value))}>
                        <option className="bg-black" value=""></option>
                        {userBudget.accounts.map((account, index) => (
                            <option className="bg-black" key={index} value={index}>{account.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-row gap-2">
                    <h3>To:</h3>
                    <select value={toAccountIndex} onChange={e => setToAccountIndex(e.target.value === "" ? "" : Number(e.target.value))}>
                        <option className="bg-black" value=""></option>
                        {userBudget.accounts.map((account, index) => (
                            <option className="bg-black" key={index} value={index}>{account.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-row gap-2">
                    <h3>Amount:</h3>
                    <input type="number" min={0} onChange={trySetAmount} value={amount} />
                </div>
                <button className="cursor-pointer border p-2" onClick={addEntry}>➕ Add</button>
                <hr />
                <div>
                    <h3>Current Entries:</h3>
                    {entries.length === 0 && <p>No entries added.</p>}
                    <div className="flex flex-col">
                        {entries.map((entry, index) => (
                            <div key={index}>
                                <p>{entry.type} {entry.amount} - {entry.account.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-row gap-2">
                    <h3>Describe the transaction:</h3>
                    <input type="text" onChange={e => setDescription(e.target.value)} />
                </div>
                <button className="cursor-pointer border p-2" onClick={finishTransaction}>✔️ Finish</button>
            </div>
            <div>
                <h2 className="text-2xl">Transaction Log</h2>
                {userBudget.transactions.length === 0 && <p>No transactions available.</p>}
                <div className="flex gap-2 flex-col flex-wrap">
                    {userBudget.transactions.toReversed().map((transaction) => (
                        <div key={transaction.id} className="flex flex-row flex-wrap justify-between border border-dashed rounded-md p-4 gap-2">
                            <div>
                                <p><strong>{new Date(transaction.date).toLocaleString()}</strong></p>
                                <p>{transaction.description}</p>
                                <div className="flex flex-col">
                                    {transaction.entries.map((entry, entryIndex) => (
                                        <div key={entryIndex}>
                                            <p>{entry.type} {entry.amount} - {entry.account.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-row gap-2">
                                <button className="cursor-pointer border p-2" onClick={() => revertTransaction(transaction)}>◀️ Revert</button>
                                <button className="cursor-pointer border p-2" onClick={() => removeTransaction(transaction)}>➖ Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
