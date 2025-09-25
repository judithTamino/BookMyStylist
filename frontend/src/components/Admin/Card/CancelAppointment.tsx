import type { FunctionComponent } from "react";
import Modal from "../../UI/Modal/Modal";

interface CancelAppointmentProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  appointmentId:string;
}
 
const CancelAppointment: FunctionComponent<CancelAppointmentProps> = (props) => {
  const {open, setOpen, appointmentId} = props;
  return (
         <Modal
            open={open}
            variant='danger'
            icon={<i className='ri-delete-bin-line text-red-500' />}
            title='Are you sure?'
            contect={` Do you really want to continue? This action cannot be undone.`}
            cancelBtn={() => setOpen(false)}
            primaryBtn={() => handleDeleteProfile()}
          />
  );
}
 
export default CancelAppointment;