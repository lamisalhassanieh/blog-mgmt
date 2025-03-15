'use client'

import React, { useEffect } from "react";
import AboutUs from "@/app/components/Homepage/AboutUs/AboutUs";
import Video from "@/app/components/Homepage/Video/Video";
import AOS from 'aos';

import 'aos/dist/aos.css';
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";
import { BlogItems } from "@/app/components/Homepage/BlogItems/BlogItems";

const Homepage: React.FC = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
        })
    }, [])

    return (
        <React.Fragment>
            <Header />
            <Video
                subtitle="Lorem Ipsum"
                title="Lorem Ipsum is simply dummy text"
                description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"

            />
            <div id="about-us">
                <AboutUs
                    subtitle="Lorem Ipsum"
                    title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
                    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
                />
            </div>
            <div id="our-blog">
                <BlogItems />
            </div>
             <Footer /> 
        </React.Fragment>
    );
};

export default Homepage;

