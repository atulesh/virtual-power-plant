import React, { ChangeEvent, FC, useState } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import { Initial_Battery_Data } from '../constant';
import { Battery } from '../models/battery';
import { addBattery } from '../services/batteryService';

interface BatteryModalProps {
  open: boolean;
  onClose: () => void;
  fetchBatteryData: () => Promise<void>;
}

const BatteryFormModal: FC<BatteryModalProps> = ({ open, onClose, fetchBatteryData }) => {
  const [batteryData, setBatteryData] = useState<Battery>(Initial_Battery_Data);

  const [validationErrors, setValidationErrors] = useState({
    name: '',
    postcode: '',
    wattCapacity: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBatteryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!batteryData.name || !batteryData.postcode || !batteryData.wattCapacity) {
      setValidationErrors({
        name: batteryData.name ? '' : 'Name is required',
        postcode: batteryData.postcode ? '' : 'Post Code is required',
        wattCapacity: batteryData.wattCapacity ? '' : 'Watt Capacity is required',
      });
      return;
    }

    try {
      const response = await addBattery(batteryData);
      console.log('POST request successful', response);
      fetchBatteryData();
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Modal show={open} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Battery Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Col} controlId="formBatteryName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter battery name"
              name="name"
              value={batteryData.name}
              onChange={handleChange}
              isInvalid={!!validationErrors.name}
            />
            <Form.Control.Feedback type="invalid">{validationErrors.name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="formBatteryPostCode">
            <Form.Label>Post Code</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter post code"
              name="postcode"
              value={batteryData.postcode}
              onChange={handleChange}
              isInvalid={!!validationErrors.postcode}
            />
            <Form.Control.Feedback type="invalid">{validationErrors.postcode}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="formBatteryWattCapacity">
            <Form.Label>Watt Capacity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter watt capacity"
              name="wattCapacity"
              value={batteryData.wattCapacity}
              onChange={handleChange}
              isInvalid={!!validationErrors.wattCapacity}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.wattCapacity}
            </Form.Control.Feedback>
          </Form.Group>

          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BatteryFormModal;
