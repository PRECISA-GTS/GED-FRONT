import { useContext, useEffect, useState } from 'react'
import FormHeader from 'src/components/Defaults/FormHeader'
import HistoricForm from 'src/components/Defaults/HistoricForm'
import { AuthContext } from 'src/context/AuthContext'
import { ParametersContext } from 'src/context/ParametersContext'
import Header from './Header'

import { useForm } from 'react-hook-form'
import { api } from 'src/configs/api'
import Router from 'next/router'
import toast from 'react-hot-toast'
import DialogFormConclusion from 'src/components/Defaults/Dialogs/DialogFormConclusion'
import DialogDelete from 'src/components/Defaults/Dialogs/DialogDelete'
import DialogReOpenForm from 'src/components/Defaults/Dialogs/DialogReOpenForm'
import { RouteContext } from 'src/context/RouteContext'
import CustomChip from 'src/@core/components/mui/chip'
import { toastMessage } from 'src/configs/defaultConfigs'
import { canConfigForm } from 'src/configs/functions'
import { checkErrorsBlocks, checkErrorsDynamicHeader, checkErrorStaticHeader, getErrors } from 'src/configs/checkErrors'
import HeaderModelDescription from '../Defaults/HeaderModelDescription'
import { ca } from 'date-fns/locale'
import ButtonOpenForm from '../Defaults/Buttons/ButtonOpenForm'
import ModelBlocks from '../Form/ModelBlocks'

const FormLimpeza = ({ id, modelID, form, header, block, setBlock }) => {
    const router = Router
    const type = id && id > 0 ? 'edit' : 'new'
    const { menu, user, loggedUnity, hasPermission } = useContext(AuthContext)
    const { setTitle } = useContext(ParametersContext)
    const [change, setChange] = useState(false)
    const [canApprove, setCanApprove] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [listErrors, setListErrors] = useState({ status: false, errors: [] })
    const [openDelete, setOpenDelete] = useState(false)
    const { setId } = useContext(RouteContext)

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
    }, [router.query?.aba])

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
