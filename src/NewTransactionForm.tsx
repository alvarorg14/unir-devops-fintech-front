import { useState } from "react";

type Props = {
  baseUrl: string;
  onTransactionCreated: (tx: any) => void;
};

function NewTransactionForm({ baseUrl, onTransactionCreated }: Props) {
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTransaction = {
      amount: parseFloat(amount),
      description,
      datetime: new Date().toISOString(),
    };

    try {
      const res = await fetch(`${baseUrl}/api/v1/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
      });

      if (!res.ok) throw new Error("Failed to create transaction");

      const created = await res.json();
      onTransactionCreated(created);

      setAmount("");
      setDescription("");
    } catch (err) {
      alert("Error creating transaction: " + (err as Error).message);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <h3 className="form-title">Add New Transaction</h3>
      <form className="transaction-form" onSubmit={handleSubmit}>
        <input
          type="number"
          step="0.01"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
}

export default NewTransactionForm;
