import { Document, Page, Text } from '@react-pdf/renderer'

const Formulario = ({ data }) => {
    return (
        <Document>
            <Page size='A4' style={{ paddingTop: 10, paddingBottom: 30, paddingLeft: 20, paddingRight: 20 }}>
                <Text>Content do teste</Text>
                <Text>{data.name}</Text>
            </Page>
        </Document>
    )
}

export default Formulario
