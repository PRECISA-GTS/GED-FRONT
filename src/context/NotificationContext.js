import { createContext, useEffect, useState, useContext } from 'react';
import { api } from 'src/configs/api';

const NotificationContext = createContext({});

const NotificationProvider = ({ children }) => {


    const createNewNotification = async (data) => {
        if (!data) return;
        try {
            const response = await api.post("notificacao/insertData", data);
        } catch (err) {
            console.log(err);
        }
    }
    const values = { createNewNotification }

    return (
        <NotificationContext.Provider value={values}>
            {children}
        </NotificationContext.Provider>
    );
};

export { NotificationContext, NotificationProvider };
