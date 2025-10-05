import { useEffect, useState, type FunctionComponent } from 'react';
import AdminLayout from '../../layout/AdminLayout';
import Button from '../../components/UI/Button/Button';
import { Form, Formik } from 'formik';
import { useAuth } from '../../context/auth.context';
import type { IUser, IWorkingHours } from '../../interface/user.interface';
import { getUserProfile } from '../../services/user.service';
import decodeToken from '../../services/token.service';
import { errorMsg } from '../../services/toastify.service';
import { workingHoursSchema } from '../../schemas/user.schema';
import FormikInput from '../../components/UI/Input/Formik/FormikInput';
import FormikToggleSwitch from '../../components/UI/Input/Formik/FormikToggleSwitch';

interface ManageWorkingHoursProps {}

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const ManageWorkingHours: FunctionComponent<ManageWorkingHoursProps> = () => {
  const { token } = useAuth();

  const [workingHours, setWorkingHours] = useState<IWorkingHours[]>([]);

  const handleWorkingHours = async (values: {
    workingHours: IWorkingHours[];
  }) => {
    console.log('Submitting values:', values);
    // simulate async save
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  useEffect(() => {
    // get admin details
    const adminId = token ? decodeToken(token)._id : undefined;

    getUserProfile(adminId as string, token as string)
      .then((res) => {
        const existingWorkingHours = res.data.data.workingHoures || [];

        // merge admin working hours from DB with days of the week
        const merge = days.map((day) => {
          const existingHours = existingWorkingHours.find(
            (d: IWorkingHours) => d.day === day
          );

          return (
            existingHours || {
              day,
              startTime: '10:00',
              endTime: '17:00',
              dayOff: true,
            }
          );
        });

        setWorkingHours(merge);
      })
      .catch((error) => errorMsg(error.response.data.msg));
  }, [token]);

  return (
    <AdminLayout>
      <section>
        <div className='card'>
          <h2 className='text-2xl md:text-4xl font-bold mb-2'>
            Manage Working Hours
          </h2>
          <p className='text-sm md:text-base text-slate-700 dark:text-slate-400'>
            Set your weekly working hours and day off.
          </p>
        </div>

        <div className='card mt-4'>
          <h3 className='flex items-center gap-2 text-xl bg-white dark:bg-slate-950 border border-slate-200 rounded-lg divide-y divide-slate-200 dark:border-slate-800 dark:divide-slate-800 py-6 px-4'>
            <i className='ri-time-line text-rose-600' />
            <span className=''>Weekly Working Hours</span>
          </h3>

          {workingHours.length !== 0 && (
            <Formik<{ workingHours: IWorkingHours[] }>
              initialValues={{ workingHours }}
              enableReinitialize
              validationSchema={workingHoursSchema}
              onSubmit={handleWorkingHours}
            >
              {({ isSubmitting, values }) => (
                <Form className='flex flex-col'>
                  {values.workingHours.map((dayEntry, index) => (
                    <div
                      key={index}
                      className='grid items-center grid-cols-1 md:grid-cols-[_1fr_2fr_2fr] gap-2 md:gap-8 py-6 px-4 [&:not(:last-child)]:border-b border-slate-200 dark:border-slate-800'
                    >
                      <span className='font-bold'>{dayEntry.day}</span>
                      <div className='flex gap-2'>
                        <FormikInput
                          label='Start'
                          name={`workingHours[${index}].startTime`}
                          type='time'
                        />

                        <FormikInput
                          label='End'
                          name={`workingHours[${index}].endTime`}
                          type='time'
                        />
                      </div>

                      <FormikToggleSwitch
                        text='day off'
                        name={`workingHours[${index}].dayOff`}
                      />
                    </div>
                  ))}

                  <div className='mt-6'>
                    <Button type='submit' disabled={isSubmitting} size='sm'>
                      {isSubmitting ? 'Saving...' : 'Save Working Hours'}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </section>
    </AdminLayout>
  );
};

export default ManageWorkingHours;
