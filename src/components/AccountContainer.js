import React, { useState } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [filterText, setFilterText] = useState("");

  const handleSearchChange = (text) => {
    setFilterText(text);
  };

  return (
    <div>
      <Search onSearch={handleSearchChange} />
      <AddTransactionForm onAddTransaction={() => setFilterText(filterText)} />
      <TransactionsList filterText={filterText} />
    </div>
  );
}

export default AccountContainer;
