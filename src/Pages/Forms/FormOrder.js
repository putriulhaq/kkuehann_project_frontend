import React, { useState, useEffect } from "react";
import * as url from "../../../src/helpers/url_helper";
import { APIClient } from '../../../src/helpers/api_helper';

import {
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  Container,
  Label,
  Input,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const api = new APIClient()

const FormOrder = () => {
  document.title = "Form Orders | KKUEHANN";
  const [formElements, setFormElements] = useState([]); 
  const [dataMenu, setMenu] = useState([]); 
  const [formData, setFormData] = useState({
    cust_name: "",
    address: "",
    no_tlp: "",
    req_date_order: "",
    orderItems: [],
    deliveryType: "",
    deliveryStatus: "",
    transactionType: "",
    transactionStatus: ""
  });

    const fetchData = () => {
        api.get(url.GET_MENUS).then(data => setMenu(data))
    }
  

  const addFormElement = () => {
    setFormElements([...formElements, { menu_id: "", quantity: "" }]);
    setFormData({
        ...formData,
        orderItems: [...formData.orderItems, { menu_id: "", quantity: "" }],
      });
  };

  const removeFormElement = (index) => {
    const updatedElements = formElements.filter((_, i) => i !== index);
    setFormElements(updatedElements);

      // Update formData state
    const updatedOrderItems = formData.orderItems.filter((_, i) => i !== index);
    setFormData({
        ...formData,
        orderItems: updatedOrderItems,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name)
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOrderItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedOrderItems = [...formData.orderItems];
    updatedOrderItems[index][name] = value;
    setFormData({
      ...formData,
      orderItems: updatedOrderItems,
    });
  };

  // export const postSocialLogin = data => api.create(url.SOCIAL_LOGIN, data);

  const submitOrder = () => {
    console.log(formData);
    api.create(url.POST_ORDER, formData)
      .then((res) => {
        if (res.status === 'success') {
          // Assuming status 200 means success
          window.location.reload();
        } else {
          // Handle non-success status
          console.error('Order submission failed:', res);
        }
      })
      .catch((error) => {
        // Handle error
        console.error('Error submitting order:', error);
      });
  };
  

  useEffect(() => {
    fetchData()
    console.log(dataMenu)
}, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Form Order" />

          <Row>
            <Col>
              <Card>
                <CardBody>
                  {/* <CardTitle className="h4">Textual inputs</CardTitle>
                  <p className="card-title-desc">
                    Here are examples of <code>.form-control</code> applied to
                    each textual HTML5 <code>&lt;input&gt;</code>{" "}
                    <code>type</code>.
                  </p> */}

                  <Row className="mb-3">
                    <label htmlFor="example-text-input" className="col-md-2 col-form-label">
                        Customer name
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="text"
                        id="cust_name"
                        name="cust_name"
                        placeholder="Input Customer Name"
                        onChange={handleChange}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                        Address
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Address"
                        onChange={handleChange}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="example-tel-input"
                      className="col-md-2 col-form-label"
                    >
                      Telephone
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="tel"
                        id="no_tlp"
                        name="no_tlp"
                        placeholder="Telephone"
                        onChange={handleChange}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="example-datetime-local-input"
                      className="col-md-2 col-form-label"
                    >
                      Date and time
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="datetime-local"
                        id="req_date_order"
                        name="req_date_order"
                        onChange={handleChange}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label className="col-md-2 col-form-label">Menu</label>
                    <div class="col-md-2 d-flex justify-content-start align-items-center">
                    <button type="button" color="primary"  style={{borderRadius: "10px", width:"50%"}}>
                            <i class="bx bxs-cart-add" style={{ fontSize: "2em", cursor: "pointer" }}
                        onClick={addFormElement}></i>
                    </button>
                    </div>
                  </Row>

                  {formElements.map((element, index) => (
                    <Row className="mb-3" key={index}>
                      <div className="col-md-4 offset-md-2">
                      <select 
                        className="form-control" 
                        type="select"
                        name="menu_id"
                        value={formData.orderItems[index].menu_id}
                        onChange={(e) => handleOrderItemChange(index, e)}>
                        <option value="">Select</option>
                        {dataMenu.map((menu) => (
                            <option key={menu.menu_id} value={menu.menu_id}>
                              {menu.menu_name}
                            </option>
                        ))}
                      </select>
                      </div>
                      <div className="col-md-4">
                        <input
                          className="form-control"
                          type="text"
                          name="quantity"
                          placeholder="Input Quantity"
                          value={formData.orderItems[index].quantity}
                          onChange={(e) => handleOrderItemChange(index, e)}
                        />
                      </div>
                      <div class="col-md-2 d-flex justify-content-center align-items-center" >
                        <i class="dripicons-cross" style={{ fontSize: "1em", cursor: "pointer" }}
                         onClick={() => removeFormElement(index)}
                        ></i>
                    </div>
                    </Row>
                  ))}

                   <Row className="mb-3">
                      <label className="col-md-2 col-form-label">Delivery</label>
                      <div className="col-md-5">
                          <select 
                            className="form-control" 
                            type="select"
                            name="deliveryType"
                            value={formData.deliveryType}
                            onChange={handleChange}>
                            <option value="">Type</option>
                            <option value="006001">Grab</option>
                            <option value="006002">Gojek</option>
                            <option value="006003">COD</option>
                          </select>
                      </div>
                      <div className="col-md-5">
                          <select 
                            className="form-control" 
                            type="select"
                            name="deliveryStatus"
                            value={formData.deliveryStatus}
                            onChange={handleChange}>
                            <option value="">Status</option>
                            <option value="007001">Arrived</option>
                            <option value="007002">On The Way</option>
                            <option value="007003">Waiting</option>
                          </select>
                      </div>
                    </Row>

                   <Row className="mb-3">
                      <label className="col-md-2 col-form-label">Transaction</label>
                      <div className="col-md-5">
                          <select 
                            className="form-control" 
                            type="select"
                            name="transactionType"
                            value={formData.transactionType}
                            onChange={handleChange}>
                            <option value="">Type</option>
                            <option value="002001">Tunai</option>
                            <option value="002002">Non Tunai</option>
                          </select>
                      </div>
                      <div className="col-md-5">
                          <select 
                            className="form-control" 
                            type="select"
                            name="transactionStatus"
                            value={formData.transactionStatus}
                            onChange={handleChange}>
                            <option value="">Status</option>
                            <option value="003001">Success</option>
                            <option value="003002">Not Yet</option>
                          </select>
                      </div>
                    </Row>
                <Row>
                    <div className="col-12 d-flex justify-content-center align-items-center">
                        <button type="submit" className="btn btn-primary" onClick={submitOrder}>
                          Submit
                        </button>
                    </div>
                </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default FormOrder;
