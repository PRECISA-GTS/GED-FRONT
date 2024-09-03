import Block from 'src/components/Defaults/Formularios/Block'

const ModelBlocks = ({ form, data, setBlock, status, disabled }) => {
    console.log('🚀 ~ Block:', data)

    return (
        <>
            {/* Blocos */}
            {data &&
                data.map((block, index) => (
                    <Block
                        index={index}
                        bloco={block}
                        blockKey={`parRecebimentoMpNaoConformidadeModeloBlocoID`}
                        setBlocos={setBlock}
                        status={status}
                        blocos={data}
                        disabled={disabled}
                        setValue={form.setValue}
                        getValues={form.getValues}
                        register={form.register}
                        control={form.control}
                        errors={form.errors?.blocos}
                        // handleFileSelect={handleFileSelectItem}
                        // handleRemoveAnexoItem={handleRemoveAnexoItem}
                    />
                ))}
        </>
    )
}

export default ModelBlocks
