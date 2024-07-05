import { Text, View } from '@react-pdf/renderer'
import React from 'react'
import { styles } from '../../../../Reports/styles'
import getData from 'src/components/Reports/Layout/getData'

const index = () => {
    const data = getData()
    console.log('🚀 ~ data report:', data.naoConformidades)

    const fornecedor = data?.header?.filter(row => row.name === 'Fornecedor')[0].value

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
                    <Text style={{ width: '100%', textAlign: 'center', fontSize: 12 }}>RECEBIMENTO MP</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 10 }}>
                        A empresa <Text>{data?.unidade}</Text> possui como norma de BPF a avaliação de seus fornecedores
                        quanto as matérias primas e ingredientes por estes fornecidos.
                    </Text>
                </View>
                Fornecedor
                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 10 }}>
                        Fornecedor: <Text style={{ fontWeight: 'bold', fontSize: 10 }}>{fornecedor}</Text>
                    </Text>
                </View>
                {/* Campos dinâmicos do header */}
                <View style={{ marginTop: 10 }}>
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
                {/* Produtos*/}
                <View style={[{ marginTop: 10 }]} key={index}>
                    <View style={styles.table}>
                        <View style={styles.tableTitle}>
                            <Text style={[styles.tableTitlecolumn, { width: '40%' }]}>Produto</Text>
                            <Text
                                style={[
                                    styles.tableTitlecolumn,
                                    {
                                        width: '20%',
                                        borderLeft: '1px solid #ddd'
                                    }
                                ]}
                            >
                                Quantidade
                            </Text>
                            <Text style={[styles.tableTitlecolumn, { width: '20%', borderLeft: '1px solid #ddd' }]}>
                                NF
                            </Text>
                            <Text style={[styles.tableTitlecolumn, { width: '20%', borderLeft: '1px solid #ddd' }]}>
                                Lote
                            </Text>
                        </View>
                        {data.produtos &&
                            data.produtos.map((row, index) => (
                                <View style={styles.tableContainer}>
                                    <View style={[styles.tableContent, { width: '40%' }]}>
                                        <Text style={styles.tableContentcolumn}>{row.produto}</Text>
                                    </View>
                                    <View style={[styles.tableContent, { width: '20%' }]}>
                                        <Text style={styles.tableContentcolumn}>
                                            {`${row.quantidade} ${row.unidadeMedida}` ?? ''}
                                        </Text>
                                    </View>
                                    <View style={[styles.tableContent, { width: '20%' }]}>
                                        <Text style={styles.tableContentcolumn}>{row.nf ?? ''}</Text>
                                    </View>
                                    <View style={[styles.tableContent, { width: '20%' }]}>
                                        <Text style={styles.tableContentcolumn}>{row.lote ?? ''}</Text>
                                    </View>
                                </View>
                            ))}
                    </View>
                </View>
                {/* Tabela contendo os itens por bloco */}
                {data.blocks?.map((block, index) => (
                    <View style={[block, { marginTop: 10 }]} key={index}>
                        <View style={styles.table}>
                            <View style={styles.tableTitle}>
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
                {/* Não conformidades */}
                {data.naoConformidades?.map((row, index) => (
                    <View style={[{ marginTop: 10 }]} key={index}>
                        <View style={styles.tableRed}>
                            <View style={styles.tableTitleRed}>
                                <Text style={[styles.tableTitlecolumn, { width: '100%' }]}>
                                    Não conformidade {index + 1} ({row.tipo == 1 ? 'Transporte' : 'Produto'})
                                </Text>
                            </View>

                            <View style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                                <View
                                    style={[
                                        styles.tableContentRed,
                                        { width: '100%', display: 'flex', flexDirection: 'row' }
                                    ]}
                                >
                                    <View style={[styles.fields, { width: '33%' }]}>
                                        <Text style={styles.fieldTitle}>Data de abertura</Text>
                                        <Text style={styles.fieldValue}>
                                            {row.dataFornecedor + ' ' + row.horaFornecedor ?? ''}
                                        </Text>
                                    </View>
                                    <View style={[styles.fields, { width: '33%' }]}>
                                        <Text style={styles.fieldTitle}>Data conclusão</Text>
                                        <Text style={styles.fieldValue}>
                                            {row.dataConclusao + ' ' + row.horaConclusao ?? ''}
                                        </Text>
                                    </View>
                                    <View style={[styles.fields, { width: '33%' }]}>
                                        <Text style={styles.fieldTitle}>Profissional preenchimento</Text>
                                        <Text style={styles.fieldValue}>{row.profissionalNomePreenchimento ?? ''}</Text>
                                    </View>
                                </View>
                                <View
                                    style={[
                                        styles.tableContentRed,
                                        { width: '100%', display: 'flex', flexDirection: 'row' }
                                    ]}
                                >
                                    <View style={[styles.fields, { width: '33%' }]}>
                                        <Text style={styles.fieldTitle}>Produto</Text>
                                        <Text style={styles.fieldValue}>{row.produtoNome ?? ''}</Text>
                                    </View>
                                    <View style={[styles.fields, { width: '33%' }]}>
                                        <Text style={styles.fieldTitle}>Observação</Text>
                                        <Text style={styles.fieldValue}>{row.obsFornecedor ?? ''}</Text>
                                    </View>
                                    <View style={[styles.fields, { width: '33%' }]}>
                                        <Text style={styles.fieldTitle}>Profissional preenchimento</Text>
                                        <Text style={styles.fieldValue}>{row.profissionalNomePreenchimento ?? ''}</Text>
                                    </View>
                                </View>
                                <View
                                    style={[
                                        styles.tableContentRed,
                                        { width: '100%', display: 'flex', flexDirection: 'row' }
                                    ]}
                                >
                                    <View style={[styles.fields, { width: '33%' }]}>
                                        <Text style={styles.fieldTitle}>Conclusão</Text>
                                        <Text style={styles.fieldValue}>{row.conclusao ?? ''}</Text>
                                    </View>
                                    <View style={[styles.fields, { width: '33%' }]}>
                                        <Text style={styles.fieldTitle}>Avaliação final</Text>
                                        <Text style={styles.fieldValue}>{row.data ?? ''}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        )
    )
}

export default index
