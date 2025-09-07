import type { FunctionComponent } from 'react';
import AuthLayout from '../../layout/AuthLayout';
import MainLayout from '../../layout/MainLayout';
import type { IUser } from '../../interface/user.interface';
import { Formik, Form } from 'formik';
import { userSchema } from '../../schemas/user.schema';
import Input from '../../components/UI/Input/Input';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/auth.service';
import { successMsg, errorMsg } from '../../services/toastify.service';

const initialValues: IUser = {
  name: '',
  email: '',
  password: '',
  phone: '',
};

const fields = [
  { label: 'Name', name: 'name', type: 'text', placeholder: 'john doe' },
  {
    label: 'Email',
    name: 'email',
    type: 'text',
    placeholder: 'john@example.com',
  },
  { label: 'Phone', name: 'phone', type: 'text', placeholder: '053 526 5696' },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    placeholder: '@Johndoe',
  },
];

const Register: FunctionComponent = () => {
  const navigate = useNavigate();

  const handleRegister = (values: IUser) => {
    register(values)
      .then((res) => {
        successMsg(res.data.msg);
        navigate('/login');
      })
      .catch((error) => errorMsg(error.response.data.msg));
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
                  {fields.map((field, index) => (
                    <Input key={index} {...field} />
                  ))}
                </div>

                <button
                  type='submit'
                  disabled={!dirty || !isValid}
                  className='btn-primary btn-disabled mt-4 w-full'
                >
                  SIGN UP
                </button>

                <p className='text-[13px] text-slate-900 dark:text-slate-100 mt-4'>
                  Already have an account?{' '}
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
