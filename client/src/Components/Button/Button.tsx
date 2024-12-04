import React from "react";
import { styled } from "styled-components";

interface ButtonProps {
  bg?: string;
  btnPad?: string;
  color?: string;
  btnRadius?: string;
  name?: string;
  icon?: JSX.Element;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  name,
  btnPad,
  btnRadius,
  color,
  bg,
  icon,
  onClick,
  disabled,
}) => {
  return (
    <ButtonStyled
      style={{
        background: bg ? bg : "currentColor",
        color: color ? color : "currentcolor",
        padding: btnPad ? btnPad : "inherit",
        borderRadius: btnRadius ? btnRadius : "inherit",
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {name}
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button`
  outline: none;
  border: none;
  font-family: inherit;
  font-size: inherit;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
`;

export default Button;
