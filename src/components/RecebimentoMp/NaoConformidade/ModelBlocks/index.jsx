import Block from 'src/components/Defaults/Formularios/Block'

const ModelBlocks = ({ form, data, setBlock, status, disabled, handleFileSelect, handleRemoveFile }) => {
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
                        handleFileSelect={handleFileSelect}
                        handleRemoveAnexoItem={handleRemoveFile}
                        status={status}
                        blocos={data}
                        disabled={disabled}
                    />
                ))}
        </>
    )
}

export default ModelBlocks
