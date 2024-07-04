// import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import React, { useState, useEffect } from 'react';

import RadialChart1 from "./userpanelChart1";
import RadialChart2 from "./userpanelChart2";
import RadialChart3 from "./userpanelChart3";
import { CardInformationData } from "../../CommonData/Data";

const UserPanel = () => {
    const filter_data = CardInformationData();

    const [card_data, setCardData] = useState([]);

    const colorMap = {
        "Completed": "success",
        "Cancel": "danger"
    };

    useEffect(() => {
        // Filter data to only include items with name "Completed", "Pending", or "Cancel"
        const filtered = filter_data.filter(item => 
            item.name === "Completed" || item.name === "Cancel" || item.name === "Customer" || item.name === "Order"
        );
        setCardData(filtered);
    }, [filter_data]);

  return (
    <React.Fragment>
      <Row>
        {card_data.map((item, key) => (
        <Col xl={3} sm={6} key={key}>
          <Card>
            <CardBody>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div className="avatar-sm">
                    <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                      <i className="ri-group-line"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">{item.name}</p>
                  <h5 className="mb-3">{item.total}</h5>
                  <p className="text-truncate mb-0">
                    {item.desc}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        ))}
      </Row>
    </React.Fragment>
  );
};

export default UserPanel;
