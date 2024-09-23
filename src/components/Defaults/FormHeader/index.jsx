import Router from 'next/router'
import { useState, useContext, useEffect } from 'react'
import { CardContent, Box } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { backRoute } from 'src/configs/defaultConfigs'
import { AuthContext } from 'src/context/AuthContext'
import { RouteContext } from 'src/context/RouteContext'
import CustomChip from 'src/@core/components/mui/chip'
import useMediaQuery from '@mui/material/useMediaQuery'
import Actions from './DropDownButtons/Actions'
import ButtonsFloating from './ButtonsFloating'
import ButtonsFixedRight from './ButtonsFixedRight'
import ButtonsFixedLeft from './ButtonsFixedLeft'
import useLoad from 'src/hooks/useLoad'
import { SettingsContext } from 'src/@core/context/settingsContext'
import ActionsNC from './DropDownButtons/ActionsNC'
import { api } from 'src/configs/api'
import NewContentRecebimentoMp from 'src/components/RecebimentoMp/NaoConformidade/NewContent'
import NewContentLimpeza from 'src/components/Limpeza/NaoConformidade/NewContent'
import { useForm } from 'react-hook-form'

const FormHeader = ({
    id,
    btnCancel,
    btnInactivate,
    btnSave,
    btnSend,
    btnNext,
    btnStatus,
    handleSubmit,
    manualUrl,
    btnNew,
    btnClose,
    handleModalClose,
    disabledSubmit,
    handleSend,
    componentSaveReport,
    iconConclusion,
    titleConclusion,
    disabledSend,
    handleBtnStatus,
    onclickDelete,
    onClickInactivate,
    btnDelete,
    btnPrint,
    disabledPrint,
    disabled,
    actions,
    actionsData,
    type,
    module,
    status,
    partialRoute,
    outsideID,
    btnNewModal,
    handleNewModal,
    actionsNC,
    btnActivate,
    onClickActivate,
    modal
}) => {
    console.log('outside: ', outsideID)
    const router = Router
    const { routes, user } = useContext(AuthContext)
    const { setId, setModelID, setRecebimentoMpID, setLimpezaID } = useContext(RouteContext)
    const [isVisible, setIsVisible] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [anchorElNC, setAnchorElNC] = useState(null)
    const { isLoading } = useLoad()
    const { settings } = useContext(SettingsContext)
    const [actionsNCData, setActionsNCData] = useState(null)

    const form = useForm({ mode: 'onChange' })

    const matches = useMediaQuery('(min-width:640px)')

    const open = Boolean(anchorEl)
    const openNC = Boolean(anchorElNC)
    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }
    const handleClickNC = event => {
        setAnchorElNC(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleCloseNC = () => {
        setAnchorElNC(null)
    }

    //? Função que volta ao topo
    const backToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    //? Função que volta a página anterior
    const previousPage = () => {
        setId(null)
    }

    let currentUrl =
        type === 'new' && partialRoute
            ? backRoute(backRoute(router.pathname))
            : type === 'new' || partialRoute
            ? backRoute(router.pathname)
            : router.pathname

    //? Ex.: ?aba=nao-conformidade
    if (Object.keys(router.query).length > 0) {
        currentUrl += `?${new URLSearchParams(router.query).toString()}`
    }

    const dataButtons = [
        {
            id: 1,
            title: 'Salvar',
            color: isLoading ? 'secondary' : 'primary',
            size: 'large',
            type: 'submit',
            variant: 'contained',
            disabled: disabled || disabledSubmit || isLoading,
            icon: <Icon icon='material-symbols:save' />,
            function: handleSubmit
        },
        {
            id: 2,
            title: 'Voltar ao topo',
            color: 'default',
            size: 'large',
            type: 'button',
            variant: 'outlined',
            disabled: false,
            icon: <Icon icon='ion:arrow-up' />,
            function: backToTop
        },
        {
            id: 3,
            title: 'Voltar para a página anterior',
            color: 'default',
            size: 'large',
            type: 'button',
            variant: 'outlined',
            disabled: false,
            icon: <Icon icon='material-symbols:arrow-back-rounded' />,
            function: previousPage
        }
    ]

    //! Não Conformidades
    const handleNewNC = () => {
        let values = form.getValues('new')
        switch (module) {
            case 'recebimentoMp':
                setRecebimentoMpID(id)
                setModelID(values.modelo.id)
                router.push(`/formularios/recebimento-mp/novo/?aba=nao-conformidade`)
                break
            case 'limpeza':
                setLimpezaID(id)
                setModelID(values.modelo.id)
                router.push(`/formularios/limpeza/novo/?aba=nao-conformidade`)
                break
            default:
                break
        }
    }
    const goToNC = (id, route) => {
        setId(id)
        router.push(route)
    }
    const getNCData = async () => {
        try {
            let params = null
            switch (module) {
                case 'recebimentoMp':
                    params = {
                        endpoint: 'formularios/recebimento-mp/nao-conformidade/getNCRecebimentoMp',
                        route: '/formularios/recebimento-mp/?aba=nao-conformidade',
                        componentNewNC: <NewContentRecebimentoMp type='form' data={null} form={form} />
                    }
                    break
                case 'limpeza':
                    params = {
                        endpoint: 'formularios/limpeza/nao-conformidade/getNCLimpeza',
                        route: '/formularios/limpeza/?aba=nao-conformidade',
                        componentNewNC: <NewContentLimpeza type='form' data={null} form={form} />
                    }
                    break

                default:
                    break
            }

            const response = await api.post(params.endpoint, { id })
            const objNew = {
                icon: 'icons8:plus',
                name: 'Nova Não Conformidade',
                modal: true,
                component: params.componentNewNC,
                action: handleNewNC,
                size: 'sm',
                disabled: false
            }
            const formatedData = response.data.map(item => {
                //? É fábrica ou ta habilitado o preenchimento pelo fornecedor
                if (user.papelID === 1 || item.fornecedorPreenche) {
                    return {
                        icon: 'typcn:warning-outline',
                        name: item.nome,
                        iconClass: 'text-yellow-600',
                        action: () => goToNC(item.id, params.route),
                        disabled: false
                    }
                }
            })
            const validateOptions = user.papelID === 1 ? [objNew, ...formatedData] : formatedData
            setActionsNCData(validateOptions)
        } catch (error) {
            console.log(error)
        }
    }

    //? Verifica se o usuário deu scroll na página e mostra o botão de salvar
    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(false)
            if (window.scrollY > 0) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }
        getNCData()
        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    return (
        <>
            <div
                className={`sticky pb-2 mb-2 z-50 ${
                    outsideID || modal ? '-top-[4.5rem] bg-transparent' : 'top-[4.5rem]'
                } ${settings.mode === 'dark' ? 'bg-[#161c24]' : 'bg-[#F7F7F9]'}`}
            >
                <div className={`flex items-center justify-between w-full `} style={{ zIndex: 1000 }}>
                    {/* Div da esquerda */}
                    <ButtonsFixedLeft
                        routes={routes}
                        currentUrl={currentUrl}
                        btnCancel={btnCancel}
                        btnInactivate={btnInactivate}
                        btnDelete={btnDelete}
                        btnStatus={btnStatus}
                        btnClose={btnClose}
                        handleModalClose={handleModalClose}
                        status={status}
                        handleBtnStatus={handleBtnStatus}
                        onclickDelete={onclickDelete}
                        onClickInactivate={onClickInactivate}
                        setId={setId}
                        router={router}
                        type={type}
                        btnActivate={btnActivate}
                        onClickActivate={onClickActivate}
                    />

                    {/* 3 pontinhos ao clicar abre opções de seleção */}
                    <div className='flex items-center gap-2'>
                        {/*Div direita */}
                        {actionsNC && actionsNCData && (
                            <ActionsNC
                                anchorEl={anchorElNC}
                                open={openNC}
                                handleClose={handleCloseNC}
                                handleClick={handleClickNC}
                                disabled={disabled}
                                disabledPrint={disabledPrint}
                                btnPrint={btnPrint}
                                actionsData={actionsNCData}
                                matches={matches}
                            />
                        )}
                        {actions && (
                            <Actions
                                anchorEl={anchorEl}
                                open={open}
                                handleClose={handleClose}
                                handleClick={handleClick}
                                disabled={disabled}
                                disabledPrint={disabledPrint}
                                btnPrint={btnPrint}
                                actionsData={actionsData}
                                actionsNCData={actionsNCData}
                                matches={matches}
                            />
                        )}
                        <ButtonsFixedRight
                            btnSave={btnSave}
                            btnNew={btnNew}
                            btnSend={btnSend}
                            btnNext={btnNext}
                            manualUrl={manualUrl}
                            routes={routes}
                            currentUrl={currentUrl}
                            handleSubmit={handleSubmit}
                            disabled={disabled}
                            disabledSend={disabledSend}
                            disabledSubmit={disabledSubmit}
                            handleSend={handleSend}
                            iconConclusion={iconConclusion}
                            titleConclusion={titleConclusion}
                            btnNewModal={btnNewModal}
                            handleNewModal={handleNewModal}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormHeader
