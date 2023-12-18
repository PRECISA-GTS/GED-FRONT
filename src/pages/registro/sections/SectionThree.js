import { api } from 'src/configs/api'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import toast from 'react-hot-toast'
import Icon from 'src/@core/components/icon'
import { useAuth } from 'src/hooks/useAuth'
import 'react-credit-cards/es/styles-compiled.css'
import { useEffect, useState, useContext } from 'react'
import { validationEmail } from 'src/configs/validations'
import { NotificationContext } from 'src/context/NotificationContext'

const SectionThree = ({ handlePrev, dataGlobal, setDataGlobal }) => {
    const [rememberMe, setRememberMe] = useState(true)
    const [loadingConclusion, setLoadingConclusion] = useState(false)
    const auth = useAuth()
    const { createNewNotification } = useContext(NotificationContext)

    // Envia email confirmado o cadastro do novo fornecedor
    const sendMailNewFornecedor = () => {
        if (dataGlobal.sectionOne.email && validationEmail(dataGlobal.sectionOne.email)) {
            const data = {
                cnpj: dataGlobal.sectionOne.cnpj,
                nomeFornecedor: dataGlobal.sectionOne.nomeFantasia,
                destinatario: dataGlobal.sectionOne.email
            }
            api.post(`/registro-fornecedor/sendMailNewFornecedor`, { data })
                .then(response => {
                    toast.success('E-mail enviado com sucesso')
                })
                .catch(error => {
                    console.error('Erro ao enviar email', error)
                })
        }
    }

    //? Trata notificações
    const manageNotifications = (data) => {
        const dataCreateNotificationFactory = {
            titulo: 'Cadastro realizado com sucesso',
            descricao: `Olá ${data.factory.nomeFantasia}, o fornecedor ${dataGlobal.sectionOne.nomeFantasia} acabou de realizar o cadastro.`,
            url: null,
            urlID: null,
            tipoNotificacaoID: 1,
            usuarioGeradorID: null,
            usuarioID: 0,
            unidadeID: data.factory.unidadeID,
            papelID: 1 //? Notificação pra fábrica
        }
        const dataCreateNotificationSupplier = {
            titulo: 'Cadastro realizado com sucesso',
            descricao: `Olá ${dataGlobal.sectionOne.nomeFantasia}, seja bem-vindo(a) ao GEDagro!`,
            url: null,
            urlID: null,
            tipoNotificacaoID: 1,
            usuarioGeradorID: null,
            usuarioID: data.supplier.usuarioID,
            unidadeID: data.supplier.unidadeID,
        }
        // Envia notificação para o fornecedor após cadastro
        createNewNotification(dataCreateNotificationSupplier)
        // Envia notificação para a fábrica após cadastro
        createNewNotification(dataCreateNotificationFactory)
    }


    const handleSubmit = () => {
        setLoadingConclusion(true);
        // Salva o fornecedor no banco de dados
        api.post('/registro-fornecedor/registerNew', { data: dataGlobal })
            .then(response => {
                if (response.status === 201) {
                    toast.error(response.data.message);
                } else {
                    manageNotifications(response.data)
                    toast.success("Cadastro efetuado com sucesso!");
                    const { cnpj, senha: password } = dataGlobal?.sectionOne;
                    // Envia email para o fornecedor, contendo dados de acesso
                    sendMailNewFornecedor();
                    // Efetua login de forma automática após o cadastro
                    return auth.loginFornecedor({ cnpj, password, rememberMe });
                }
            })
            .then(() => {
                setTimeout(() => {
                    toast.success("Efetuando login no sistema");
                }, 2000);
            })
            .catch(error => {
                toast.error("Erro: " + error.message);
            })
            .finally(() => {
                setLoadingConclusion(false);
            });
    };

    useEffect(() => {
        const endereco = {
            logradouro: dataGlobal?.sectionTwo?.logradouro,
            numero: dataGlobal?.sectionTwo?.numero,
            complemento: dataGlobal?.sectionTwo?.complemento,
            bairro: dataGlobal?.sectionTwo?.bairro,
            cidade: dataGlobal?.sectionTwo?.cidade,
            uf: dataGlobal?.sectionTwo?.uf
        }
        const enderecoCompleto = Object.entries(endereco).map(([key, value]) => {
            if (value) {
                return `${value}, `;
            }
        }).join('').slice(0, -2) + '.'; // Remove a última vírgula e adiciona um ponto final
        setDataGlobal({
            ...dataGlobal,
            sectionThree: {
                endereco: enderecoCompleto
            }
        })
    }, [])

    return (
        <>
            <Box sx={{ mb: 4 }}>
                <Typography variant='h5'>Verifique as informações</Typography>
                <Typography sx={{ color: 'text.secondary' }}>Envie se estiver tudo certo</Typography>
            </Box>
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                            <Typography variant='caption' sx={{ color: 'text.secondary', }}>CNPJ</Typography>
                            <Typography sx={{ color: 'text.primary' }}>{dataGlobal?.sectionOne?.cnpj}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                            <Typography variant='caption' sx={{ color: 'text.secondary', }}>Nome Fantasia</Typography>
                            <Typography sx={{ color: 'text.primary' }}>{dataGlobal?.sectionOne?.nomeFantasia}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                            <Typography variant='caption' sx={{ color: 'text.secondary', }}>Razão Social</Typography>
                            <Typography sx={{ color: 'text.primary' }}>{dataGlobal?.sectionOne?.razaoSocial}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                            <Typography variant='caption' sx={{ color: 'text.secondary', }}>Email Institucional</Typography>
                            <Typography sx={{ color: 'text.primary' }}>{dataGlobal?.sectionOne?.email}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                            <Typography variant='caption' sx={{ color: 'text.secondary', }}>Telefone</Typography>
                            <Typography sx={{ color: 'text.primary' }}>{dataGlobal?.sectionTwo?.telefone}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                            <Typography variant='caption' sx={{ color: 'text.secondary', }}>Cep</Typography>
                            <Typography sx={{ color: 'text.primary' }}>{dataGlobal?.sectionTwo?.cep}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                            <Typography variant='caption' sx={{ color: 'text.secondary', }}>Endereço</Typography>
                            <Typography sx={{ color: 'text.primary' }}>{dataGlobal?.sectionThree?.endereco
                            }</Typography>
                        </Box>
                    </Box>

                    {/* Botoes de ação */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>
                        <Button
                            color='secondary'
                            variant='contained'
                            onClick={handlePrev}
                            startIcon={<Icon icon='mdi:chevron-left' fontSize={20} />}
                        >
                            Anterior
                        </Button>
                        <Button type='submit' onClick={handleSubmit} color='success' variant='contained' disabled={loadingConclusion} >
                            Concluir
                        </Button>
                    </Box>
                </Grid>
            </Grid >
        </>
    )
}

export default SectionThree
