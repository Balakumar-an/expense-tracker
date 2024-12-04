import { styled } from "styled-components";
import { InnerLayout } from "../Styles/Layouts";
import Form from "../Components/Form/Form";
import { useGlobalContext } from "../Context/GlobalContext";
import TransactionItem from "../Components/TransactionItem/TransactionItem";

const Incomes = () => {
  const { incomes, deleteIncome, getTotalIncome } = useGlobalContext();

  return (
    <IncomesStyled>
      <InnerLayout>
        <h1>Incomes</h1>
        <h2 className="total-income">
          Total Income:<span>${getTotalIncome()}</span>
        </h2>
        <div className="income-content">
          <div className="form-container">
            <Form formType="Income" />
          </div>
          <div className="incomes">
            {incomes.map((income) => {
              return (
                <TransactionItem
                  key={income._id}
                  {...income}
                  indicatorColor="var(--color-green)"
                  deleteItem={deleteIncome}
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </IncomesStyled>
  );
};

const IncomesStyled = styled.div`
  display: flex;
  overflow: auto;

  .total-income {
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
      color: var(--color-green);
    }
  }

  .income-content {
    display: flex;
    gap: 2rem;

    @media (max-width: 700px) {
      flex-direction: column;
    }

    .incomes {
      flex: 1;
    }
  }
`;

export default Incomes;
