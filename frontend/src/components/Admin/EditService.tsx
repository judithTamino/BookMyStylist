import { type FunctionComponent } from 'react';
import type { IService } from '../../interface/service.interface';
import { Form, Formik } from 'formik';
import { serviceSchema } from '../../schemas/service.schema';
import FormikInput from '../UI/Input/Formik/FormikInput';
import FormikDropdown from '../UI/Input/Formik/FormikDropdown';
import Button from '../UI/Button/Button';
import FormikTextarea from '../UI/Input/Formik/FormikTextarea';
import FormikToggleSwitch from '../UI/Input/Formik/FormikToggleSwitch';
import { useAuth } from '../../context/auth.context';
import { updateService } from '../../services/services.service';
import { errorMsg, successMsg } from '../../services/toastify.service';

interface EditServiceProps {
  service: IService | undefined;
  open: boolean;
  close: () => void;
  onEdit: () => void;
}

const categories = [
  'haircuts & styling',
  'hair coloring',
  'hair treatments',
  'texture service',
  'extensions & add-ons',
  'bridal & events',
];

const EditService: FunctionComponent<EditServiceProps> = (props) => {
  const { service, open, close, onEdit } = props;
  const {token} = useAuth();
  
  const initialValues = {
    name: service?.name ?? '',
    description: service?.description ?? '',
    duration: service?.duration ?? 0,
    price: service?.price ?? 0,
    active: service?.active ?? true,
    category: service?.category ?? '',
  };

  const handleEditService = (values: IService) => {
    updateService(token as string, service?._id as string, values)
    .then(res => {
      successMsg(res.data.msg);
      onEdit();
      close();
    })
    .catch((error) => errorMsg(error.response.data.msg));
  };

  if (!open || !service) return null;

  return (
    <section className='bg-white dark:bg-slate-950 absolute top-0 left-0 w-full h-full'>
      <div className='card'>
        <div className=' flex items-center justify-between mb-8'>
          <h2 className='flex items-center gap-2 text-xl'>
            <i className='ri-scissors-2-line text-rose-600' />
            <span className=''>Edit Service</span>
          </h2>

          <i
            onClick={() => close()}
            className='ri-close-large-line cursor-pointer'
          />
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={serviceSchema}
          onSubmit={handleEditService}
        >
          {({ isSubmitting }) => (
            <Form className='grid grid-cols-1 gap-4 items-center'>
              <FormikInput label='Service Name' name='name' type='text' />
              <FormikDropdown name='category' categories={categories} />

              <div className='col-span-1 sm:col-span-2'>
                <FormikTextarea label='Description' name='description' />
              </div>

              <FormikInput
                label='Duration (minutes)'
                name='duration'
                type='number'
              />

              <FormikInput label='Price (ILS)' name='price' type='number' />

              <FormikToggleSwitch name='active' text='Active Service' />

              <div className=''>
                <Button type='submit' disabled={isSubmitting} size='sm'>
                  {isSubmitting ? 'Saving...' : 'Add Service'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default EditService;
