import React, { useState, useEffect } from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    Col,
    Row,
} from "reactstrap";

import { CardInformationData } from '../../CommonData/Data/index';

const OrderStatus = () => {
    const filter_data = CardInformationData();

    const [filteredData, setFilteredData] = useState([]);

    const colorMap = {
        "Completed": "success",
        "Pending": "warning",
        "Cancel": "danger"
    };

    const iconMap = {
        "Completed": "ri-checkbox-circle-line",
        "Pending": "ri-calendar-2-line",
        "Cancel": "ri-close-circle-line"
    };

    useEffect(() => {
        // Filter data to only include items with name "Completed", "Pending", or "Cancel"
        const filtered = filter_data.filter(item => 
            item.name === "Completed" || item.name === "Pending" || item.name === "Cancel"
        );
        setFilteredData(filtered);
    }, [filter_data]);

    return (
        <React.Fragment>
            <Col xl={4}>
                <Card>
                    <CardBody>
                        <CardTitle>Order Status</CardTitle>
                        <div>
                            <ul className="list-unstyled">
                                {filteredData.map((item, key) => (
                                    <li key={key} className="py-3">
                                        <div className="d-flex">
                                            <div className="avatar-xs align-self-center me-3">
                                                <div className="avatar-title rounded-circle bg-light text-primary font-size-18">
                                                    <i className={iconMap[item.name]}></i>
                                                </div>
                                            </div>

                                            <div className="flex-grow-1">
                                                <p className="text-muted mb-2">{item.name}</p>
                                                <div className="progress progress-sm animated-progess">
                                                    <div className={"progress-bar bg-" + colorMap[item.name]} role="progressbar" style={{ width: (item.total / 20) * 100 + "%" }}  aria-valuenow={item.total} aria-valuemin="0" aria-valuemax="10"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <hr />

                        <div className="text-center">
                            <Row>
                                {filteredData.map((item, key) => (
                                    <div key={key} className="col-4">
                                        <div className="mt-2">
                                            <p className="text-muted mb-2">{item.name}</p>
                                            <h5 className="font-size-16 mb-0">{item.total}</h5>
                                        </div>
                                    </div>
                                ))}
                            </Row>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
}

export default OrderStatus;
