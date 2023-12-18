import { useState } from 'react'
import Step from '@mui/material/Step'
import Stepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import SectionTwo from './SectionTwo'
import SectionOne from './SectionOne'
import SectionThree from './SectionThree'
import StepperCustomDot from 'src/views/forms/form-wizard/StepperCustomDot'
import StepperWrapper from 'src/@core/styles/mui/stepper'

const steps = [
    {
        title: 'Dados obrigatórios',
        subtitle: 'Insira os dados obrigatórios'
    },
    {
        title: 'Dados opcionais',
        subtitle: 'Insira os dados opcionais'
    },
    {
        title: 'Finalizar',
        subtitle: 'Finalize o cadastro'
    }
]

const RegisterSections = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [dataGlobal, setDataGlobal] = useState()

    // Handle Stepper
    const handleNext = () => {
        setActiveStep(activeStep + 1)
    }

    const handlePrev = () => {
        if (activeStep !== 0) {
            setActiveStep(activeStep - 1)
        }
    }

    const getStepContent = step => {
        switch (step) {
            case 0:
                return <SectionOne handleNext={handleNext} setDataGlobal={setDataGlobal} dataGlobal={dataGlobal} />
            case 1:
                return <SectionTwo handleNext={handleNext} handlePrev={handlePrev} setDataGlobal={setDataGlobal} dataGlobal={dataGlobal} />
            case 2:
                return <SectionThree handlePrev={handlePrev} setDataGlobal={setDataGlobal} dataGlobal={dataGlobal} />
            default:
                return null
        }
    }

    const renderContent = () => {
        return getStepContent(activeStep)
    }

    return (
        <>
            <StepperWrapper sx={{ mb: 10 }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((step, index) => {
                        return (
                            <Step key={index}>
                                <StepLabel StepIconComponent={StepperCustomDot}>
                                    <div className='step-label'>
                                        <Typography className='step-number'>{`0${index + 1}`}</Typography>
                                        <div>
                                            <Typography className='step-title'>{step.title}</Typography>
                                            <Typography className='step-subtitle'>{step.subtitle}</Typography>
                                        </div>
                                    </div>
                                </StepLabel>
                            </Step>
                        )
                    })}
                </Stepper>
            </StepperWrapper>
            {renderContent()}
        </>
    )
}

export default RegisterSections
