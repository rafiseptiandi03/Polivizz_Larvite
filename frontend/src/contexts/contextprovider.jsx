import { useContext, useState, createContext } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    role: null,
    setUser: () => {},
    setToken: () => {},
    setRole: () => {},
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, _setToken] = useState(
        localStorage.getItem("ACCESS_TOKEN") || null
    );
    const [role, setRole] = useState(null);

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    return (
        <StateContext.Provider
            value={{
                user,
                token,
                role,
                setUser,
                setToken,
                setRole,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
