import Link from 'next/link'

import React, { Fragment } from "react";

export default function NotFound() {
  return (
    <>
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center p-4">
          <h1 className="display-1 fw-bold text-primary mb-4">404</h1>
          <h2 className="h4 mb-4">Page Not Found</h2>
          <Link
            href="/"
            className="btn btn-primary"
          >
            <i className="bi bi-house-door me-2"></i>
            Back to Home
          </Link>
        </div>
      </div>
    </>
  )
}