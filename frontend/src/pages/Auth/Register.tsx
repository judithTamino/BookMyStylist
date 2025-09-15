import type { FunctionComponent } from 'react';
import AuthLayout from '../../layout/AuthLayout';
import MainLayout from '../../layout/MainLayout';
import type { IUser } from '../../interface/user.interface';
import { Formik, Form } from 'formik';
import { userSchema } from '../../schemas/user.schema';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/auth.service';
import { successMsg, errorMsg } from '../../services/toastify.service';
import FormikInput from '../../components/UI/Input/Formik/FormikInput';
import { signupFields } from '../../assets/assets';
import Button from '../../components/UI/Button/Button';

const initialValues: IUser = {
  name: '',
  email: '',
  password: '',
  phone: '',
};

const Register: FunctionComponent = () => {
  const navigate = useNavigate();

  const handleRegister = (values: IUser) => {
    register(values)
      .then((res) => {
        successMsg(res.data.msg);
        navigate('/login');
      })
      .catch((error) => {
        errorMsg(error.response.data.msg);
      });
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
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                  {signupFields.map((field, index) => (
                    <FormikInput key={index} {...field} />
                  ))}
                </div>
                
                <div className='mt-8'>
                  <Button type='submit' disabled={!dirty || !isValid}>
                    Signup
                  </Button>
                </div>

                <p className='text-[13px] text-slate-900 dark:text-slate-100 mt-4'>
                  Already have an account?{' '}
                  <Link
                    className='font-medium text-rose-600 underline'
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
