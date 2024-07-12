import React, { useEffect, useState } from "react";

import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  TabContent,
  TabPane,
  Progress,
  NavLink,
  NavItem,
} from "reactstrap";

import classnames from "classnames";
import { Link, useLocation } from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import OrderStatus from "../Dashboard/OrderStatus";

const FormProgress = ({data}) => {
  document.title = "Progress | KKUEHANN";
  const progressData = useLocation().state
  const [activeTab, setactiveTab] = useState(1);
  const [activeTabwiz, setoggleTabwiz] = useState(1);

  const [passedSteps, setPassedSteps] = useState([1]);
  const [passedStepswiz, setpassedStepswiz] = useState([1]);

  function toggleTab(tab) {
    if (activeTab !== tab) {
      var modifiedSteps = [...passedSteps, tab];
      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab);
        setPassedSteps(modifiedSteps);
      }
    }
  }

  function toggleTabwiz(tab) {
    if (activeTabwiz !== tab) {
      var modifiedSteps = [...passedStepswiz, tab];
      if (tab >= 1 && tab <= 4) {
        setoggleTabwiz(tab);
        setpassedStepswiz(modifiedSteps);
      }
    }
  }

  const posisitonProgress = () => {
    const orderStatus = progressData.orderData.order_status
    const delivery_status = progressData.orderData.delivery_status
    if (delivery_status === '007001' || orderStatus === '005001'){
      setactiveTab(4)
    } else if (delivery_status === '007002' && orderStatus === '005005'){
      setactiveTab(3)
    } else if(orderStatus === '005004' && delivery_status === '007003'){
      setactiveTab(1)
    } else if(orderStatus === '005005' &&  delivery_status === '007003'){
      setactiveTab(2)
    } else {
      setactiveTab(1)
  }
}

  useEffect(() => {
    posisitonProgress();
  }, []); // Tambahkan dependensi sesuai kebutuhan

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Form Progress" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Progress Order</h4>
                  <div id="basic-pills-wizard" className="twitter-bs-wizard">
                    <ul className="twitter-bs-wizard-nav nav nav-pills nav-justified">
                      <NavItem className={classnames({ active: activeTab === 1 })}>
                        <NavLink
                          data-toggle="tab"
                          className={classnames({ active: activeTab === 1 })}
                          // onClick={() => {
                          //   setactiveTab(1);
                          // }}
                        >
                          <span className="step-number">01</span>
                          <span className="step-title" style={{ paddingLeft: "10px" }}>Order Received</span>
                        </NavLink>
                      </NavItem>
                      <NavItem className={classnames({ active: activeTab === 2 })}>
                        <NavLink
                          data-toggle="tab"
                          className={classnames({ active: activeTab === 2 })}
                          // onClick={() => {
                          //   setactiveTab(2);
                          // }}
                        >
                          <span className="step-number">02</span>
                          <span className="step-title" style={{ paddingLeft: "10px" }}>Preparing Order</span>
                        </NavLink>
                      </NavItem>

                      <NavItem className={classnames({ active: activeTab === 3 })}>
                        <NavLink
                          data-toggle="tab"
                          className={classnames({ active: activeTab === 3 })}
                          // onClick={() => {
                          //   setactiveTab(3);
                          // }}

                        >

                          <span className="step-number">03</span>
                          <span className="step-title" style={{ paddingLeft: "10px" }}>Delivery</span>
                        </NavLink>
                      </NavItem>
                      <NavItem className={classnames({ active: activeTab === 4 })}>
                        <NavLink
                          data-toggle="tab"
                          className={classnames({ active: activeTab === 4 })}
                          // onClick={() => {
                          //   setactiveTab(4);
                          // }}
                        >
                          <span className="step-number">04</span>
                          <span className="step-title" style={{ paddingLeft: "10px" }}>Success</span>
                        </NavLink>
                      </NavItem>
                    </ul>

                    <TabContent activeTab={activeTab} className="twitter-bs-wizard-tab-content">
                      <TabPane tabId={1}>
                        <Form>
                          <Row>
                            <Col lg="6">
                              <div className="mb-3">
                                <Label htmlFor="basicpill-firstname-input1">
                                  First name
                                </Label>
                                <Input
                                  className="form-control"
                                  id="basicpill-firstname-input1"
                                  value={progressData.orderData.cust_name}
                                  placeholder="Enter Your First Name"
                                  readOnly
                                />
                              </div>
                            </Col>
                            <Col lg="6">
                              <div className="mb-3">
                                <Label htmlFor="basicpill-lastname-input2">
                                  Request Date
                                </Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="basicpill-lastname-input2"
                                  value={progressData.orderData.req_date_order}
                                  readOnly
                                />
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col lg="6">
                              <div className="mb-3">
                                <Label htmlFor="basicpill-phoneno-input3">
                                  Phone
                                </Label>
                                <Input
                                  className="form-control"
                                  value={progressData.orderData.no_tlp}
                                  id="basicpill-phoneno-input3"
                                  placeholder="Enter Your Phone No."
                                  readOnly
                                />
                              </div>
                            </Col>
                            <Col lg="6">
                              <div className="mb-3">
                                <Label htmlFor="basicpill-email-input4">
                                  Address
                                </Label>
                                <Input
                                  type="email"
                                  className="form-control"
                                  id="basicpill-email-input4"
                                  value={progressData.orderData.address_order}
                                  readOnly
                                />
                              </div>
                            </Col>
                          </Row>
                        </Form>
                      </TabPane>

                      <TabPane tabId={2}>
                        <div>
                          <Form>
                          <Row>
                            <Col lg="5">
                              <FormGroup className="mb-3">
                                <Label htmlFor="basicpill-address-input12">
                                  Menu
                                </Label>
                                <textarea
                                  id="basicpill-address-input12"
                                  className="form-control"
                                  rows="2"
                                  value={progressData.orderData.menu.map((data, idx) => (
                                    `${idx + 1}. ${data} = ${progressData.orderData.quantity[idx]} buah`
                                  ))}
                                  readOnly
                                />
                              </FormGroup>
                            </Col>
                            </Row>
                          </Form>
                        </div>
                      </TabPane>
                      
                      <TabPane tabId={3}>
                        <div className="row justify-content-center">
                          <Col lg="6">
                            <div className="text-center">
                              <div className="mb-4">
                                <i className="mdi mdi-motorbike text-success display-4" />
                              </div>
                              <div>
                                <h5>On The way</h5>
                                <p className="text-muted">
                                  Your order is on the way by {progressData.orderData.address_order}
                                </p>
                              </div>
                            </div>
                          </Col>
                        </div>
                      </TabPane>

                      <TabPane tabId={4}>
                        <div className="row justify-content-center">
                          <Col lg="6">
                            <div className="text-center">
                              <div className="mb-4">
                                <i className="mdi mdi-check-circle-outline text-success display-4" />
                              </div>
                              <div>
                                <h5>Confirm Detail</h5>
                                <p className="text-muted">
                                  If several languages coalesce, the grammar
                                  of the resulting
                                </p>
                              </div>
                            </div>
                          </Col>
                        </div>
                      </TabPane>
                    </TabContent>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default FormProgress;
