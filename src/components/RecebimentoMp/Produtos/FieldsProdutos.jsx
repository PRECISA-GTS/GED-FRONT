import Input from 'src/components/Form/Input'
import CheckLabel from 'src/components/Form/CheckLabel'
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

            {/* NF */}
            {/* <Input
                xs={12}
                md={2}
                title='NF'
                name={`produtos[${index}].nf`}
                register={register}
                control={control}
                errors={errors?.produtos?.[index]?.nf}
                disabled={disabled}
            /> */}

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
            />
        </>
    )
}

export default FieldsProdutos
