import { useEffect, useState, useContext } from 'react'
import { api } from 'src/configs/api'
import Table from 'src/components/Defaults/Table'
import FormFornecedor from 'src/components/Fornecedor/FormFornecedor'
import { ParametersContext } from 'src/context/ParametersContext'
import { RouteContext } from 'src/context/RouteContext'
import { AuthContext } from 'src/context/AuthContext'
import DialogActs from 'src/components/Defaults/Dialogs/DialogActs'
import toast from 'react-hot-toast'
import Loading from 'src/components/Loading'

// ** Next
import { useRouter } from 'next/router'

// ** Configs
import { configColumns } from 'src/configs/defaultConfigs'
import NewFornecedor from 'src/components/Fornecedor/Dialogs/NewFornecedor'
import FormFornecedorConclusion from 'src/components/Fornecedor/Dialogs/NewFornecedor/FormFornecedorConclusion'
import { FornecedorContext } from 'src/context/FornecedorContext'
import { useFilter } from 'src/context/FilterContext'
import Filters from './Filters'

const Fornecedor = () => {
    const { user, loggedUnity } = useContext(AuthContext)
    const router = useRouter()
    const currentLink = router.pathname
    const { setTitle } = useContext(ParametersContext)
    const { id, setId } = useContext(RouteContext)

    //? Controles novo fornecedor
    const [open, setOpen] = useState(false)
    const [openModalConclusion, setOpenModalConclusion] = useState(false)
    const [responseConclusion, setResponseConclusion] = useState(null)
    const [isNotFactory, setIsNotFactory] = useState(false)
    const { isCpf, setIsCpf } = useContext(FornecedorContext)

    const {
        form,
        dataSupplier,
        startFilter,
        SelectFilterByName,
        setFilteredDataSupplier,
        filteredDataSupplier,
        setDataSupplier,
        setKey,
        key
    } = useFilter()

    //* Controles modal pra inserir fornecedor
    const openModal = () => {
        setOpen(true)
    }

    const getList = async () => {
        console.log('getList')
        try {
            const response = await api.post(`${currentLink}/getList/`, {
                unidadeID: loggedUnity.unidadeID,
                papelID: user.papelID,
                cnpj: user.cnpj ? user.cnpj : null
            })

            if (!response.data) return

            setFilteredDataSupplier(response.data)
            setDataSupplier(response.data)
            setTitle({
                icon: 'mdi:truck-fast-outline',
                title: 'Fornecedor',
                subtitle: {
                    id: id,
                    count: response.data.length,
                    new: false
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    //? handleSubmit do modal de gerar um novo fornecedor
    const makeFornecedor = async values => {
        try {
            const data = {
                usuarioID: user.usuarioID,
                papelID: user.papelID,
                profissionalID: user.profissionalID,
                unidadeID: loggedUnity.unidadeID,
                values: values.fields,
                habilitaQuemPreencheFormFornecedor: values.habilitaQuemPreencheFormFornecedor,
                fornecedorCategoriaID: values.fields?.categoria?.fornecedorCategoriaID,
                fornecedorCategoriaRiscoID: values.fields?.risco?.fornecedorCategoriaRiscoID,
                isCpf
            }
            console.log('🚀 ~ onSubmit:', data)

            setOpen(false)
            const response = await api.post(`/formularios/fornecedor/makeFornecedor`, data)

            if (response.status == 200) {
                toast.success(response.data.message)
                if (isNotFactory) {
                    setOpenModalConclusion(true)
                    setResponseConclusion(response.data.result)
                    getList()
                } else {
                    setId(response.data.result.fornecedorID)
                }
            }
        } catch (err) {
            console.error('Erro ao enviar email', err)
        }
    }

    const copyLink = () => {
        const link = responseConclusion?.link
        if (link) {
            navigator.clipboard.writeText(link)
            toast.success('Link copiado com sucesso!')
        }
    }

    useEffect(() => {
        setFilteredDataSupplier([])
        setDataSupplier([])
    }, [router.query])

    // const filterRouteByStatus = async status => {
    //     let filtered = dataSupplier.filter(row => {
    //         return row.status == status
    //     })
    //     setFilteredDataSupplier(filtered)
    //     setTimeout(() => {
    //         setKey(!key)
    //     }, 1200)
    // }

    useEffect(() => {
        getList()
        startFilter(<Filters />)
    }, [id, router.query])

    const arrColumns =
        user.papelID == 1
            ? [
                  {
                      headerName: 'ID',
                      field: 'id',
                      size: 0.2
                  },
                  {
                      headerName: 'Data da Avaliação',
                      field: 'data',
                      size: 0.7,
                      type: 'date'
                  },
                  {
                      headerName: 'Fornecedor',
                      field: 'fornecedor',
                      size: 2
                  },
                  {
                      headerName: 'Produtos',
                      field: 'produtos',
                      size: 1
                  },
                  {
                      headerName: 'Quem preenche',
                      field: 'quemPreenche',
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
            : user.papelID == 2
            ? [
                  {
                      headerName: 'ID',
                      field: 'id',
                      size: 1
                  },
                  {
                      headerName: 'Data da Avaliação',
                      field: 'data',
                      size: 1,
                      type: 'date'
                  },
                  {
                      headerName: 'Fábrica',
                      field: 'fabrica',
                      size: 1
                  },
                  {
                      headerName: 'Produtos',
                      field: 'produtos',
                      size: 1
                  },
                  {
                      headerName: 'Responsável',
                      field: 'responsavel',
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
            : []

    const columns = configColumns(currentLink, arrColumns)

    return (
        <>
            {/* Exibe loading enquanto não existe result */}
            {!filteredDataSupplier ? (
                <Loading show />
            ) : //? Se tem id, exibe o formulário
            id && id > 0 ? (
                <FormFornecedor id={id} makeFornecedor={makeFornecedor} />
            ) : (
                //? Lista tabela de resultados da listagem
                <Table
                    key={`${key}-${filteredDataSupplier}`}
                    result={filteredDataSupplier}
                    columns={columns}
                    openModal={user.papelID == 1 ? openModal : null}
                    btnNew={user.papelID == 1 ? true : false}
                />
            )}

            {/* Modal pra habilitar um novo fornecedor */}
            <DialogActs
                title='Habilitar Fornecedor'
                handleConclusion={makeFornecedor}
                setOpenModal={setOpen}
                openModal={open}
                size='lg'
                fullHeight
                clone
            >
                <NewFornecedor setIsNotFactory={setIsNotFactory} isNotFactory={isNotFactory} />
            </DialogActs>

            {/* Modal que exibe mensagem de novo fornecedor habilitado */}
            <DialogActs
                title='Formulário enviado ao fornecedor'
                description='Um novo formulário de qualificação de fornecedor foi enviado'
                handleCopyLink={copyLink}
                setOpenModal={setOpenModalConclusion}
                openModal={openModalConclusion}
            >
                <div>
                    <FormFornecedorConclusion values={responseConclusion} />
                </div>
            </DialogActs>
        </>
    )
}

export default Fornecedor
