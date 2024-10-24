// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import RadioGroup from '@mui/material/RadioGroup'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import toast from 'react-hot-toast'
import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const defaultValues = {
    dob: null,
    email: '',
    radio: '',
    select: '',
    lastName: '',
    password: '',
    textarea: '',
    firstName: '',
    checkbox: false
}

const CustomInput = forwardRef(({ ...props }, ref) => {
    return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
})

const FormValidationBasic = () => {
    // ** States
    const [state, setState] = useState({
        password: '',
        showPassword: false
    })

    // ** Hooks
    const form = useForm({ defaultValues })

    const handleClickShowPassword = () => {
        setState({ ...state, showPassword: !state.showPassword })
    }

    const handleMouseDownPassword = event => {
        event.preventDefault()
    }
    const onSubmit = () => toast.success('Form Submitted')

    return (
        <Card>
            <CardHeader title='Basic' />
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <Controller
                                    name='firstName'
                                    control={form.control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                        <TextField
                                            value={value}
                                            label='First Name'
                                            onChange={onChange}
                                            placeholder='Leonard'
                                            error={Boolean(form.formState?.errors.firstName)}
                                            aria-describedby='validation-basic-first-name'
                                        />
                                    )}
                                />
                                {form.formState?.errors.firstName && (
                                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                                        This field is required
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <Controller
                                    name='lastName'
                                    control={form.control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                        <TextField
                                            value={value}
                                            label='Last Name'
                                            onChange={onChange}
                                            placeholder='Carter'
                                            error={Boolean(form.formState?.errors.lastName)}
                                            aria-describedby='validation-basic-last-name'
                                        />
                                    )}
                                />
                                {form.formState?.errors.lastName && (
                                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-last-name'>
                                        This field is required
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <Controller
                                    name='email'
                                    control={form.control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                        <TextField
                                            type='email'
                                            value={value}
                                            label='Email'
                                            onChange={onChange}
                                            error={Boolean(form.formState?.errors.email)}
                                            placeholder='carterleonard@gmail.com'
                                            aria-describedby='validation-basic-email'
                                        />
                                    )}
                                />
                                {form.formState?.errors.email && (
                                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-email'>
                                        This field is required
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor='validation-basic-password' error={Boolean(form.formState?.errors.password)}>
                                    Password
                                </InputLabel>
                                <Controller
                                    name='password'
                                    control={form.control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                        <OutlinedInput
                                            value={value}
                                            label='Password'
                                            onChange={onChange}
                                            id='validation-basic-password'
                                            error={Boolean(form.formState?.errors.password)}
                                            type={state.showPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        edge='end'
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        aria-label='toggle password visibility'
                                                    >
                                                        <Icon icon={state.showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    )}
                                />
                                {form.formState?.errors.password && (
                                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-password'>
                                        This field is required
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Controller
                                name='dob'
                                control={form.control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                    <DatePicker
                                        selected={value}
                                        showYearDropdown
                                        showMonthDropdown
                                        onChange={e => onChange(e)}
                                        placeholderText='MM/DD/YYYY'
                                        customInput={
                                            <CustomInput
                                                value={value}
                                                onChange={onChange}
                                                label='Date of Birth'
                                                error={Boolean(form.formState?.errors.dob)}
                                                aria-describedby='validation-basic-dob'
                                            />
                                        }
                                    />
                                )}
                            />
                            {form.formState?.errors.dob && (
                                <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
                                    This field is required
                                </FormHelperText>
                            )}
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel
                                    id='validation-basic-select'
                                    error={Boolean(form.formState?.errors.select)}
                                    htmlFor='validation-basic-select'
                                >
                                    Country
                                </InputLabel>
                                <Controller
                                    name='select'
                                    control={form.control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                        <Select
                                            value={value}
                                            label='Country'
                                            onChange={onChange}
                                            error={Boolean(form.formState?.errors.select)}
                                            labelId='validation-basic-select'
                                            aria-describedby='validation-basic-select'
                                        >
                                            <MenuItem value='UK'>UK</MenuItem>
                                            <MenuItem value='USA'>USA</MenuItem>
                                            <MenuItem value='Australia'>Australia</MenuItem>
                                            <MenuItem value='Germany'>Germany</MenuItem>
                                        </Select>
                                    )}
                                />
                                {form.formState?.errors.select && (
                                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                                        This field is required
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Controller
                                    name='textarea'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <TextField
                                            rows={3}
                                            multiline
                                            {...field}
                                            label='Bio'
                                            error={Boolean(form.formState?.errors.textarea)}
                                            aria-describedby='validation-basic-textarea'
                                        />
                                    )}
                                />
                                {form.formState?.errors.textarea && (
                                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-textarea'>
                                        This field is required
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl error={Boolean(form.formState?.errors.radio)}>
                                <FormLabel>Gender</FormLabel>
                                <Controller
                                    name='radio'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <RadioGroup row {...field} aria-label='gender' name='validation-basic-radio'>
                                            <FormControlLabel
                                                value='female'
                                                label='Female'
                                                sx={form.formState?.errors.radio ? { color: 'error.main' } : null}
                                                control={<Radio sx={form.formState?.errors.radio ? { color: 'error.main' } : null} />}
                                            />
                                            <FormControlLabel
                                                value='male'
                                                label='Male'
                                                sx={form.formState?.errors.radio ? { color: 'error.main' } : null}
                                                control={<Radio sx={form.formState?.errors.radio ? { color: 'error.main' } : null} />}
                                            />
                                            <FormControlLabel
                                                value='other'
                                                label='Other'
                                                sx={form.formState?.errors.radio ? { color: 'error.main' } : null}
                                                control={<Radio sx={form.formState?.errors.radio ? { color: 'error.main' } : null} />}
                                            />
                                        </RadioGroup>
                                    )}
                                />
                                {form.formState?.errors.radio && (
                                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-radio'>
                                        This field is required
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl>
                                <Controller
                                    name='checkbox'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <FormControlLabel
                                            label='Agree to our terms and conditions'
                                            sx={form.formState?.errors.checkbox ? { color: 'error.main' } : null}
                                            control={
                                                <Checkbox
                                                    {...field}
                                                    name='validation-basic-checkbox'
                                                    sx={form.formState?.errors.checkbox ? { color: 'error.main' } : null}
                                                />
                                            }
                                        />
                                    )}
                                />
                                {form.formState?.errors.checkbox && (
                                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-checkbox'>
                                        This field is required
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <Button size='large' type='submit' variant='contained'>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    )
}

export default FormValidationBasic
