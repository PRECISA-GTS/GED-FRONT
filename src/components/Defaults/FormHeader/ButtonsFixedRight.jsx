import { Button, Tooltip } from '@mui/material'
import Icon from 'src/@core/components/icon'
import Router from 'next/router'
import Link from 'next/link'
import useLoad from 'src/hooks/useLoad'
import { useGlobal } from 'src/hooks/useGlobal'
import { AuthContext } from 'src/context/AuthContext'
import { useContext, useEffect, useState } from 'react'

const ButtonsFixedRight = ({
    btnSend,
    btnSave,
    btnNew,
    btnNext,
    manualUrl,
    routes,
    currentUrl,
    disabled,
    disabledSend,
    disabledSubmit,
    handleSubmit,
    handleSend,
    iconConclusion,
    titleConclusion,
    setores
}) => {
    const { user } = useContext(AuthContext)
    const router = Router
    const { isLoading } = useLoad()
    const { data } = useGlobal()
    const [sectorPermission, setSectorPermission] = useState(null)

    console.log('🚀 ~ setores profissional:', user.setores)

    const validateConclusionPermissions = () => {
        if (user.admin === 1 && !disabled && !disabledSend) {
            setSectorPermission({
                status: true,
                message: 'Todos os setores podem concluir este modelo de formulário.'
            })
            return
        }

        if (disabled || disabledSend) {
            setSectorPermission({
                status: false,
                message: 'Este formulário não está aberto para conclusão.'
            })
            return
        }

        if (setores && setores.length === 0) {
            setSectorPermission({
                status: true,
                message: 'Todos os setores podem concluir este modelo de formulário.'
            })
            return
        }

        if (setores && setores.length > 0) {
            const sectorIncluded = setores.some(setor => user.setores.some(userSetor => userSetor.id === setor.id))
            if (sectorIncluded) {
                setSectorPermission({
                    status: true,
                    message: 'Seu setor está configurado para concluir este modelo de formulário.'
                })
                return
            }
        }

        setSectorPermission({
            status: false,
            message: 'Seu setor não está configurado para concluir este modelo de formulário.'
        })
    }

    useEffect(() => {
        validateConclusionPermissions()
    }, [])

    return (
        <div className='flex items-center gap-2'>
            {/* Novo */}
            {btnNew && routes.find(route => route.rota === router.pathname && route.inserir) && (
                <Link href={`${router.pathname}/novo`}>
                    <Button
                        type='button'
                        variant='outlined'
                        color='primary'
                        size='medium'
                        sx={{ display: 'flex', gap: 2 }}
                    >
                        <Icon icon='ic:outline-plus' />
                        <span className='hidden sm:block'>Novo</span>
                    </Button>
                </Link>
            )}

            {/* Conclusão de formulário (salva arquivo .pdf do formulário) */}
            {btnSend && data && (
                <Tooltip title={sectorPermission?.message} placement='bottom'>
                    <Button
                        onClick={() => {
                            if (sectorPermission?.status === true) {
                                handleSend()
                            }
                        }}
                        type='button'
                        variant='contained'
                        size='medium'
                        color='primary'
                        readOnly
                        sx={{
                            opacity: sectorPermission?.status === false ? 0.5 : 1,
                            display: 'flex',
                            gap: 2
                        }}
                    >
                        <Icon icon={iconConclusion ?? 'carbon:send-filled'} />
                        <span className='hidden sm:block'>{titleConclusion}</span>
                    </Button>
                </Tooltip>
            )}
            {btnSave && (
                <Button
                    onClick={handleSubmit}
                    type='submit'
                    variant='contained'
                    size='medium'
                    // color={isLoading ? 'secondary' : 'primary'}
                    disabled={disabled || disabledSubmit}
                    sx={{ display: 'flex', gap: 2 }}
                >
                    <Icon icon='mdi:check-bold' />
                    <span className='hidden sm:block'>Salvar</span>
                </Button>
            )}
            {btnNext && (
                <Button
                    onClick={handleSubmit}
                    type='submit'
                    variant='outlined'
                    size='medium'
                    color={isLoading ? 'secondary' : 'primary'}
                    disabled={disabled || isLoading}
                >
                    <Icon icon='grommet-icons:form-next-link' />
                    <span className='hidden sm:block'>Avançar</span>
                </Button>
            )}
        </div>
    )
}

export default ButtonsFixedRight
