import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Grid, TextField, MenuItem, Checkbox,
  FormControlLabel, Button, Box, Typography,
} from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "react-router-dom";

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
];

// Schema for form validation
const schema = yup.object().shape({
  billingName: yup.string().required('Name is required'),
  billingMobile: yup.string().required('Mobile No is required'),
  billingEmail: yup.string().email('Invalid email').required('Email ID is required'),
  billingAddress: yup.string().required('Address is required'),
  billingCity: yup.string().required('City is required'),
  billingPincode: yup.string().matches(/^[0-9]{6}$/, 'PIN Code must be 6 digits').required('PIN Code is required'),
  billingState: yup.string().required('State is required'),
  shippingName: yup.string().required('Name is required'),
  shippingMobile: yup.string().required('Mobile No is required'),
  shippingEmail: yup.string().email('Invalid email').required('Email ID is required'),
  shippingAddress: yup.string().required('Address is required'),
  shippingCity: yup.string().required('City is required'),
  shippingPincode: yup.string().matches(/^[0-9]{6}$/, 'PIN Code must be 6 digits').required('PIN Code is required'),
  shippingState: yup.string().required('State is required'),
});

const BillingShippingForm = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      billingName: '',
      billingMobile: '',
      billingEmail: '',
      billingAddress: '',
      billingCity: '',
      billingPincode: '',
      billingState: '',
      shippingName: '',
      shippingMobile: '',
      shippingEmail: '',
      shippingAddress: '',
      shippingCity: '',
      shippingPincode: '',
      shippingState: '',
    },
  });

  const [sameAsBilling, setSameAsBilling] = useState(false);

  // Watch the billing fields
  const billingName = watch('billingName');
  const billingMobile = watch('billingMobile');
  const billingEmail = watch('billingEmail');
  const billingAddress = watch('billingAddress');
  const billingCity = watch('billingCity');
  const billingPincode = watch('billingPincode');
  const billingState = watch('billingState');

  // Handle checkbox change to copy billing address to shipping address
  useEffect(() => {
    if (sameAsBilling) {
      setValue('shippingName', billingName || '');
      setValue('shippingMobile', billingMobile || '');
      setValue('shippingEmail', billingEmail || '');
      setValue('shippingAddress', billingAddress || '');
      setValue('shippingCity', billingCity || '');
      setValue('shippingPincode', billingPincode || '');
      setValue('shippingState', billingState || '');
    }
  }, [sameAsBilling, billingName, billingMobile, billingEmail, billingAddress, billingCity, billingPincode, billingState, setValue]);

  const onSubmit = (data) => {
    navigate('/payment-page');
    console.log(data);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" gutterBottom>
          Billing Address
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="billingName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  fullWidth
                  error={!!errors.billingName}
                  helperText={errors.billingName ? errors.billingName.message : ''}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="billingMobile"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Mobile No"
                  fullWidth
                  error={!!errors.billingMobile}
                  helperText={errors.billingMobile ? errors.billingMobile.message : ''}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="billingEmail"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email ID"
                  fullWidth
                  error={!!errors.billingEmail}
                  helperText={errors.billingEmail ? errors.billingEmail.message : ''}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="billingAddress"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Address"
                  fullWidth
                  multiline
                  rows={2}
                  error={!!errors.billingAddress}
                  helperText={errors.billingAddress ? errors.billingAddress.message : ''}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="billingCity"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="City"
                  fullWidth
                  error={!!errors.billingCity}
                  helperText={errors.billingCity ? errors.billingCity.message : ''}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="billingPincode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="PIN Code"
                  fullWidth
                  error={!!errors.billingPincode}
                  helperText={errors.billingPincode ? errors.billingPincode.message : ''}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="billingState"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="State"
                  fullWidth
                  error={!!errors.billingState}
                  helperText={errors.billingState ? errors.billingState.message : ''}
                >
                  {indianStates.map((state, index) => (
                    <MenuItem key={index} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
        </Grid>

        <FormControlLabel
          control={<Checkbox checked={sameAsBilling} onChange={(e) => setSameAsBilling(e.target.checked)} />}
          label="Shipping address same as billing address"
          sx={{ my: 3 }}
        />

        <Typography variant="h6" gutterBottom>
          Shipping Address
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="shippingName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  fullWidth
                  error={!!errors.shippingName}
                  helperText={errors.shippingName ? errors.shippingName.message : ''}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="shippingMobile"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Mobile No"
                  fullWidth
                  error={!!errors.shippingMobile}
                  helperText={errors.shippingMobile ? errors.shippingMobile.message : ''}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="shippingEmail"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email ID"
                  fullWidth
                  error={!!errors.shippingEmail}
                  helperText={errors.shippingEmail ? errors.shippingEmail.message : ''}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="shippingAddress"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Address"
                  fullWidth
                  multiline
                  rows={2}
                  error={!!errors.shippingAddress}
                  helperText={errors.shippingAddress ? errors.shippingAddress.message : ''}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="shippingCity"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="City"
                  fullWidth
                  error={!!errors.shippingCity}
                  helperText={errors.shippingCity ? errors.shippingCity.message : ''}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="shippingPincode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="PIN Code"
                  fullWidth
                  error={!!errors.shippingPincode}
                  helperText={errors.shippingPincode ? errors.shippingPincode.message : ''}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="shippingState"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="State"
                  fullWidth
                  error={!!errors.shippingState}
                  helperText={errors.shippingState ? errors.shippingState.message : ''}
                >
                  {indianStates.map((state, index) => (
                    <MenuItem key={index} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
        </Grid>

        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: 3, marginBottom: 3 }}>
          Proceed to payment
        </Button>
      </form>
    </Box>
  );
};

export default BillingShippingForm;
