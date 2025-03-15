import Image from 'next/image'
import React from 'react';

import { AboutUsModel } from '@/app/models/HomepageModel';
import AboutImage from "../../../../../public/images/about.jpg";

const AboutUs: React.FC<AboutUsModel> = (props) => {
    const { title, subtitle, description } = props;

    return (
        <React.Fragment>
            <div className="container py-5">
                <div className="row align-items-center">
                    <div
                        className="col-lg-6 order-lg-2"
                        data-aos="fade-left"
                        data-aos-delay="200"
                        data-aos-duration="1500"
                    >
                        <div className="mb-4">
                            <h5 className="mb-3">{subtitle}</h5>
                            <h2 className="h1 mb-4">{title}</h2>
                            <div
                                className="lead"
                                dangerouslySetInnerHTML={{ __html: description }}
                            />
                        </div>
                    </div>
                    <div
                        className="col-lg-6 order-lg-1"
                        data-aos="fade-right"
                        data-aos-delay="200"
                        data-aos-duration="1500"
                    >

                        <div className="rounded overflow-hidden">
                            <Image
                                src={AboutImage}
                                alt={title}
                                width={576}
                                height={473}
                                className="img-fluid"
                                loading="lazy"
                            />
                        </div>

                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default AboutUs;

