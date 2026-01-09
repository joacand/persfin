"use client";

import PrimaryButton from "../Components/PrimaryButton";
import { useBudget } from "../Components/BudgetProvider";
import { ChangeEvent, useState } from "react";
import { Account, AccountType } from "../Models/account";
import Input from "../Components/Input";
import Select from "../Components/Select";
import Base from "../Components/Base";

export default function Accounts() {
    const { userBudget, dispatch } = useBudget();

    const [accountForm, setAccountForm] = useState({
        accountType: "",
        name: "",
        description: ""
    });

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
        if (accountForm.accountType === "") { return; }
        dispatch({
            type: "ADD_ACCOUNT", account: {
                id: crypto.randomUUID(),
                name: accountForm.name,
                description: accountForm.description,
                type: { type: accountForm.accountType } as AccountType
            }
        });
        clearInputs();
    }

    function removeAccount(account: Account) {
        dispatch({
            type: "REMOVE_ACCOUNT", account
        });
    }

    function clearInputs() {
        setAccountForm({
            accountType: "",
            name: "",
            description: ""
        });
    }

    function handleChange(e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) {
        setAccountForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    return (
        <Base className="items-start">
            <h2 className="text-3xl">Accounts</h2>
            <div className="flex flex-col flex-wrap items-start gap-4 bg-[#1B2227] rounded p-4">
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
            <div className="flex flex-row gap-2">
                <form className="flex flex-col flex-wrap items-start gap-4 bg-[#1B2227] rounded p-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        addAccount();
                    }}>
                    <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                        <label>Account type:</label>
                        <Select
                            name="accountType"
                            value={accountForm.accountType}
                            onChange={handleChange}
                            required>
                            <option value=""></option>
                            {ACCOUNT_TYPES.map((account) => (
                                <option key={account} value={account}>
                                    {account}
                                </option>
                            ))}
                        </Select>
                    </div>

                    <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                        <label>Name:</label>
                        <Input type="text" name="name" required onChange={handleChange} min={0} value={accountForm.name} />
                    </div>

                    <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                        <label>Description:</label>
                        <Input type="text" name="description" required onChange={handleChange} min={0} value={accountForm.description} />
                    </div>

                    <PrimaryButton type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" /></svg>
                        Add
                    </PrimaryButton>
                </form>
                <div className="flex flex-col flex-wrap gap-4 bg-[#1B2227] rounded p-4">
                    <p>Keep in mind to use the correct <strong>account type</strong> for your account. Here are some examples:</p>
                    <ul>
                        <li><strong>Asset:</strong> Cash, Bank Account, Inventory</li>
                        <li><strong>Liability:</strong> Loans, Credit Card</li>
                        <li><strong>Equity:</strong> Initial Equity, Retained Earnings</li>
                        <li><strong>Revenue:</strong> Sales, Income (paycheck)</li>
                        <li><strong>Expense:</strong> Rent, Utilities </li>
                    </ul>
                    <p>
                        Investments such as a house, vehicle, or stocks are typically recorded as assets.
                        Changes in value may be tracked over time, but gains or losses are usually only
                        realized when the asset is sold.
                    </p>
                </div>
            </div>
        </Base>
    );
}
