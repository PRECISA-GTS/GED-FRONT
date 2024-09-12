//* Custom inputs
import Input from 'src/components/Form/Input'
import Select from 'src/components/Form/Select'
import DateField from 'src/components/Form/DateField'

const Fields = ({
    form,
    fields,
    disabled,
    disabledFields,
    getAddressByCep,
    setNameSelected,
    setColumnSelected,
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
                            alertRequired={field.obrigatorio === 1} //! Apenas pinta o campo de vermelho, não valida
                            form={form}
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
                            typeValidation='dataPassado'
                            daysValidation={365}
                            form={form}
                            alertRequired={field.obrigatorio === 1} //! Apenas pinta o campo de vermelho, não valida
                        />
                    )}

                    {/* Textfield */}
                    {field && field.tipo == 'string' && (
                        <Input
                            key={`input-${index}`}
                            xs={12}
                            md={4}
                            title={field.nomeCampo}
                            name={`fields[${index}].${field.nomeColuna}`}
                            value={field?.[field.nomeColuna] ?? ''}
                            type={field.nomeColuna}
                            getAddressByCep={getAddressByCep}
                            mask={getMaskForField(field.nomeColuna)}
                            disabled={
                                disabled || disabledField(field.nomeColuna) || field.nomeColuna == 'cnpj' ? true : false
                            }
                            form={form}
                            required={field.obrigatorio === 1}
                            alertRequired={field.obrigatorio === 1} //! Apenas pinta o campo de vermelho, não valida
                        />
                    )}

                    {/* Text (texto longo) */}
                    {field && field.tipo == 'text' && (
                        <Input
                            key={`input-${index}`}
                            xs={12}
                            md={12}
                            multiline
                            rows={6}
                            title={field.nomeCampo}
                            name={`fields[${index}].${field.nomeColuna}`}
                            value={field?.[field.nomeColuna] ?? ''}
                            type={field.nomeColuna}
                            getAddressByCep={getAddressByCep}
                            mask={getMaskForField(field.nomeColuna)}
                            disabled={
                                disabled || disabledField(field.nomeColuna) || field.nomeColuna == 'cnpj' ? true : false
                            }
                            form={form}
                            alertRequired={field.obrigatorio === 1} //! Apenas pinta o campo de vermelho, não valida
                        />
                    )}
                </>
            )
        })
    )
}

export default Fields
