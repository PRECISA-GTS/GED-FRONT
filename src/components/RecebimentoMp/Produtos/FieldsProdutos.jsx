import Input from 'src/components/Form/Input'
import DateField from 'src/components/Form/DateField'
import Select from 'src/components/Form/Select'
import { Button, Grid, IconButton, Tooltip } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { useFieldArray } from 'react-hook-form'

const FieldsProdutos = ({
    value,
    setProdutos,
    addProduct,
    removeProduct,
    index,
    apresentacoes,
    disabled,
    form,
    total
}) => {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: `produtos[${index}].variacoes`
    })

    console.log('FieldsProdutos: ', fields)

    return (
        <>
            {fields.map((field, fieldIndex) => (
                <>
                    <input
                        type='hidden'
                        value={field.recebimentoMpProdutoID}
                        name={`produtos[${index}].variacoes[${fieldIndex}].recebimentoMpProdutoID`}
                        {...form.register(`produtos[${index}].variacoes[${fieldIndex}].recebimentoMpProdutoID`)}
                    />

                    {/* Quantidade */}
                    <Input
                        xs={12}
                        md={2}
                        title='Quantidade'
                        name={`produtos[${index}].variacoes[${fieldIndex}].quantidade`}
                        disabled={disabled}
                        mask='fractioned3' //? Ex.: 1.580.000,587
                        form={form}
                    />

                    {/* Data de fabricação */}
                    <DateField
                        xs={12}
                        md={2}
                        title='Data da fabricação'
                        value={field.dataFabricacao}
                        name={`produtos[${index}].variacoes[${fieldIndex}].dataFabricacao`}
                        disabled={disabled}
                        typeValidation='dataPassado'
                        form={form}
                    />

                    {/* Nº Lote */}
                    <Input
                        xs={12}
                        md={2}
                        title='Nº Lote'
                        name={`produtos[${index}].variacoes[${fieldIndex}].lote`}
                        disabled={disabled}
                        form={form}
                    />

                    {/* Apresentação */}
                    <Select
                        xs={12}
                        md={3}
                        title='Apresentação'
                        name={`produtos[${index}].variacoes[${fieldIndex}].apresentacao`}
                        type='string'
                        options={apresentacoes ?? []}
                        disabled={disabled}
                        form={form}
                    />

                    {/* Data de validade */}
                    <DateField
                        xs={12}
                        md={2}
                        title='Data de validade'
                        value={field.dataValidade}
                        name={`produtos[${index}].variacoes[${fieldIndex}].dataValidade`}
                        disabled={disabled}
                        form={form}
                    />

                    {/* Botões inserir e remover */}
                    <Grid item xs={12} md={1}>
                        <div className='flex items-center gap-1 mt-1'>
                            <Tooltip title={`Inserir variação de ${field.nome}`} placement='top'>
                                <IconButton
                                    color='primary'
                                    aria-label='delete'
                                    disabled={fieldIndex < fields.length - 1}
                                    onClick={() =>
                                        append({
                                            quantidade: '0,000'
                                        })
                                    }
                                >
                                    <Icon icon='icons8:plus' />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title={`Remover variação de ${field.nome}`} placement='top'>
                                <IconButton
                                    color='error'
                                    aria-label='delete'
                                    disabled={total === 1}
                                    onClick={() => remove(fieldIndex)}
                                >
                                    <Icon icon='icons8:minus' />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </Grid>
                </>
            ))}
        </>
    )
}

export default FieldsProdutos
