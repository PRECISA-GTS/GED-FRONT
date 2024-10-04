// ** MUI Imports
import Link from '@mui/material/Link'
import { useState } from 'react'
import { Tooltip } from '@mui/material'
import DialogActs from 'src/components/Defaults/Dialogs/DialogActs'
import ListVersions from 'src/components/Configuracoes/Versao/ListVersions'
import { getTokenExpiration } from 'src/configs/tokenJWT'


const FooterContent = () => {
  // ** Var
  const latestVersionState = localStorage.getItem('latestVersion')
  const [open, setOpen] = useState(false)

  const handleOpenVersions = () => {
    setOpen(true)
  }

  const tokenExpiration = getTokenExpiration()

  return (
    <>
      <div className='flex justify-between items-center'>
        {/* Versão Mobile */}
        <span
          onClick={handleOpenVersions}
          className={
            `block sm:hidden text-sm text-[#4A8B57]`
          }
        >
          v {latestVersionState ?? '1.0.0'}
        </span>

        <p className='text-sm opacity-50'>Sessão expira em {tokenExpiration}</p>

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
                versão {latestVersionState ?? '1.0.0'}
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
