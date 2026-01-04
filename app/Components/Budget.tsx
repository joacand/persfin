"use client";

import { useEffect, useState } from "react";
import { Entry, UserBudget } from "../Models/account";
import { LoadBudgetAccount, SaveBudgetAccount } from "../Services/storageService";

export default function BudgetView() {
    const [userBudget, setUserBudget] = useState<UserBudget | null>();
    const [entries, setEntries] = useState<Entry[]>([]);

    const [fromAccountIndex, setFromAccountIndex] = useState<number>(0);
    const [toAccountIndex, setToAccountIndex] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);
    const [description, setDescription] = useState<string>("");

    useEffect(() => {
        LoadBudgetAccount().then(setUserBudget);
    }, []);

    if (!userBudget) { return <p>Loading...</p> }

    function addEntry() {
        if (userBudget == null) return;
        // TODO: Add status text to user from validation errors
        if (amount <= 0) return;
        if (fromAccountIndex === toAccountIndex) return;

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

        const newBudget = {
            ...userBudget,
            transactions: [...userBudget.transactions, {
                date: new Date(),
                entries,
                description
            }]
        };
        setUserBudget(newBudget);
        SaveBudgetAccount(newBudget);
        setEntries([]);
        clearInputs();
    }

    function clearInputs() {
        setFromAccountIndex(0);
        setToAccountIndex(0);
        setAmount(0);
    }

    function trySetAmount(e: React.ChangeEvent<HTMLInputElement>) {
        const value = parseFloat(e.target.value);
        if (!isNaN(value) && value >= 0) {
            setAmount(value);
        }
    }

    return (
        <div className="flex gap-10 flex-col">
            <div>
                <h2 className="text-2xl"><strong>{userBudget.name}</strong></h2>
                {userBudget.accounts.length === 0 && <p>No accounts available.</p>}
                <div className="flex gap-2 flex-row flex-wrap">
                    {userBudget.accounts.map((account, index) => (
                        <div key={index} className="border border-dashed rounded-md p-4 cursor-pointer">
                            <p>{account.name} - {account.description}</p>
                            <p>Type: {account.type.type}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-2 border border-dashed p-4">
                <h2 className="text-xl">Create Transaction</h2>
                <div className="flex flex-row gap-2">
                    <h3>From:</h3>
                    <select onChange={e => setFromAccountIndex(e.target.selectedIndex)}>
                        {userBudget.accounts.map((account, index) => (
                            <option className="bg-black" key={index}>{account.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-row gap-2">
                    <h3>To:</h3>
                    <select onChange={e => setToAccountIndex(e.target.selectedIndex)}>
                        {userBudget.accounts.map((account, index) => (
                            <option className="bg-black" key={index}>{account.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-row gap-2">
                    <h3>Amount:</h3>
                    <input type="number" min={0} onChange={trySetAmount} />
                </div>
                <button className="cursor-pointer border p-2" onClick={addEntry}>➕ Add</button>
                <hr />
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
                    {userBudget.transactions.toReversed().map((transaction, index) => (
                        <div key={index} className="border border-dashed rounded-md p-4">
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
                    ))}
                </div>
            </div>
        </div>
    );
}