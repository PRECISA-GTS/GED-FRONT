import { Button, useTheme } from '@mui/material'
import { Document, Page, PDFViewer, Text } from '@react-pdf/renderer'
import React, { useEffect, useState } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { api } from 'src/configs/api'
import { useGlobal } from 'src/hooks/useGlobal'

const IndexFormulario = () => {
    const { data: session } = useGlobal()
    const [data, setData] = useState([])
    const getData = async () => {
        const res = await api.get('relatorio/teste/generate')
        setData(res.data)
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <div className='relative h-screen w-screen'>
            <div className='fixed bottom-8 right-8'>
                <div className='flex flex-col gap-4'>
                    <Button variant='contained' onClick={() => window.close()}>
                        Fechar
                    </Button>
                    <Button variant='contained'>Assinar</Button>
                </div>
            </div>
            <PDFViewer style={{ width: '100vw', height: '100vh' }}>
                <Document>
                    <Page
                        size='A4'
                        style={{
                            paddingHorizontal: 25
                        }}
                    >
                        <Text>h11111r3eerrtrtr</Text>
                        <Text>{JSON.stringify(data)}</Text>
                        <Text>{JSON.stringify(session)}</Text>
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    )
}

IndexFormulario.getLayout = page => <BlankLayout>{page}</BlankLayout>

IndexFormulario.setConfig = () => {
    const { palette } = useTheme()
    return {
        mode: palette.mode
    }
}

export default IndexFormulario
