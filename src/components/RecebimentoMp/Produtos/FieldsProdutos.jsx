import Input from 'src/components/Form/Input'
import DateField from 'src/components/Form/DateField'
import Select from 'src/components/Form/Select'

const FieldsProdutos = ({ value, index, apresentacoes, setValue, register, control, errors, disabled }) => {
    return (
        <>
            {/* Quantidade */}
            <Input
                xs={12}
                md={2}
                title='Quantidade'
                name={`produtos[${index}].quantidade`}
                register={register}
                control={control}
                errors={errors?.produtos?.[index]?.quantidade}
                disabled={disabled}
            />

            {/* Data de fabricação */}
            <DateField
                xs={12}
                md={2}
                title='Data da fabricação'
                value={value.dataFabricacao}
                name={`produtos[${index}].dataFabricacao`}
                control={control}
                errors={errors?.produtos?.[index]?.dataFabricacao}
                disabled={disabled}
                typeValidation='dataPassado'
                daysValidation={99999}
            />

            {/* Nº Lote */}
            <Input
                xs={12}
                md={2}
                title='Nº Lote'
                name={`produtos[${index}].lote`}
                register={register}
                control={control}
                errors={errors?.produtos?.[index]?.lote}
                disabled={disabled}
            />

            {/* Apresentação */}
            <Select
                xs={12}
                md={4}
                title='Apresentação'
                name={`produtos[${index}].apresentacao`}
                type='string'
                options={apresentacoes ?? []}
                register={register}
                setValue={setValue}
                control={control}
                errors={errors?.produtos?.[index]?.apresentacao}
                disabled={disabled}
            />

            {/* Data de validade */}
            <DateField
                xs={12}
                md={2}
                title='Data de validade'
                value={value.dataValidade}
                name={`produtos[${index}].dataValidade`}
                control={control}
                errors={errors?.produtos?.[index]?.dataValidade}
                disabled={disabled}
                typeValidation='dataFutura'
                daysValidation={99999}
            />
        </>
    )
}

export default FieldsProdutos
