import { Button, Card, CardContent, Grid, Typography } from '@mui/material'
import { api } from 'src/configs/api'
import Icon from 'src/@core/components/icon'
import { AuthContext } from 'src/context/AuthContext'
import FieldsFabrica from './FieldsFabrica'
import FieldsFornecedor from './FieldsFornecedor'
import FieldsFabricaConclusion from './FieldsFabricaConclusion'
import { useContext, useEffect, useState } from 'react'
import { add } from 'date-fns'
import { SettingsContext } from 'src/@core/context/settingsContext'
import { getCurrentTime } from 'src/configs/defaultConfigs'
import toast from 'react-hot-toast'
import DialogActs from 'src/components/Defaults/Dialogs/DialogActs'
import CardList from 'src/components/Defaults/Cards/CardList'
import CustomChip from 'src/@core/components/mui/chip'

const RecebimentoMpNaoConformidade = ({
    recebimentoMpID,
    values,
    info,
    getValues,
    register,
    control,
    setValue,
    errors
}) => {
    const { user, loggedUnity } = useContext(AuthContext)
    const { settings } = useContext(SettingsContext)
    const [change, setChange] = useState(false)
    const [models, setModels] = useState([])
    const [openSelectionModel, setOpenSelectionModel] = useState(false)

    const handlePreenchimentoFornecedor = () => {
        setChange(!change)
    }

    const handleNewNc = () => {
        if (models.length == 0) {
            toast.error(
                'Não há nenhum modelo de não conformidade cadastrado para esta unidade! Por favor cadastre em Configurações > Formulários.'
            )
            return
        }

        //? 1 modelo, seleciona automaticamente
        if (models.length == 1) {
            addNaoConformidade(models[0])
            return
        }

        //? Abre modal seleção do modelo de NC
        if (models.length > 1) {
            setOpenSelectionModel(true)
        }
    }

    const addNaoConformidade = model => {
        console.log('🚀 ~ model:', model)
        const naoConformidades = getValues('naoConformidade.itens')
        naoConformidades.push({
            parRecebimentoMpNaoConformidadeModeloID: model.parRecebimentoMpNaoConformidadeModeloID, //? id do modelo de NC
            modelo: {
                id: model.parRecebimentoMpNaoConformidadeModeloID,
                nome: model.nome
            },
            profissionalPreenchimento: null,
            produto: null,
            profissionalConclusao: null,
            data: new Date(),
            hora: getCurrentTime(),
            dataFornecedor: new Date(),
            horaFornecedor: getCurrentTime(),
            dataConclusao: new Date(),
            horaConclusao: getCurrentTime(),
            profissionaisOptions: {
                preenchimento: model.profissionaisOptions.preenchimento ?? [],
                conclusao: model.profissionaisOptions.conclusao ?? []
            },
            dynamicFields: model.dynamicFields
        })
        setValue('naoConformidade.itens', naoConformidades)
        setChange(!change)
        toast.success('Não conformidade inserida. Preencha os campos...')
    }

    const handleChangeStatus = (index, event) => {
        const naoConformidades = getValues('naoConformidade.itens')
        naoConformidades[index].status = event
        setValue('naoConformidade.itens', naoConformidades)
    }

    const getNcModels = async () => {
        try {
            const response = await api.get(
                `/formularios/recebimento-mp/getNaoConformidadeModels/${loggedUnity.unidadeID}`
            )
            setModels(response.data)
        } catch (error) {
            console.log('🚀 ~ getNcModels ~ error', error)
        }
    }

    const SelectModels = () => {
        return (
            <Grid container spacing={4}>
                {models &&
                    models.length > 0 &&
                    models.map((item, index) => (
                        <CardList
                            key={index}
                            xs={12}
                            md={6}
                            icon='fluent:form-multiple-48-regular'
                            title={item.nome}
                            action='select'
                            subtitle={`Ciclo de ${item.ciclo} dias`}
                            handleClick={() => {
                                addNaoConformidade(item), setOpenSelectionModel(false)
                            }}
                        />
                    ))}
            </Grid>
        )
    }

    useEffect(() => {
        getNcModels()
    }, [])

    return (
        <>
            <div className='flex flex-col gap-2'>
                <div
                    className={`${
                        settings.mode == 'dark' ? 'bg-[#4B3537]' : 'bg-[#F8E2E2]'
                    } p-5 rounded-xl border border-[#FF4D49] text-center`}
                >
                    <Typography color='error' variant='subtitle1' sx={{ fontWeight: 700 }}>
                        Plano de Ação
                    </Typography>
                </div>

                <Card>
                    <CardContent>
                        <Typography variant='subtitle1'>
                            Deve ser preenchido pelos colaboradores responsáveis pelas ações de monitoramento e/ou
                            verificação e/ou responsável pela execução da ação corretiva.
                        </Typography>
                    </CardContent>
                </Card>

                {getValues('naoConformidade.itens') &&
                    getValues('naoConformidade.itens').map((value, index) => (
                        <Card key={index}>
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <div className='flex items-center gap-2'>
                                    <Typography variant='subtitle1' color='error' sx={{ fontWeight: 700 }}>
                                        <div className='flex items-center gap-1'>
                                            <Icon icon='typcn:warning' color='#FF4D49' />
                                            <p>Não Conformidade {index + 1}</p>
                                        </div>
                                    </Typography>
                                    <CustomChip
                                        size='small'
                                        skin='light'
                                        label={value.modelo.nome}
                                        color='error'
                                        sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
                                    />
                                </div>
                                <FieldsFabrica
                                    key={index}
                                    index={index}
                                    value={value}
                                    handlePreenchimentoFornecedor={handlePreenchimentoFornecedor}
                                    getValues={getValues}
                                    info={info}
                                    papelID={user.papelID}
                                    produtos={values.produtos}
                                    register={register}
                                    control={control}
                                    setValue={setValue}
                                    errors={errors}
                                />

                                {/* Bloco preenchimento fornecedor */}
                                <FieldsFornecedor
                                    key={index}
                                    index={index}
                                    value={value}
                                    info={info}
                                    papelID={user.papelID}
                                    register={register}
                                    control={control}
                                    setValue={setValue}
                                    errors={errors}
                                />

                                {/* Bloco conclusão da fábrica */}
                                <FieldsFabricaConclusion
                                    key={index}
                                    index={index}
                                    value={value}
                                    info={info}
                                    papelID={user.papelID}
                                    register={register}
                                    control={control}
                                    setValue={setValue}
                                    handleChangeStatus={handleChangeStatus}
                                    errors={errors}
                                />
                            </CardContent>
                        </Card>
                    ))}

                {/* Botão inserir nova não conformidade */}
                {!info.concluido && user.papelID == 1 && (
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Button
                                variant='outlined'
                                color='primary'
                                onClick={handleNewNc}
                                startIcon={<Icon icon='material-symbols:add-circle-outline-rounded' />}
                                sx={{ mt: 2 }}
                            >
                                Inserir nova não conformidade
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </div>

            {/* Modal pra selecionar o modelo de NC */}
            <DialogActs
                title='Modelo de Não Conformidade'
                description='Selecione o modelo de não conformidade que deseja inserir. O mesmo pode ser gerenciado em Configurações > Formulários.'
                setOpenModal={setOpenSelectionModel}
                openModal={openSelectionModel}
            >
                <SelectModels />
            </DialogActs>
        </>
    )
}

export default RecebimentoMpNaoConformidade
