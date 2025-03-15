import React from 'react';

import { VideoModel } from '@/app/models/HomepageModel';

import classes from "./Video.module.scss";

const Video: React.FC<VideoModel> = (props) => {
    const { subtitle, title, description } = props;

    return (
        <React.Fragment>
            <div className={`position-relative overflow-hidden ${classes["video-wrapper"]}`}>
                {/* Dark overlay */}
                <div
                    className={`position-absolute top-0 start-0 w-100 h-100 ${classes["overlay"]}`}></div>
                {/* Video background */}
                <video
                    className={`position-absolute w-100 h-100 object-fit-cover ${classes["video-background"]}`}
                    playsInline
                    autoPlay
                    muted
                    loop
                >
                    <source src="/video.mp4" type="video/mp4" />
                </video>

                {/* Content */}
                <div className={`position-relative h-100 container ${classes["content-wrapper"]}`}>

                    <div className="d-flex flex-column justify-content-center align-items-center h-100 text-center text-white">
                        <div
                            className="mb-3 fs-5"
                            data-aos="fade-up"
                            data-aos-delay="200"
                            data-aos-duration="1500"
                        >
                            {subtitle}
                        </div>
                        <h1
                            className="display-4 fw-bold mb-4"
                            data-aos="fade-up"
                            data-aos-delay="300"
                            data-aos-duration="1500"
                        >
                            {title}
                        </h1>
                        <h3
                            className="h4 fw-light mb-0 px-4"
                            data-aos="fade-up"
                            data-aos-delay="400"
                            data-aos-duration="1500"
                        >
                            {description}
                        </h3>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Video;

