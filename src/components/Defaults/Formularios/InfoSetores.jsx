import { Chip, Tooltip, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { api } from 'src/configs/api'
import { AuthContext } from 'src/context/AuthContext'

const InfoSetores = ({ data }) => {
    const { loggedUnity, user } = useContext(AuthContext)
    const [professsionals, setProfessionals] = useState([])

    if (user?.papelID !== 1) return null

    const getProfessionals = async () => {
        try {
            const response = await api.post(`/cadastros/setor/getProfessionals`, {
                setores: data.map(item => item.id),
                unidadeID: loggedUnity.unidadeID
            })

            setProfessionals(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProfessionals()
    }, [data])

    return (
        <div className='flex items-center justify-end gap-1'>
            {data && data.length > 0 ? (
                data.map((item, index) => (
                    <Tooltip
                        key={index}
                        title={
                            <>
                                {/* Exibir somente os profissionais que pertencem ao setor atual */}
                                {professsionals
                                    .filter(professional => professional.setorID === item.id)
                                    .map(professional => (
                                        <Typography key={professional.profissionalID}>{professional.nome}</Typography>
                                    )).length > 0 ? (
                                    professsionals
                                        .filter(professional => professional.setorID === item.id)
                                        .map(professional => (
                                            <div key={professional.profissionalID} className='text-[13px]'>
                                                {professional.nome}
                                            </div>
                                        ))
                                ) : (
                                    <div className='text-[13px]'>Nenhum profissional vinculado ao setor</div>
                                )}
                            </>
                        }
                    >
                        <Chip key={index} label={item?.nome} />
                    </Tooltip>
                ))
            ) : (
                <Tooltip title={<div className='text-[13px]'>Todos os profissionais</div>}>
                    <Chip key='0' label='Todos os setores' />
                </Tooltip>
            )}
        </div>
    )
}

export default InfoSetores
