import { styled } from "styled-components";
import { InnerLayout } from "../Styles/Layouts";
import Chart from "../Components/Chart/Chart";
import { dollar } from "../utils/Icons";
import { useGlobalContext } from "../Context/GlobalContext";
import History from "../Components/History/History";

const Dashboard = () => {
  const {
    getTotalIncome,
    getTotalExpense,
    getTotalBalance,
    incomes,
    expenses,
  } = useGlobalContext();

  const minIncome = Math.min(...incomes.map((income) => income.amount));
  const maxIncome = Math.max(...incomes.map((income) => income.amount));
  const minExpense = Math.min(...expenses.map((expense) => expense.amount));
  const maxExpense = Math.max(...expenses.map((expense) => expense.amount));

  return (
    <DashboardStyled>
      <InnerLayout>
        <h1>All Transactions</h1>
        <div className="stats-container">
          <div className="chart-container">
            <Chart />
          </div>
          <div className="amount-container">
            <div className="income">
              <h2>Total Income</h2>
              <p>
                {dollar} {getTotalIncome()}
              </p>
            </div>
            <div className="expense">
              <h2>Total Expense</h2>
              <p>
                {dollar} {getTotalExpense()}
              </p>
            </div>
            <div className="balance">
              <h2>Total Balance</h2>
              <p>
                {dollar} {getTotalBalance()}
              </p>
            </div>
          </div>
          <div className="history-container">
            <History />
          </div>
          <div className="min-max-container">
            <div className="income">
              <h2 className="salary-title">
                Min <span>Income</span> Max
              </h2>
              <div className="salary-item">
                <p>{minIncome < Infinity ? minIncome : 0}</p>
                <p>{maxIncome > 0 ? maxIncome : 0}</p>
              </div>
            </div>
            <div className="expense">
              <h2 className="salary-title">
                Min <span>Expense</span> Max
              </h2>
              <div className="salary-item">
                <p>{minExpense < Infinity ? minExpense : 0}</p>
                <p>{maxExpense > 0 ? maxExpense : 0}</p>
              </div>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
};

const DashboardStyled = styled.div`
  .stats-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;

    .chart-container {
      grid-column: 1/4;
      max-height: 400px;

      @media (max-width: 900px) {
        grid-column: 1/-1;
      }
    }

    .amount-container {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
      margin-top: 2rem;

      grid-row: 2/3;
      grid-column: 1/4;

      @media (max-width: 700px) {
        grid-template-columns: repeat(3, 1fr);
        grid-column: 1/-1;
      }

      @media (max-width: 400px) {
        grid-template-columns: 1fr;
        grid-column: 1/-1;
      }

      .income,
      .expense {
        grid-column: span 2;

        @media (max-width: 700px) {
          grid-column: span 1;
        }
      }

      .balance {
        grid-column: 2/4;
        @media (max-width: 700px) {
          grid-column: 3/4;
        }

        p {
          color: var(--color-green);
          opacity: 0.6;
          font-size: 4.5rem;

          @media (max-width: 700px) {
            font-size: 3rem;
          }
        }
      }

      .income,
      .expense,
      .balance {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #fcf6f9;
        border: 2px solid #fff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;

        @media (max-width: 400px) {
          grid-column: 1/-1;
        }

        p {
          font-size: 3.5rem;
          font-weight: 700;

          @media (max-width: 700px) {
            font-size: 2.5rem;
          }
        }
      }
    }

    .history-container {
      grid-column: 4/-1;

      @media (max-width: 900px) {
        grid-column: 1/-1;
      }
    }

    .min-max-container {
      grid-column: 4/-1;

      @media (max-width: 900px) {
        grid-row: 2/3;
      }

      @media (max-width: 700px) {
        grid-row: 3/4;
        grid-column: 1/-1;
      }

      h2 {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .salary-title {
        font-size: 1.2rem;
        span {
          font-size: 1.8rem;
        }
      }

      .salary-item {
        background: #fcf6f9;
        border: 2px solid #fff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        p {
          font-size: 1.6rem;
          font-weight: 600;
        }
      }
    }
  }
`;

export default Dashboard;
