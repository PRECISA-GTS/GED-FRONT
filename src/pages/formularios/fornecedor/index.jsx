import { useEffect, useState, useContext } from 'react'
import Router from 'next/router'
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
import { useFornecedor } from 'src/context/FornecedorContext'

const Fornecedor = () => {
    const { user, loggedUnity } = useContext(AuthContext)
    const [result, setResult] = useState(null)
    const router = useRouter()
    const currentLink = router.pathname
    const { setTitle } = useContext(ParametersContext)
    const { id, setId } = useContext(RouteContext)

    //? Controles novo fornecedor
    const [open, setOpen] = useState(false)
    const [openModalConclusion, setOpenModalConclusion] = useState(false)
    const [responseConclusion, setResponseConclusion] = useState(null)
    const { isNotFactory } = useFornecedor()

    //* Controles modal pra inserir fornecedor
    const openModal = () => {
        setOpen(true)
    }

    const getList = async () => {
        try {
            const response = await api.post(`${currentLink}/getList/`, {
                unidadeID: loggedUnity.unidadeID,
                papelID: user.papelID,
                cnpj: user.cnpj ? user.cnpj : null
            })
            setResult(response.data)
            setTitle({
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
            const response = await api.post(`/formularios/fornecedor/makeFornecedor`, {
                usuarioID: user.usuarioID,
                papelID: user.papelID,
                profissionalID: user.profissionalID,
                unidadeID: loggedUnity.unidadeID,
                values: values.fields,
                habilitaQuemPreencheFormFornecedor: values.habilitaQuemPreencheFormFornecedor
            })

            if (response.status == 200) {
                toast.success(response.data.message)
                if (isNotFactory) {
                    setOpenModalConclusion(true)
                    setResponseConclusion(response.data.result)
                    getList()
                } else {
                    setId(response.data.fornecedorID)
                }
            }
        } catch (err) {
            console.error(err)
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

    const handleLink = link => {
        if (link) {
            router.push(link)
            toast.success('Link copiado com sucesso!')
        }
    }

    useEffect(() => {
        getList()
    }, [id])

    // verifica se tem f na rota, se estiver ja direciona para o formulario do id correspondente
    useEffect(() => {
        if (router.query.f) setId(router.query.f)
    }, [router.query])

    const arrColumns =
        user.papelID == 1
            ? [
                  {
                      headerName: 'ID',
                      field: 'id',
                      size: 0.2
                  },
                  {
                      headerName: 'Fornecedor',
                      field: 'fornecedor',
                      size: 2
                  },
                  {
                      headerName: 'CNPJ',
                      field: 'cnpj',
                      size: 1
                  },
                  {
                      headerName: 'Data da Avaliação',
                      field: 'data',
                      size: 0.7,
                      type: 'date'
                  },
                  {
                      headerName: 'Cidade',
                      field: 'cidade',
                      size: 1
                  },
                  {
                      headerName: 'Quem preenche',
                      field: 'quemPreenche',
                      //   field: {
                      //       name: 'quemPreenche',
                      //       cor: 'red'
                      //   },
                      size: 1
                  },
                  {
                      headerName: 'Status',
                      field: {
                          name: 'status',
                          cor: 'cor'
                      },
                      size: 1
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
                      headerName: 'Fábrica',
                      field: 'fabrica',
                      size: 1
                  },
                  {
                      headerName: 'CNPJ',
                      field: 'cnpj',
                      size: 1
                  },
                  {
                      headerName: 'Data da Avaliação',
                      field: 'data',
                      size: 1,
                      type: 'date'
                  },
                  {
                      headerName: 'Cidade',
                      field: 'cidade',
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
                      size: 1
                  }
              ]
            : []

    const columns = configColumns(currentLink, arrColumns)

    return (
        <>
            {/* Exibe loading enquanto não existe result */}
            {!result ? (
                <Loading show />
            ) : //? Se tem id, exibe o formulário
            id && id > 0 ? (
                <FormFornecedor id={id} makeFornecedor={makeFornecedor} />
            ) : (
                //? Lista tabela de resultados da listagem
                <Table
                    result={result}
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
            >
                <NewFornecedor />
            </DialogActs>

            {/* Modal que exibe mensagem de novo fornecedor habilitado */}
            <DialogActs
                title='Formulário enviado ao fornecedor'
                description='Um novo formulário de qualificação de fornecedor foi enviado'
                handleCopyLink={copyLink}
                setOpenModal={setOpenModalConclusion}
                openModal={openModalConclusion}
            >
                <FormFornecedorConclusion values={responseConclusion} />
            </DialogActs>
        </>
    )
}

export default Fornecedor
