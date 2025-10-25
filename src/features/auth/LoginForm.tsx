import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Alert } from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import { login } from './authSlice';
import type { LoginFormData } from '../../types/auth';


const schema = yup.object({
    username: yup
        .string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters'),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters long'),
}).required();

export default function LoginForm() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    mode: 'onBlur', // Validate on blur (not on every keystroke)
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    dispatch(login(data.username));
    navigate('/');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        maxWidth: 400,
      }}
    >
        {/*Info message explaining simulated login */}
        <Alert severity='info' sx={{ mb: 1}}>
            Simulated Login. Enter any username and password to login. Password should be at least 6 characters.
        </Alert>

        {/* Username field */}
        <TextField
            label="Username"
            variant='outlined'
            fullWidth
            autoComplete='username'
            autoFocus
            {...register('username')}
            error={!!errors.username}
            helperText={errors.username?.message}
            disabled={isSubmitting}
        />
        {/* Password field */}
        <TextField
            label="Password"
            type="password"
            variant='outlined'
            fullWidth
            autoComplete='current-password'
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            disabled={isSubmitting}
        />
        {/* Submit button */}
        <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={isSubmitting}
            sx={{ mt: 1}}
        >
            {isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
    </Box>
  );
}