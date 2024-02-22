import React, { FC, useState } from 'react';
import { debounce } from 'lodash';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { searchCriteria } from '../models/battery';

interface BatterySearchFormProps {
    onSearch: (searchCriteria: searchCriteria) => void;
}

const BatterySearchForm:FC<BatterySearchFormProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [postCodeStart, setPostcodeStart] = useState('');
    const [postCodeEnd, setPostcodeEnd] = useState('');

    const handleSearch = () => {
        if (postCodeStart && !postCodeEnd) {
            alert("Please provide Postcode End value.");
            return;
        }
        onSearch({ searchTerm, postCodeStart, postCodeEnd });
    };

    const handleSearchDebounced = debounce(handleSearch, 800);

    return (
        <Form>
            <Row>
                <Col sm={5}>
                    <Form.Control
                        type="text"
                        placeholder="Search here"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Col>
                <Col sm={4}>
                    <Form.Control
                        type="text"
                        placeholder="Enter post code start"
                        value={postCodeStart}
                        onChange={(e) => setPostcodeStart(e.target.value)}
                    />
                    <Form.Control
                        type="text"
                        placeholder="Enter post code end"
                        value={postCodeEnd}
                        onChange={(e) => setPostcodeEnd(e.target.value)}
                    />
                </Col>
                <Col sm={3}>
                    <Button variant="primary" onClick={() => { handleSearchDebounced.cancel(); handleSearch(); }}>
                        Search
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default BatterySearchForm;
