import React, { ChangeEvent, useEffect, useRef } from "react";
import { styled } from "styled-components";
import bg from "./img/bg.png";
import { MainLayout } from "./Styles/Layouts";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";
import { Route, Routes } from "react-router";
import Dashboard from "./Pages/Dashboard";
import Incomes from "./Pages/Incomes";
import Expenses from "./Pages/Expenses";
import Transactions from "./Pages/Transactions";
import { ToastContainer, toast } from "react-toastify";
import { useGlobalContext } from "./Context/GlobalContext";

import "react-toastify/dist/ReactToastify.css";
import { hamburger } from "./utils/Icons";

type AppStyledType = {
  bg: string;
};

function App() {
  const { message, setMessage, error, setError, getIncomes, getExpenses } =
    useGlobalContext();

  const hamburgerRef = useRef<HTMLLabelElement>(null);

  const [open, setOpen] = React.useState<boolean>(false);
  const orbMemo = React.useMemo(() => {
    return <Orb />;
  }, []);

  useEffect(() => {
    if (message)
      toast(message, {
        onClose: () => {
          setMessage("");
          getIncomes();
          getExpenses();
        },
        type: "success",
      });
  }, [message]);

  useEffect(() => {
    if (error) toast(error, { onClose: () => setError(""), type: "error" });
  }, [error]);

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  const handleOpen = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setOpen(checked);
  };

  const handleOutside = (navRef: React.RefObject<HTMLElement>, node: Node) => {
    if (
      hamburgerRef.current &&
      !hamburgerRef.current.contains(node) &&
      navRef.current &&
      !navRef.current.contains(node)
    ) {
      setOpen(false);
    }
  };

  return (
    <AppStyled bg={bg} className="App">
      <label
        ref={hamburgerRef}
        htmlFor="hamburger"
        className="hamburger-container"
      >
        {hamburger}
      </label>
      <input
        checked={open}
        type="checkbox"
        id="hamburger"
        onChange={handleOpen}
      />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
      {orbMemo}
      <MainLayout>
        <Navigation open={open} setOpen={setOpen} onOutside={handleOutside} />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/incomes" element={<Incomes />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/transactions" element={<Transactions />} />
          </Routes>
        </main>
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div<AppStyledType>`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  #hamburger {
    display: none;
  }

  .hamburger-container {
    display: none;
    margin: 1.2rem;
    cursor: pointer;
    // position: absolute;
    // top: 10px;
    // left: 10px;
    // background: #fcf6f9;
    // border: 2px solid #fff;
    // box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.06);
    // border-radius: 50%;
    // padding: 1rem;
    // z-index: 10;
    position: absolute;
    top: 1rem;
    right: 2rem;
    z-index: 20;

    @media (max-width: 400px) {
      background: var(--primary-color);
      border: 2px solid #fff;
      box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.06);
      border-radius: 50%;
      padding: 1rem;
      margin: 0;
    }

    i {
      font-size: 2.4rem;

      @media (max-width: 400px) {
        color: #fcf6f9;
      }
    }

    @media (max-width: 900px) {
      display: inline-block;
    }
  }

  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #fff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow: auto;
    overflow-x: hidden;

    @media (max-width: 900px) {
      margin-top: 4rem;
    }

    @media (max-width: 400px) {
      border-radius: 0;
      border: none;
      padding-top: 3rem;
      margin-top: 0;
    }

    &::webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
