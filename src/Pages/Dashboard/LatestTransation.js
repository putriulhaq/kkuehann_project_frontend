import React from 'react';

import { Row, Col } from 'reactstrap';

import { LatestTransactionData } from '../../CommonData/Data/index';

const LatestTransation = () => {


    const data_latest = LatestTransactionData()
    const item = data_latest.map((data,item)  => item)
    return (
        <React.Fragment>
            <Row>
                <Col lg={12}>
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title mb-4">Latest Transaction</h4>

                            <div className="table-responsive">
                                <table className="table table-centered table-nowrap mb-0">

                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Status Order</th>
                                            <th scope="col">Status Payment</th>
                                            <th scope="col">Date</th>
                                            {/* <th scope="col">Action</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data_latest.map((item, key) => (
                                            <tr key={key}>
                                            <td>{key + 1}</td>
                                            <td>{item.cust_name}</td>
                                            <td>Rp. {item.total}</td>
                                            <td>{item.order_status}</td>
                                            <td>{item.transaction_status}</td>
                                            <td>{item.req_date_order}</td>
                                        </tr>))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default LatestTransation;