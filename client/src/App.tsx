import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import BatteryFormModal from './components/BatteryFormModal';
import { getBatteryList } from './services/batteryService';
import BatteryStatisticsChart from './components/BatteryStatisticsChart';
import { BatteryStatistic, IBattery } from './models/battery';
import BatteryList from './components/BatteryList';
import BatterySearchForm from './components/BatterySearchForm';

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [batteryData, setBatteryData] = useState<IBattery[]>([]);
  const [batteryStatistics, setBatteryStatistics] = useState<BatteryStatistic>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchBatteryData = async () => {
    try {
      const { batteryList, batteryStats } = await getBatteryList();
      setBatteryData(batteryList);
      setBatteryStatistics(batteryStats);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching batteries:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBatteryData();
  }, []);

  const handleSearch = async (searchCriteria: any) => {
    try {
      const { batteryList, batteryStats } = await getBatteryList(searchCriteria);
      setBatteryData(batteryList);
      setBatteryStatistics(batteryStats);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching batteries:', error);
      setIsLoading(false);
    }
  };


  const handleAddBatteryButtonClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="App">
        <Container>
          <div className="d-flex justify-content-end mt-2">
            <Button variant="primary" size="sm" onClick={handleAddBatteryButtonClick}>
              Add Battery
            </Button>
          </div>
          <hr />
          {isLoading ? (
          <h6>Loading...</h6>
        ) : batteryData.length === 0 ? (
          <h6>No batteries available. Try adding a battery.</h6>
        ) : (
          <>
           <div className="my-4">
            <BatterySearchForm onSearch={handleSearch} />
           </div>
           <hr />
           <Row>
            <Col sm={6}>
              <BatteryList batteryData={batteryData} />
            </Col>
            <Col sm={6}>
              <BatteryStatisticsChart batteryStatistics={batteryStatistics}  />
            </Col>
          </Row>
          </>
          )}
          <BatteryFormModal open={isModalOpen} onClose={() => setIsModalOpen(false)} fetchBatteryData={fetchBatteryData} />
      </Container>
    </div>
  );
}

export default App;
