import signup from '../../assets/images/svg/signup.svg';
import GoogleOauth from '../../common/Form/GoogleOauth';
import FormContainer from '../../common/Form/FormContainer';
import Error from '../../common/Form/Error';
import { Paths } from '../../constants';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { emailRegex } from '../../constants';

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

function SignUp() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>();

  const { registration } = useAuth();

  const onSubmit: SubmitHandler<FormInputs> = ({ name, email, password }) => {
    registration(name, email, password);
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
      <div>
        <img src={signup} alt='signup' />
      </div>
      <FormContainer>
        <h1 className='text-4xl'>Sign Up</h1>
        <form className='sign-form' onSubmit={handleSubmit(onSubmit)}>
          <GoogleOauth />
          <div className='flex items-center justify-between w-full'>
            <div className='border border-gray-300 basis-5/12'></div>
            <p className='font-bold basis-1/5'>OR</p>
            <div className='border border-gray-300 basis-5/12'></div>
          </div>
          <input
            type='text'
            placeholder='Enter name'
            className='form-input'
            {...register('name', {
              required: 'Name is required',
            })}
          />
          {errors.name?.message && (
            <Error errorMessage={errors.name?.message} />
          )}
          <input
            className='form-input'
            type='email'
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

          <input
            className='form-input'
            type='password'
            placeholder='Enter password'
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password min length is 8 characters',
              },
              maxLength: {
                value: 30,
                message: 'Password max length is 30 characters',
              },
            })}
          />
          {errors.password?.message && (
            <Error errorMessage={errors.password?.message} />
          )}

          <button className='btn btn-primary w-full' type='submit'>
            Sign Up
          </button>
          <p className='font-bold flex gap-2 justify-center'>
            Already have an account?
            <Link to={Paths.SIGNIN} className='text-red-500'>
              Sign In
            </Link>
          </p>
        </form>
      </FormContainer>
    </div>
  );
}

export default SignUp;
