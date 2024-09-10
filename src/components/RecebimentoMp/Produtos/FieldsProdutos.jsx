import Input from 'src/components/Form/Input'
import DateField from 'src/components/Form/DateField'
import Select from 'src/components/Form/Select'

const FieldsProdutos = ({ value, index, apresentacoes, disabled, form }) => {
    return (
        <>
            {/* Quantidade */}
            <Input
                xs={12}
                md={2}
                title='Quantidade'
                name={`produtos[${index}].quantidade`}
                disabled={disabled}
                mask='fractioned3' //? Ex.: 1.580.000,587
                form={form}
            />

            {/* Data de fabricação */}
            <DateField
                xs={12}
                md={2}
                title='Data da fabricação'
                value={value.dataFabricacao}
                name={`produtos[${index}].dataFabricacao`}
                disabled={disabled}
                typeValidation='dataPassado'
                form={form}
            />

            {/* Nº Lote */}
            <Input xs={12} md={2} title='Nº Lote' name={`produtos[${index}].lote`} disabled={disabled} form={form} />

            {/* Apresentação */}
            <Select
                xs={12}
                md={4}
                title='Apresentação'
                name={`produtos[${index}].apresentacao`}
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
                value={value.dataValidade}
                name={`produtos[${index}].dataValidade`}
                disabled={disabled}
                form={form}
            />
        </>
    )
}

export default FieldsProdutos
