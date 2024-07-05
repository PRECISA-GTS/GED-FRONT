import { useTheme } from "@mui/material"
import { Document, PDFViewer, Page, Text } from "@react-pdf/renderer"
import BlankLayout from "src/@core/layouts/BlankLayout"
import Footer from "src/components/Reports/Footer"
import { useGlobal } from "src/hooks/useGlobal"
import Content from "./Content"
import Header from "src/components/Reports/Header"


const indexFormulario  = () => {
  const {data} = useGlobal()
  if(!data || Object.keys(data).length === 0) return
  //  const route =
  //       process.env.NODE_ENV === 'development' ? 'http://localhost:3333/api/' : 'https://demo.gedagro.com.br/api/'

  // if(data?.report?.status > 40 && data?.user?.papelID === 1){
  //   const newUrl = `${route}uploads/${data?.user?.unidadeID}/fornecedor/relatorio/original/${data?.user?.usuarioID}-${data?.report?.id}-fornecedor.pdf`
  //   window.location.href = newUrl
  // }


  const dataHeader = {
    unidadeID: data?.user?.unidadeID,
    papelID : data?.user?.papelID
  }

  const dataContent = {
    unidadeID: data?.user?.unidadeID,
    papelID : data?.user?.papelID,
    id: data?.report?.id
  }

  return (
      <PDFViewer style={{ width: '100%', height: '100vh' }}>
        <Document>
            <Page
                size='A4'
                style={{
                  paddingHorizontal: 25
                }}
                >
              <Header data={dataHeader}/>
              <Content data={dataContent}/>
              <Footer />
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
