import React, { useState } from 'react'
import Fab from '@mui/material/Fab'
import Icon from 'src/@core/components/icon'
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer'

// reports defaults
import Footer from './Footer'
import Header from './Header'
import ReportComponents from '../Reports2/Layout/reportComponents'
import DialogSignatureReport from 'src/components/Defaults/Dialogs/DialogSignatureReport'
import { useEffect } from 'react'

const ButtonsFloating = ({ FileComponent, FileName }) => {
    const [openModalSignatureReport, setOpenModalSignatureReport] = useState(false)
    const reportJSON = localStorage.getItem('report')
    const report = JSON.parse(reportJSON)
    const signature = () => {
        setOpenModalSignatureReport(true)
    }

    const closePage = () => {
        window.close()
    }

    const dataButtons = [
        {
            id: 1,
            title: 'Fechar',
            color: 'primary',
            size: 'large',
            variant: 'outlined',
            disable: false,
            icon: 'ooui:close',
            function: closePage
        },
        {
            id: 2,
            title: 'Assinar digitalmente',
            color: 'primary',
            size: 'large',
            variant: 'outlined',
            disable: false, // report.status < 40 ? true : false,
            icon: 'fluent:signature-24-filled',
            function: signature
        }
    ]

    return (
        <div className='fixed bottom-4 right-12 flex flex-col gap-2'>
            {dataButtons &&
                dataButtons.map(item => (
                    <div key={item.id} onClick={!item.disable ? item.function : null}>
                        <Fab
                            color={item.color}
                            size={item.size}
                            variant={item.variant}
                            className={item.disable ? 'hover:opacity-20 opacity-20' : ''}
                        >
                            <Icon icon={item.icon} className={item.disable ? 'cursor-default' : ''} />
                        </Fab>
                    </div>
                ))}
            <div>
                <PDFDownloadLink document={FileComponent} fileName={FileName}>
                    {({ blob, url, loading, error }) => (
                        <div style={{ textAlign: 'center' }}>
                            <Fab color='primary' size='large' variant='outlined'>
                                <Icon icon='basil:download-solid' />
                            </Fab>
                        </div>
                    )}
                </PDFDownloadLink>
            </div>

            {/* Modal para assinatura do relatório */}
            <DialogSignatureReport
                open={openModalSignatureReport}
                handleClose={() => setOpenModalSignatureReport(false)}
                title={'Assinatura do relatório'}
            />
        </div>
    )
}

export default ButtonsFloating
