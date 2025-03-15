"use client";

import apiHandler from "@/app/shared/functions/apiHandler";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import classes from "./BlogItems.module.scss";
import { BlogPostModel } from "@/app/models/BlogModel";

export const BlogItems: React.FC = () => {

  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await apiHandler(
        `custom/v1/blog-posts?per_page=-1`,
        "GET",
        {},
      );
      if (response?.data) {
        setPosts(response.data.posts);

      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchPosts();
  }, []);

  return (
    <div className={classes["blog-items"]}>
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-12 text-center mb-4">
            <h2 className="display-5 mb-3">Our Blog</h2>
            <div className="w-50 mx-auto">
              <div className="border-bottom border-primary border-2 w-25 mx-auto"></div>
            </div>
          </div>

          {isLoading ? (
            // Loading skeleton
            [...Array(6)].map((_, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className={`card-img-top bg-light placeholder-glow ${classes["card-placeholder"]}`} />
                  <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                      <span className="placeholder col-6"></span>
                    </h5>
                    <p className="card-text placeholder-glow">
                      <span className="placeholder col-7"></span>
                      <span className="placeholder col-4"></span>
                      <span className="placeholder col-4"></span>
                      <span className="placeholder col-6"></span>
                      <span className="placeholder col-8"></span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : posts.length > 0 ? (
            // Actual posts
            posts.map((post: BlogPostModel, index: number) => (
              <div key={post.id} className="col-12 col-md-6 col-lg-4" data-aos="fade-up"
                data-aos-delay={index * 100}>
                <div className="card h-100 border-0 shadow-sm">
                  <div
                    className="card-img-top"
                    style={{
                      height: '240px',
                      backgroundImage: `url(${post.thumbnail})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title mb-3">{post.title}</h5>
                    <p className="text-muted small mb-2">
                      {new Date(post.date).toLocaleDateString()}
                    </p>
                    {post.content && <p className="card-text text-secondary">
                      {post.content.replace(/<[^>]*>/g, '').substring(0, 120)}...
                    </p>}
                  </div>
                </div>
              </div>
            ))
          ) : (
            // No posts found
            <div className="col-12 text-center">
              <p className="text-muted">No blog posts found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}