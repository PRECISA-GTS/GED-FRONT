import { Grid } from '@mui/material'

const ProductInfo = ({ value }) => {
    return (
        <>
            <Grid item xs={12} md={2}>
                <label className='opacity-60'>Quantidade</label>
                <p>{value.quantidade}</p>
            </Grid>
            <Grid item xs={12} md={2}>
                <label className='opacity-60'>Data Fabricação</label>
                <p>{value.dataFabricacao}</p>
            </Grid>
            <Grid item xs={12} md={2}>
                <label className='opacity-60'>Nº Lote</label>
                <p>{value.lote}</p>
            </Grid>
            <Grid item xs={12} md={2}>
                <label className='opacity-60'>Apresentação</label>
                <p>{value.apresentacao.nome}</p>
            </Grid>
            <Grid item xs={12} md={2}>
                <label className='opacity-60'>Data de validade</label>
                <p>{value.dataValidade}</p>
            </Grid>
        </>
    )
}

export default ProductInfo
