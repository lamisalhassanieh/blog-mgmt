'use client'

import React, { Fragment } from 'react'

import classes from "./AddEditHolder.module.scss"
import { AddEditHolderModel } from '@/app/models/Global';

export const AddEditHolder: React.FC<AddEditHolderModel> = (props) => {
    const { title, children, visiblePopup, setVisiblePopup } = props;

    return (
        <Fragment>
            <div className={`${classes["popup-overlay"]}  ${visiblePopup?.visible ? classes["show"] : ""}`}>
                <div className={classes["popup-content"]}>
                    <div className={classes["close-icon"]} onClick={() => 
                    {
                      
                        setVisiblePopup({ visible: false, title: visiblePopup?.title })}  }></div>
                    <div className={classes["title"]}>
                        {title}
                    </div>
                    {children}
                </div>
            </div>
        </Fragment>
    )
}
