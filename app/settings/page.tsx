"use client";

import PrimaryButton from "../Components/PrimaryButton";
import { useBudget } from "../Components/BudgetProvider";
import { useEffect, useState } from "react";
import { UserBudget } from "../Models/account";
import Input from "../Components/Input";
import Base from "../Components/Base";
import { ResetBudgetAccount } from "../Services/storageService";
import { useAuth } from "../Components/AuthContext";

export default function Settings() {
    const { user } = useAuth();
    const { userBudget, dispatch } = useBudget();

    const [newAccountName, setNewAccountName] = useState<string>("");
    const [newAccountUnit, setNewAccountUnit] = useState<string>("");

    useEffect(() => {
        if (userBudget) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setNewAccountUnit(userBudget.unit);
            setNewAccountName(userBudget.name);
        }
    }, [userBudget])

    if (!userBudget) {
        return <p>Loading...</p>;
    }

    function save() {
        if (!userBudget) return;
        const updatedBudget: UserBudget = {
            ...userBudget,
            name: newAccountName,
            unit: newAccountUnit,
            isDefault: false
        };
        dispatch({ type: "INIT", budgetAccount: updatedBudget });
    }

    function resetData() {
        if (!user) { return; }
        if (window.confirm("Are you sure you want to remove all data? This cannot be undone.")) {
            dispatch({ type: "RESET" });
            ResetBudgetAccount(user.uid).then((budget) => {
                dispatch({ type: "INIT", budgetAccount: budget });
            });
        }
    }

    return (
        <Base>
            <h2 className="text-3xl">Settings</h2>
            <form className="flex gap-4 flex-col items-start bg-[#1B2227] rounded p-4 max-w-sm" onSubmit={(e) => { e.preventDefault(); save(); }}>
                <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                    <label>Name:</label>
                    <Input type="text" required value={newAccountName} onChange={e => setNewAccountName(e.target.value)} />
                </div>
                <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                    <label>Unit (e.g. kr, $):</label>
                    <Input type="text" required value={newAccountUnit} onChange={e => setNewAccountUnit(e.target.value)} />
                </div>
                <div className="flex flex-row gap-2 justify-between w-full">
                    <PrimaryButton type="submit">Save</PrimaryButton>
                    <PrimaryButton className="bg-[#E05D5D] hover:bg-[#A05D5D]" onClick={resetData}>Reset account (remove all data)</PrimaryButton>
                </div>
            </form>
        </Base>
    );
}
