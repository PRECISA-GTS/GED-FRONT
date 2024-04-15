import React, { createContext, useState } from 'react';
import { AuthContext } from 'src/context/AuthContext'
import { useContext } from 'react';
import { api } from 'src/configs/api'

const defaultValues = {
    setReportParameters: () => { },
    sendPdfToServer: () => { }
}

const FormContext = createContext(defaultValues);

const FormProvider = ({ children }) => {
    const { user, loggedUnity } = useContext(AuthContext)

    const setReportParameters = (parameters) => {
        const seen = new WeakSet();

        const replacer = (key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (seen.has(value)) {
                    return undefined; // Evita referências circulares
                }
                seen.add(value);
            }
            return value;
        };

        try {
            const jsonString = JSON.stringify(parameters, replacer);
            localStorage.setItem('report', jsonString);
        } catch (error) {
            console.error('Erro ao converter para JSON:', error);
        }
    };


    const sendPdfToServer = async (id, fileBlob, type) => {
        const formData = new FormData()
        formData.append('files[]', fileBlob, `${id}-${type}.pdf`) //? Ex.: 55-fornecedor.pdf, 22-recebimento-mp.pdf, ...

        console.log("🚀 ~ fileBlob:", fileBlob)
        try {
            const route = `/formularios/${type}/saveRelatorio/${id}/${user.usuarioID}/${loggedUnity.unidadeID}`
            const response = await api.post(route, formData)
        } catch (error) {
            console.log(error)
        }
    }

    const values = {
        setReportParameters,
        sendPdfToServer
    };

    return (
        <FormContext.Provider value={values}>
            {children}
        </FormContext.Provider>
    );
};

const useFormContext = () => {
    return React.useContext(FormContext);
};

export { FormContext, FormProvider, useFormContext };
