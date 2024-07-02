import { useEffect, useState } from 'react'
import { dateConfig } from 'src/configs/defaultConfigs'

//* Custom inputs
import Input from 'src/components/Form/Input'
import Select from 'src/components/Form/Select'
import DateField from 'src/components/Form/DateField'

const Fields = ({
    register,
    errors,
    setValue,
    fields,
    disabled,
    disabledFields,
    getAddressByCep,
    control,
    setNameSelected,
    setColumnSelected,
    setOpenModalNew
}) => {
    const [dateStatus, setDateStatus] = useState({})
    const [watchRegistroEstabelecimento, setWatchRegistroEstabelecimento] = useState(null)

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
                                register={register}
                                control={control}
                                value={getMaskForField ?? field?.[nomeColuna]}
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
    )
}

export default Fields
