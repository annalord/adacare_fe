import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import AddMedModal from './components/AddMedModal.js';
import { getMedsApi } from '../../api/MedsAPI.js';
import NavBar from '../../misc_components/NavBar.js';
import './ManageMeds.css';
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

  useEffect(() => {
    getPrescriptionMeds();
    getOtcMeds();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleShow = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <div id='manage-meds-container'>
      <Row>
        <NavBar />
      </Row>

      <Row className='mt-2'>
        <Col className='col-9' id='button-col'>
          <p className='bubble'>
            Click on an existing medication's name to edit its details or delete
            it
          </p>
        </Col>

        <Col>
          <Button
            onClick={handleShow}
            id='add-med-button'
            className='ml-3 mr-3 mt-5'
          >
            ✚ Add a new medication
          </Button>
          <AddMedModal
            isOpen={isModalOpen}
            handleClose={handleClose}
            getPrescriptionMeds={getPrescriptionMeds}
            getOtcMeds={getOtcMeds}
          />
        </Col>
      </Row>

      <div id='center-tables'>
        <Row className='pl-4'>
          <Prescriptions
            data={prescriptionData}
            getPrescriptionMeds={getPrescriptionMeds}
          />
        </Row>

        <Row className='pl-4'>
          <OTCs data={otcData} getOtcMeds={getOtcMeds} />
        </Row>
      </div>
    </div>
  );
};

export default ManageMeds;
