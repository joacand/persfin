"use client";

import PrimaryButton from "../Components/PrimaryButton";
import { useBudget } from "../Components/BudgetProvider";
import { useEffect, useState } from "react";
import { UserBudget } from "../Models/account";
import Input from "../Components/Input";
import Base from "../Components/Base";

export default function Settings() {
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

    return (
        <Base>
            <h2 className="text-3xl">Settings</h2>
            <div className="flex gap-4 flex-col items-start bg-[#1B2227] rounded p-4 max-w-md">
                <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                    <label>Name:</label>
                    <Input type="text" value={newAccountName} onChange={e => setNewAccountName(e.target.value)} />
                </div>
                <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                    <label>Unit (e.g. kr, $):</label>
                    <Input type="text" value={newAccountUnit} onChange={e => setNewAccountUnit(e.target.value)} />
                </div>
                <div className="flex flex-row gap-2">
                    <PrimaryButton disabled={!newAccountName || !newAccountUnit} onClick={save}>Save</PrimaryButton>
                </div>
            </div>
        </Base>
    );
}
