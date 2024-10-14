import { Box, Card, CardContent } from '@mui/material'
import { useContext, useEffect } from 'react'
import { useFieldArray } from 'react-hook-form'
import HelpText from 'src/components/Defaults/HelpText'
import CheckLabel from 'src/components/Form/CheckLabel'
import { api } from 'src/configs/api'
import { AuthContext } from 'src/context/AuthContext'
import Equipamento from './Equipamento'
import { RouteContext } from 'src/context/RouteContext'

const Block = ({ form }) => {
    const { loggedUnity } = useContext(AuthContext)
    const { id } = useContext(RouteContext)

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'blocos[0].equipamentos'
    })

    const getData = async () => {
        if (!form.watch('header.setor')) return

        try {
            const values = {
                id,
                unidadeID: loggedUnity.unidadeID,
                setorID: form.watch('header.setor')?.id
            }

            const response = await api.post(`/formularios/limpeza/getEquipamentos`, values)
            console.log('🚀 ~ response:', response.data)

            remove()
            append(response.data)
            console.log('🚀 ~ response:', response.data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleCheck = (e, index) => {
        const { checked } = e.target
        form.setValue(`blocos[0].equipamentos.${index}.checked`, checked)
    }

    useEffect(() => {
        getData()
    }, [form.watch('header.setor')])

    return (
        form.watch('header.setor') &&
        fields.map((field, index) => (
            <Card>
                <CardContent>
                    <Box
                        key={field.id}
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        sx={{ gap: 2 }}
                    >
                        <div className='flex items-center gap-2'>
                            <CheckLabel
                                form={form}
                                xs={6}
                                md={6}
                                title={field.nome}
                                name={`blocos[0].equipamentos.${index}.checked`}
                                onClick={e => handleCheck(e, index)}
                                value={field?.checked}
                            />
                            {field?.orientacoesLimpeza && <HelpText text={field.orientacoesLimpeza} />}
                        </div>

                        <div>Validade ...</div>
                    </Box>

                    {/* Configurações do equipamento (se marcado) */}
                    {form.watch(`blocos[0].equipamentos.${index}.checked`) && (
                        <Equipamento form={form} data={field} index={index} />
                    )}
                </CardContent>
            </Card>
        ))
    )
}

export default Block
