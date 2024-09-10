import { Autocomplete, FormControl, Grid, TextField, Box, Tooltip, IconButton } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { cnpjMask, cellPhoneMask, cepMask, ufMask } from 'src/configs/masks'

//* Custom components
import Select from 'src/components/Form/Select'
import Input from 'src/components/Form/Input'

const Product = ({ field, data, name, indexData, disabled, control, register, setValue, errors }) => {
    return (
        <>
            {/* Enviar hidden de recebimentompProdutoID */}
            <input
                type='hidden'
                name={`produtos[${indexData}].recebimentompProdutoID`}
                defaultValue={field?.recebimentompProdutoID}
                {...register(`produtos[${indexData}].recebimentompProdutoID`)}
            />

            {/* int (select) */}
            {field && field.tipo === 'int' && field.tabela && (
                <Select
                    key={indexData}
                    xs={12}
                    md={12}
                    title={field.nomeCampo}
                    name={name}
                    value={data?.[field.tabela] ?? null}
                    multiple={false}
                    disabled={disabled}
                    // required={field.obrigatorio == 1 ? true : false}
                    options={field.options}
                    register={register}
                    setValue={setValue}
                    control={control}
                    errors={errors?.products?.[indexData]?.[field.tabela]}
                />
            )}

            {/* Input */}
            {field && field.tipo === 'string' && (
                <Input
                    title={field.nomeCampo}
                    name={name}
                    value={data?.[field.nomeColuna]}
                    type={field.nomeColuna}
                    disabled={disabled}
                    control={control}
                    errors={errors?.produtos?.[indexData]?.[field.nomeColuna]}
                />
            )}
        </>
    )
}

export default Product
