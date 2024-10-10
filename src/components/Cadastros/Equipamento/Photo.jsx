import { Avatar, FormControl, Grid, IconButton, Tooltip } from '@mui/material'
import Icon from 'src/@core/components/icon'
import React, { useContext, useRef } from 'react'
import { api } from 'src/configs/api'
import { AuthContext } from 'src/context/AuthContext'
import toast from 'react-hot-toast'

const Photo = ({ id, photo, setPhoto }) => {
    const { user, loggedUnity } = useContext(AuthContext)
    const fileInputRef = useRef(null)

    const handleFileClick = () => {
        fileInputRef.current.click()
    }

    const handleFileSelect = async event => {
        const selectedFile = event.target.files[0]
        if (selectedFile) {
            const formData = new FormData()
            formData.append('files[]', selectedFile)
            formData.append(`usuarioID`, user.usuarioID)

            //? Verifica se o arquivo é uma imagem
            const isImage = selectedFile.type.includes('image')
            if (!isImage) {
                toast.error('O arquivo selecionado não é uma imagem!')
                return
            }

            await api
                .post(`/cadastros/equipamento/photo-profile/${id}/${loggedUnity.unidadeID}/${user.usuarioID}`, formData)
                .then(response => {
                    setPhotoProfile(response.data)
                    toast.success('Foto atualizada com sucesso!')

                    //? Atualiza localstorage
                    const userData = JSON.parse(localStorage.getItem('userData'))
                    userData.imagem = response.data
                    localStorage.setItem('userData', JSON.stringify(userData))
                    //? Atualiza contexto
                    setUser(userData)
                })
                .catch(error => {
                    toast.error(error.response?.data?.message ?? 'Erro ao atualizar foto de perfil, tente novamente!')
                })
        }
    }

    const handleDeleteImage = async () => {
        try {
            await api.delete(`/cadastros/equipamento/photo-profile/${id}/${loggedUnity.unidadeID}/${user.usuarioID}`)
            setPhoto(null)
            toast.success('Foto removida com sucesso!')
        } catch (error) {
            console.log(error)
            toast.error('Erro ao remover foto, tente novamente!')
        }
    }

    return (
        <Grid
            item
            xs={12}
            md={12}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '180px',
                borderRadius: '8px'
            }}
        >
            {photo && (
                <Tooltip title='Apagar foto do perfil' placement='top'>
                    <IconButton
                        size='small'
                        sx={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            zIndex: '20',
                            color: 'white',
                            opacity: '0.8',
                            backgroundColor: '#FF4D49',
                            '&:hover': {
                                backgroundColor: '#FF4D49',
                                opacity: '1'
                            }
                        }}
                        onClick={handleDeleteImage}
                    >
                        <Icon icon='material-symbols:delete-outline' />
                    </IconButton>
                </Tooltip>
            )}

            <Tooltip title={photo ? 'Alterar foto' : 'Inserir foto'} placement='top'>
                <FormControl
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '100%'
                    }}
                >
                    <input type='file' ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileSelect} />
                    <Avatar
                        variant='rounded'
                        alt='Imagem do cabeçalho do relatório'
                        sx={{
                            width: '100%',
                            height: '100%',
                            cursor: 'pointer'
                        }}
                        onClick={handleFileClick}
                        src={photo ?? 'https://gedagro.com.br/images/report.png'}
                    />
                </FormControl>
            </Tooltip>
        </Grid>
    )
}

export default Photo
