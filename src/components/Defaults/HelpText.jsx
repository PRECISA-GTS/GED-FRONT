import * as React from 'react'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import Icon from 'src/@core/components/icon'
import { Typography } from '@mui/material'

const HelpText = ({ text, position, className }) => {
    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} arrow />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            border: '1px solid #65656E'
        }
    }))

    return (
        <HtmlTooltip
            title={
                <React.Fragment>
                    <Typography color='inherit'>{text}</Typography>
                </React.Fragment>
            }
            placement={position || 'top'}
        >
            <p className={className}>
                <Icon icon='clarity:help-solid' className='cursor-pointer text-base' />
            </p>
        </HtmlTooltip>
    )
}

export default HelpText
