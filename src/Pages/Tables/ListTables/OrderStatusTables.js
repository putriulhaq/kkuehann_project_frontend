import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Col, Container, Row, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { Link, useHistory, useNavigate } from 'react-router-dom';
import * as url from "../../../helpers/url_helper";
import { APIClient } from '../../../helpers/api_helper';
// import { useHistory } from 'react-router-dom'; // Import useHistory

const api = new APIClient();

const OrderStatusTables = () => {
    const [modal_list, setmodal_list] = useState(false);
    const [modal_delete, setmodal_delete] = useState(false);
    const [orders, setOrders] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [deleteId, setDeletedId] = useState(null);
    const [modal_detail, setModalDetail] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [formData, setFormData] = useState({
        address_order: "",
        order_status: "",
        cust_name: ""
    });

    const navigate = useNavigate()
    const handleProgressClick = () => {
        navigate('/form-progress', { state: { orderData: selectedOrder } });
    };

    function tog_list() {
        setmodal_list(!modal_list);
    }

    function tog_delete() {
        setmodal_delete(!modal_delete);
    }

    const toggleDetailModal = () => setModalDetail(!modal_detail);


    const fetchData = () => {
        api.get(url.GET_ORDER)
            .then(data => {
                if (Array.isArray(data)) {
                    setOrders(data);
                } else {
                    console.error('Expected an array of orders, but got:', data);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const submitOrder = (e) => {
        e.preventDefault();
        api.update(`${url.UPDATE_ORDERSTATUS}/${formData.order_detail_id}`, formData)
            .then((res) => {
                fetchData(); // Fetch the updated data
                setmodal_list(false); // Close the modal
                setEditMode(false); // Reset edit mode
            })
            .catch((error) => console.error('Error:', error));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleRemoveClick = (e, data) => {
        e.preventDefault();
        e.stopPropagation();
        setDeletedId(data);
        setmodal_delete(true);
    };

    const handleEditClick = (data) => {
        setFormData(data);
        setEditMode(true);
        tog_list();
    };

    const getStatusColorClass = (status) => {
        switch (status) {
            case "005001":
                return "badge-soft-success"; // Completed
            case "005002":
                return "badge-soft-danger"; // Cancel
            case "005003":
                return "badge-soft-warning"; // Pending
            default:
                return "badge-soft-secondary";
        }
    };

    const deletedData = async (id) => {
        try {
            // console.log(id);
            // setDeletedId(id);
            await api.update(`${url.DELETED_ORDER}/${id}`);
            fetchData(); // Fetch the updated list of orders
            setmodal_delete(false)
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tables" breadcrumbItem="Order Tables" />
                    <Row>
                        <Col lg={12}>
                            <Card>
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
                                            {/* <Col className="col-sm">
                                                <div className="d-flex justify-content-sm-end">
                                                    <div className="search-box ms-2">
                                                        <input type="text" className="form-control search" placeholder="Search..." />
                                                        <i className="ri-search-line search-icon"></i>
                                                    </div>
                                                </div>
                                            </Col> */}
                                        </Row>

                                        <div className="table-responsive table-card mt-3 mb-1">
                                            <table className="table align-middle table-nowrap" id="customerTable">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th className="sort" data-sort="customer_name">No</th>
                                                        <th className="sort" data-sort="customer_name">Customer</th>
                                                        <th className="sort" data-sort="email">Address Order</th>
                                                        <th className="sort" data-sort="phone">Phone</th>
                                                        <th className="sort" data-sort="date">Request Date</th>
                                                        <th className="sort" data-sort="status">Order Status</th>
                                                        <th className="sort" data-sort="action">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    {orders.map((data, index) => (
                                                        <tr key={index}>
                                                            <td className="customer_name">{index + 1}</td>
                                                            <td className="customer_name">{data.cust_name}</td>
                                                            <td className="email">{data.address_order}</td>
                                                            <td className="phone">{data.no_tlp}</td>
                                                            <td className="date">{data.req_date_order}</td>
                                                            <td className="status">
                                                                <span className={`badge ${getStatusColorClass(data.order_status)} text-uppercase`}>
                                                                    {data.order_status_name ? data.order_status_name : '-'}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex gap-2">
                                                                    <div className="edit">
                                                                        <button className="btn btn-sm btn-success edit-item-btn"
                                                                            data-bs-toggle="modal" data-bs-target="#showModal" onClick={() => { toggleDetailModal(); setSelectedOrder(data); }}>Detail</button>
                                                                    </div>
                                                                    <div className="edit">
                                                                        <button className="btn btn-sm btn-warning edit-item-btn"
                                                                            data-bs-toggle="modal" data-bs-target="#showModal" onClick={() => handleEditClick(data)}>Edit</button>
                                                                    </div>
                                                                    <div className="remove">
                                                                        <button className="btn btn-sm btn-danger remove-item-btn"
                                                                            data-bs-toggle="modal" data-bs-target="#deleteRecordModal" data-id={data.order_detail_id} onClick={(e) => handleRemoveClick(e, data.order_detail_id)}>Remove</button>
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
                                                    <p className="text-muted mb-0">We've searched more than 150+ Orders We did not find any orders for you search.</p>
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
            <Modal isOpen={modal_list} toggle={() => { tog_list(); }} centered>
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { tog_list(); }}> Edit Order </ModalHeader>
                <form className="tablelist-form" onSubmit={submitOrder}>
                    <ModalBody>
                        <div className="mb-3" id="modal-id" style={{ display: "none" }}>
                            <label htmlFor="id-field" className="form-label">ID</label>
                            <input type="text" id="id-field" className="form-control" placeholder="ID" value={handleChange} readOnly />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="customername-field" className="form-label">Customer Name</label>
                            <input type="text" id="customername-field" className="form-control" name='cust_name' placeholder="Enter Name" onChange={handleChange} value={formData.cust_name} required readOnly />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email-field" className="form-label">Address</label>
                            <input type="text" id="email-field" className="form-control" placeholder="Enter Address" name='address_order' onChange={handleChange} required value={formData.address_order} />
                        </div>

                        <div>
                            <label htmlFor="status-field" className="form-label">Status</label>
                            <select className="form-control" data-trigger name="order_status" id="status-field" onChange={handleChange} value={formData.order_status}>
                                <option value="" disabled>Status</option>
                                <option value="005004">In</option>
                                <option value="005005">Preparing</option>
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
                        </div>
                    </ModalFooter>
                </form>
            </Modal>

            {/* Remove Modal */}
            <Modal isOpen={modal_delete} toggle={() => setmodal_delete(!modal_delete)} centered>
                <ModalHeader toggle={() => setmodal_delete(!modal_delete)}>
                    Confirm Delete
                </ModalHeader>
                <ModalBody>
                    <div className="mt-2 text-center">
                        <lord-icon
                            src="https://cdn.lordicon.com/gsqxdxog.json"
                            trigger="loop"
                            colors="primary:#f7b84b,secondary:#f06548"
                            style={{ width: "100px", height: "100px" }}
                        ></lord-icon>
                        <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                            <h4>Are you Sure?</h4>
                            <p className="text-muted mx-4 mb-0">Are you Sure You want to Remove this Record?</p>
                        </div>
                    </div>
                    <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                        <Button color="light" onClick={() => setmodal_delete(false)}>Close</Button>
                        <Button color="danger" onClick={() => deletedData(deleteId)}>Yes, Delete It!</Button>
                    </div>
                </ModalBody>
            </Modal>

            <Modal isOpen={modal_detail} toggle={toggleDetailModal} centered>
            <ModalHeader toggle={toggleDetailModal} style={{ backgroundColor: '#f0f0f0', borderBottom: '1px solid #ccc' }}>Order Detail</ModalHeader>
            <ModalBody style={{ fontSize: '16px', lineHeight: '1.6' }}>
                {selectedOrder && (
                    <div>
                        <p><strong>Customer Name:</strong> {selectedOrder.cust_name}</p>
                        <p><strong>Address:</strong> {selectedOrder.address_order}</p>
                        <p><strong>Phone:</strong> {selectedOrder.no_tlp}</p>
                        <p><strong>Order Status:</strong> {selectedOrder.order_status_name}</p>
                        <p><strong>Created At:</strong> {new Date(selectedOrder.created_at).toLocaleString()}</p>
                        <p><strong>Requested Date:</strong> {new Date(selectedOrder.req_date_order).toLocaleString()}</p>
                        <p><strong>Menu:</strong></p>
                        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                            {selectedOrder.menu.map((item, index) => (
                                <li key={index} style={{ marginBottom: '5px' }}>{item}: {selectedOrder.quantity[index]}</li>
                            ))}
                        </ul>
                        <p><strong>Total: </strong> {selectedOrder.total}</p>
                    </div>
                )}
            </ModalBody>
            <ModalFooter style={{ backgroundColor: '#f0f0f0', borderTop: '1px solid #ccc' }}>
                <Button color="secondary" onClick={toggleDetailModal}>Close</Button>
                <Button color="primary" onClick={handleProgressClick}>Progress</Button>
            </ModalFooter>
        </Modal>

        </React.Fragment>
    );
};

export default OrderStatusTables;
