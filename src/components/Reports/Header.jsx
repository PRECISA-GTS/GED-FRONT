import { Text, View, Image } from '@react-pdf/renderer'
import React, { useEffect, useState } from 'react'
import { api, api_url } from 'src/configs/api'

const styles = {
    header: {
        position: 'fixed',
        top: 5,
        left: 0,
        right: 0,
        margin: '0 auto',
        fontSize: 12,
        height: 50,
        width: '92%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        textAlign: 'center'
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    image: {
        aspectRatio: 1,
        objectFit: 'contain',
        height: '100%',
        marginLeft: 'auto'
    }
}

const Header = ({ data: params }) => {
    const [data, setData] = useState([])

    const fetchData = async () => {
        try {
            console.log('aquii busca no backkk: ', api_url, params)
            const response = await api.post(`/relatorio/getHeader`, { unidadeID: params.user.unidadeID })
            console.log('🚀 ~ Header data:', response.data)
            setData(response.data)
        } catch (error) {
            console.error('Erro ao buscar os dados do cabeçalho:', params)
        }
    }

    useEffect(() => {
        fetchData()
    }, [params])

    return (
        <View style={styles.header}>
            {/* Vazio... */}
            <View style={{ width: '10%' }}>
                <Text></Text>
            </View>
            {/* Descrição */}
            <View
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 5
                }}
            >
                <Text style={[styles.title, styles.content, { width: '100%' }]}>
                    {data?.tituloRelatorio ?? 'Cabeçalho não definido'}
                </Text>
                <Text style={[styles.title, styles.content, { width: '60%', fontSize: 8 }]}>
                    {data?.endereco ?? 'Endereço não definido'}
                </Text>
                <Text
                    style={[styles.title, styles.content, { width: '100%', fontSize: 8 }]}
                >{`CNPJ: ${data?.cnpj}`}</Text>
            </View>
            {/* Imagem */}
            <View style={[styles.imageContainer, { width: '10%' }]}>
                {data?.url ? <Image src={data?.url} style={styles.image} /> : ''}
            </View>
        </View>
    )
}

export default Header
