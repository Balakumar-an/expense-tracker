import { styled } from "styled-components";
import { InnerLayout } from "../Styles/Layouts";
import TransactionItem from "../Components/TransactionItem/TransactionItem";
import { useGlobalContext } from "../Context/GlobalContext";
import Form from "../Components/Form/Form";

const Expenses = () => {
  const { expenses, deleteExpense, getTotalExpense } = useGlobalContext();

  return (
    <ExpensesStyled>
      <InnerLayout>
        <h1>Expenses</h1>
        <h2 className="total-expense">
          Total Expense:<span>${getTotalExpense()}</span>
        </h2>
        <div className="expense-content">
          <div className="form-container">
            <Form formType="Expense" />
          </div>
          <div className="expenses">
            {expenses.map((expense) => {
              return (
                <TransactionItem
                  key={expense._id}
                  {...expense}
                  indicatorColor="var(--color-green)"
                  deleteItem={deleteExpense}
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </ExpensesStyled>
  );
};

const ExpensesStyled = styled.div`
  display: flex;
  overflow: auto;

  .total-expense {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcf6f9;
    border: 2px solid #fff;
    box-shadow: var(--box-shadow-1);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;

    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: red;
    }
  }

  .expense-content {
    display: flex;
    gap: 2rem;

    @media (max-width: 700px) {
      flex-direction: column;
    }

    .expenses {
      flex: 1;
    }
  }
`;

export default Expenses;
