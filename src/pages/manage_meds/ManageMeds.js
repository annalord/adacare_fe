import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import AddMedModal from './components/AddMedModal.js'
import { getMedsApi } from '../../api/MedsAPI.js'
import NavBar from '../../misc_components/NavBar.js';
import './ManageMeds.css'
import Prescriptions from './components/Prescriptions.js';
import OTCs from './components/OTCs.js';

const ManageMeds = () => {

  const [prescriptionData, setPrescriptionData] = useState([]);
  const [otcData, setOtcData] = useState([]);

  const getPrescriptionMeds = async () => {
    const data = await getMedsApi('True');
    setPrescriptionData(data);
  };

  const getOtcMeds = async () => {
    const data = await getMedsApi('False');
    setOtcData(data);
  };

  useEffect( () => {
    getPrescriptionMeds();
    getOtcMeds();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleShow = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <div >
      <Row>
        <NavBar />
      </Row>

      <Row className='pl-4'>
        <div>Click on a medication's name to edit or delete</div>
        <Button onClick={handleShow} id='add-event-button' className='ml-3 mr-3'> Click here to add a new medication </Button> 
            <AddMedModal
            isOpen={isModalOpen}
            handleClose={handleClose}
            getPrescriptionMeds={getPrescriptionMeds}
            getOtcMeds={getOtcMeds}
            />
      </Row>

      <Row className='pl-4'>
        <Prescriptions data={prescriptionData} getPrescriptionMeds={getPrescriptionMeds}/>
      </Row>

      <Row className='pl-4'>
        <OTCs data={otcData} getOtcMeds={getOtcMeds}/>
      </Row>

    </div>
  )
};

export default ManageMeds;