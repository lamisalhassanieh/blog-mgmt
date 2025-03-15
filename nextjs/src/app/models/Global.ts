import { Dispatch, SetStateAction } from "react";

export interface ToastModel {
    toastValues: ToastValuesModel;
    setToastValues: Dispatch<SetStateAction<ToastValuesModel>>;
    text?: string;
}

export interface ToastValuesModel {
    message?: string
    visible?: boolean;
    status?: string
    triggerAction?: boolean,
    action?: string;
    text?: string;
}

export interface InputModel {
    id?: string;
    name: string;
    type: string;
    value?: string | number | any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    label?: string;
    disabled?: boolean;
    placeholder?: string;
    error?: string | any;
    isTranslated?: boolean;
    touched?: any;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface ToastModel {
    toastValues: ToastValuesModel;
    setToastValues: Dispatch<SetStateAction<ToastValuesModel>>;
    text?: string;
}

export interface AddEditHolderModel {
    title?: string;
    children?: React.ReactNode;
    setVisiblePopup: (value: {
        visible: boolean,
        title: string
    }) => void;
    visiblePopup: {
        visible: boolean,
        title: string,
    }
}
export interface BlogPostResponse {
    data: { message: string },
    status: number,
    statusText:string,
    error?: string
}