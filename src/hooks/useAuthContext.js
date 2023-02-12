import { useMemo, useState, useEffect, createContext, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";


export const setItemInLocalStorage = (keyName, value) => {
  window.localStorage.setItem(keyName, JSON.stringify(value));
};

export const getItemFromLocalStorage = (keyName) => {
  try {
    const value = window.localStorage.getItem(keyName);

    if (value) {
      return JSON.parse(value);
    }

    return null;
  } catch (err) {
    console.log(err);
  }
};

const kInitialUserState = {
  isLoggedIn: false,
  name: null,
  id: null,
  token: null
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(kInitialUserState);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const lsUser = getItemFromLocalStorage("user");

    if (lsUser?.isLoggedIn) {
      // set user in state
      setUser(lsUser);
      // navigate them wherever we want/they intended to go
      navigate(location.pathname);
    } else {
      navigate("/login");
    }
  }, [location.pathname, navigate]); //??

  const authLogin = (userData) => {
    setUser(userData);
    setItemInLocalStorage("user", userData);
    navigate("/home");
    // console.log(user);
  };

  const authLogout = () => {
    setUser(kInitialUserState);
    setItemInLocalStorage("user", kInitialUserState);
    // setItemInLocalStorage()
    navigate("/login");
  };

  // memoize the value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      user,
      authLogin,
      authLogout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};