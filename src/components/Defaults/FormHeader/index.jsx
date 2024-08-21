import Router from 'next/router'
import { useState, useContext, useEffect } from 'react'
import { CardContent, Box } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { backRoute } from 'src/configs/defaultConfigs'
import { AuthContext } from 'src/context/AuthContext'
import { RouteContext } from 'src/context/RouteContext'
// import LayoutReport from 'src/components/Reports/Layout'
import CustomChip from 'src/@core/components/mui/chip'
import useMediaQuery from '@mui/material/useMediaQuery'
import OptionsDots from './OptionsDots'
import ButtonsFloating from './ButtonsFloating'
import ButtonsFixedRight from './ButtonsFixedRight'
import ButtonsFixedLeft from './ButtonsFixedLeft'
import useLoad from 'src/hooks/useLoad'
import { SettingsContext } from 'src/@core/context/settingsContext'

const FormHeader = ({
    btnCancel,
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
    btnDelete,
    btnPrint,
    disabledPrint,
    disabled,
    actions,
    actionsData,
    type,
    status,
    partialRoute,
    outsideID,
    setores
}) => {
    const router = Router
    const { routes } = useContext(AuthContext)
    const { setId } = useContext(RouteContext)
    const [isVisible, setIsVisible] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const { isLoading } = useLoad()
    const { settings } = useContext(SettingsContext)

    const matches = useMediaQuery('(min-width:640px)')

    const open = Boolean(anchorEl)
    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
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

    const currentUrl =
        type === 'new' && partialRoute
            ? backRoute(backRoute(router.pathname))
            : type === 'new' || partialRoute
            ? backRoute(router.pathname)
            : router.pathname

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

        window.addEventListener('scroll', toggleVisibility)

        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    return (
        <>
            <div
                className={`sticky ${
                    outsideID ? '-top-[4.5rem] px-4 bg-transparent' : 'top-[4.5rem]'
                }  pb-2 mb-2 z-50 ${settings.mode == 'dark' ? 'bg-[#161c24]' : 'bg-[#F7F7F9]'}`}
            >
                <div className={`flex items-center justify-between w-full `} style={{ zIndex: 1000 }}>
                    {/* Div da esquerda */}
                    <ButtonsFixedLeft
                        routes={routes}
                        currentUrl={currentUrl}
                        btnCancel={btnCancel}
                        btnDelete={btnDelete}
                        btnStatus={btnStatus}
                        btnClose={btnClose}
                        handleModalClose={handleModalClose}
                        status={status}
                        handleBtnStatus={handleBtnStatus}
                        onclickDelete={onclickDelete}
                        setId={setId}
                        router={router}
                        type={type}
                    />

                    {/* // 3 pontinhos ao clicar abre opções de seleção */}
                    <div className='flex items-center gap-2'>
                        {/*Div direita */}
                        {actions && (
                            <OptionsDots
                                anchorEl={anchorEl}
                                open={open}
                                handleClose={handleClose}
                                handleClick={handleClick}
                                disabled={disabled}
                                disabledPrint={disabledPrint}
                                btnPrint={btnPrint}
                                actionsData={actionsData}
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
                            // componentSaveReport={componentSaveReport}
                            iconConclusion={iconConclusion}
                            titleConclusion={titleConclusion}
                            setores={setores}
                        />
                    </div>

                    {/* Botões flutuantes */}
                    {/* <ButtonsFloating
                        isVisible={isVisible}
                        dataButtons={dataButtons}
                        btnSave={btnSave}
                        btnPrint={btnPrint}
                        matches={matches}
                        routes={routes}
                        currentUrl={currentUrl}
                    /> */}
                    {/* <Box sx={{ mt: 4 }}>
                        {status && !matches && (
                            <Box display='flex' alignItems='center' justifyContent='flex-start'>
                                <CustomChip
                                    size='small'
                                    skin='light'
                                    color={status.color}
                                    label={status.title}
                                    sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
                                />
                            </Box>
                        )}
                    </Box> */}
                </div>
            </div>
        </>
    )
}

export default FormHeader
