import { ReactElement } from "react";
import { dashboard, expenses, transactions, trend } from "./Icons";

interface ImenuItem {
  id: number;
  title: string;
  link: string;
  icon: ReactElement;
}

export const menuItems: ImenuItem[] = [
  {
    id: 1,
    title: "Dashboard",
    icon: dashboard,
    link: "/",
  },
  {
    id: 2,
    title: "View Transactions",
    icon: transactions,
    link: "/transactions",
  },
  {
    id: 3,
    title: "Incomes",
    icon: trend,
    link: "/incomes",
  },
  {
    id: 4,
    title: "Expenses",
    icon: expenses,
    link: "/expenses",
  },
];
