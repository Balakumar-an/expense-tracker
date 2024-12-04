import { LegacyRef, RefObject, useEffect, useRef } from "react";
import { styled } from "styled-components";
import imgAvatar from "../../img/avatar.png";
// import imgAvatar from "../../img/Bala.jpg";
import { menuItems } from "../../utils/menu-items";
import { close, signout } from "../../utils/Icons";
import { NavLink } from "react-router-dom";

interface NavigationProps {
  name?: string;
  avatar?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  onOutside: (ref: RefObject<HTMLElement>, node: Node) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  name = "Balakumar A N",
  avatar = imgAvatar,
  open,
  setOpen,
  onOutside,
}) => {
  const newRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (e: MouseEvent) => {
    onOutside(newRef, e.target as Node);
    // if (newRef.current && !newRef.current.contains(e.target as Node)) {
    //   setOpen(false);
    // }
  };

  const handleClose = () => setOpen(false);

  return (
    <NavigationStyled className={`${open ? "open" : ""}`} ref={newRef}>
      {open && (
        <div className="close-icon" onClick={handleClose}>
          {close}
        </div>
      )}
      <div className="user-container">
        <img src={avatar} alt="user" />
        <div className="text">
          <h2>{name}</h2>
          <p>Your money</p>
        </div>
      </div>
      <ul className="menu-items">
        {menuItems.map((item) => {
          return (
            <li key={item.id} onClick={handleClose}>
              <NavLink to={item.link}>
                {item.icon}
                <span>{item.title}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
      <div className="bottom-nav">{signout} Signout</div>
    </NavigationStyled>
  );
};

const NavigationStyled = styled.nav`
  padding: 2rem 1.5rem;
  height: 100%;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #fff;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  transition: all 0.5s ease-in-out;
  z-index: 20;

  .close-icon {
    position: absolute;
    right: 1.2rem;
    top: 1.2rem;

    i {
      font-size: 2.4rem;
      color: red;
    }
  }

  @media (max-width: 900px) {
    position: absolute;
    top: 0;
    left: -100%;
    border-radius: 0;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.2);
    opacity: 0;

    &.open {
      opacity: 1;
      left: 0;
    }
  }

  @media (max-width: 400px) {
    width: 100%;
  }

  .user-container {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      background-color: #fcf6f9;
      border: 2px solid #fff;
      padding: 0.2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }

    h2 {
      color: rgba(34, 34, 96, 1);
    }

    p {
      color: rgba(34, 34, 96, 0.6);
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;

    li {
      margin: 0.6rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      color: rgba(34, 34, 96, 0.6);
      padding-left: 1rem;
      position: relative;

      a {
        text-decoration: none;
        color: currentColor;
        display: grid;
        grid-template-columns: 40px auto;
        align-items: center;
      }
    }
  }

  .active {
    color: rgba(34, 34, 96, 1) !important;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #222260;
      border-radius: 0 10px 10px 0;
    }
  }
`;

export default Navigation;
