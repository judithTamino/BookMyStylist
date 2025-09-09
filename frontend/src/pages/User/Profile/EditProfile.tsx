import { useState, type FunctionComponent } from 'react';
import { Formik, Form } from 'formik';
import type { IUser } from '../../../interface/user.interface';
import { editUserSchema } from '../../../schemas/user.schema';
import { editFields } from '../../../assets/assets';
import FormikInput from '../../../components/UI/Input/Formik/FormikInput';
import Button from '../../../components/UI/Button/Button';
import { updateUserProfile } from '../../../services/user.service';
import { errorMsg, successMsg } from '../../../services/toastify.service';
import { useAuth } from '../../../context/auth.context';
import decodeToken from '../../../services/token.service';
import { useNavigate } from 'react-router-dom';

interface EditProfileProps {
  user: IUser;
  onUpdate: (user: IUser) => void;
}

const EditProfile: FunctionComponent<EditProfileProps> = ({ user, onUpdate }) => {
  const initialValues = {
    name: user.name,
    email: user.email,
    password: '',
    phone: user.phone,
  };

  const [changePassword, setChangePassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const { token } = useAuth();
  const decode = decodeToken(token as string);

  const handleUpdateUserProfile = (values: IUser) => {
    updateUserProfile(decode._id, token as string, values)
      .then((res) => {
        successMsg(res.data.msg);
        onUpdate(res.data.data)
      })
      .catch((error) => errorMsg(error.response.data.msg));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={editUserSchema}
      onSubmit={handleUpdateUserProfile}
    >
      {({ isSubmitting }) => (
        <Form className='grid grid-cols-2 gap-4 items-center'>
          {editFields.map((field, i) => (
            <FormikInput key={i} {...field} sizes='sm' />
          ))}

          <div className='col-span-2'>
            {!changePassword ? (
              <Button
                type='button'
                variant='text'
                size='sm'
                onClick={() => setChangePassword(true)}
              >
                Change Password
              </Button>
            ) : (
              <FormikInput
                name='password'
                label='Password'
                type='password'
                sizes='sm'
              />
            )}
          </div>

          <div className='mt-4'>
            <Button
              type='submit'
              variant='secondary'
              size='sm'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Info'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditProfile;
