import { useEffect, useState, type FunctionComponent } from 'react';

import MainLayout from '../../../layout/MainLayout';
import Button from '../../../components/UI/Button/Button';
import EditProfile from './EditProfile';
import { useAuth } from '../../../context/auth.context';
import type { IToken } from '../../../interface/auth.interface';
import decodeToken from '../../../services/token.service';
import { getUserProfile } from '../../../services/user.service';
import type { IUser } from '../../../interface/user.interface';
import { errorMsg } from '../../../services/toastify.service';

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUser>();

  const { token } = useAuth();
  const decode: IToken = decodeToken(token as string);

  const handleUpdateUser = (updateUser: IUser) => {
    setUserData(updateUser);
    setIsEdit(false);
  }

  useEffect(() => {
    getUserProfile(decode._id, token as string)
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch((error) => errorMsg(error.response.data.msg));
  }, []);

  return (
    <MainLayout>
      <section className='py-30 md:py-40'>
        <div className='max-w-lg flex flex-col gap-10 text-sm'>
          <span className='bg-rose-50 dark:bg-rose-950 w-36 h-36 flex items-center justify-center rounded'>
            <i className='ri-user-smile-line text-rose-600 text-8xl' />
          </span>

          {userData && isEdit ? (
            <EditProfile user={userData} onUpdate={handleUpdateUser} />
          ) : (
            userData && (
              <>
                <p className='font-medium text-3xl text-slate-900 dark:text-slate-100 mt-4 capitalize'>
                  {userData.name}
                </p>
                <hr className='bg-slate-200 dark:bg-slate-800 h-[1px] border-none' />

                <div>
                  <p className='text-slate-700 dark:text-slate-400 underline mt-3'>
                    CONTACT INFO
                  </p>
                  <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3'>
                    <>
                      <p className='font-medium'>Email:</p>
                      <p className='text-rose-600'>{userData.email}</p>
                    </>
                    <>
                      <p className='font-medium'>Phone:</p>
                      <p className='text-rose-600'>
                        {!!userData.phone
                          ? `${userData.phone}`
                          : '000 000 0000'}
                      </p>
                    </>
                  </div>
                </div>

                <div className='mt-10'>
                  <Button
                    variant='secondary'
                    size='sm'
                    onClick={() => setIsEdit(true)}
                  >
                    Edit
                  </Button>
                </div>
              </>
            )
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Profile;
