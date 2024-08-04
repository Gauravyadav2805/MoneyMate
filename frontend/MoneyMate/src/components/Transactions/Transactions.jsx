import React, { useEffect } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import IncomeItem from '../IncomeItem/InomeItem';

function Transactions() {
  const { incomes, expenses, getIncomes, getExpenses, deleteIncome, deleteExpense } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  return (
    <TransactionsStyled>
      <InnerLayout>
        <h1>Transactions</h1>
        <div className="transactions-content">
          <div className="incomes-section">
            <h2>Incomes</h2>
            <div className="transactions">
              {incomes.map((income) => {
                const { _id, title, amount, date, category, description, type } = income;
                return (
                  <IncomeItem
                    key={_id}
                    id={_id}
                    title={title}
                    description={description}
                    amount={amount}
                    date={date}
                    type={type}
                    category={category}
                    // indicatorColor="var(--color-green)"
                    deleteItem={deleteIncome}
                  />
                );
              })}
            </div>
          </div>
          <div className="expenses-section">
            <h2>Expenses</h2>
            <div className="transactions">
              {expenses.map((expense) => {
                const { _id, title, amount, date, category, description, type } = expense;
                return (
                  <IncomeItem
                    key={_id}
                    id={_id}
                    title={title}
                    description={description}
                    amount={amount}
                    date={date}
                    type={type}
                    category={category}
                    indicatorColor="var(--color-red)"
                    deleteItem={deleteExpense}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </InnerLayout>
    </TransactionsStyled>
  );
}

const TransactionsStyled = styled.div`
  display: flex;
  overflow: auto;

  h1 {
    text-align: center;
  }

  .transactions-content {
    display: flex;
    gap: 2rem;
    .incomes-section, .expenses-section {
      flex: 1;
      h2 {
        text-align: center;
        margin-bottom: 1rem;
      }
      .transactions {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    }
  }
`;

export default Transactions;
