// ** MUI Imports
import Link from '@mui/material/Link'
import { AuthContext } from 'src/context/AuthContext'
import { useContext, useState } from 'react'
import { Tooltip } from '@mui/material'
import DialogActs from 'src/components/Defaults/Dialogs/DialogActs'
import ListVersions from 'src/components/Configuracoes/Versao/ListVersions'

const FooterContent = () => {
  // ** Var
  const { latestVersionState } = useContext(AuthContext)
  console.log("🚀 ~ latestVersionState:", latestVersionState)
  const [open, setOpen] = useState(false)

  const handleOpenVersions = () => {
    setOpen(true)
  }

  return (
    <>
      <div className='flex justify-between sm:justify-end items-center '>
        {/* Versão Mobile */}
        <span
          onClick={handleOpenVersions}
          className={
            `block sm:hidden text-sm text-[#4A8B57]`
          }
        >
          v {latestVersionState}
        </span>

        <div>
          <p className='text-sm pr-2 md:text-sm flex items-center gap-1'>
            {`© ${new Date().getFullYear()}, por `}
            <Link target='_blank' href='https://sisprecisa.com.br/'>
              Precisa Tecnologia
            </Link>

            {/* Versão Desktop */}
            <Tooltip title='Ver documentação de atualizações' placement='top'>
              <span
                onClick={handleOpenVersions}
                className={`hidden sm:block cursor-pointer text-sm hover:underline text-[#4A8B57]`}
              >
                versão {latestVersionState}
              </span>
            </Tooltip>
          </p>
        </div>
      </div>

      <DialogActs
        title='Últimas Atualizações'
        handleConclusion={null}
        setOpenModal={setOpen}
        openModal={open}
        size='md'
      >
        <ListVersions />
      </DialogActs>
    </>
  )
}

export default FooterContent
