import { Text, View, StyleSheet } from '@react-pdf/renderer'

const Footer = () => {
    const styles = StyleSheet.create({
        footer: {
            position: 'absolute',
            bottom: 20,
            color: 'grey',
            width: '100vw',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 25,
            fontSize: 10
        }
    })

    return (
        <View fixed style={styles.footer}>
            <Text>
                Gerado em{' '}
                {new Date().toLocaleString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
            </Text>
            <Text render={({ pageNumber, totalPages }) => `${pageNumber}/${totalPages}`} />
        </View>
    )
}

export default Footer
