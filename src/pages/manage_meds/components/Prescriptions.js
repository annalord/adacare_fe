import Table from 'react-bootstrap/Table';

const Prescriptions = (props) =>  {
  return (
    <div>
      <p>Prescription Medications</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Time</th>
            <th>Dosage</th>
            <th>Notes</th>
            <th>Refill Date</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((med) => {
            return (
              <tr key={med.id}>
                <td>{med.med_name}</td>
                <td>{med.time}</td>
                <td>{med.dosage}</td>
                <td>{med.notes}</td>
                <td>{med.refill_date}</td>

              </tr>
            )
          })}


        </tbody>
      </Table>
    </div>
  );
}

export default Prescriptions;