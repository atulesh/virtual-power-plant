import React, { FC } from 'react';
import { Card } from 'react-bootstrap';
import { IBattery } from '../models/battery';

interface BatteryListProps{
  batteryData: IBattery[];
}
const BatteryList:FC<BatteryListProps> = ({batteryData}) => {
  return (
    <>
     {batteryData.map((battery) => (
          <Card key={battery.id} style={{ width: '18rem', marginBottom: '1rem' }}>
            <Card.Body>
              <Card.Title>{battery.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{battery.postcode}</Card.Subtitle>
              <Card.Text>Watt Capacity: {battery.wattCapacity}</Card.Text>
            </Card.Body>
          </Card>
        ))}
    </>
  );
};

export default BatteryList;
