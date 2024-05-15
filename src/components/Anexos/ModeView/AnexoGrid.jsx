import { Card, CardContent, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'
import IconCloudUpload from 'src/icon/IconUpload'
import IconAttach from '../IconAttach'
import LoadingFile from 'src/components/LoadingFile'
import HelpText from 'src/components/Defaults/HelpText'

const AnexoGrid = ({
    key,
    item,
    handleFileClick,
    indexGrupo,
    indexItem,
    selectedItem,
    handleFileSelect,
    handleRemove,
    loadingFile,
    folder,
    error,
    disabled,
    modeTheme,
    inputRef
}) => {
    console.log('🚀 ~ AnexoGrid item:', item)

    return (
        <Grid item xs={12} md={3}>
            <div
                className={`${
                    error?.[key] ? 'border border-red-500' : modeTheme === 'dark' ? 'bg-[#212b36]' : 'bg-[#F6F6F8]'
                } rounded-lg flex flex-col relative z-10`}
            >
                <div className={`flex items-center justify-center p-2 mt-1 `}>
                    <p className='font-medium text-sm '>{item.nome}</p>
                </div>
                <div
                    className='flex justify-center items-center cursor-pointer p-1 h-[100px] w-full '
                    disabled={disabled}
                    onClick={() => {
                        item.anexo && item.anexo.path && item.anexo.exist
                            ? window.open(item.anexo.path, '_blank')
                            : !disabled
                            ? handleFileClick(item)
                            : null
                    }}
                >
                    <div
                        className={`flex p-1 justify-center items-center gap-2 rounded-lg w-full h-full m-3 border-2 border-dashed hover:border-[#4A8B57] transition-colors ${
                            modeTheme === 'dark' ? ' border-[#212b36]' : 'rgba(76, 78, 100, 0.12)'
                        }`}
                    >
                        {selectedItem && selectedItem.grupoAnexoItemID == item.grupoAnexoItemID && (
                            <LoadingFile show={loadingFile} title='Enviando anexo...' />
                        )}
                        <div className='flex items-center gap-3'>
                            {item.anexo && item.anexo.exist ? (
                                <div>
                                    <div className='flex flex-col items-center gap-1'>
                                        <IconAttach data={item.anexo} />

                                        <div className='flex items-center gap-1'>
                                            <p className='text-sm opacity-80'>
                                                {item.anexo.nome}
                                                <span className='text-xs opacity-50 ml-1'>{`(${(
                                                    item.anexo.size /
                                                    1024 /
                                                    1024
                                                ).toFixed(2)}MB)`}</span>
                                            </p>
                                            {item.descricao && <HelpText text={item.descricao} />}
                                        </div>
                                        <p className='text-xs opacity-50'>
                                            {new Date(item.anexo.time).toLocaleString('pt-BR', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className='flex flex-col items-center gap-1'>
                                    <IconCloudUpload
                                        className={`w-8 h-8 ${
                                            item.anexo && item.anexo.exist ? 'fill-[#666CFF]' : 'fill-current'
                                        }`}
                                    />
                                    <div className='flex items-center gap-1'>
                                        <h6 className='text-sm font-normal opacity-80'>Adicione um arquivo</h6>
                                        {item.descricao && <HelpText text={item.descricao} />}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-between gap-1 p-2 py-3 pl-4'>
                    <Tooltip
                        title={
                            item.hasPending == 1
                                ? `Este item não pode mais ser removido pois já foi respondido em um formulário`
                                : `Remover este item`
                        }
                    >
                        <IconButton
                            color='error'
                            onClick={() => handleRemove(item)}
                            disabled={!item.anexo?.exist || disabled}
                        >
                            <Icon icon='tabler:trash-filled' />
                        </IconButton>
                    </Tooltip>
                </div>
                <input
                    type='file'
                    ref={inputRef}
                    style={{ display: 'none' }}
                    onChange={e => handleFileSelect(e, selectedItem, folder)}
                />
            </div>
        </Grid>
    )
}

export default AnexoGrid
