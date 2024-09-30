import { useEffect, useContext, useState } from 'react'
import { api } from 'src/configs/api'
import Table from 'src/components/Defaults/Table'
import { ParametersContext } from 'src/context/ParametersContext'
import { AuthContext } from 'src/context/AuthContext'
import Loading from 'src/components/Loading'
import { useRouter } from 'next/router'
import { configColumns } from 'src/configs/defaultConfigs'
import { useFilter } from 'src/context/FilterContext'
import Filters from '../../Filters'
import DialogActs from 'src/components/Defaults/Dialogs/DialogActs'
import NewContent from 'src/components/Limpeza/NaoConformidade/NewContent'
import { useForm } from 'react-hook-form'
import { RouteContext } from 'src/context/RouteContext'

const ListNaoConformidade = () => {
    const { user, loggedUnity } = useContext(AuthContext)
    const router = useRouter()
    const { setModelID, setLimpezaID } = useContext(RouteContext)
    const currentLink = router.pathname
    const { setTitle } = useContext(ParametersContext)
    const { startFilter, setFilteredDataLimpeza, filteredDataLimpeza, setDataLimpeza } = useFilter()
    const [openNew, setOpenNew] = useState(false)
    const [status, setStatus] = useState({
        module: 'limpeza-nao-conformidade',
        type: 'open'
    })

    const form = useForm({ mode: 'onChange' })

    const getList = async () => {
        await api
            .post(`/formularios/limpeza/nao-conformidade/getList`, {
                unidadeID: loggedUnity.unidadeID,
                papelID: user.papelID,
                usuarioID: user.usuarioID,
                status
            })
            .then(response => {
                setFilteredDataLimpeza(response.data)
                setDataLimpeza(response.data)
                setTitle({
                    title: 'Não Conformidades da Limpeza e Higienização',
                    icon: 'typcn:warning-outline',
                    subtitle: {
                        id: null,
                        count: response.data.length,
                        new: false
                    }
                })
            })
    }

    const handleNew = () => {
        //? Seta Limpeza e Modelo (contexto) selecionados pra enviar pra NOVO
        const values = form.getValues('new')
        setLimpezaID(values.limpeza.id)
        setModelID(values.modelo.id)
        router.push(`/formularios/limpeza/novo/?aba=nao-conformidade`)
    }

    useEffect(() => {
        getList()
        startFilter(<Filters />, false)
    }, [router.query, status])

    const arrColumns = [
        {
            headerName: 'ID',
            field: 'id',
            size: 0.1
        },
        {
            headerName: 'Data',
            field: 'data',
            size: 0.7,
            type: 'date'
        },
        {
            headerName: 'Limpeza e Higienização',
            field: 'limpezaID',
            size: 1
        },
        {
            headerName: 'Equipamentos',
            field: 'equipamentos',
            size: 1
        },
        {
            headerName: 'Status',
            field: {
                name: 'status',
                cor: 'cor'
            },
            size: 1,
            type: 'statusSteps'
        }
    ]

    const columns = configColumns(currentLink, arrColumns)

    return (
        <>
            {!filteredDataLimpeza ? (
                <Loading show />
            ) : (
                <Table
                    key={filteredDataLimpeza}
                    result={filteredDataLimpeza}
                    columns={columns}
                    btnNew={false}
                    btnNewModal={user.papelID === 1 ? true : false}
                    handleNewModal={() => setOpenNew(true)}
                    status={status}
                    setStatus={setStatus}
                />
            )}

            {/* Modal pra inserir nova NC */}
            <DialogActs
                title='Nova Não Conformidade'
                handleConclusion={handleNew}
                size='lg'
                setOpenModal={setOpenNew}
                openModal={openNew}
            >
                <NewContent form={form} type='list' data={null} />
            </DialogActs>
        </>
    )
}

export default ListNaoConformidade
