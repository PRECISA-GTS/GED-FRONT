import { Text, View } from '@react-pdf/renderer'
import React, { useEffect, useState } from 'react'
import { styles } from '../../../../components/Reports/styles'
import { api } from 'src/configs/api'
import { report } from 'process'
// import getDataContentReport from 'src/components/Reports/getDataContentReportOLD'
import { useGlobal } from 'src/hooks/useGlobal'

const Content = ({ values: params }) => {
    if (!params) return
    const [data, setData] = useState(null)

    const getData = async () => {
        console.log('🚀 ~~~ useGlobal Content:: ', params)
        // const response = await api.post(`relatorio/formularios/fornecedor/getContent`, params)
        const response = await api.post(`relatorio/formularios/fornecedor/getContent`, params)
        console.log('🚀 ~ getData response.data:', response.data)
        setData(response.data)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        data && (
            <View style={{ width: '100%' }}>
                <View
                    style={{
                        padding: 3,
                        backgroundColor: '#eee',
                        marginTop: 20,
                        border: '1px solid #ddd'
                    }}
                >
                    <Text style={{ width: '100%', textAlign: 'center', fontSize: 12 }}>
                        QUALIFICAÇÃO DE FORNECEDORESSS
                    </Text>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 10 }}>
                        A empresa <Text>{data?.unidade}</Text> possui como norma de BPF a avaliação de seus fornecedores
                        quanto as matérias primas e ingredientes por estes fornecidos.
                    </Text>
                </View>
                Fornecedor
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 10 }}>
                        Fornecedor: <Text style={{ fontWeight: 'bold', fontSize: 10 }}>{data.fornecedor}</Text>
                    </Text>
                </View>
                {/* Produtos */}
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 10 }}>
                        {data?.produtos?.length > 1 ? 'Produtos fornecidos: ' : 'Produto fornecido: '}
                        {data?.produtos?.map((row, index) => (
                            <Text key={index}>
                                <Text style={{ fontWeight: 'bold', fontSize: 10 }}>{row.produtos}</Text>
                                {index !== data.produtos.length - 1 && ', '}
                            </Text>
                        ))}
                    </Text>
                </View>
                {/* Campos dinâmicos do header */}
                <View style={{ marginTop: 20 }}>
                    <View style={styles.containerFields}>
                        {data.header?.map((field, index) => (
                            <>
                                <View style={[styles.fields, { width: '33%' }]}>
                                    <Text style={styles.fieldTitle}>{field.name ?? ''}</Text>
                                    <Text style={styles.fieldValue}>{field.value ?? ''}</Text>
                                </View>
                                {(index + 1) % 3 === 0 && <View style={styles.separator} />}
                            </>
                        ))}
                    </View>
                </View>
                {/* Tabela contendo os itens por bloco */}
                {data.blocks?.map((block, index) => (
                    <View style={[block, { marginTop: 30 }]} key={index}>
                        {/* <Text style={[styles.blockTitle, { paddingTop: 20 }]}>{block.nome}</Text> */}
                        <View style={styles.table}>
                            <View style={styles.tableTitle}>
                                {/* <Text style={[styles.tableTitlecolumn, { width: '60%' }]}>Item</Text> */}
                                <Text style={[styles.tableTitlecolumn, { width: '60%' }]}>{block.nome}</Text>
                                <Text
                                    style={[
                                        styles.tableTitlecolumn,
                                        {
                                            width: '20%',
                                            borderLeft: '1px solid #ddd'
                                        }
                                    ]}
                                >
                                    Resposta
                                </Text>
                                <Text style={[styles.tableTitlecolumn, { width: '20%', borderLeft: '1px solid #ddd' }]}>
                                    Observação
                                </Text>
                            </View>
                            {block.itens.map((item, index) => (
                                <View style={styles.tableContainer}>
                                    <View style={[styles.tableContent, { width: '60%' }]}>
                                        <Text style={styles.tableContentcolumn}>{item.nome}</Text>
                                    </View>
                                    <View style={[styles.tableContent, { width: '20%' }]}>
                                        <Text style={styles.tableContentcolumn}>{item.resposta ?? ''}</Text>
                                    </View>
                                    <View style={[styles.tableContent, { width: '20%' }]}>
                                        <Text style={styles.tableContentcolumn}>{item.obsResposta ?? ''}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                ))}
            </View>
        )
    )
}

export default Content
