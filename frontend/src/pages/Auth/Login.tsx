import type { FunctionComponent } from 'react';
import { Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

import MainLayout from '../../layout/MainLayout';
import AuthLayout from '../../layout/AuthLayout';

import { loginSchema } from '../../schemas/auth.schema';
import type { ILogin } from '../../interface/auth.interface';
import { loginUser } from '../../services/auth.service';
import { successMsg, errorMsg } from '../../services/toastify.service';

import Input from '../../components/UI/Input/Input';
import { useAuth } from '../../context/auth.context';

const initialValues = {
  email: '',
  password: '',
};

const fields = [
  {
    label: 'Email',
    name: 'email',
    type: 'text',
    placeholder: 'john@example.com',
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    placeholder: '@Johndoe',
  },
];

const Login: FunctionComponent = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (values: ILogin) => {
    loginUser(values)
      .then((res) => {
        successMsg(res.data.msg);

        // save user token
        const token = res.data.data;
        sessionStorage.setItem('token', token);
        login(token);

        navigate('/');
      })
      .catch((error) => errorMsg(error.response.data.msg));
  };

  return (
    <MainLayout>
      <AuthLayout>
        <article className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
          <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
          <p className='text-xs text-slate-700 mt-[5px] mb-6'>
            Please sign in to book appointment.
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
          >
            {({ dirty, isValid }) => (
              <Form>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {fields.map((field, index) => (
                    <Input key={index} {...field} />
                  ))}
                </div>

                <button
                  type='submit'
                  disabled={!dirty || !isValid}
                  className='btn-primary btn-disabled mt-4 w-full'
                >
                  Login
                </button>

                <p className='text-[13px] text-slate-900 dark:text-slate-100 mt-4'>
                  Already have an account?{' '}
                  <Link
                    className='font-medium text-amber-500 underline'
                    to='/register'
                  >
                    Signup
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

export default Login;
