import React from 'react'
import DateField from 'src/components/Form/DateField'
import Input from 'src/components/Form/Input'
import Remove from 'src/components/Form/Remove'
import useDateFormat from 'src/hooks/useDateFormat'

const CargoFuncao = ({ data, getValues, control, register, name, errors, removeItem }) => {
    const { setDateFormat, dateStatus } = useDateFormat()

    return getValues('cargosFuncoes').map((item, index) => {
        console.log('🚀 ~ item:', item[index])
        return (
            <>
                <DateField
                    xs={12}
                    md={2}
                    title='Data'
                    type='date'
                    required
                    name={`cargosFuncoes.${[index]}.data`}
                    // disabled={disabled}
                    register={register}
                    control={control}
                    setDateFormat={setDateFormat}
                    value={item.data}
                    typeValidation='dataPassado'
                    daysValidation={9999999999999999999}
                    dateStatus={dateStatus}
                    errors={errors?.cargosFuncoes?.[index]?.data}
                />

                <Input
                    xs={12}
                    md={4}
                    required
                    title='Formação / Cargo'
                    name={`cargosFuncoes.${[index]}.formacaoCargo`}
                    control={control}
                    errors={errors?.cargosFuncoes?.[index]?.formacaoCargo}
                />
                <Input
                    xs={12}
                    md={3}
                    title='Conselho'
                    name={`cargosFuncoes.${[index]}.conselho`}
                    control={control}
                    errors={errors?.cargosFuncoes?.[index]?.conselho}
                />
                <DateField
                    xs={12}
                    md={2}
                    title='Data Inativação'
                    name={`cargosFuncoes.${[index]}.dataInativacao`}
                    type='date'
                    value={item.dataInativacao}
                    control={control}
                    setDateFormat={setDateFormat}
                    typeValidation='dataPassado'
                    daysValidation={9999999999999999999}
                    dateStatus={dateStatus}
                    errors={errors?.cargosFuncoes?.[index]?.dataInativacao}
                />

                <Remove
                    xs={4}
                    md={1}
                    title='Remover'
                    index={index}
                    removeItem={removeItem}
                    item={item}
                    // pending={item.hasPending}
                    textSuccess='Remover este item'
                    textError='Este item não pode mais ser removido pois possui anexo vinculado a ele'
                />
            </>
        )
    })
}

export default CargoFuncao
