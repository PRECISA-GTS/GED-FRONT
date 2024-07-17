import { useGlobal } from 'src/hooks/useGlobal'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Document, Page, PDFViewer, Text } from '@react-pdf/renderer'
import { useTheme } from '@mui/material'

const indexFormulario = () => {
    const { data } = useGlobal()

    return (
        <PDFViewer style={{ width: '100%', height: '100vh' }}>
            <Document>
                <Page
                    size='A4'
                    style={{
                        paddingHorizontal: 25
                    }}
                >
                    <Text>errtetrtrytryyt</Text>
                    {/* <ButtonsFloating /> */}
                    {/* <Header data={dataHeader} />
                    <Content data={dataContent} />
                    <Footer /> */}
                </Page>
            </Document>
        </PDFViewer>
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
