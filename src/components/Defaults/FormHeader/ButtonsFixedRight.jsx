import { Button } from '@mui/material'
import Icon from 'src/@core/components/icon'
import Router from 'next/router'
import Link from 'next/link'
import useLoad from 'src/hooks/useLoad'
import Header from 'src/components/Reports/Layout/Header'
import Footer from 'src/components/Reports/Layout/Footer'
import { useContext } from 'react'
import { AuthContext } from 'src/context/AuthContext'
import { RouteContext } from 'src/context/RouteContext'
import { BlobProvider, Document, Page } from '@react-pdf/renderer'

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
    componentSaveReport,
    iconConclusion,
    titleConclusion
}) => {
    const router = Router
    const { isLoading } = useLoad()
    const url = manualUrl ?? currentUrl
    const { user } = useContext(AuthContext)
    const { id } = useContext(RouteContext)

    const DocumentPdf = () => {
        return (
            <Document>
                <Page
                    size='A4'
                    style={{
                        paddingHorizontal: 25
                    }}
                >
                    <Header />
                    {componentSaveReport}
                    <Footer />
                </Page>
            </Document>
        )
    }

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
            {btnSend && (
                <BlobProvider document={<DocumentPdf />}>
                    {({ blob, url, loading, error }) => (
                        <Button
                            onClick={() => handleSend(blob)}
                            type='button'
                            variant='contained'
                            size='medium'
                            color='primary'
                            disabled={disabled || disabledSend}
                            sx={{ display: 'flex', gap: 2 }}
                        >
                            <Icon icon={iconConclusion ?? 'carbon:send-filled'} />
                            <span className='hidden sm:block'>{titleConclusion}</span>
                        </Button>
                    )}
                </BlobProvider>
            )}
            {/* Salvar */}
            {btnSave &&
                (routes.find(route => route.rota === url && route.editar) ||
                    (currentUrl === '/cadastros/profissional' && user.profissionalID == id)) && (
                    <Button
                        onClick={handleSubmit}
                        type='submit'
                        variant='contained'
                        size='medium'
                        color={isLoading ? 'secondary' : 'primary'}
                        disabled={disabled || disabledSubmit || isLoading}
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
