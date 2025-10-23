import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long'),
}).required();

// Form submission logic dispatches login action