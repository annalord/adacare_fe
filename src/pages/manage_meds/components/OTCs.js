import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import EditMedModal from './EditMedModal';
import './OtcAndScript.css';

const OTCs = (props) => {
  const [isModalOpen, setIsModalOpen] = useState([]);

  const handleShow = (id) => {
    setIsModalOpen({ ...isModalOpen, [id]: true });
  };

  const handleClose = (id) => {
    setIsModalOpen({ ...isModalOpen, [id]: false });
  };

  return (
    <div className='component-container mt-2 mb-3'>
      <p className='table-header'>Over-the-Counter Medications</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Time</th>
            <th>Dosage</th>
            <th>Notes</th>
            <th>Refill Date</th>
            {/* <th>Refill Date</th> */}
          </tr>
        </thead>
        <tbody>
          {props.data.map((med) => {
            return (
              <tr key={med.id}>
                <td>
                  <button
                    onClick={() => handleShow(med.id)}
                    className='med-name-button'
                  >
                    {med.med_name}
                  </button>
                </td>
                <td>{med.time}</td>
                <td>{med.dosage}</td>
                <td>{med.notes}</td>
                <td>{med.refill_date}</td>
                <EditMedModal
                  isOpen={isModalOpen[med.id]}
                  handleClose={() => handleClose(med.id)}
                  currentMedData={med}
                  getOtcMeds={props.getOtcMeds}
                ></EditMedModal>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default OTCs;
