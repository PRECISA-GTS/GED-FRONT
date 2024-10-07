import { Card, CardContent } from '@mui/material'
import CustomChip from 'src/@core/components/mui/chip'
import LimpezaInfo from './LimpezaInfo'
import ModelBlocks from 'src/components/Form/ModelBlocks'
import HistoricForm from 'src/components/Defaults/HistoricForm'
import { useContext } from 'react'
import { AuthContext } from 'src/context/AuthContext'
import ButtonOpenForm from 'src/components/Defaults/Buttons/ButtonOpenForm'
import { api } from 'src/configs/api'
import Header from 'src/components/RecebimentoMp/NaoConformidade/Header'

const FormLimpezaNC = ({ id, header, block, setBlock, form, change }) => {
    console.log('🚀 ~ FormLimpezaNC ~ id:', id)

    const type = id && id > 0 ? 'edit' : 'new'
    const { user } = useContext(AuthContext)

    const handleFileSelect = async (event, item) => {
        const selectedFile = event.target.files
        if (selectedFile && selectedFile.length > 0) {
            const formData = new FormData()
            for (let i = 0; i < selectedFile.length; i++) {
                formData.append('files[]', selectedFile[i])
            }
            formData.append(`usuarioID`, user.usuarioID)
            formData.append(`unidadeID`, loggedUnity.unidadeID)
            formData.append(
                `parLimpezaNaoConformidadeModeloBlocoID`,
                item.parLimpezaNaoConformidadeModeloBlocoID ?? null
            )
            formData.append(`itemOpcaoAnexoID`, item.itemOpcaoAnexoID ?? null)

            await api
                .post(
                    `/formularios/limpeza/nao-conformidade/saveAnexo/${id}/item/${user.usuarioID}/${loggedUnity.unidadeID}`,
                    formData
                )
                .then(response => {
                    onSubmit(form.getValues()) //? Atualiza dados do formulário
                })
                .catch(error => {
                    toast.error(error.response?.data?.message ?? 'Erro ao atualizar anexo, tente novamente!')
                })
                .finally(() => {
                    setChange(!change)
                })
        }
    }

    const handleRemoveFile = async item => {
        if (item) {
            await api
                .delete(
                    `/formularios/limpeza/nao-conformidade/deleteAnexo/${id}/${item.anexoID}/${loggedUnity.unidadeID}/${user.usuarioID}/item`
                )
                .then(response => {
                    //* Submete formulário pra atualizar configurações dos itens
                    const values = form.getValues()
                    onSubmit(values)
                })
                .catch(error => {
                    toast.error(error.response?.data?.message ?? 'Erro ao remover anexo, tente novamente!')
                })
                .finally(() => {
                    getData()
                })
        }
    }

    return (
        <>
            {/* <div className='flex gap-2 mb-2'>
                <CustomChip
                    size='small'
                    HeaderFiel
                    skin='light'
                    color={header.status.color}
                    label={header.status.label}
                    sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
                />
                <CustomChip
                    size='small'
                    HeaderFiel
                    skin='light'
                    label={header.modelo.nome}
                    sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
                />
            </div> */}

            <div className='space-y-4'>
                <Header form={form} data={header} disabled={header.status?.id >= 40 || user.papelID != 1} />

                {type === 'new' && <ButtonOpenForm />}

                {type === 'edit' && (
                    <ModelBlocks
                        form={form}
                        data={block}
                        blockKeyName='parLimpezaNaoConformidadeModeloBlocoID'
                        setBlock={setBlock}
                        handleFileSelect={handleFileSelect}
                        handleRemoveFile={handleRemoveFile}
                        status={header.status.id}
                        disabled={header.status.id >= 40}
                    />
                )}

                <HistoricForm key={change} id={id} parFormularioID={5} />
            </div>
        </>
    )
}

export default FormLimpezaNC
