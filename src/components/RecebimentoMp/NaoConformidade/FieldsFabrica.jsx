import { Button, ButtonGroup, Grid } from '@mui/material'
import CheckLabel from 'src/components/Form/CheckLabel'
import Input from 'src/components/Form/Input'
import Select from 'src/components/Form/Select'
import DateField from 'src/components/Form/DateField'
import Icon from 'src/@core/components/icon'
import { useState } from 'react'

const FieldsFabrica = ({
    index,
    value,
    info,
    papelID,
    produtos,
    handlePreenchimentoFornecedor,
    getValues,
    register,
    control,
    setValue,
    errors
}) => {
    const [ncType, setNcType] = useState(value.tipo ?? 1)

    const setType = type => {
        setNcType(type)
        setValue(`naoConformidade.itens[${index}].tipo`, type)
    }

    return (
        <>
            {papelID == 1 && (
                <CheckLabel
                    xs={12}
                    md={4}
                    onClick={handlePreenchimentoFornecedor}
                    title='Fornecedor preenche?'
                    name={`naoConformidade.itens[${index}].fornecedorPreenche`}
                    value={value.fornecedorPreenche}
                    disabled={info.concluido}
                    register={register}
                    helpText='Se marcado, o fornecedor deve preencher o plano de ação com seu acesso ao sistema.'
                />
            )}

            <Grid container spacing={4}>
                <DateField
                    xs={12}
                    md={3}
                    title='Data'
                    name={`naoConformidade.itens[${index}].data`}
                    type='date'
                    value={value?.data}
                    disabled={info.concluido || papelID != 1}
                    register={register}
                    control={control}
                    typeValidation='dataPassado'
                    daysValidation={999999999999}
                    errors={null}
                />

                <Input
                    xs={12}
                    md={3}
                    title='Hora'
                    name={`naoConformidade.itens[${index}].hora`}
                    disabled={info.concluido || papelID != 1}
                    type='time'
                    register={register}
                    control={control}
                    errors={null}
                />

                <Select
                    xs={12}
                    md={6}
                    title='Profissional preenchimento'
                    name={`naoConformidade.itens[${index}].profissionalPreenchimento`}
                    disabled={info.concluido || papelID != 1}
                    type='string'
                    options={value.profissionaisOptions.preenchimento ?? []}
                    register={register}
                    setValue={setValue}
                    control={control}
                    errors={null}
                />

                <Grid item xs={12} md={3}>
                    <ButtonGroup color='primary' fullWidth className='mt-1' disabled={info.concluido || papelID != 1}>
                        <Button onClick={() => setType(1)} variant={ncType === 1 ? 'contained' : 'outlined'}>
                            <div className='flex items-center gap-2 px-1'>
                                <Icon icon='ph:plant' />
                                <p className='capitalize'>Produto</p>
                            </div>
                        </Button>
                        <Button onClick={() => setType(2)} variant={ncType === 2 ? 'contained' : 'outlined'}>
                            <div className='flex items-center gap-2 py-[2px] px-1'>
                                <Icon icon='mdi:truck-fast-outline' />
                                <p className='capitalize'>Transporte</p>
                            </div>
                        </Button>
                    </ButtonGroup>
                </Grid>

                {/* Se marcado produto */}
                <Select
                    xs={12}
                    md={9}
                    title='Produto'
                    name={`naoConformidade.itens[${index}].produto`}
                    type='string'
                    disabled={ncType != 1 || info.concluido || papelID != 1}
                    options={produtos ?? []}
                    register={register}
                    setValue={setValue}
                    control={control}
                    errors={null}
                />

                {/* Fields dinamicos */}
                {value.dynamicFields &&
                    value.dynamicFields.length > 0 &&
                    value.dynamicFields.map((item, indexField) => (
                        <Input
                            xs={12}
                            md={12}
                            key={indexField}
                            multiline
                            rows={4}
                            title={item.nomeCampo}
                            value={item.valor}
                            disabled={info.concluido || papelID != 1}
                            name={`naoConformidade.itens[${index}].dynamicFields[${indexField}].value`}
                            required={item.obrigatorio == 1 ? true : false}
                            register={register}
                            control={control}
                        />
                    ))}
            </Grid>
        </>
    )
}

export default FieldsFabrica
