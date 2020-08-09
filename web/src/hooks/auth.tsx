import React, { createContext, useState, useContext } from "react";
import api from "../services/api";

interface ISigninData {
  email: string;
  password: string;
}

interface IAuthContextData {
  signed: boolean;
  user: object | null;
  signIn(data: ISigninData): Promise<void>;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);

  async function signIn({ email, password }: ISigninData): Promise<void> {
    const response = await api.post("/signin", { email, password });

    const { user } = response.data;
    setUser(user);
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { useAuth, AuthProvider };
