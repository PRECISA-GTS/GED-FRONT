import { useGlobal } from 'src/hooks/useGlobal'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Document, Page, PDFViewer, Text } from '@react-pdf/renderer'
import { useTheme } from '@mui/material'
import ButtonsFloating from 'src/components/Reports/ButtonsFloating'

const indexFormulario = () => {
    const { data } = useGlobal()

    return (
        <>
            <PDFViewer style={{ width: '100%', height: '100vh' }}>
                <Document>
                    <Page
                        size='A4'
                        style={{
                            paddingHorizontal: 25
                        }}
                    >
                        <>
                            <Text>{JSON.stringify(data)}</Text>
                            <Text>Teste 1234567890</Text>
                            {/* <Header data={dataHeader} />
                    <Content data={dataContent} />
                    <Footer /> */}
                        </>
                    </Page>
                </Document>
            </PDFViewer>
            <ButtonsFloating />
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
