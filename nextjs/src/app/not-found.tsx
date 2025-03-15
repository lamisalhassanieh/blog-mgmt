import Link from 'next/link'

import React, { Fragment } from "react";

export default function NotFound() {
  return (
    <>
      <html>
        <body>
          <Fragment>
            not found
            {/* <Seo title={"Error"} /> */}
            <div className="page error-bg">
              {/* <!-- Start::error-page --> */}
              {/* <div className="error-page">
                <div className="container">
                  <div className="my-auto">
                    <Row className="align-items-center justify-content-center h-100">
                      <Col xl={4} lg={5} md={6} className="col-12">
                        <p className="error-text mb-4 text-fixed-white">404</p>
                        <p className="fs-3 fw-normal mb-3 text-fixed-white">Oops, the page you are trying to access does not exist ?</p>
                        <p className="fs-16 text-fixed-white mb-5 op-8">The requested page is not available. It might have been relocated, deleted, or never existed.</p>
                        <Link scroll={false} href="/dashboard/" className="btn btn-primary"><i className="ri-arrow-left-line align-middle me-1 d-inline-block"></i>BACK TO HOME</Link>
                      </Col>
                      <Col xl={4} lg={5} md={6} className="d-md-block d-none">
                        <img src="../../assets/images/media/gif/1.gif" alt="" className="bg-white-transparent rounded-circle backdrop-blur img-fluid" />
                      </Col>
                    </Row>
                  </div>
                </div>
              </div> */}
            </div>
          </Fragment>
        </body>
      </html>
    </>
  )
}