import { Card, CardContent, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'
import IconCloudUpload from 'src/icon/IconUpload'
import IconAttach from '../IconAttach'
import Remove from 'src/components/Form/Remove'
import LoadingFile from 'src/components/LoadingFile'
import HelpText from 'src/components/Defaults/HelpText'
import { limitString } from 'src/configs/functions'

const AnexoList = ({
    key,
    item,
    indexBlock,
    indexItem,
    indexAnexo,
    handleFileClick,
    selectedItem,
    handleFileSelect,
    handleRemove,
    folder,
    error,
    disabled,
    modeTheme,
    inputRef,
    form
}) => {
    if (!item) return null

    return (
        <div>
            <div className='flex items-center gap-1'>
                <Icon icon='fluent:attach-32-filled' fontSize={20} />
                <p className='font-medium text-sm'>{item.nome}</p>
            </div>

            <Grid container spacing={4} sx={{ pt: 2 }}>
                {/* Área de adicionar arquivos (pontilhado) */}
                <Grid item xs={12} md={3}>
                    <div
                        className={`rounded-xl px-3 py-4 cursor-pointer ${
                            modeTheme === 'dark'
                                ? ' bg-[#303A46] hover:bg-[#384350] transition-all'
                                : 'bg-[#EBEBEB] hover:bg-[#dad9d9] transition-all'
                        } ${
                            item && item.anexo == 1 && item.obrigatorio == 1 && item.anexos?.length == 0
                                ? 'border border-red-500'
                                : ''
                        }`}
                        onClick={() => (!disabled ? handleFileClick(item) : null)}
                    >
                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center gap-1'>
                                <Icon icon='ic:outline-plus' fontSize={30} />

                                <div className='flex items-center gap-2'>
                                    <h6 className='text-sm font-semibold opacity-80'>Adicione um ou mais arquivos</h6>
                                    {item.descricao && <HelpText text={item.descricao} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>

                {item &&
                    item?.anexos?.length > 0 &&
                    item.anexos.map((anexo, index) => (
                        <Grid item xs={12} md={3}>
                            <div
                                className={`flex items-center justify-between gap-2 px-3 py-4 rounded-xl ${
                                    modeTheme === 'dark' ? ' bg-[#303A46]' : 'bg-[#EBEBEB]'
                                }`}
                            >
                                {/* Bloco esquerda */}
                                <div
                                    className='flex items-center gap-2 cursor-pointer'
                                    onClick={() => {
                                        anexo && anexo.path ? window.open(anexo.path, '_blank') : null
                                    }}
                                >
                                    <IconAttach data={anexo} />
                                    <p className='text-sm font-semibold opacity-80'>{limitString(anexo.nome, 35)}</p>
                                </div>
                                {/* Bloco direita (remover) */}

                                <Remove
                                    xs={12}
                                    md={1}
                                    icon='ep:close'
                                    color='secondary'
                                    title={''}
                                    index={index}
                                    removeItem={() => handleRemove(anexo)}
                                    item={anexo}
                                    pending={!anexo?.exist || disabled}
                                    textSuccess='Remover este anexo'
                                    textError={
                                        disabled
                                            ? 'Você não ter permissões para remover este anexo'
                                            : 'Este anexo não pode mais ser removido pois o formulário já foi concluído!'
                                    }
                                />
                            </div>
                        </Grid>
                    ))}
            </Grid>

            <input
                type='file'
                multiple
                ref={inputRef}
                style={{ display: 'none' }}
                onChange={e => handleFileSelect(e, selectedItem)}
            />
        </div>
    )
}

export default AnexoList
