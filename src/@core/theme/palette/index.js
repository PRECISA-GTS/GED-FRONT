// Tema do sistema/ Cores do sistema/ Themes/ Colors

const DefaultPalette = (mode, skin) => {
    // ** Vars
    const whiteColor = '#FFF'
    const lightColor = '76, 78, 100'
    const darkColor = '234, 234, 255'
    const mainColor = mode === 'light' ? lightColor : darkColor

    const defaultBgColor = () => {
        if (skin === 'bordered' && mode === 'light') {
            return whiteColor
        } else if (skin === 'bordered' && mode === 'dark') {
            return '#161c24'
        } else if (mode === 'light') {
            return '#F7F7F9'
        } else return '#161c24'
    }

    return {
        customColors: {
            dark: darkColor,
            main: mainColor,
            light: lightColor,
            darkBg: '#212b36',
            lightBg: '#212b36',
            bodyBg: mode === 'light' ? '#35553b' : '#21272f',
            trackBg: mode === 'light' ? '#35553b' : '#21272f',
            tooltipBg: mode === 'light' ? '#262732' : '#212b36',
            tableHeaderBg: mode === 'light' ? '#F5F5F7' : '#21272f',
            disabledBg: mode === 'light' ? '#F7F7F9' : '#21272f',

        },
        mode: mode,
        common: {
            black: '#000',
            white: whiteColor
        },
        primary: {
            light: '#4a8b57',
            main: '#4a8b57',
            bg: mode === 'light' ? '#cde9e2' : '#123230',
            dark: '#35553b',
            contrastText: whiteColor
        },
        secondary: {
            light: '#7F889B',
            main: '#6D788D',
            dark: '#606A7C',
            contrastText: whiteColor
        },
        error: {
            light: '#FF625F',
            main: '#FF4D49',
            dark: '#E04440',
            contrastText: whiteColor
        },
        warning: {
            light: '#FDBE42',
            main: '#FDB528',
            dark: '#DF9F23',
            contrastText: whiteColor
        },
        info: {
            light: '#40CDFA',
            main: '#26C6F9',
            dark: '#21AEDB',
            minOpacity: 0.5,
            contrastText: whiteColor
        },
        success: {
            light: '#83E542',
            main: '#72E128',
            dark: '#64C623',
            contrastText: whiteColor
        },
        rocket: {
            light: '#6a48b9',
            main: '#6a48b9',
            dark: '#6a48b9',
            contrastText: whiteColor
        },
        grey: {
            50: '#FAFAFA',
            100: '#F5F5F5',
            200: '#EEEEEE',
            300: '#E0E0E0',
            400: '#BDBDBD',
            500: '#9E9E9E',
            600: '#757575',
            700: '#616161',
            800: '#424242',
            900: '#212121',
            A100: '#F5F5F5',
            A200: '#EEEEEE',
            A400: '#BDBDBD',
            A700: '#616161'
        },
        text: {
            primary: `rgba(${mainColor}, 0.95)`,
            secondary: `rgba(${mainColor}, 0.6)`,
            disabled: `rgba(${mainColor}, 0.95)`,
            opacity: `rgba(${mainColor}, 0.4)`
        },
        divider: mode === 'dark' ? '#373f48' : '#EBEBEB',
        background: {
            paper: mode === 'light' ? whiteColor : '#212b36', //! bg content
            default: defaultBgColor()
        },
        action: {
            active: `rgba(${mainColor}, 0.14)`,
            hover: mode === 'light' ? '#e5e7eb' : '#123230',
            hoverOpacity: 0.05,
            selected: `rgba(${mainColor}, 0.08)`,
            disabled: `rgba(${mainColor}, 0.26)`,
            disabledBackground: `rgba(${mainColor}, 0.12)`,
            focus: `rgba(${mainColor}, 0.12)`
        }
    }
}

export default DefaultPalette
