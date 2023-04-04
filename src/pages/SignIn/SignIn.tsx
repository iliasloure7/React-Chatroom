import signin from '../../assets/images/jpg/signin.jpg';
import GoogleOauth from '../../common/Form/GoogleOauth';
import FormContainer from '../../common/Form/FormContainer';
import Error from '../../common/Form/Error';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Paths } from '../../constants';
import { AiOutlineEye } from 'react-icons/ai';
import { useAuth } from '../../context/AuthContext';
import { emailRegex } from '../../constants';

type FormInputs = {
  email: string;
  password: string;
};

function SignIn() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { login } = useAuth();

  const onSubmit: SubmitHandler<FormInputs> = ({ email, password }) => {
    login(email, password);
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
      <div>
        <img src={signin} alt='signin' />
      </div>
      <FormContainer>
        <h1 className='text-4xl'>Sign In</h1>
        <form className='sign-form' onSubmit={handleSubmit(onSubmit)}>
          <GoogleOauth />
          <div className='flex items-center justify-between w-full'>
            <div className='border border-gray-300 basis-5/12'></div>
            <p className='font-bold basis-1/5'>OR</p>
            <div className='border border-gray-300 basis-5/12'></div>
          </div>
          <input
            type='email'
            className='form-input'
            placeholder='Enter email'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: emailRegex(),
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email?.message && (
            <Error errorMessage={errors.email?.message} />
          )}
          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter password'
              className='form-input'
              {...register('password', {
                required: 'Password is required',
              })}
            />
            <AiOutlineEye
              className='absolute top-3 left-full -translate-x-12 cursor-pointer'
              size={25}
              color='gray'
              onClick={() => setShowPassword((prev: boolean) => !prev)}
            />
          </div>
          {errors.password?.message && (
            <Error errorMessage={errors.password?.message} />
          )}
          <button className='btn btn-primary w-full' type='submit'>
            Sign In
          </button>
          <p className='font-bold flex gap-2 justify-center'>
            Don't have an account yet?
            <Link to={Paths.SIGNUP} className='text-red-500 hover:text-red-600'>
              Sign Up
            </Link>
          </p>
        </form>
      </FormContainer>
    </div>
  );
}

export default SignIn;
