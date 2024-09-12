import {createContext, ReactNode, useState} from "react";

interface contextValue   {
    isLogin : Boolean,
    setIsLogin : (state :  Boolean) => void;
    logo : string
}

export const AppContext = createContext<contextValue | undefined>(undefined);


const AppProvider = ({children} : {children : ReactNode}) => {
    const [isLogin, setIsLogin] = useState<Boolean>(true);
    const  logo = 'https://demo-60.woovinapro.com/wp-content/uploads/2022/03/logo.png'
    const value = {
        isLogin,
        setIsLogin,
        logo
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;
