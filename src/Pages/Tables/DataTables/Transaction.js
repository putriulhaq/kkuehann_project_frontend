import React, { useState, useEffect, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { DropdownItem, DropdownMenu, DropdownToggle, Input, UncontrolledDropdown } from 'reactstrap';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { Link } from 'react-router-dom';
import * as url from "../../../helpers/url_helper";
import { APIClient } from '../../../helpers/api_helper';

const api = new APIClient()

const BASE_URL = "http://127.0.0.1:5000"

const Transaction= () => {
    const [data, setData] = useState([]);

    const fetchData = () => {
        api.get(BASE_URL+ url.GET_MENUS).then(data => setData(data))
    }

    useEffect(() => {
        fetchData()
    }, []);

    const columns = [
        {
            name: <span className='font-weight-bold fs-13'>No.</span>,
            selector: (row, index) => index + 1,
            sortable: true
        },
        {
            name: <span className='font-weight-bold fs-13'>Menu ID</span>,
            selector: row => row.menu_id,
            sortable: true
        },
        {
            name: <span className='font-weight-bold fs-13'>Menu Name</span>,
            selector: row => row.menu_name,
            sortable: true
        },
        {
            name: <span className='font-weight-bold fs-13'>Pricelist</span>,
            selector: row => row.pricelist,
            sortable: true
        },
        {
            name: <span className='font-weight-bold fs-13'>Action</span>,
            sortable: true,

            cell: () => {
                return (    
                    <UncontrolledDropdown className="dropdown d-inline-block">
                        <DropdownToggle className="btn btn-soft-secondary btn-sm" tag="button">
                            <i className="ri-more-fill align-middle"></i>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end">
                            <DropdownItem href="#!"><i className="ri-eye-fill align-bottom me-2 text-muted"></i>View</DropdownItem>
                            <DropdownItem className='edit-item-btn'><i className="ri-pencil-fill align-bottom me-2 text-muted"></i>Edit</DropdownItem>
                            <DropdownItem className='remove-item-btn'> <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Delete </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                );
            },
        },
    ];
    return(
    <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tables" breadcrumbItem="Datatables" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h5 className="card-title mb-0">Basic Datatables</h5>
                                </CardHeader>
                                <CardBody>
                                <DataTable
                                    columns={columns}
                                    data={data}
                                    pagination
                                />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
    </React.Fragment>
    )
};

export default Transaction