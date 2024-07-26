import { Grid, Typography } from '@mui/material'
import Input from 'src/components/Form/Input'
import Select from 'src/components/Form/Select'
import DateField from 'src/components/Form/DateField'
import { useContext } from 'react'
import { SettingsContext } from 'src/@core/context/settingsContext'

const FieldsFornecedor = ({ index, value, info, papelID, register, control, setValue, errors }) => {
    const { settings } = useContext(SettingsContext)

    return (
        <>
            {value && value.fornecedorPreenche && (
                <div
                    className={`${
                        settings.mode == 'dark' ? 'bg-[#353D39]' : 'bg-[#E2EAE4]'
                    } p-5 rounded-xl border border-[#4A8B57]`}
                >
                    <Typography variant='subtitle1' color='primary' sx={{ fontWeight: 700, pb: 5 }}>
                        Preenchimento realizado pelo Fornecedor
                    </Typography>
                    <Grid container spacing={4}>
                        <Input
                            xs={12}
                            md={12}
                            multiline
                            rows={4}
                            title='Observações do Fornecedor'
                            name={`naoConformidade.itens[${index}].obsFornecedor`}
                            disabled={info.concluido || papelID != 2}
                            control={control}
                            errors={null}
                        />

                        <DateField
                            xs={12}
                            md={3}
                            title='Data'
                            name={`naoConformidade.itens[${index}].dataFornecedor`}
                            type='date'
                            value={value?.dataFornecedor}
                            register={register}
                            disabled={info.concluido || papelID != 2}
                            control={control}
                            typeValidation='dataPassado'
                            daysValidation={999999999999}
                            errors={null}
                        />

                        <Input
                            xs={12}
                            md={3}
                            title='Hora'
                            name={`naoConformidade.itens[${index}].horaFornecedor`}
                            disabled={info.concluido || papelID != 2}
                            type='time'
                            register={register}
                            control={control}
                            errors={null}
                        />

                        <Select
                            xs={12}
                            md={6}
                            title='Profissional preenchimento'
                            name={`naoConformidade.itens[${index}].usuarioFornecedor`}
                            disabled={info.concluido || papelID != 2}
                            type='string'
                            options={[]}
                            register={register}
                            setValue={setValue}
                            control={control}
                            errors={null}
                        />
                    </Grid>
                </div>
            )}
        </>
    )
}

export default FieldsFornecedor
