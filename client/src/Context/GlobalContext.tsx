import axios, { AxiosError } from "axios";
import { createContext, useContext, useState } from "react";

const BASE_URL = "http://localhost:3001/api/v1";

export type TIncome = {
  _id?: string;
  title: string;
  date: Date;
  category: string;
  description: string;
  amount: number;
  type?: "income" | "expense";
  updatedAt: Date;
};
// const samI: TIncome = {
//   title: "",
//   date: new Date(),
//   category: "",
//   description: "",
//   amount: 0,
// };

type TExpense = TIncome;

interface IGlobalState {
  expenses: TExpense[];
  incomes: TIncome[];
  message: string;
  setMessage: (message: string) => void;
  error: string;
  setError: (error: string) => void;
  addIncome: (income: TIncome) => Promise<any>;
  getIncomes: () => void;
  deleteIncome: (id: string) => void;
  getTotalIncome: () => number;
  addExpense: (expense: TExpense) => Promise<any>;
  getExpenses: () => void;
  deleteExpense: (id: string) => void;
  getTotalExpense: () => number;
  getTotalBalance: () => number;
  getTransactionHistory: () => (TIncome | TExpense)[];
}

const defaultState = {
  expenses: [],
  incomes: [],
  message: "",
  setMessage: (message: string) => {},
  error: "",
  setError: (error: string) => {},
  addIncome: (income: TIncome) => {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  },
  getIncomes: () => {},
  deleteIncome: (id: string) => {},
  getTotalIncome: () => 0,
  addExpense: (expense: TExpense) => {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  },
  getExpenses: () => {},
  deleteExpense: (id: string) => {},
  getTotalExpense: () => 0,
  getTotalBalance: () => 0,
  getTransactionHistory: () => [],
};

const GlobalContext = createContext<IGlobalState>(defaultState);

interface GlobalProviderProps {
  children: React.ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [incomes, setIncomes] = useState<TIncome[]>([]);
  const [expenses, setExpenses] = useState<TExpense[]>([]);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const addIncome = async (income: TIncome) => {
    try {
      const response = await axios.post(`${BASE_URL}/add-income`, income);
      const { message } = response.data;
      setMessage(message);
      return true;
    } catch (err) {
      const error = err as AxiosError<any, any>;
      if (error.response?.data) {
        setError(error.response?.data.message);
      }
      return false;
    }
  };

  const getIncomes = async () => {
    try {
      const response = await axios.get<TIncome[]>(`${BASE_URL}/get-incomes`);
      setIncomes(response.data);
    } catch (err) {
      const error = err as AxiosError<any, any>;
      if (error.response?.data) {
        setError(error.response?.data.message);
      }
    }
  };

  const deleteIncome = async (id: string) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete-income/${id}`);
      const { message } = response.data;
      setMessage(message);
    } catch (err) {
      const error = err as AxiosError<any, any>;
      if (error.response?.data) {
        setError(error.response?.data.message);
      }
    }
  };

  const getTotalIncome = (): number => {
    return incomes.reduce((sum, income) => {
      sum += income.amount;
      return sum;
    }, 0);
  };

  const addExpense = async (expense: TExpense) => {
    try {
      const response = await axios.post(`${BASE_URL}/add-expense`, expense);
      const { message } = response.data;
      setMessage(message);
      return true;
    } catch (err) {
      const error = err as AxiosError<any, any>;
      if (error.response?.data) {
        setError(error.response?.data.message);
      }
      return false;
    }
  };

  const getExpenses = async () => {
    try {
      const response = await axios.get<TExpense[]>(`${BASE_URL}/get-expenses`);
      setExpenses(response.data);
    } catch (err) {
      const error = err as AxiosError<any, any>;
      if (error.response?.data) {
        setError(error.response?.data.message);
      }
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete-expense/${id}`);
      const { message } = response.data;
      setMessage(message);
    } catch (err) {
      const error = err as AxiosError<any, any>;
      if (error.response?.data) {
        setError(error.response?.data.message);
      }
    }
  };

  const getTotalExpense = (): number => {
    return expenses.reduce((sum, expense) => {
      sum += expense.amount;
      return sum;
    }, 0);
  };

  const getTotalBalance = () => getTotalIncome() - getTotalExpense();

  const getTransactionHistory = (): (TIncome | TExpense)[] => {
    const history: (TIncome | TExpense)[] = [...incomes, ...expenses];
    return history
      .sort(
        (a, b): number =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
      .slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        expenses,
        incomes,
        message,
        setMessage,
        error,
        setError,
        addIncome,
        getIncomes,
        deleteIncome,
        getTotalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        getTotalExpense,
        getTotalBalance,
        getTransactionHistory,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export default GlobalProvider;
