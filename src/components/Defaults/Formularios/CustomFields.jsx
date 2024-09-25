//* Custom inputs
import Input from 'src/components/Form/Input'
import Select from 'src/components/Form/Select'
import DateField from 'src/components/Form/DateField'

const CustomFields = ({ form, fields, disabled, getAddressByCep }) => {
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
        if (disabled && disabled.length > 0) {
            return disabled.includes(field)
        }
        return false
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
                            name={`header.fields[${index}].${field.tabela}`}
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
                            name={`header.fields[${index}].${field.nomeColuna}`}
                            typeValidation='dataPassado'
                            daysValidation={365}
                            alertRequired={field.obrigatorio === 1} //! Apenas pinta o campo de vermelho, não valida
                            form={form}
                        />
                    )}

                    {/* Textfield */}
                    {field && field.tipo == 'string' && (
                        <Input
                            key={`input-${index}`}
                            xs={12}
                            md={4}
                            title={field.nomeCampo}
                            name={`header.fields[${index}].${field.nomeColuna}`}
                            value={field?.[field.nomeColuna] ?? ''}
                            type={field.nomeColuna}
                            getAddressByCep={getAddressByCep}
                            mask={getMaskForField(field.nomeColuna)}
                            disabled={
                                disabled || disabledField(field.nomeColuna) || field.nomeColuna == 'cnpj' ? true : false
                            }
                            required={field.obrigatorio === 1}
                            alertRequired={field.obrigatorio === 1} //! Apenas pinta o campo de vermelho, não valida
                            form={form}
                        />
                    )}

                    {/* Text (texto longo) */}
                    {field && field.tipo == 'text' && (
                        <Input
                            key={`input-${index}`}
                            xs={12}
                            md={12}
                            multiline
                            rows={3}
                            title={field.nomeCampo}
                            name={`header.fields[${index}].${field.nomeColuna}`}
                            value={field?.[field.nomeColuna] ?? ''}
                            type={field.nomeColuna}
                            getAddressByCep={getAddressByCep}
                            mask={getMaskForField(field.nomeColuna)}
                            disabled={
                                disabled || disabledField(field.nomeColuna) || field.nomeColuna == 'cnpj' ? true : false
                            }
                            required={field.obrigatorio === 1}
                            alertRequired={field.obrigatorio === 1} //! Apenas pinta o campo de vermelho, não valida
                            form={form}
                        />
                    )}
                </>
            )
        })
    )
}

export default CustomFields
