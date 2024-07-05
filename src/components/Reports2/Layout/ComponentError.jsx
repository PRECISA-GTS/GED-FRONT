import { Page, Text, View } from '@react-pdf/renderer'

const ComponentError = () => {
    return (
        <Page size='A4'>
            <View>
                <Text
                    style={{
                        color: 'red',
                        fontSize: 20,
                        padding: 10
                    }}
                >
                    Erro ao carregar o relatório. Entre em contato com o suporte.
                </Text>
            </View>
        </Page>
    )
}

export default ComponentError
