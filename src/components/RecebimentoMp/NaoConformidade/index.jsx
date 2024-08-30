import { useContext, useEffect, useState } from 'react'
import FormHeader from 'src/components/Defaults/FormHeader'
import HistoricForm from 'src/components/Defaults/HistoricForm'
import { AuthContext } from 'src/context/AuthContext'
import { ParametersContext } from 'src/context/ParametersContext'
import Header from './Header'
import ModelBlocks from './ModelBlocks'
import { useForm } from 'react-hook-form'
import { api } from 'src/configs/api'

const RecebimentoMpNaoConformidade = ({ id }) => {
    const type = id && id > 0 ? 'edit' : 'new'
    const { user, loggedUnity } = useContext(AuthContext)
    const { setTitle } = useContext(ParametersContext)
    const [header, setHeader] = useState(null)
    const [block, setBlock] = useState(null)
    const [change, setChange] = useState(false)

    const form = useForm({ mode: 'onChange' })

    const getData = async () => {
        try {
            const response = await api.post(`/formularios/recebimento-mp/nao-conformidade/getData`, {
                id,
                unidadeID: loggedUnity.unidadeID,
                papelID: user.papelID
            })
            console.log('🚀 ~ getData: ', response.data)
            form.reset(response.data)
            setHeader(response.data.header)
            setBlock(response.data.blocos)
        } catch (e) {
            console.log(e)
            return
        }
    }

    //* Envia o formulário mesmo havendo erros (salva rascunho)
    const customSubmit = e => {
        e.preventDefault()
        const values = form.getValues()
        onSubmit(values)
    }

    const onSubmit = values => {
        console.log('🚀 ~ onSubmit:', values)
    }

    useEffect(() => {
        setTitle({
            title: 'Não conformidade do Recebimento de MP',
            subtitle: {
                id: id,
                count: 1,
                new: false
            }
        })
        getData()
    }, [])

    return (
        <form onSubmit={e => customSubmit(e)} className='space-y-4'>
            <FormHeader
                btnCancel
                btnSave
                btnSend={user.papelID == 1 /*&& info.status >= 30 && !info.concluido*/}
                btnPrint={type == 'edit' ? true : false}
                // btnDelete
                // onclickDelete={() => setOpenModalDeleted(true)}
                // actionsData={actionsData}
                // actions
                handleSubmit={() => form.handleSubmit(onSubmit)}
                // handleSend={handleSendForm}
                iconConclusion={'mdi:check-bold'}
                titleConclusion={'Concluir Formulário'}
                title='Não conformidade do Recebimento de MP'
                // btnStatus={user.papelID == 1 && type == 'edit' ? true : false}
                // handleBtnStatus={() => setOpenModalStatus(true)}
                type={type}
                status={30}
                // setores={fieldsFooter?.setores ?? []}
            />

            {/* Header */}
            {header && <Header form={form} data={header} />}

            {/* Modelo com seus blocos */}
            {block && <ModelBlocks form={form} data={block} setBlock={setBlock} status={header.status} />}

            {/* Histórico de movimentações */}
            <HistoricForm
                key={change}
                id={id}
                parFormularioID={3} // Não conformidade do Recebimento de MP
            />
        </form>
    )
}

export default RecebimentoMpNaoConformidade
