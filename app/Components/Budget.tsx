"use client";

import { useEffect, useState } from "react";
import { Entry } from "../Models/account";
import { LoadBudgetAccount } from "../Services/storageService";
import PrimaryButton from "./PrimaryButton";
import { useBudget } from "./BudgetProvider";

export default function BudgetView() {
    const { userBudget, dispatch } = useBudget();
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
        setDescription("");
        setAmount(0);
    }

    function trySetAmount(e: React.ChangeEvent<HTMLInputElement>) {
        const value = parseFloat(e.target.value);
        if (!isNaN(value) && value >= 0) {
            setAmount(value);
        }
    }

    return (
        <div className="flex gap-4 flex-col">
            <h2 className="text-3xl">{userBudget.name}</h2>
            <div className="flex flex-col gap-4 bg-[#0B1A16] rounded p-4 max-w-md">
                <h2 className="text-xl">Add Transaction</h2>

                <hr />

                <div className="grid grid-cols-[80px_1fr] items-center gap-2">
                    <label>From:</label>
                    <select
                        className="bg-[#3A6F5E] p-1 rounded"
                        value={fromAccountIndex}
                        onChange={e => setFromAccountIndex(e.target.value === "" ? "" : Number(e.target.value))}>
                        <option value=""></option>
                        {userBudget.accounts.map((account, index) => (
                            <option key={index} value={index}>
                                {account.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-[80px_1fr] items-center gap-2">
                    <label>To:</label>
                    <select
                        className="bg-[#3A6F5E] p-1 rounded"
                        value={toAccountIndex}
                        onChange={e => setToAccountIndex(e.target.value === "" ? "" : Number(e.target.value))}>
                        <option value=""></option>
                        {userBudget.accounts.map((account, index) => (
                            <option key={index} value={index}>
                                {account.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-[80px_1fr] items-center gap-2">
                    <label>Amount:</label>
                    <input
                        className="bg-[#3A6F5E] p-1 rounded"
                        type="number"
                        min={0}
                        onChange={trySetAmount}
                        value={amount} />
                </div>

                <div className="flex justify-end">
                    <PrimaryButton disabled={amount <= 0 || fromAccountIndex === "" || toAccountIndex === ""} onClick={addEntry}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" /></svg>
                        Add
                    </PrimaryButton>
                </div>

                <hr />

                <div>
                    <h3>Current Entries:</h3>
                    {entries.length === 0 && <p className="text-sm">No entries added.</p>}
                    <div className="flex flex-col gap-1">
                        {entries.map((entry, index) => (
                            <p key={index}>
                                {entry.type} {entry.amount} - {entry.account.name}
                            </p>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-[80px_1fr] items-center gap-2">
                    <label>Description:</label>
                    <input
                        className="bg-[#3A6F5E] p-1 rounded"
                        type="text"
                        onChange={e => setDescription(e.target.value)} />
                </div>

                <div className="flex justify-end">
                    <PrimaryButton disabled={entries.length === 0} onClick={finishTransaction}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m9.55 15.15l8.475-8.475q.3-.3.7-.3t.7.3t.3.713t-.3.712l-9.175 9.2q.3.3-.7.3t-.7-.3L4.55 13q-.3-.3-.288-.712t.313-.713t.713-.3t.712.3z" /></svg>
                        Finish
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
}
