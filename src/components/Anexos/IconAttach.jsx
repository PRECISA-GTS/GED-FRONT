//* Ícones
import IconPdf from '../../icon/IconPdf'
import IconWord from '../../icon/IconWord'
import IconExcel from '../../icon/IconExcel'
import IconPowerPoint from '../../icon/IconPowerPoint'
import IconText from '../../icon/IconText'
import IconZip from '../../icon/IconZip'
import IconUnknown from '../../icon/IconUnknown'

const IconAttach = ({ data }) => {
    console.log('🚀 ~ IconAttach data:', data)

    return data &&
        //? PDF
        data.tipo == 'application/pdf' ? (
        <IconPdf className='h-8 w-8 text-6xl fill-red-500' />
    ) : //? Imagem (cover)
    data.tipo == 'image/jpeg' || data.tipo == 'image/png' ? (
        <div
            className='h-8 w-8 rounded-lg relative '
            style={{ backgroundImage: `url(${data.path})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        ></div>
    ) : //? Word
    data.tipo == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ? (
        <IconWord className='h-8 w-8 text-6xl fill-blue-500' />
    ) : //? Excel
    data.tipo == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ? (
        <IconExcel className='h-8 w-8 text-6xl fill-green-500' />
    ) : //? Zip/Rar
    data.tipo == 'application/x-zip-compressed' ||
      data.tipo == 'application/zip-compressed' ||
      data.tipo == 'application/rar-compressed' ||
      data.tipo == 'application/x-rar-compressed' ? (
        <IconZip className='h-8 w-8 text-6xl fill-yellow-500' />
    ) : //? PowerPoint
    data.tipo == 'application/vnd.ms-powerpoint' ||
      data.tipo == 'application/vnd.openxmlformats-officedocument.presentationml.slideshow' ||
      data.tipo == 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ? (
        <IconPowerPoint className='h-8 w-8 text-6xl fill-[#D55736]' />
    ) : //? Txt
    data.tipo == 'text/plain' ? (
        <IconText className='h-8 w-8 text-6xl fill-sky-600' />
    ) : (
        //? Desconhecido
        <IconUnknown className='h-8 w-8 text-6xl fill-gray-500' />
    )
}

export default IconAttach
