import React from 'react'
import { Document, PDFViewer, Page } from '@react-pdf/renderer'
import Footer from '../../Reports/Footer'
import Header from '../../Reports/Header'

const LayoutReport = ({ params, children }) => {
    return (
        <PDFViewer style={{ width: '100%', height: '100vh' }}>
            <Document>
                <Page
                    size='A4'
                    style={{
                        paddingHorizontal: 25
                    }}
                >
                    <Header params={params} />
                    {children}
                    <Footer />
                </Page>
            </Document>
        </PDFViewer>
    )
}

export default LayoutReport
