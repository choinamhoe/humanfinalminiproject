import { NavLink, useNavigate } from "react-router-dom";
import URL from "../constants/Url";
import { logoutApi } from "../api/user";

const NavLinkItem = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        // fontSize: isActive ? "32px" : "18px",
        fontWeight: isActive ? "bold" : "normal",
      })}
    >
      {children}
    </NavLink>
  );
};

const Header = ({ isLogin, setIsLogin, userInfo }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!isLogin) {
      navigate(URL.LOGIN);
    } else {
      try {
        await logoutApi();
        setIsLogin(false);
      } catch (err) {
        console.log(err);
        if (err.response?.data) {
          console.error(err.response.data.message);
          setIsLogin(false);
        }
      }
    }
  };
  return (
    <ul style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
      <li>
        <NavLinkItem to={URL.HOME}>Home</NavLinkItem>
      </li>
      <li>
        <NavLinkItem to={URL.INTRODUCE}>Introduce</NavLinkItem>
      </li>
      <li>
        <NavLinkItem to={URL.NEWS}>News</NavLinkItem>
      </li>
      <li>
        <NavLinkItem to={URL.Q_A}>Q & A</NavLinkItem>
      </li>
      <li>
        <NavLinkItem to={URL.LOGIN}>Login</NavLinkItem>
      </li>
      <button
        style={{
          marginLeft: "auto",
          marginRight: "20px",
        }}
        onClick={handleClick}
      >
        {isLogin ? "Logout" : "Login"}
      </button>
    </ul>
  );
};

export default Header;
