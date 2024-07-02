
// ** Material UI
import { Tooltip, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { formatDate } from './conversions'


// ** Next
import Link from 'next/link'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'

import { useState, useContext } from 'react'
import { AuthContext } from 'src/context/AuthContext'

// ** API
import { api } from 'src/configs/api'
import axios from 'axios'
import { tr } from 'date-fns/locale'

// Status Default
const statusDefault = {
    1: { title: 'Ativo', color: 'success' },
    0: { title: 'Inativo', color: 'secondary' },

    //* Status dos formulários do fornecedor
    10: { title: 'Pendente', color: 'warning' },
    20: { title: 'Acessou link', color: 'info' },
    30: { title: 'Em preenchimento', color: 'warning' },
    40: { title: 'Concluído', color: 'primary' },
    50: { title: 'Reprovado', color: 'error' },
    60: { title: 'Aprovado Parcial', color: 'warning' },
    70: { title: 'Aprovado', color: 'success' },
}

const configColumns = (currentLink, arrColumns) => {

    return arrColumns.map((column, i) => {
        const currentColumns = arrColumns[i].field

        return {
            ...column,
            flex: column.size,
            renderCell: params => (
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                    {arrColumns &&
                        arrColumns.map((c, j) => {
                            if (c.field === currentColumns) {
                                if (c.field.name == 'status') {
                                    return (
                                        <CustomChip
                                            key={j}
                                            size='small'
                                            skin='light'
                                            color={params?.row.cor}
                                            label={params?.row.status}
                                            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
                                        />
                                    )

                                } else if (c.field == 'naoConformidade') {
                                    return (
                                        params?.row.naoConformidade === 1 &&
                                        <Tooltip
                                            title='Este formulário contém não conformidades'
                                            placement='top'
                                            arrow
                                        >
                                            <p>
                                                <Icon icon='typcn:warning' color='#FFC107' />
                                            </p>
                                        </Tooltip>
                                    )
                                }
                                else {
                                    return params.row[c.field]
                                }
                            }
                        })}
                </Typography>
            )
        }
    })
}

const toastMessage = {
    successNew: 'Dados salvos com sucesso!',
    successUpdate: 'Dados atualizados com sucesso!',
    errorNew: 'Erro ao salvar os dados!',
    errorRepeated: 'Dados já existentes!',
    errorUpdate: 'Erro ao atualizar os dados!',
    errorDelete: 'Erro ao excluir os dados!',
    successDelete: 'Dados excluídos com sucesso!',
    pendingDelete: 'Dado não pode ser excluido, pois já está sendo utilizado!',
    errorGet: 'Erro ao obter os dados!',
    successGet: 'Dados obtidos com sucesso!',
}

// Função que recebe uma rota, quebra pela barra e obtem a última parte da rota
const formType = (route) => {
    const arrRoute = route.split('/')
    const lastPart = arrRoute[arrRoute.length - 1]

    return lastPart == 'novo' ? 'new' : 'edit'
}

// Função que recebe uma rota, quebra pela / e remove a ultima parte, retornando a rota anterior
const backRoute = (route) => {
    const arrRoute = route.split('/')
    arrRoute.pop()

    return arrRoute.join('/')
}

function dateConfig(type, date, numDays) {
    let inputDate = new Date(date);
    if (inputDate) {
        return dateOptions(type, date, numDays)
    }
}

function calculateDays(signal, numDays) {
    const currentDate = new Date(); // Data atual
    const targetDate = new Date(currentDate); // Data de destino (inicializada com a data atual)

    // Adiciona ou subtrai o número de dias com base no sinal fornecido
    if (signal === '==') {
        targetDate.setDate(targetDate.getDate() + numDays);
    } else if (signal === '>=') {
        targetDate.setDate(targetDate.getDate() + numDays);
    } else if (signal === '<=') {
        targetDate.setDate(targetDate.getDate() - numDays);
    }

    // Formata a data no formato "YYYY-mm-dd"
    const year = targetDate.getFullYear();
    const month = String(targetDate.getMonth() + 1).padStart(2, '0');
    const day = String(targetDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

const dateOptions = (type, date, numDays) => {
    console.log("🚀 ~ numDays:", numDays);
    let currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);
    let inputDate = new Date(date);
    inputDate.setUTCHours(0, 0, 0, 0);

    const signal =
        type == 'dataAtual' ? '==' : type == 'dataPassado' ? '<=' : type == 'dataFutura' ? '>=' : '==';

    if (!signal) return;

    let newDataFim = '';
    let newDataIni = '';
    if (signal == '<=') {
        newDataIni = calculateDays(signal, numDays);
        newDataFim = currentDate.toISOString().substr(0, 10);
    } else if (signal == '>=') {
        newDataIni = currentDate.toISOString().substr(0, 10);
        newDataFim = calculateDays(signal, numDays);
    } else {
        newDataIni = currentDate.toISOString().substr(0, 10);
        newDataFim = currentDate.toISOString().substr(0, 10);
    }
    let messageError = ''
    const errorMessageAlert = () => {
        console.log("type", signal)
        messageError =
            signal == '==' ? 'A data deve ser a atual' :
                signal == '<=' ? `Insira uma data entre hoje e ${formatDate(newDataIni, 'DD/MM/YYYY')}.` :
                    signal == '>=' ? `Insira uma data entre hoje e ${formatDate(newDataFim, 'DD/MM/YYYY')}.` : '';
        return messageError;
    }

    if (!isNaN(inputDate.getTime())) {
        const inputTime = inputDate.getTime();
        const dataIniTime = new Date(newDataIni).getTime();
        const dataFimTime = new Date(newDataFim).getTime();

        const isWithinRange = inputTime >= dataIniTime && inputTime <= dataFimTime;
        const newStatus = isWithinRange ? true : false;

        if (!isWithinRange && !newStatus) {
            console.log("é diferente do periodo")
            errorMessageAlert()
        }

        return {
            status: newStatus,
            dataIni: newDataIni,
            dataFim: newDataFim,
            message: !isWithinRange && !newStatus && messageError
        };
    } else {
        errorMessageAlert()
        return {
            status: false,
            dataIni: newDataIni,
            dataFim: newDataFim,
            message: messageError
        };
    }
};

// Hora atual
const getCurrentTime = () => {
    const currentDate = new Date()
    const hours = currentDate.getHours().toString().padStart(2, '0')
    const minutes = currentDate.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
}

// Data atual
function getCurrentDate() {
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() + 1)

    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const day = String(currentDate.getDate()).padStart(2, '0')

    const formattedDate = `${year}-${month}-${day}`

    return formattedDate
}

// Converte data do formato dd/mm/yyyy para Mon Dec 18 2023 00:00:00 GMT-0300 (Horário Padrão de Brasília
const convertStringToDate = dateString => {
    const parts = dateString.split('/')
    const day = parseInt(parts[0], 10)
    const month = parseInt(parts[1], 10) - 1
    const year = parseInt(parts[2], 10)
    console.log("filterData", new Date(year, month, day))
    return new Date(year, month, day)
}

export { configColumns, formType, backRoute, statusDefault, toastMessage, dateConfig, dateOptions, getCurrentTime, getCurrentDate, convertStringToDate }