import { Card, CardContent, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'
import IconCloudUpload from 'src/icon/IconUpload'
import IconAttach from '../IconAttach'
import Remove from 'src/components/Form/Remove'
import LoadingFile from 'src/components/LoadingFile'
import HelpText from 'src/components/Defaults/HelpText'

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
    inputRef
}) => {
    console.log('🚀 >>>>> AnexoList error:', error)

    return (
        <Grid item xs={12} md={12}>
            <div
                className={`${
                    error &&
                    (error?.[indexBlock]?.produtoAnexosDescricao?.[indexItem] ||
                        error?.[indexBlock]?.itens?.[indexItem]?.respostaConfig?.anexosSolicitados?.[indexAnexo] ||
                        error?.grupoAnexo?.[indexBlock]?.itens[indexItem])
                        ? 'border border-red-500'
                        : modeTheme === 'dark'
                        ? 'bg-[#212b36]'
                        : ' bg-[#F6F6F8] '
                } px-4 py-2 rounded-lg flex flex-col relative gap-2 z-10`}
            >
                <div className=''>
                    <p className='font-medium text-sm '>{item.nome}</p>
                </div>

                {/* Área de adicionar arquivos (pontilhado) */}
                <div
                    className={`rounded-lg border-2 p-3 cursor-pointer border-dashed hover:border-[#4A8B57] transition-colors ${
                        modeTheme === 'dark' ? ' border-[#212b36]' : 'rgba(76, 78, 100, 0.12)'
                    }`}
                    onClick={() => (!disabled ? handleFileClick(item) : null)}
                >
                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center gap-2'>
                            <IconCloudUpload className='w-8 h-8 fill-current' />

                            <div className='flex items-center gap-2'>
                                <h6 className='text-sm font-semibold opacity-80'>Adicione um ou mais arquivos</h6>
                                {item.descricao && <HelpText text={item.descricao} />}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Listagem dos anexos inseridos */}
                <div className='flex flex-col gap-2'>
                    {item &&
                        item?.anexos?.length > 0 &&
                        item.anexos.map((anexo, index) => (
                            <div
                                className={`flex items-center justify-between gap-2 border rounded-lg p-3 hover:border-[#4A8B57] transition-colors ${
                                    modeTheme === 'dark' ? ' border-[#212b36]' : 'rgba(76, 78, 100, 0.12)'
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
                                    <p className='text-sm font-semibold opacity-80'>{anexo.nome}</p>
                                    <p className='text-sm opacity-80'>
                                        <span className='text-xs opacity-50'>{`(${(anexo.size / 1024 / 1024).toFixed(
                                            2
                                        )}MB)`}</span>
                                    </p>
                                    <p className='text-xs opacity-50 pt-1'>
                                        {'Enviado em: ' +
                                            new Date(anexo.time).toLocaleString('pt-BR', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                    </p>
                                </div>
                                {/* Bloco direita (remover) */}
                                <div className=''>
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
                            </div>
                        ))}
                </div>

                <input
                    type='file'
                    multiple
                    ref={inputRef}
                    style={{ display: 'none' }}
                    onChange={e => handleFileSelect(e, selectedItem)}
                />
            </div>
        </Grid>
    )
}

export default AnexoList
