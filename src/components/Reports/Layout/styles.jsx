import { StyleSheet } from '@react-pdf/renderer'

export const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFF',
        justifyContent: 'start',
        paddingTop: 15,
        paddingBottom: 30
    },
    title: {},

    header: {
        position: 'fixed',
        top: -10,
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

    content: {
        marginHorizontal: 10,
        fontSize: 11,
        padding: 15,
        flex: 1
    },

    footer: {
        position: 'absolute',
        bottom: 20,
        color: 'grey',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        fontSize: 10
    },

    // Text / Title
    blockTitle: {
        paddingVertical: 5
    },
    containerFields: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        paddingTop: 2
    },
    fields: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        paddingBottom: 4,
        paddingTop: 4
    },
    fieldTitle: {
        fontSize: 8,
        opacity: '0.8'
    },
    fieldValue: {
        fontSize: 10
    },

    // Separator
    separator: {
        height: '1px',
        width: '100%',
        borderBottom: '1px solid #ddd',
        clear: 'both'
    },

    // Table
    table: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #ddd',
        borderTop: '1px solid #ddd',
        borderBottom: '1px solid #ddd',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3
    },
    tableRed: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #ff625d',
        borderTop: '1px solid #ff625d',
        borderLeft: '1px solid #ff625d',
        borderBottom: '1px solid #ff625d',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3
    },

    tableTitle: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        fontSize: 8,
        backgroundColor: '#EEE',
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        borderLeft: '1px solid #ddd'
    },
    tableTitleRed: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        fontSize: 8,
        backgroundColor: '#f8e2e2',
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        borderLeft: '1px solid #f8e2e2'
    },
    tableTitlecolumn: {
        padding: 8
    },
    tableContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    tableContent: {
        padding: 8,
        borderLeft: '1px solid #ddd',
        borderTop: '1px solid #ddd'
    },
    tableContentRed: {
        paddingHorizontal: 8,
        paddingVertical: 0,
        borderLeft: '1px solid #f8e2e2',
        borderTop: '1px solid #f8e2e2'
    },
    tableContentcolumn: {
        fontSize: 9
    }
})
