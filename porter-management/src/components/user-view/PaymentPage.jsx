import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from '@mui/material';

// Updated Validation schema
const schema = yup.object().shape({
    paymentMethod: yup.string().required('Payment method is required'),
    upiId: yup.string().when('paymentMethod', {
        is: 'UPI',
        then: () => yup.string().required('UPI ID is required').matches(/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/, 'Invalid UPI ID'),
        otherwise: () => yup.string().notRequired(),
    }),
    cardNumber: yup.string().when('paymentMethod', {
        is: 'CARD',
        then: () => yup.string().required('Card number is required').matches(/^[0-9]{16}$/, 'Card number must be 16 digits'),
        otherwise: () => yup.string().notRequired(),
    }),
    cardName: yup.string().when('paymentMethod', {
        is: 'CARD',
        then: () => yup.string().required('Name on card is required'),
        otherwise: () => yup.string().notRequired(),
    }),
    expiryDate: yup.string().when('paymentMethod', {
        is: 'CARD',
        then: () => yup.string().required('Expiry date is required').matches(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, 'Invalid expiry date (MM/YY)'),
        otherwise: () => yup.string().notRequired(),
    }),
    cvv: yup.string().when('paymentMethod', {
        is: 'CARD',
        then: () => yup.string().required('CVV is required').matches(/^[0-9]{3,4}$/, 'CVV must be 3 or 4 digits'),
        otherwise: () => yup.string().notRequired(),
    }),
});

const PaymentForm = () => {
    const [maskedCardNumber, setMaskedCardNumber] = useState('');

    const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            paymentMethod: 'UPI',
            upiId: '',
            cardNumber: '',
            cardName: '',
            expiryDate: '',
            cvv: '',
        },
    });

    const paymentMethod = watch('paymentMethod');

    const handleCardNumberChange = (e) => {
        const { value } = e.target;
        const cardNumber = value.replace(/\D/g, ''); // Remove non-digit characters

        if (cardNumber.length < 16) {
            // Update the actual card number in the form state
            setMaskedCardNumber(cardNumber);
        } else {
            // Create masked version for display
            setValue('cardNumber', cardNumber, { shouldValidate: true });
            const masked = 'x'.repeat(Math.max(cardNumber.length - 4, 0)) + cardNumber.slice(-4).padStart(4, ' ');
            setMaskedCardNumber(masked.match(/.{1,4}/g)?.join(' ') || '');
        }
    };

    const onSubmit = (data) => {
        console.log("Form submitted with data:", data);
        // Handle payment processing here
    };

    return (
        <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Payment Details
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl component="fieldset" fullWidth margin="normal">
                    <Controller
                        name="paymentMethod"
                        control={control}
                        render={({ field }) => (
                            <RadioGroup {...field} row>
                                <FormControlLabel value="UPI" control={<Radio />} label="UPI" />
                                <FormControlLabel value="CARD" control={<Radio />} label="Card" />
                            </RadioGroup>
                        )}
                    />
                    <FormHelperText error>{errors.paymentMethod?.message}</FormHelperText>
                </FormControl>

                {paymentMethod === 'UPI' && (
                    <Controller
                        name="upiId"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="UPI ID"
                                fullWidth
                                margin="normal"
                                error={!!errors.upiId}
                                helperText={errors.upiId?.message}
                            />
                        )}
                    />
                )}

                {paymentMethod === 'CARD' && (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Card Number"
                                fullWidth
                                margin="normal"
                                value={maskedCardNumber}
                                onChange={handleCardNumberChange}
                                error={!!errors.cardNumber}
                                helperText={errors.cardNumber?.message}
                                inputProps={{ maxLength: 19 }} // 16 digits + 3 spaces
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="cardName"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Name on Card"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.cardName}
                                        helperText={errors.cardName?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="expiryDate"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Expiry Date (MM/YY)"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.expiryDate}
                                        helperText={errors.expiryDate?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="cvv"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="CVV"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.cvv}
                                        helperText={errors.cvv?.message}
                                        type="password"
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                )}

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Pay Now
                </Button>
            </form>
        </Box>
    );
};

export default PaymentForm;
