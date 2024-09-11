import Input from 'src/components/Form/Input'
import DateField from 'src/components/Form/DateField'
import Select from 'src/components/Form/Select'
import { Grid, IconButton, Tooltip } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { useFieldArray } from 'react-hook-form'
import { Fragment } from 'react'

const FieldsProdutos = ({ index, disabled, form, apresentacoes }) => {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: `produtos[${index}].variacoes`
    })

    return (
        <>
            {fields.map((field, fieldIndex) => (
                <Fragment key={field.id}>
                    <input
                        type='hidden'
                        value={field.recebimentoMpProdutoID}
                        name={`produtos[${index}].variacoes[${fieldIndex}].recebimentoMpProdutoID`}
                        {...form.register(`produtos[${index}].variacoes[${fieldIndex}].recebimentoMpProdutoID`)}
                    />
                    <Input
                        xs={12}
                        md={2}
                        title='Quantidade'
                        name={`produtos[${index}].variacoes[${fieldIndex}].quantidade`}
                        disabled={disabled}
                        mask='fractioned3' //? Ex.: 1.580.000,587
                        form={form}
                    />
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
                    <Input
                        xs={12}
                        md={2}
                        title='Nº Lote'
                        name={`produtos[${index}].variacoes[${fieldIndex}].lote`}
                        disabled={disabled}
                        form={form}
                    />
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
                    <DateField
                        xs={12}
                        md={2}
                        title='Data de validade'
                        value={field.dataValidade}
                        name={`produtos[${index}].variacoes[${fieldIndex}].dataValidade`}
                        disabled={disabled}
                        form={form}
                    />

                    {/* Inserir e remover */}
                    <Grid item xs={12} md={1}>
                        <div className='flex items-center gap-1 mt-1'>
                            <Tooltip title='Inserir variação' placement='top'>
                                <IconButton
                                    color='primary'
                                    aria-label='delete'
                                    disabled={fieldIndex < fields.length - 1}
                                    onClick={() =>
                                        append({
                                            // quantidade: '0,020'
                                        })
                                    }
                                >
                                    <Icon icon='icons8:plus' />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title='Remover variação' placement='top'>
                                <IconButton
                                    color='error'
                                    aria-label='delete'
                                    disabled={fields.length === 1}
                                    onClick={() => remove(fieldIndex)}
                                >
                                    <Icon icon='icons8:minus' />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </Grid>
                </Fragment>
            ))}
        </>
    )
}

export default FieldsProdutos
