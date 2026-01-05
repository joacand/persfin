"use client";

import PrimaryButton from "../Components/PrimaryButton";
import { useBudget } from "../Components/BudgetProvider";
import { useState } from "react";
import { Account, AccountType } from "../Models/account";

export default function Accounts() {
    const { userBudget, dispatch } = useBudget();

    const [accountType, setAccountType] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    if (!userBudget) {
        return <p>Loading...</p>;
    }

    const ACCOUNT_TYPES = [
        "Asset",
        "Liability",
        "Equity",
        "Revenue",
        "Expense",
    ] as const;

    function addAccount() {
        if (accountType === "") { return; }
        dispatch({
            type: "ADD_ACCOUNT", account: {
                id: crypto.randomUUID(),
                name,
                description,
                type: { type: accountType } as AccountType
            }
        });
        clearInputs();
    }

    function clearInputs() {
        setAccountType("");
        setName("");
        setDescription("");
    }

    function removeAccount(account: Account) {
        dispatch({
            type: "REMOVE_ACCOUNT", account
        });
    }

    return (
        <div className="flex gap-4 flex-col items-start ">
            <h2 className="text-3xl">Accounts</h2>
            <div className="flex flex-col flex-wrap items-start gap-4 bg-[#0B1A16] rounded p-4">
                {userBudget.accounts.length === 0 && <p>No accounts available.</p>}
                <div className="flex gap-2 flex-row flex-wrap">
                    {userBudget.accounts.map((account, index) => (
                        <div key={index} className="border border-gray-700 rounded-md p-4 cursor-pointer flex flex-col gap-2 items-start">
                            <p>{account.name} - {account.description}</p>
                            <p>Type: {account.type.type}</p>
                            <PrimaryButton onClick={() => removeAccount(account)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z" /></svg>
                                Remove
                            </PrimaryButton>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col flex-wrap items-start gap-4 bg-[#0B1A16] rounded p-4">
                <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                    <label>Account type:</label>
                    <select
                        className="bg-[#3A6F5E] p-1 rounded"
                        value={accountType}
                        onChange={e => setAccountType(e.target.value)}>
                        <option value=""></option>
                        {ACCOUNT_TYPES.map((account) => (
                            <option key={account} value={account}>
                                {account}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                    <label>Name:</label>
                    <input
                        className="bg-[#3A6F5E] p-1 rounded"
                        type="text"
                        onChange={e => setName(e.target.value)}
                        min={0}
                        value={name} />
                </div>

                <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                    <label>Description:</label>
                    <input
                        className="bg-[#3A6F5E] p-1 rounded"
                        type="text"
                        onChange={e => setDescription(e.target.value)}
                        min={0}
                        value={description} />
                </div>

                <PrimaryButton disabled={accountType === "" || name.trim() === "" || description.trim() === ""} onClick={() => addAccount()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" /></svg>
                    Add
                </PrimaryButton>
            </div>
        </div>
    );
}
