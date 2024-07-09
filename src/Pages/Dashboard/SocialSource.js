import React from "react";
import RadialChart from "./RadialChart";

import { Card, CardBody, Col, Row } from "reactstrap";

import { SocialSourceData } from "../../CommonData/Data/index";

const SocialSource = () => {

  const top_selling_data = SocialSourceData() 

  const colors = ["#099680", "#4aa3ff", "#5664d2"]
  return (
    <React.Fragment>
      <Col xl={4}>
        <Card>
          <CardBody>
            <div className="d-flex  align-items-center">
              <div className="flex-grow-1">
                <h5 className="card-title">Social Source</h5>
              </div>
              <div className="flex-shrink-0">
              </div>
            </div>
            <RadialChart data={top_selling_data}/>
            <Row>
              {top_selling_data.map((item, key) => (
                <div key={key} className="col-4">
                  <div className="social-source text-center mt-3">
                    <div className="avatar-xs mx-auto mb-3">
                    <span
                        className="avatar-title rounded-circle font-size-18"
                        style={{ backgroundColor: colors[key % colors.length] }} // Mengatur warna berdasarkan index
                      >
                        <i className={item.icon + " text-white"}></i>
                      </span>
                    </div>
                    <h5 className="font-size-15">{item.menu_name}</h5>
                    <p className="text-muted mb-0">{item.order_count} times</p>
                  </div>
                </div>
              ))}
            </Row>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default SocialSource;
