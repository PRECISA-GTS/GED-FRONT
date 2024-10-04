import Block from 'src/components/Defaults/Formularios/Block'

//blockKeyName: ex.: parLimpezaModeloBlocoID
const ModelBlocks = ({ form, blockKeyName, data, setBlock, status, disabled, handleFileSelect, handleRemoveFile }) => {
    return (
        <>
            {/* Blocos */}
            {data &&
                data.map((block, index) => (
                    <Block
                        form={form}
                        index={index}
                        bloco={block}
                        blockKey={blockKeyName}
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
