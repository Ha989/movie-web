import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Modal, Paper, Typography, Box, Alert, InputAdornment, IconButton } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form'; 
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from '../component/form/FormProvider';
import FormCheckbox from '../component/form/FormCheckbox';
import FormTextField from '../component/form/FormTextField';

const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
  const defaultValues = {
    username: "",
    password: "",
    remember: false,
  };

export default function LoginPage() {
    let location = useLocation();
    let navigate = useNavigate();
    let auth = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    let from = location.state?.from?.pathname || "/";
    
    function onDismiss() {
        navigate(-1);
    }

  
    const methods = useForm({ 
        resolver: yupResolver(LoginSchema),
        defaultValues });

    const { 
             handleSubmit,
             formState: { errors },
          } = methods;
   
    const onSubmit = (data) => {
        auth.signIn(data, () => {
            navigate(from, { replace: true })
        })
    }

    return (
    <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby='modal-modal-description'
        onBackdropClick={() => onDismiss()}
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "2rem",
            outline: "0",
        }}
    >
        <Box>
            <Paper
                 elevation={8}
                 style={{
                    borderRadius: "20px"
                 }}
            >
                <div style={{ padding: "3rem" }}>
                    <Typography
                        color="secondary"
                        variant='h3'
                        textAlign="center"
                        mb={3}
                        className="title-login"
                    >
                       Log In
                    </Typography>
                    <FormProvider methods={methods}  onSubmit={handleSubmit(onSubmit)}
                    > 
                        <Stack spacing={3} xs={3}>
                            {!!errors.afterSubmit && (
                                <Alert severity='error'>{errors.afterSubmit.message}</Alert>
                            )}
                            <FormTextField name="username" label="Username"/>
                            <FormTextField
                                 name="password"
                                 label="Password"
                                 type={showPassword ? "text" : "password"}
                                 InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                color='secondary'
                                                aria-label='toggle password visibility'
                                                onClick={() => setShowPassword(!showPassword)}
                                                onMouseDown={(e) => e.preventDefault()}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                 }}
                            />
                        </Stack>
                        <Stack>
                            <FormCheckbox name="remember" label="Remember me"/>
                        </Stack>
                        <Stack>
                            <LoadingButton
                                size='large'
                                type='submit'
                                variant='contained'
                                color='secondary'
                            >
                                Log In
                            </LoadingButton>
                        </Stack>
                    </FormProvider>
                </div>
            </Paper>
        </Box>
    </Modal>
  )
}
