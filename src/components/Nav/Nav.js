import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import style from './Nav.module.css';

const StyledLink = styled(NavLink)`
  color: rgb(100, 100, 100);
  display: block;
  font-weight: 700;

  &.active {
    color: rgb(0, 0, 0);
  }
`;

const Nav = () => {
  return (
    <nav className={style.container}>
      <StyledLink to="/" className={style.link}>
        Home
      </StyledLink>

      <StyledLink to="/registration" className={style.link}>
        Registration
      </StyledLink>

      <StyledLink to="/login" className={style.login}>
        Login
      </StyledLink>
    </nav>
  );
};

export default Nav;
