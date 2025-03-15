import React from "react";

//shared
import { BlogGridTable } from "@/app/components/BlogGridTable/BlogGridTable";

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
