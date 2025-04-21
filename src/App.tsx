import { useEffect, useState } from "react";
import NewTransactionForm from "./NewTransactionForm";
import "./App.css";

type Transaction = {
  id: string;
  createdAt: string;
  amount: number;
  description: string;
};

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const baseUrl = import.meta.env.VITE_FINTECH_API_BASE_URL;

  useEffect(() => {
    fetch(`${baseUrl}/api/v1/transactions`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch transactions");
        return res.json();
      })
      .then((data: Transaction[]) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Fintech App</h1>
      </header>
      <main className="main-content">
        <h2 className="section-title">Recent Transactions</h2>
        {loading && <p>Loading transactions...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
          <table className="transaction-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date & Time</th>
                <th>Amount</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{tx.id}</td>
                  <td>{new Date(tx.createdAt).toLocaleString()}</td>
                  <td>{tx.amount.toFixed(2)} €</td>
                  <td>{tx.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <NewTransactionForm
          baseUrl={baseUrl}
          onTransactionCreated={(tx) => setTransactions((prev) => [tx, ...prev])}
        />
      </main>
    </div>
  );
}

export default App;
