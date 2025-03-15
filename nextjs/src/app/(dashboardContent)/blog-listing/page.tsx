import React, { Fragment } from "react";
import { getServerSession } from "next-auth";

//shared
import { authOptions } from "@/app/shared/lib/AuthOptions";
import { BlogGridTable } from "@/app/components/BlogGridTable/BlogGridTable";
import { BlogForm } from "@/app/components/BlogForm/BlogForm";


const BlogListing = async () => {
    try {
        return (
            <div className="container-fluid py-4">
                <div className="row mb-4">

                    <BlogGridTable />

                </div>
            </div>


        );
    }
    catch (error: any) {
        if (error.message === "UnauthorizedException") {
            return (
                <>
                    You need to login
                </>
            );
        }
    }
};

export default BlogListing;
