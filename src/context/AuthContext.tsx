import { UserModel } from "@/model/UserModel";
import { integration_api, user_api } from "@/services/ApiService";
import { createContext, useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface AuthContextModel extends UserModel {
    isAuthenticated: boolean;
    token: string;
    login: (email: string, password: string) => Promise<string | void>;
    logout: () => void;
}

export const AuthContext = createContext({} as AuthContextModel);

interface Props {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [userData, setUserData] = useState<UserModel | undefined>(undefined);
    const [token, setToken] = useState<string>("");
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const storedData = localStorage.getItem('@Auth.Data');
        const storedToken = localStorage.getItem('@Auth.Token');
        console.log("1")
        if (storedData && storedToken) {
            const data: UserModel = JSON.parse(storedData);
            const token: string = JSON.parse(storedToken);
            console.log("2")
            if (data.id && token) {
                setIsAuthenticated(true);
                setUserData(data);
                setToken(`Basic ${token}`);
                console.log("3")
            }
        }
    }, []);

    const Login = useCallback(async (email: string, password: string) => {
        const respAuth = await user_api.post('/users/auth', { email, password });

        if (respAuth instanceof Error) {
            return respAuth.message;
        }

        localStorage.setItem('@Auth.Token', JSON.stringify(respAuth.data.token));
        setToken(`Basic ${respAuth.data.token}`);

        user_api.defaults.headers.common.Authorization = `Basic ${respAuth.data.token}`;
        integration_api.defaults.headers.common.Authorization = `Basic ${respAuth.data.token}`;
        const respUserInfo = await user_api.get(`/users/${respAuth.data.id} `);

        if (respUserInfo instanceof Error) {
            return respUserInfo.message;
        }

        localStorage.setItem('@Auth.Data', JSON.stringify(respUserInfo.data));
        setUserData(respUserInfo.data);
        setIsAuthenticated(true);
    }, []);

    const Logout = useCallback(() => {
        localStorage.removeItem('@Auth.Data');
        localStorage.removeItem('@Auth.Token');
        //limpar tokens
        setUserData(undefined);
        setIsAuthenticated(false);
        return <Navigate to='/' />;
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, ...userData, login: Login, logout: Logout }}>
            {children}
        </AuthContext.Provider>
    );
}