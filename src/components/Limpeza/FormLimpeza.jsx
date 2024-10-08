import { useContext, useEffect, useState } from 'react'
import HistoricForm from 'src/components/Defaults/HistoricForm'
import { AuthContext } from 'src/context/AuthContext'
import { ParametersContext } from 'src/context/ParametersContext'
import Header from './Header'
import { api } from 'src/configs/api'
import Router from 'next/router'
import toast from 'react-hot-toast'
import HeaderModelDescription from '../Defaults/HeaderModelDescription'
import ButtonOpenForm from '../Defaults/Buttons/ButtonOpenForm'
import ModelBlocks from '../Form/ModelBlocks'

const FormLimpeza = ({ id, form, header, block, setBlock, onSubmit }) => {
    const router = Router
    const type = id && id > 0 ? 'edit' : 'new'
    const { user, loggedUnity } = useContext(AuthContext)
    const { setTitle } = useContext(ParametersContext)
    const [change, setChange] = useState(false)

    const handleFileSelect = async (event, item) => {
        const selectedFile = event.target.files
        if (selectedFile && selectedFile.length > 0) {
            const formData = new FormData()
            for (let i = 0; i < selectedFile.length; i++) {
                formData.append('files[]', selectedFile[i])
            }
            formData.append(`usuarioID`, user.usuarioID)
            formData.append(`unidadeID`, loggedUnity.unidadeID)
            formData.append(`parLimpezaModeloBlocoID`, item.parLimpezaModeloBlocoID ?? null)
            formData.append(`itemOpcaoAnexoID`, item.itemOpcaoAnexoID ?? null)

            await api
                .post(`/formularios/limpeza/saveAnexo/${id}/item/${user.usuarioID}/${loggedUnity.unidadeID}`, formData)
                .then(response => {
                    console.log('handleFileSelect...')
                    //* Submete formulário pra atualizar configurações dos itens
                    onSubmit(form.getValues())
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
                    `/formularios/recebimento-mp/nao-conformidade/deleteAnexo/${id}/${item.anexoID}/${loggedUnity.unidadeID}/${user.usuarioID}/item`
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
                    // getData()
                })
        }
    }

    useEffect(() => {
        setTitle({
            icon: 'carbon:clean',
            title: 'Limpeza e Higienização',
            subtitle: {
                id: id,
                count: 1,
                new: false
            }
        })
    }, [id, loggedUnity, router.query?.aba])

    return (
        header && (
            <>
                <div className='space-y-2'>
                    <HeaderModelDescription description={header.modelo.cabecalho} />
                    <Header form={form} data={header} disabled={header.status?.id >= 40} />

                    {type === 'new' && <ButtonOpenForm />}

                    {type === 'edit' && (
                        <ModelBlocks
                            form={form}
                            data={block}
                            blockKeyName='parLimpezaModeloBlocoID'
                            setBlock={setBlock}
                            handleFileSelect={handleFileSelect}
                            handleRemoveFile={handleRemoveFile}
                            status={header.status.id}
                            disabled={header.status.id >= 40}
                        />
                    )}

                    <HistoricForm key={change} id={id} parFormularioID={4} />
                </div>
            </>
        )
    )
}

export default FormLimpeza
