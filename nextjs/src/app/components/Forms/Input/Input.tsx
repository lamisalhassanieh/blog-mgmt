'use client'

import { Col, Form, } from "react-bootstrap";
import { InputModel } from "@/app/models/Global";
import classes from "./Input.module.scss";

export const Input: React.FC<InputModel> = (props) => {

    const {
        id,
        name,
        type,
        value,
        onChange,
        label,
        error } = props;

    return (
        <>
            <div className="form-floating mb-3">
                {type === "textArea" ?
                    <Form.Control as="textarea"
                        type={type}
                        name={name}
                        value={value?.[`${name}`]?.replace(/<[^>]*>/g, '') || ''}
                        onChange={onChange}
                        style={{ minHeight: '100px' }}
                        autoComplete="off"
                    /> :
                    <input
                        type={type}
                        className="form-control floating-label-input"
                        id={id}
                        value={value?.[`${name}`] || ''}
                        onChange={onChange}
                        placeholder={name}
                    />
                }
                <label htmlFor={id}>{label}</label>
                <div className={classes["error-message"]}> {error?.[`${name}`]}</div>
            </div>
        </>
    )
}
