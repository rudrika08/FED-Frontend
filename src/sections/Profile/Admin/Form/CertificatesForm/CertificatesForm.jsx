import { useParams } from 'react-router-dom';
import Input from '../../../../../components/Core/Input';

const CertificatesForm = () => {
  const { eventId } = useParams();
  
  return (
  <div>
    Event: {eventId}
    <Input type="text" label="Certificate Name" />
  
  </div>
  
);

};

export default CertificatesForm;
