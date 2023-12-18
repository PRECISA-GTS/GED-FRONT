import React, { useState } from 'react'
import { Document, Page } from 'react-pdf'

const FotoTeste = ({ fotoBinaria }) => {
    console.log('🚀 ~ fotoBinaria:', fotoBinaria)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [selectedPhoto, setSelectedPhoto] = useState(null)

    const abrirModal = foto => {
        setSelectedPhoto(foto)
        setModalIsOpen(true)
    }

    const fecharModal = () => {
        setSelectedPhoto(null)
        setModalIsOpen(false)
    }

    return (
        <div>
            <a href={'http://localhost:3334/api/login/testeFoto'}>abri pdf</a>
            <div id='pdf-container'></div>
        </div>
        // <div>
        //     {fotoBinaria &&
        //         fotoBinaria.map((foto, index) => {
        //             return (
        //                 <div key={index} className='w-[200px] h-[200px]'>
        //                     {foto.tipo.startsWith('image') ? (
        //                         <>
        //                             <img
        //                                 src={foto.url}
        //                                 className='w-full cursor-pointer'
        //                                 onClick={() => abrirModal(foto)}
        //                             />
        //                             <div id='pdf-container'></div>
        //                             <a href={}>abriur pdf</a>
        //                         </>
        //                     ) : (
        //                         <div className='w-full cursor-pointer'>
        //                             {foto.tipo === 'application/pdf' ? (
        //                                 <a href={foto.url} target='_blank' rel='noopener noreferrer'>
        //                                     Abrir PDF
        //                                 </a>
        //                             ) : (
        //                                 <a href={foto.url} download>
        //                                     Download Documento
        //                                 </a>
        //                             )}
        //                         </div>
        //                     )}
        //                 </div>
        //             )
        //         })}

        //     {modalIsOpen && (
        //         <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
        //             <div className='bg-white'>
        //                 <button
        //                     className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
        //                     onClick={fecharModal}
        //                 >
        //                     Fechar
        //                 </button>
        //                 {selectedPhoto && selectedPhoto.tipo === 'application/pdf' && (
        //                     <Document file={selectedPhoto.url}>
        //                         <Page pageNumber={1} />
        //                     </Document>
        //                 )}
        //                 {selectedPhoto && selectedPhoto.tipo !== 'application/pdf' && (
        //                     <img
        //                         src={selectedPhoto.url}
        //                         alt='Imagem em modal'
        //                         className='w-full h-full object-contain'
        //                     />
        //                 )}
        //             </div>
        //         </div>
        //     )}
        // </div>
    )
}

export default FotoTeste
