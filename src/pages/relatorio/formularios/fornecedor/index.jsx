import { useGlobal } from 'src/hooks/useGlobal'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Document, Page, PDFViewer, Text } from '@react-pdf/renderer'
import { useTheme } from '@mui/material'
import ButtonsFloating from 'src/components/Reports/ButtonsFloating'
import Header from 'src/components/Reports/Header'
import Footer from 'src/components/Reports/Footer'

const indexFormulario = () => {
    const { data } = useGlobal()

    const FileComponent = () => {
        return (
            <Document>
                <Page
                    size='A4'
                    style={{
                        paddingHorizontal: 25
                    }}
                >
                    <>
                        <Header data={data} />
                        {/* <Content data={data} /> */}
                        <Footer />
                    </>
                </Page>
            </Document>
        )
    }

    return (
        <>
            <PDFViewer style={{ width: '100%', height: '100vh' }}>
                <FileComponent />
            </PDFViewer>

            <ButtonsFloating
                FileComponent={<FileComponent />}
                FileName={`Qualificação de Fornecedor #${data.report.id}`}
            />
        </>
    )
}

indexFormulario.getLayout = page => <BlankLayout>{page}</BlankLayout>

indexFormulario.setConfig = () => {
    const { palette } = useTheme()
    return {
        mode: palette.mode
    }
}

export default indexFormulario
