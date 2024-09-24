import { Card, CardContent } from '@mui/material'
import { convertNewLinesToBr } from 'src/configs/functions'

const HeaderModelDescription = ({ description }) => {
    return (
        description && (
            <Card>
                <CardContent>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: convertNewLinesToBr(description)
                        }}
                    />
                </CardContent>
            </Card>
        )
    )
}

export default HeaderModelDescription
