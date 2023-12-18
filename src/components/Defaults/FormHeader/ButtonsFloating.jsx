import { Tooltip, Fab } from '@mui/material'
const ButtonsFloating = ({ isVisible, dataButtons, btnSave, btnPrint, matches, routes, currentUrl }) => {
    return (
        <div
            className={`
                        ${
                            isVisible ? 'fadeIn' : 'hidden'
                        } trasition duration-200 fixed bottom-10 right-8 z-50 flex flex-col-reverse gap-3
                    `}
        >
            {/*  Oculta o botão de salvar se o usuário não tiver permissão para editar */}
            {dataButtons.map(item => {
                if (item.id === 1 && (!btnSave || !routes.find(route => route.rota === currentUrl && route.editar))) {
                    return null
                }
                if (item.id === 2 && !matches) {
                    return null
                }

                if (item.id === 2 && !btnPrint) {
                    return null
                }

                return (
                    <Tooltip title={item.title} key={item.id} placement='left'>
                        <div key={item.id}>
                            <Fab
                                color={item.color}
                                size='large'
                                onClick={item.function}
                                variant='contained'
                                type={item.type}
                                disabled={item.disabled}
                            >
                                {item.icon}
                            </Fab>
                        </div>
                    </Tooltip>
                )
            })}
        </div>
    )
}

export default ButtonsFloating
