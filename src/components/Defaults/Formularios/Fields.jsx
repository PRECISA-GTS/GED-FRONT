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
    getValues,
    setOpenModalNew
}) => {
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

    // Abre modal para criar novo item
    const createNew = async (coluna, name) => {
        setColumnSelected(coluna)
        setOpenModalNew(true)
        setNameSelected(name)
    }

    return (
        fields &&
        fields.map((field, index) => {
            // console.log('field value:', field?.[field.nomeColuna])

            return (
                <>
                    {/* Autocomplete (int) */}
                    {field && field.tipo === 'int' && field.tabela && (
                        <Select
                            key={`select-${index}`}
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
                            alertRequired={field.obrigatorio === 1} //! Apenas pinta o campo de vermelho, não valida
                        />
                    )}

                    {/* Date */}
                    {field && field.tipo == 'date' && (
                        <DateField
                            key={`datefield-${index}`}
                            xs={12}
                            md={4}
                            title='Data da avaliação'
                            disabled={disabled || disabledField(field.nomeColuna)}
                            value={field?.[field.nomeColuna] ?? new Date()}
                            type={field.nomeColuna}
                            name={`fields[${index}].${field.nomeColuna}`}
                            errors={errors?.fields?.[index]?.[field.nomeColuna]}
                            control={control}
                            typeValidation='dataPassado'
                            daysValidation={365}
                            register={register}
                            alertRequired={field.obrigatorio === 1} //! Apenas pinta o campo de vermelho, não valida
                        />
                    )}

                    {/* Textfield */}
                    {field && (
                        <Input
                            key={`input-${index}`}
                            xs={12}
                            md={4}
                            title={field.nomeCampo}
                            name={`fields[${index}].${field.nomeColuna}`}
                            register={register}
                            control={control}
                            // value={getMaskForField(field.nomeColuna) ?? field?.[field.nomeColuna]}
                            value={field?.[field.nomeColuna] ?? ''}
                            errors={errors?.fields?.[index]?.nomeColuna}
                            type={field.nomeColuna}
                            getAddressByCep={getAddressByCep}
                            mask={getMaskForField(field.nomeColuna)}
                            disabled={
                                disabled || disabledField(field.nomeColuna) || field.nomeColuna == 'cnpj' ? true : false
                            }
                            alertRequired={field.obrigatorio === 1} //! Apenas pinta o campo de vermelho, não valida
                        />
                    )}
                </>
            )
        })
    )
}

export default Fields
