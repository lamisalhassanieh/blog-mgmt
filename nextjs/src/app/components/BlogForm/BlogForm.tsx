'use client'

import { Fragment, useCallback, useEffect, useRef, useState } from "react"

//lib
import * as formik from "formik";
import { useSession } from "next-auth/react";
import { Form } from "react-bootstrap";
import { AddEditHolder } from "../AddEditHolder/AddEditHolder";
import { Input } from "../Forms/Input/Input";
import { StatusToast } from "../StatusToast/StatusToast";

//shared
import apiHandler from "@/app/shared/functions/apiHandler";
import { BlogValidationSchema } from "@/app/shared/validations/BlogValidationSchema";

//models
import { BlogFormModel, BlogPostModel } from "@/app/models/BlogModel";
import { BlogPostResponse, ToastValuesModel } from "@/app/models/Global";

import classes from "./BlogForm.module.scss";
import axios from "axios";

export const BlogForm: React.FC<BlogFormModel> = (props) => {
    const { itemValue,
        visiblePopup,
        setVisiblePopup,
        setTriggerRefresh } = props;

    const { data: session } = useSession() as any;

    //local states
    const [initialValueState, setInitialValueState] = useState<BlogPostModel>(itemValue);

    const [toastValues, setToastValues] = useState<ToastValuesModel>({
        visible: false,
        action: "",
        message: "",
        status: "",
    });

    const [loading, isLoading] = useState(false);
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [featuredMediaId, setFeaturedMediaId] = useState<number | null>(null);

    //ref
    const formikRef = useRef<formik.FormikProps<any>>(null);

    // Modify the imageChange function to handle both file uploads and existing URLs
    const imageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            if (file.size > 1024 * 1024) { // should be less than 1MB in bytes
                setToastValues({
                    visible: true,
                    action: "status",
                    message: "Image size must be less than 1MB",
                    status: "error"
                });
                return;
            }
            setIsImageUploading(true);

            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);

            try {
                const mediaId = await uploadImage(file);
                if (mediaId) setFeaturedMediaId(mediaId);
            } catch (error) {
                setToastValues({
                    visible: true,
                    action: "status",
                    message: "Failed",
                    status: "error"
                });
            } finally {
                setIsImageUploading(false); // End loading
            }
        }
    };

    // Upload Image to WordPress
    const uploadImage = async (file: File): Promise<number | null> => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", file.name);
        formData.append("status", "publish");

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_WORDPRESS_REST_API_URL}wp/v2/media`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${session?.token}`,
                },
            });
            return response.data.id; // Return media ID
        } catch (error) {
            console.error("Image upload failed:", error);
            return null;
        }
    };

    useEffect(() => {
        if (itemValue?.thumbnail) {
            setSelectedImage(itemValue?.thumbnail);
        }
    }, [itemValue]);

    useEffect(() => {
        // Reset selected image when opening form for new post
        if (visiblePopup.visible && visiblePopup.title === "Add Blog Post") {
            setSelectedImage(null);
        }
    }, [visiblePopup.visible, visiblePopup.title]);

    // Remove the selected image
    const removeSelectedImage = () => {
        setSelectedImage(null);
    };

    useEffect(() => {
        setInitialValueState({ ...itemValue, url: itemValue?.acf_fields?.url });
    }, [itemValue]);

    //formik
    const { Formik } = formik;

    return (
        <Fragment>
            <AddEditHolder
                title={visiblePopup?.title}
                setVisiblePopup={setVisiblePopup}
                visiblePopup={visiblePopup}>
                <Formik
                    innerRef={formikRef}
                    validationSchema={BlogValidationSchema}
                    enableReinitialize
                    initialValues={initialValueState}
                    onSubmit={
                        async (values) => {
                            isLoading(true);
                            let blogPostResponse = {} as BlogPostResponse;
                            if (visiblePopup?.title === "Edit Blog Post") {
                               
                                blogPostResponse = await apiHandler(
                                    `custom/v1/blog-posts/${itemValue?.id}`,
                                    "PUT",
                                    {
                                        title: values.title,
                                        content: values.content,
                                        featured_media: featuredMediaId,
                                        acf_fields: {
                                            url: values?.url
                                        }
                                    },
                                    session?.token
                                );
                            } else {
                                const payload = {
                                    title: values.title,
                                    content: values.content,
                                    featured_media: featuredMediaId || 0,
                                    acf_fields: {
                                        url: values?.url || ''
                                    }
                                };
                            
                                blogPostResponse = await apiHandler(
                                    'custom/v1/blog-posts',
                                    "POST",
                                    payload,
                                    session?.token
                                );
                            }
                            if (blogPostResponse) {
                                isLoading(false);
                                setVisiblePopup({ visible: false, title: "" });
                                if (blogPostResponse?.status === 200) {
                                    setToastValues({
                                        message: blogPostResponse?.data?.message,
                                        status: blogPostResponse?.statusText,
                                        visible: true, action: "status"
                                    });

                                } else {
                                    setToastValues({
                                        message: blogPostResponse?.error,
                                        status: blogPostResponse?.statusText,
                                        visible: true, action: "status"
                                    });
                                }
                                setTriggerRefresh?.(true);
                            }
                        }
                    }
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form noValidate onSubmit={handleSubmit} className="needs-validation">
                            {
                                <>
                                    <Input
                                        type="text"
                                        name="title"
                                        id="title"
                                        value={values || ''}
                                        onChange={handleChange}
                                        required
                                        label="Title"
                                        error={errors}
                                        touched={touched}
                                    />
                                    <Input
                                        type="textArea"
                                        name="content"
                                        id="content"
                                        value={values || ''}
                                        onChange={handleChange}
                                        required
                                        label="Content"
                                        error={errors}
                                        touched={touched}
                                    />

                                    <div className="mb-4">
                                        <div className="d-flex flex-column">
                                            <label className="form-label">Featured Image</label>
                                            <div className={`${classes["upload-container"]} position-relative`}>
                                                <input
                                                    accept="image/*"
                                                    type="file"
                                                    onChange={imageChange}
                                                    className={`${classes["file-input"]} form-control`}
                                                    id="imageUpload"
                                                />
                                                <label
                                                    htmlFor="imageUpload"
                                                    className={`${classes["upload-label"]} btn btn-outline-primary w-100`}
                                                >
                                                    {isImageUploading ? (
                                                        <>
                                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                            <span>Uploading...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <i className="bi bi-cloud-upload me-2"></i>
                                                            Choose Image
                                                        </>
                                                    )}
                                                </label>
                                            </div>

                                            {selectedImage && (
                                                <div className={`${classes["preview-container"]} mt-3`}>
                                                    <div className={classes["image-wrapper"]}>
                                                        <img
                                                            src={selectedImage}
                                                            alt="Preview"
                                                            className={classes["preview-image"]}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={removeSelectedImage}
                                                            className={`${classes["remove-button"]} btn btn-danger btn-sm`}
                                                        >
                                                            <i className="bi bi-trash me-2"></i>
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                    <Input
                                        type="text"
                                        name="url"
                                        id="url"
                                        value={values || ''}
                                        onChange={handleChange}
                                        label="URL"
                                        error={errors}
                                        touched={touched}
                                    />
                                    <button
                                        type="submit"
                                        className="btn btn-primary mb-3 position-relative d-flex align-items-center justify-content-center"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                <span>Loading</span>
                                            </>
                                        ) : (
                                            <span>Submit</span>
                                        )}
                                    </button>
                                </>
                            }
                        </Form>
                    )}
                </Formik>
            </AddEditHolder>
            {toastValues?.action === "status" &&
                <StatusToast toastValues={toastValues} setToastValues={setToastValues} />
            }
        </Fragment>
    )
}
