import { useEffect, useState, type FunctionComponent } from 'react';

import MainLayout from '../../layout/MainLayout';
import Button from '../../components/UI/Button/Button';
import EditProfile from '../../components/Profile/EditProfile';
import { useAuth } from '../../context/auth.context';
import type { IToken } from '../../interface/auth.interface';
import decodeToken from '../../services/token.service';
import { deleteUser, getUserProfile } from '../../services/user.service';
import type { IUser } from '../../interface/user.interface';
import { errorMsg, successMsg } from '../../services/toastify.service';
import Modal from '../../components/UI/Modal/Modal';
import { useNavigate } from 'react-router-dom';

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUser>();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { token, logout } = useAuth();
  const decode: IToken = decodeToken(token as string);
  const navigate = useNavigate();

  const handleUpdateUser = (updateUser: IUser) => {
    setUserData(updateUser);
    setIsEdit(false);
  };

  const handleDeleteProfile = () => {
    deleteUser(decode._id, token as string)
      .then((res) => {
        successMsg(res.data.msg);
        logout();
        navigate('/');
      })
      .catch((error) => errorMsg(error.response.data.msg));
  };

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
        <div className='relative max-w-lg flex flex-col gap-10 text-sm'>
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

                <div className='mt-10 flex flex-col md:flex-row gap-4'>
                  <Button
                    variant='secondary'
                    size='sm'
                    onClick={() => setIsEdit(true)}
                  >
                    Edit
                  </Button>

                  <Button
                    size='sm'
                    variant='dangerprimary'
                    onClick={() => setOpenModal(true)}
                  >
                    <i className='ri-delete-bin-line' />
                    Delete Account
                  </Button>
                </div>
              </>
            )
          )}

          <Modal
            open={openModal}
            variant='danger'
            icon={<i className='ri-delete-bin-line text-red-500' />}
            title='Are you sure?'
            contect={` Do you really want to continue? This action cannot be undone.`}
            cancelBtn={() => setOpenModal(false)}
            primaryBtn={() => handleDeleteProfile()}
          />
        </div>
      </section>
    </MainLayout>
  );
};

export default Profile;
