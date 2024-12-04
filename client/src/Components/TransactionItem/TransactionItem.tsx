import React from "react";
import { styled } from "styled-components";
import { TIncome } from "../../Context/GlobalContext";
import {
  bitcoin,
  book,
  calender,
  card,
  circle,
  clothing,
  comment,
  dollar,
  food,
  freelance,
  medical,
  money,
  piggy,
  stocks,
  takeaway,
  trash,
  tv,
  users,
  yt,
} from "../../utils/Icons";
import Button from "../Button/Button";
import { dateFormat } from "../../utils/dateFormate";

export const categoryIcons: { [key: string]: { [key: string]: JSX.Element } } =
  {
    income: {
      salary: money,
      freelancing: freelance,
      investments: stocks,
      stocks: users,
      bitcoin: bitcoin,
      bank: card,
      youtube: yt,
      other: piggy,
    },
    expense: {
      education: book,
      groceries: food,
      health: medical,
      subscriptions: tv,
      takeaways: takeaway,
      clothing,
      travelling: freelance,
      other: circle,
    },
  };

interface TransactionItemProps extends TIncome {
  deleteItem: (id: string) => void;
  indicatorColor: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  _id = "",
  title,
  amount,
  date,
  category,
  description,
  deleteItem,
  indicatorColor,
  type = "",
}) => {
  return (
    <TransactionItemStyled indicator={indicatorColor}>
      <div className="icon">{categoryIcons[type][category]}</div>
      <div className="content">
        <h5>{title}</h5>
        <div className="inner-content">
          <div className="text">
            <p>
              {dollar}
              {amount}
            </p>
            <p>
              {calender} {dateFormat(date)}
            </p>
            <p>
              {comment} {description}
            </p>
          </div>
          <div className="btn-container">
            <Button
              icon={trash}
              btnPad="1rem"
              btnRadius="50%"
              bg="var(--primary-color)"
              color="#fff"
              onClick={() => deleteItem(_id)}
              // iColor="#fff"
              // hColor="var(--color-green)"
            />
          </div>
        </div>
      </div>
    </TransactionItemStyled>
  );
};

const TransactionItemStyled = styled.div<{ indicator: string }>`
  background: #fcf6f9;
  border: 2px solid #fff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  color: #222260;

  .icon {
    width: 8rem;
    height: 8rem;
    border-radius: 20px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #fff;

    @media (max-width: 400px) {
      width: 6rem;
      height: 6rem;
      border-radius: 12px;
    }

    i {
      font-size: 2.6rem;

      @media (max-width: 400px) {
        font-size: 2rem;
      }
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    h5 {
      font-size: 1.3rem;
      padding-left: 2rem;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background: ${(props) => props.indicator};
      }
    }

    .inner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .text {
        display: flex;
        align-item: center;
        gap: 1.5rem;

        p {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary-color);
          opacity: 0.8;
        }
      }
    }
  }
`;

export default TransactionItem;
