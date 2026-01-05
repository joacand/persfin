"use client";

import PrimaryButton from "../Components/PrimaryButton";
import { Transaction } from "../Models/account";
import { useBudget } from "../Components/BudgetProvider";

export default function Transactions() {
    const { userBudget, dispatch } = useBudget();

    if (!userBudget) {
        return <p>Loading...</p>;
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
            <h2 className="text-3xl">Transactions</h2>
            {userBudget.transactions.length === 0 && <p>No transactions available.</p>}
            <div className="flex flex-col gap-4 bg-[#0B1A16] rounded p-4 flex-wrap">
                {userBudget.transactions.toReversed().map((transaction) => (
                    <div key={transaction.id} className="flex flex-row flex-wrap justify-between items-end border border-dashed rounded-md p-4 gap-2">
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
                            <PrimaryButton onClick={() => revertTransaction(transaction)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m7.825 13l5.6 5.6L12 20l-8-8l8-8l1.425 1.4l-5.6 5.6H20v2z" /></svg>
                                Revert
                            </PrimaryButton>
                            <PrimaryButton className="bg-[#E05D5D] hover:bg-[#A05D5D]" onClick={() => removeTransaction(transaction)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z" /></svg>
                                Remove
                            </PrimaryButton>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
