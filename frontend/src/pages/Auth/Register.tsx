import type { FunctionComponent } from 'react';
import AuthLayout from '../../layout/AuthLayout';
import MainLayout from '../../layout/MainLayout';
import type { IUser } from '../../interface/IUser';
import { Formik, Form } from 'formik';
import { userSchema } from '../../schemas/userSchema';
import Input from '../../components/Input/Input';
import { Link } from 'react-router-dom';
import { register } from '../../services/authService';
import toast from 'react-hot-toast';

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    phone: '',
  };

  const handleRegister = async (values: IUser) => {
    register(values)
      .then((res) => {
        toast.success(`Signup successfuly`);
      })
      .catch((error) => toast.error(error));
  };

  return (
    <MainLayout>
      <AuthLayout>
        <article className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
          <h3 className='text-xl font-semibold text-black'>
            Create an Account
          </h3>
          <p className='text-xs text-slate-700 mt-[5px] mb-6'>
            Please sign up to book appointment.
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={userSchema}
            onSubmit={handleRegister}
          >
            {({ dirty, isValid }) => (
              <Form>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <Input
                    label='Name'
                    placeholder='john doe'
                    type='text'
                    name='name'
                  />
                  <Input
                    label='Email'
                    placeholder='john@example.com'
                    type='text'
                    name='email'
                  />

                  <Input
                    label='Phone'
                    placeholder='053 526 5696'
                    type='text'
                    name='phone'
                  />

                  <Input
                    label='Password'
                    placeholder='********'
                    type='password'
                    name='password'
                  />
                </div>

                <button
                  type='submit'
                  disabled={!dirty || !isValid}
                  className='btn-primary btn-disabled mt-4 w-full'
                >
                  SIGN UP
                </button>

                <p className='text-[13px] text-slate-900 dark:text-slate-100 mt-4'>
                  Already have an account?
                  <Link
                    className='font-medium text-amber-500 underline'
                    to='/login'
                  >
                    Login
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </article>
      </AuthLayout>
    </MainLayout>
  );
};

export default Register;
