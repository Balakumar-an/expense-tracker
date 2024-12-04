import { ChangeEvent, useState } from "react";
import { styled } from "styled-components";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.module.css";
import { TIncome, useGlobalContext } from "../../Context/GlobalContext";
import Button from "../Button/Button";
import { plus } from "../../utils/Icons";
import { categoryIcons } from "../TransactionItem/TransactionItem";

// interface IinputState {
//   title: string;
//   amount: string;
//   description: string;
//   category: string;
//   date: Date;
// }

interface IformProps {
  formType: string;
}

const defaultState = {
  title: "",
  amount: 0,
  description: "",
  category: "",
  date: new Date(),
  updatedAt: new Date(),
};

const Form: React.FC<IformProps> = ({ formType }) => {
  const { addIncome, addExpense, error } = useGlobalContext();
  const [inputState, setInputState] = useState<TIncome>(defaultState);

  const handleChange =
    (name: string) =>
    (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
      const value = name === "amount" ? +e.target.value : e.target.value;

      setInputState({
        ...inputState,
        [name]: value,
      });
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formType === "Income") {
      addIncome(inputState).then(() => setInputState(defaultState));
    } else {
      addExpense(inputState).then(() => setInputState(defaultState));
    }
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <div className="input-control">
        <input
          type="text"
          value={inputState.title}
          name="title"
          placeholder={`${formType} title`}
          onChange={handleChange("title")}
        />
      </div>
      <div className="input-control">
        <input
          type="number"
          value={inputState.amount}
          name="amount"
          placeholder={`${formType} amount`}
          onChange={handleChange("amount")}
        />
      </div>
      <div className="input-control">
        <DatePicker
          id="date"
          placeholderText="Enter A date"
          dateFormat="dd/MM/yyyy"
          selected={inputState.date}
          onChange={(date: Date) => setInputState({ ...inputState, date })}
        />
      </div>
      <div className="select input-control">
        <select
          name="category"
          id="category"
          required
          value={inputState.category}
          onChange={handleChange("category")}
        >
          <option value="" disabled>
            Select Option
          </option>
          {Object.keys(categoryIcons[formType.toLowerCase()]).map(
            (category) => {
              return (
                <option key={category} value={category}>
                  {category}
                </option>
              );
            }
          )}
        </select>
      </div>

      <div className="input-control">
        <textarea
          name="description"
          id="description"
          cols={30}
          rows={4}
          value={inputState.description}
          placeholder="Add a Reference"
          onChange={handleChange("description")}
        />
      </div>

      <div className="submit-btn">
        <Button
          name={`Add ${formType}`}
          icon={plus}
          btnPad=".8rem 1.6rem"
          btnRadius="30px"
          bg="var(--color-accent)"
          color="#fff"
          disabled={!!error}
        />
      </div>
    </FormStyled>
  );
};

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 700px) {
    display:grid;
    grid-template-columns:repeat(2,1fr);
    // flex-direction:row;
    // flex-wrap:wrap;
  }

  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    text-transform:capitalize;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: var(--box-shadow-1);
    color: rgba(34, 34, 96, 0.9);

    &::placeholder {
    var(--primary-color3)
    }
  }

  .input-control {

    @media (max-width: 700px) {
      & > *{
        width:100%;
      }
    }

    input {
      width: 100%;
    }

    &:has(textarea){
      @media (max-width: 700px) {
        grid-column:1/-1;
      }
    }
  }

  .select {
    display: flex;
    justify-content: flex-end;

    select {
      color:rgba(34, 34, 96, .4) ;
      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .submit-btn {
    button {
      box-shadow: var(--box-shadow-1);
      &:hover {
        background-color: var(--color-green) !important;
      }
    }
  }
`;

export default Form;
