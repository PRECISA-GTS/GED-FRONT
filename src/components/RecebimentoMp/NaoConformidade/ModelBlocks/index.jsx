import Block from 'src/components/Defaults/Formularios/Block'

const ModelBlocks = ({ form, data, setBlock, status, disabled }) => {
    console.log('🚀 ~ disabled:', disabled)
    return (
        <>
            {/* Blocos */}
            {data &&
                data.map((block, index) => (
                    <Block
                        form={form}
                        index={index}
                        bloco={block}
                        blockKey={`parRecebimentoMpNaoConformidadeModeloBlocoID`}
                        setBlocos={setBlock}
                        status={status}
                        blocos={data}
                        disabled={disabled}
                    />
                ))}
        </>
    )
}

export default ModelBlocks
