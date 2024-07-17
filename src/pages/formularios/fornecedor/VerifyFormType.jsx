import React, { useEffect, useState } from 'react'
import Router from 'next/router'

import FormFornecedor from 'src/components/Fornecedor/FormFornecedor'
import { api } from 'src/configs/api'
import InitialSteps from './InitialSteps'

const VerifyFormType = ({ id, makeFornecedor }) => {
    const router = Router
    const staticUrl = router.pathname
    const [hasModel, setHasModel] = useState(false)

    const verifyIfHasModel = async () => {
        const response = await api.get(`${staticUrl}/verifyIfHasModel/${id}`)
        if (response.data && response.data.hasModel) {
            setHasModel(true)
        }
    }

    useEffect(() => {
        verifyIfHasModel()
    }, [])

    return hasModel ? <FormFornecedor id={id} makeFornecedor={makeFornecedor} /> : <InitialSteps />
}

export default VerifyFormType
