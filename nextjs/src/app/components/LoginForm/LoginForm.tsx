'use client'

import React from 'react'
import { useState } from "react";
import { signIn } from 'next-auth/react';
import { Input } from '../Forms/Input/Input';
import { useRouter, useSearchParams } from 'next/navigation';
import { Form, Formik } from "formik";

import { ToastValuesModel } from '@/app/models/Global';
import { AuthenticationValidationSchema } from '@/app/shared/validations/AuthenticationValidationSchema';

import classes from "./LoginForm.module.scss";
import { StatusToast } from '../StatusToast/StatusToast';

export const LoginForm = () => {

    const [toastValues, setToastValues] = useState<ToastValuesModel>({
        visible: false,
        action: "",
        message: "",
        status: "",
    });

    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || "/";

    const [loading, isLoading] = useState(false);

    const initialValues = {
        password: "",
        username: "",
    };

    return (
        <>
            <section className="vh-100 d-flex align-items-center justify-content-center">
                <div className="container">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-md-8 col-lg-6 col-xl-5">
                            <div className="card shadow-lg rounded-4">
                                <div className="card-body p-5 text-center">
                                    <div className="mb-4">
                                        <i className="fas fa-user-circle fa-3x text-primary"></i>
                                        <h3 className="fw-bold mt-3">Welcome Back</h3>
                                        <p className="text-muted">Please login to your account</p>
                                    </div>
                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={AuthenticationValidationSchema}
                                        enableReinitialize
                                        onSubmit={async (values) => {
                                            isLoading(true);
                                            try {
                                                const loginResponse = await signIn("credentials", {
                                                    redirect: false,
                                                    username: values.username,
                                                    password: values.password,
                                                    callbackUrl: `${callbackUrl}`,
                                                }) as any;
                                           
                                                if (!loginResponse.ok) {
                                                    isLoading(false);
                                                    setToastValues({
                                                        message: loginResponse?.error,
                                                        status: "FAILED",
                                                        visible: true,
                                                        action: "status"
                                                    });
                                                }
                                                else if (loginResponse.ok) {
                                                    isLoading(false);
                                                    router.push('/blog-listing')
                                                }
                                            } catch (error) {
                                                isLoading(false);
                                                throw new Error(`Request failed`);
                                            }
                                        }}
                                    >
                                        {({ handleSubmit, values, handleChange, touched, errors }) => (
                                            <div className={classes.form}>
                                                <div className={classes.existing}>

                                                    <Form noValidate onSubmit={handleSubmit}>
                                                        <Input
                                                            type="text"
                                                            name="username"
                                                            id="username"
                                                            value={values || ''}
                                                            onChange={handleChange}
                                                            required
                                                            label="Username"
                                                            error={errors}
                                                            touched={touched}
                                                        />
                                                        <Input
                                                            type="password"
                                                            name="password"
                                                            id="password"
                                                            value={values || ''}
                                                            onChange={handleChange}
                                                            required
                                                            label="Password"
                                                            error={errors}
                                                            touched={touched}
                                                        />
                                                        <button
                                                            type="submit"
                                                            className="btn btn-primary btn-lg w-100 mb-3 position-relative d-flex align-items-center justify-content-center"
                                                            disabled={loading}
                                                        >
                                                            {loading ? (
                                                                <>
                                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                                    <span>Signing in</span>
                                                                </>
                                                            ) : (
                                                                <span>Sign In</span>
                                                            )}
                                                        </button>
                                                    </Form>
                                                </div>
                                            </div>
                                        )}

                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {
                toastValues?.action === "status" &&
                <StatusToast
                    toastValues={toastValues}
                    setToastValues={setToastValues} />
            }
        </>
    )
}

export default LoginForm