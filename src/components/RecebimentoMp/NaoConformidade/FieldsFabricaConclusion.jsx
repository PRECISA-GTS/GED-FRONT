import { Card, CardContent, Grid, Typography } from '@mui/material'
import Radio from '@mui/material/Radio'
import FormControlLabel from '@mui/material/FormControlLabel'
import Input from 'src/components/Form/Input'
import Select from 'src/components/Form/Select'
import DateField from 'src/components/Form/DateField'
import useDateFormat from 'src/hooks/useDateFormat'
import RadioGroup from '@mui/material/RadioGroup'

const FieldsFabricaConclusion = ({
    index,
    value,
    info,
    papelID,
    register,
    control,
    setValue,
    handleChangeStatus,
    errors
}) => {
    const { setDateFormat, dateStatus } = useDateFormat()

    const optionsConclusion = [
        {
            id: 1,
            nome: 'Conforme'
        },
        {
            id: 2,
            nome: 'Não Conforme'
        }
    ]

    return (
        <>
            <Grid container spacing={4} sx={{ paddingTop: 2 }}>
                <Input
                    xs={12}
                    md={12}
                    multiline
                    rows={4}
                    title='Conclusão'
                    name={`naoConformidade.itens[${index}].conclusao`}
                    disabled={info.concluido || papelID != 1}
                    control={control}
                    errors={null}
                />

                {/* Avaliação final */}
                <Grid item xs={12} md={12}>
                    <RadioGroup
                        row
                        name={`naoConformidade.itens[${index}].status`}
                        defaultValue={value?.status}
                        onChange={e => handleChangeStatus(index, e.target.value)}
                        sx={{ mt: 0 }}
                    >
                        <div className='flex items-center gap-4'>
                            <Typography variant='subtitle2' sx={{ pb: 0 }}>
                                Avaliação Final:
                            </Typography>
                            {optionsConclusion &&
                                optionsConclusion.map((item, indexCol) => (
                                    <FormControlLabel
                                        key={indexCol}
                                        value={item.id}
                                        label={item.nome}
                                        control={<Radio disabled={false} error={false} sx={{ pr: 2 }} />}
                                        disabled={info.concluido || papelID != 1}
                                        fullWidth
                                        sx={{
                                            '& .MuiFormControlLabel-label': {
                                                fontSize: '0.8rem',
                                                color: 'text.secondary'
                                            },
                                            '&:hover': {
                                                '& .MuiFormControlLabel-label': {
                                                    color: 'primary.main'
                                                }
                                            }
                                        }}
                                    />
                                ))}
                        </div>
                    </RadioGroup>
                </Grid>

                <DateField
                    xs={12}
                    md={3}
                    title='Data'
                    name={`naoConformidade.itens[${index}].dataConclusao`}
                    type='date'
                    value={value?.dataConclusao}
                    disabled={info.concluido || papelID != 1}
                    register={register}
                    control={control}
                    setDateFormat={setDateFormat}
                    typeValidation='dataPassado'
                    daysValidation={999999999999}
                    dateStatus={dateStatus}
                    errors={null}
                />

                <Input
                    xs={12}
                    md={3}
                    title='Hora'
                    name={`naoConformidade.itens[${index}].horaConclusao`}
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
                    name={`naoConformidade.itens[${index}].profissionalConclusao`}
                    disabled={info.concluido || papelID != 1}
                    type='string'
                    options={value.profissionaisOptions.conclusao ?? []}
                    register={register}
                    setValue={setValue}
                    control={control}
                    errors={null}
                />
            </Grid>
        </>
    )
}

export default FieldsFabricaConclusion
