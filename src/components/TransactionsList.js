import React, { useState, useEffect } from "react";
import Transaction from "./Transaction";

function TransactionsList({ filterText }) {
  const [transactions, setTransactions] = useState([]);
  const [sortKey, setSortKey] = useState("date");

  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8001/transactions/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTransactions(transactions.filter((tx) => tx.id !== id));
      })
      .catch((error) => console.error("Error deleting transaction:", error));
  };

  const filteredTransactions = transactions.filter((tx) =>
    tx.description.toLowerCase().includes(filterText.toLowerCase())
  );

  const sortedTransactions = filteredTransactions.sort((a, b) => {
    if (sortKey === "amount") {
      return a.amount - b.amount;
    }
    return a[sortKey].localeCompare(b[sortKey]);
  });

  const handleSortChange = (key) => {
    setSortKey(key);
  };

  return (
    <div>
      <div>
        <button onClick={() => handleSortChange("date")}>Sort by Date</button>
        <button onClick={() => handleSortChange("description")}>Sort by Description</button>
        <button onClick={() => handleSortChange("category")}>Sort by Category</button>
        <button onClick={() => handleSortChange("amount")}>Sort by Amount</button>
      </div>
      <table className="ui celled striped padded table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((transaction) => (
            <Transaction
              key={transaction.id}
              date={transaction.date}
              description={transaction.description}
              category={transaction.category}
              amount={transaction.amount}
              onDelete={() => handleDelete(transaction.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsList;

