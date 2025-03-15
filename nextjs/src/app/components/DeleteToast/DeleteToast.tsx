
import { ToastModel } from "@/app/models/Global";
import { Toast, ToastContainer, Button } from "react-bootstrap";


export const DeleteToast: React.FC<ToastModel> = (props) => {
    const { toastValues, setToastValues } = props;

    return (

        <ToastContainer className="toast-container position-fixed top-0 start-50 translate-middle-x p-3">
            <Toast id="topcenter-Toast" className="toast colored-toast bg-primary-transparent text-primary" onClose={() => setToastValues({
                visible: false, action: ""
            })} show={toastValues?.visible}>
                <Toast.Header className="toast-header bg-primary">
                    <strong className="me-auto text-white">Delete</strong>
                </Toast.Header>
                <Toast.Body className="toast-body">
                    Are you sure you want to delete?
                    <div className="mt-2 pt-2">
                        <Button
                            variant="danger"
                            className="me-2"
                            onClick={() => {
                                setToastValues({
                                    ...toastValues,
                                    triggerAction: true,
                                });
                            }}
                        >
                            Delete
                        </Button>
                        <Button
                            variant="light"
                            onClick={() => {
                                setToastValues({
                                    ...toastValues,
                                    visible: false,
                                    action: "",
                                    triggerAction: false
                                });
                            }}
                        >
                            Cancel
                        </Button>
                    </div>

                </Toast.Body>
            </Toast>
        </ToastContainer>

    )
}