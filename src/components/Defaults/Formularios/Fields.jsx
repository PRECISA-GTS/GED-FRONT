import { FormControl, Grid } from '@mui/material'
import { useEffect, useState, useContext } from 'react'
import { dateConfig } from 'src/configs/defaultConfigs'
import { AuthContext } from 'src/context/AuthContext'
import { backRoute } from 'src/configs/defaultConfigs'
import Router from 'next/router'
import FormTransportador from 'src/components/Cadastros/Transportador/FormTransportador'
import FormTipoVeiculo from 'src/components/Cadastros/TipoVeiculo/FormTipoVeiculo'

//* Custom inputs
import Input from 'src/components/Form/Input'
import Select from 'src/components/Form/Select'
import DateField from 'src/components/Form/DateField'
import DialogNewCreate from '../Dialogs/DialogNewCreate'

const Fields = ({
    register,
    errors,
    setValue,
    fields,
    values,
    disabled,
    disabledFields,
    getAddressByCep,
    control,
    setCopiedDataContext,
    nameSelected,
    setNameSelected,
    columnSelected,
    setColumnSelected,
    openModalNew,
    setOpenModalNew,
    newChange,
    setNewChange
}) => {
    const [dateStatus, setDateStatus] = useState({})
    const [watchRegistroEstabelecimento, setWatchRegistroEstabelecimento] = useState(null)

    const router = Router

    const dataLocalStorage = localStorage.getItem('loggedUnity')

    const setDateFormat = (type, name, value, numDays) => {
        const newDate = new Date(value)
        const status = dateConfig(type, newDate, numDays)
        console.log('status', status)
        setDateStatus(prevState => ({
            ...prevState,
            [name]: status
        }))
    }

    const setRegistroEstabelecimento = () => {
        fields &&
            fields.map((field, index) => {
                if (field?.nomeColuna == 'registroEstabelecimentoID') {
                    setWatchRegistroEstabelecimento(field?.[field.tabela]?.id > 0 ? field?.[field.tabela].id : null)
                }
            })
    }

    const getMaskForField = fieldName => {
        switch (fieldName) {
            case 'telefone':
            case 'telefone1':
            case 'telefone2':
                return 'telefone'
            case 'cep':
                return 'cep'
            case 'cnpj':
                return 'cnpj'
            default:
                return null
        }
    }

    const disabledField = field => {
        // verifica se o campo está na lista de campos desabilitados, retorna true ou false para desabilitar o campo
        if (disabledFields && disabledFields.length > 0) {
            return disabledFields.includes(field)
        }
        return false
    }

    useEffect(() => {
        setRegistroEstabelecimento()
    }, [])

    // Abre modal para criar novo item
    const createNew = async (coluna, name) => {
        setColumnSelected(coluna)
        setOpenModalNew(true)
        setNameSelected(name)
    }

    return (
        // <Grid container spacing={4}>
        fields &&
        fields.map((field, index) => {
            setValue(`fields[${index}].${field.nomeColuna}`, field?.[field.nomeColuna])
            return (
                <>
                    {/* Autocomplete (int) */}
                    {field && field.tipo === 'int' && field.tabela && (
                        <Select
                            xs={12}
                            md={4}
                            title={field.nomeCampo}
                            name={`fields[${index}].${field.tabela}`}
                            createNew={
                                field.nomeColuna === 'transportadorID' || field.nomeColuna === 'tipoVeiculoID'
                                    ? () => createNew(field.nomeColuna, `fields[${index}].${field.tabela}`)
                                    : null
                            }
                            type={field.tabela}
                            options={field.options}
                            value={field?.[field.tabela]}
                            mask={field.tabela}
                            disabled={disabled || disabledField(field.nomeColuna)}
                            register={register}
                            setValue={setValue}
                            control={control}
                            errors={errors?.fields?.[index]?.[field.tabela]}
                            handleRegistroEstabelecimento={setWatchRegistroEstabelecimento}
                        />
                    )}

                    {/* Modal para criação de novo, baseado no select clicado */}
                    {/* <DialogNewCreate
                        title={
                            columnSelected == 'transportadorID'
                                ? 'Novo transportador'
                                : columnSelected == 'tipoVeiculoID'
                                ? 'Novo tipo de veiculo'
                                : ''
                        }
                        size='md'
                        openModal={openModalNew}
                        setOpenModal={setOpenModalNew}
                    >
                        {columnSelected == 'transportadorID' ? (
                            <FormTransportador
                                btnClose
                                handleModalClose={() => setOpenModalNew(false)}
                                setNewChange={setNewChange}
                                newChange={newChange}
                                outsideID={true}
                                handleConfirmNew={handleConfirmNew}
                                manualUrl='/cadastros/transportador'
                            />
                        ) : columnSelected == 'tipoVeiculoID' ? (
                            <FormTipoVeiculo
                                btnClose
                                handleModalClose={() => setOpenModalNew(false)}
                                setNewChange={setNewChange}
                                newChange={newChange}
                                outsideID={true}
                                handleConfirmNew={handleConfirmNew}
                                manualUrl='/cadastros/tipo-veiculo'
                            />
                        ) : null}
                    </DialogNewCreate> */}

                    {/* Date */}
                    {field && field.tipo == 'date' && (
                        <DateField
                            xs={12}
                            md={4}
                            title='Data da avaliação'
                            disabled={disabled || disabledField(field.nomeColuna)}
                            value={field?.[field.nomeColuna] ?? new Date()}
                            type={field.nomeColuna}
                            name={`fields[${index}].${field.nomeColuna}`}
                            errors={errors?.fields?.[index]?.[field.nomeColuna]}
                            control={control}
                            setDateFormat={setDateFormat}
                            typeValidation='dataPassado'
                            daysValidation={365}
                            dateStatus={dateStatus}
                            register={register}
                        />
                    )}

                    {/* Textfield */}
                    {field &&
                        field.tipo == 'string' &&
                        (field.nomeColuna != 'numeroRegistro' || watchRegistroEstabelecimento > 1) && (
                            <Input
                                xs={12}
                                md={4}
                                title={field.nomeCampo}
                                name={`fields[${index}].${field.nomeColuna}`}
                                value={getMaskForField ?? field?.[nomeColuna]}
                                control={control}
                                errors={errors?.fields?.[index]?.nomeColuna}
                                type={field.nomeColuna}
                                getAddressByCep={getAddressByCep}
                                mask={getMaskForField(field.nomeColuna)}
                                disabled={
                                    disabled || disabledField(field.nomeColuna) || field.nomeColuna == 'cnpj'
                                        ? true
                                        : false
                                }
                            />
                        )}
                </>
            )
        })

        // </Grid>
    )
}

export default Fields
