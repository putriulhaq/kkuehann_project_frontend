import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';
import List from 'list.js';
import * as url from "../../../helpers/url_helper";
import { APIClient } from '../../../helpers/api_helper';
// Import Flatepicker
import Flatpickr from "react-flatpickr";

const api = new APIClient()

const BASE_URL = "http://127.0.0.1:5000"

const OrderStatusTables = () => {
    const [modal_list, setmodal_list] = useState(false);
    const [orders, setOrders] = useState([]);
    const[editMode, setEditMode] = useState(false)
    const [formData, setFormData] = useState({
        address_order: "",
        order_status: "",
        cust_name:""
    });


    function tog_list() {
        setmodal_list(!modal_list);
    }

    const [modal_delete, setmodal_delete] = useState(false);
    function tog_delete() {
        setmodal_delete(!modal_delete);
    }


    const fetchData = () => {
        api.get(BASE_URL+ url.GET_ORDER).then(data => setOrders(data))
    }

    const submitOrder = (e) => {
        e.preventDefault()
        console.log(formData.order_status)
        api.update(`${BASE_URL}${url.UPDATE_ORDERSTATUS}/${formData.order_detail_id}`, formData).then((res) => {
            fetchData(); // Fetch the updated data
            setmodal_list(false); // Close the modal
            setEditMode(false); // Reset edit mode
        })
        .catch((error) => console.error('Error:', error));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });

    }

    const handleEditClick = (data) => {
        console.log(data)
        setFormData(data)
        setEditMode(true)
        tog_list();
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tables" breadcrumbItem="Order Tables" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                {/* <CardHeader>
                                    <h4 className="card-title mb-0">Order Tables</h4>
                                </CardHeader> */}

                                <CardBody>
                                    <div id="customerList">
                                        <Row className="g-4 mb-3">
                                            <Col className="col-sm-auto">
                                                <div className="d-flex gap-1">
                                                    {/* <Button color="success" className="add-btn" onClick={() => tog_list()} id="create-btn"><i className="ri-add-line align-bottom me-1"></i> Add</Button> */}
                                                    {/* <Button color="soft-danger"
                                                    // onClick="deleteMultiple()"
                                                    ><i className="ri-delete-bin-2-line"></i></Button> */}
                                                </div>
                                            </Col>
                                            <Col className="col-sm">
                                                <div className="d-flex justify-content-sm-end">
                                                    <div className="search-box ms-2">
                                                        <input type="text" className="form-control search" placeholder="Search..." />
                                                        <i className="ri-search-line search-icon"></i>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>

                                        <div className="table-responsive table-card mt-3 mb-1">
                                            <table className="table align-middle table-nowrap" id="customerTable">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th scope="col" style={{ width: "50px" }}>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" id="checkAll" value="option" />
                                                            </div>
                                                        </th>
                                                        <th className="sort" data-sort="customer_name">Customer</th>
                                                        <th className="sort" data-sort="email">Address Order</th>
                                                        <th className="sort" data-sort="phone">Phone</th>
                                                        <th className="sort" data-sort="date">Request Date</th>
                                                        <th className="sort" data-sort="status">Order Status</th>
                                                        <th className="sort" data-sort="action">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    {orders.map((data,index) => (
                                                    <tr key={index}> 
                                                        <th scope="row">
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" name="chk_child" value="option1" />
                                                            </div>
                                                        </th>
                                                        <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2101</Link></td>
                                                        <td className="customer_name">{data.cust_name}</td>
                                                        <td className="email">{data.address_order}</td>
                                                        <td className="phone">{data.no_tlp}</td>
                                                        <td className="date">{data.req_date_order}</td>
                                                        <td className="status"><span className="badge badge-soft-success text-uppercase">{data.order_status_name ? data.order_status_name : '-'}</span></td>
                                                        <td>
                                                            <div className="d-flex gap-2">
                                                                <div className="edit">
                                                                    <button className="btn btn-sm btn-success edit-item-btn"
                                                                        data-bs-toggle="modal" data-bs-target="#showModal" onClick={() => handleEditClick(data)}>Edit</button>
                                                                </div>
                                                                <div className="remove">
                                                                    <button className="btn btn-sm btn-danger remove-item-btn" data-bs-toggle="modal" data-bs-target="#deleteRecordModal">Remove</button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    ))}

                                                </tbody>
                                            </table>
                                            <div className="noresult" style={{ display: "none" }}>
                                                <div className="text-center">
                                                    <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop"
                                                        colors="primary:#121331,secondary:#08a88a" style={{ width: "75px", height: "75px" }}>
                                                    </lord-icon>
                                                    <h5 className="mt-2">Sorry! No Result Found</h5>
                                                    <p className="text-muted mb-0">We've searched more than 150+ Orders We did not find any
                                                        orders for you search.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-end">
                                            <div className="pagination-wrap hstack gap-2">
                                                <Link className="page-item pagination-prev disabled" to="#">
                                                    Previous
                                                </Link>
                                                <ul className="pagination listjs-pagination mb-0"></ul>
                                                <Link className="page-item pagination-next" to="#">
                                                    Next
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Add Modal */}
            <Modal isOpen={modal_list} toggle={() => { tog_list(); }} centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { tog_list(); }}> Edit Order </ModalHeader>
                <form className="tablelist-form" onSubmit={submitOrder}>
                    <ModalBody>
                        <div className="mb-3" id="modal-id" style={{ display: "none" }}>
                            <label htmlFor="id-field" className="form-label">ID</label>
                            <input type="text" id="id-field" className="form-control" placeholder="ID" value={handleChange} readOnly />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="customername-field" className="form-label">Customer Name</label>
                            <input type="text" id="customername-field" className="form-control" name='cust_name' placeholder="Enter Name" onChange={handleChange} value={formData.cust_name} required readOnly/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email-field" className="form-label">Address</label>
                            <input type="text" id="email-field" className="form-control" placeholder="Enter Address" name='address_order' onChange={handleChange} required value={formData.address_order}/>
                        </div>

                        <div>
                            <label htmlFor="status-field" className="form-label">Status</label>
                            <select className="form-control" data-trigger name="order_status" id="status-field" onChange={handleChange} value={formData.order_status} >
                                <option value="">Status</option>
                                <option value="005001">Completed</option>
                                <option value="005002">Cancel</option>
                                <option value="005003">Pending</option>
                            </select>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={() => setmodal_list(false)}>Close</button>
                            <button type="submit" className="btn btn-success" id="add-btn">Edit Order Status</button>
                            {/* <button type="button" className="btn btn-success" id="edit-btn">Update</button> */}
                        </div>
                    </ModalFooter>
                </form>
            </Modal>

            {/* Remove Modal */}
            <Modal isOpen={modal_delete} toggle={() => { tog_delete(); }} className="modal fade zoomIn" id="deleteRecordModal" centered >
                <div className="modal-header">
                    <Button type="button" onClick={() => setmodal_delete(false)} className="btn-close" aria-label="Close"> </Button>
                </div>
                <ModalBody>
                    <div className="mt-2 text-center">
                        <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop"
                            colors="primary:#f7b84b,secondary:#f06548" style={{ width: "100px", height: "100px" }}></lord-icon>
                        <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                            <h4>Are you Sure ?</h4>
                            <p className="text-muted mx-4 mb-0">Are you Sure You want to Remove this Record ?</p>
                        </div>
                    </div>
                    <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                        <button type="button" className="btn w-sm btn-light" onClick={() => setmodal_delete(false)}>Close</button>
                        <button type="button" className="btn w-sm btn-danger " id="delete-record">Yes, Delete It!</button>
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
};

export default OrderStatusTables;
