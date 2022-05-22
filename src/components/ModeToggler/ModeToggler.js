import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "../../contexts";
import {
  MdOutlineDarkMode as DarkModeIcon,
  MdOutlineLightMode as LightModeIcon,
} from "react-icons/md";
import { TiArrowRightOutline as ModeArrowIcon } from "react-icons/ti";

const ThemeToggler = styled.div`
  position: relative;
  margin-left: 30px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 7px 13px;
  width: fit-content;
  list-style: none;
  border: 2px solid ${({ theme }) => theme.text.primary};
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  svg {
    fill: ${({ theme }) => theme.toggler.fill};
  }
`;

const ToggleArrow = styled(ModeArrowIcon)`
  transition: all 0.5s cubic-bezier(0.995, -0.265, 0.855, 0.505);
  transform: ${(props) => props.theme === "dark" && `rotate(180deg)`};
`;

export default function ModeToggler() {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleChangeTheme = () => {
    setTheme((pre) => {
      if (pre === "light") return "dark";
      return "light";
    });
  };

  return (
    <ThemeToggler onClick={handleChangeTheme}>
      <DarkModeIcon style={{ marginRight: "12px" }}></DarkModeIcon>
      <ToggleArrow theme={theme} />
      <LightModeIcon style={{ marginLeft: "12px" }}></LightModeIcon>
    </ThemeToggler>
  );
}
