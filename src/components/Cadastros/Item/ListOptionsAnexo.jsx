import { Box, Grid } from '@mui/material'
import Input from 'src/components/Form/Input'
import CheckLabel from 'src/components/Form/CheckLabel'
import Remove from 'src/components/Form/Remove'

const ListOptionsAnexo = ({ data, index, indexAnexo, handleRemoveAnexo, control, register, errors }) => {
    return (
        <>
            <Input
                xs={12}
                md={9}
                title='Nome'
                name={`fields.opcoes[${index}].anexos[${indexAnexo}].nome`}
                required
                control={control}
                errors={errors?.fields?.opcoes?.[index]?.anexos?.[indexAnexo]?.nome}
            />
            <CheckLabel
                xs={6}
                md={2}
                title='Obrigatório'
                name={`fields.opcoes[${index}].anexos[${indexAnexo}].obrigatorio`}
                value={data.obrigatorio}
                register={register}
            />

            <Remove
                xs={6}
                md={1}
                title={indexAnexo == 0 ? 'Remover' : ''}
                index={index}
                removeItem={() => handleRemoveAnexo(data, index, indexAnexo)}
                item={data}
                pending={false}
                textSuccess='Remover este anexo'
                textError='Este anexo não pode mais ser removido pois possui vínculo atrelado a ele'
            />
        </>
    )
}

export default ListOptionsAnexo
