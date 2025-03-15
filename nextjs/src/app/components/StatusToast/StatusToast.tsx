
import { ToastModel } from "@/app/models/Global";
import {  Toast, ToastContainer } from "react-bootstrap";

export const StatusToast: React.FC<ToastModel> = (props) => {
    const { toastValues, setToastValues } = props;

    return (
        <ToastContainer className="toast-container position-fixed top-0 end-0 p-3" >
            <Toast id="bottomcenter-Toast"
                className={`${toastValues?.status === "OK" ? "" : ""} toast  align-items-center  border-0 fade show mb-4`}
                delay={3000} autohide onClose={() => setToastValues({
                    visible: false, action: ""
                })} show={toastValues?.visible}>
                <Toast.Header className={`${toastValues?.status === "OK" ? "text-bg-success" : "text-bg-danger"} toast-header text-fixed-white`}>
                    <strong className="me-auto">{toastValues?.status === "OK" ? "Success" : "Error"}</strong>
                </Toast.Header>
                <Toast.Body className="toast-body">
                    {toastValues?.message}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    )
}