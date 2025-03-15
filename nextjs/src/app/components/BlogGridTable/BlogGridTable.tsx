"use client";

import { useCallback, useEffect, useState } from "react";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { useSession } from "next-auth/react";
import { h } from "gridjs";
import { BlogForm } from "../BlogForm/BlogForm";
import { DeleteToast } from "../DeleteToast/DeleteToast";
import { StatusToast } from "../StatusToast/StatusToast";

//shared
import apiHandler from "@/app/shared/functions/apiHandler";
import { generatePageNumbers } from "@/app/shared/functions/generatepageNumbers";

//models
import { BlogPostModel } from "@/app/models/BlogModel";
import { ToastValuesModel } from "@/app/models/Global";


export const BlogGridTable: React.FC = () => {

  //states
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogValues, setBlogValues] = useState<BlogPostModel>();

  const [visiblePopup, setVisiblePopup] = useState({
    visible: false,
    title: ""
  });

  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const [deleteID, setDeleteID] = useState<number>();

  const [toastValues, setToastValues] = useState<ToastValuesModel>({
    visible: false,
    action: "",
    message: "",
    status: "",
  });

  const perPage = 5; //number of posts per page

  const { data: session } = useSession() as any;

  const fetchPosts = async (page: number) => {
    try {
      const response = await apiHandler(
        `custom/v1/blog-posts?per_page=${perPage}&page=${page}`,
        "GET",
        {},
        session?.token
      );

      if (response?.data) {
        setPosts(response.data.posts);
        setTotalPages(response.data.totalPages);
        setTriggerRefresh(false)
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.token || triggerRefresh) {
      setLoading(true);
      fetchPosts(currentPage);
    }
  }, [currentPage, session?.token, triggerRefresh]);

  useEffect(() => {
    // Add class to body when popup is visible
    if (visiblePopup?.visible) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    // Cleanup on component unmount or when isVisible changes
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [visiblePopup?.visible]);

  const handleEdit = (post: BlogPostModel) => {
    setBlogValues(post);
    setVisiblePopup({
      visible: true,
      title: "Edit Blog Post"
    });
  };

  const handleAdd = () => {
    setBlogValues({
      title: "",
      thumbnail: "",
      content: "",
      author: "",
      url: ""
    });
    setVisiblePopup({
      visible: true,
      title: "Add Blog Post"
    });
  };

  const handleDelete = useCallback((id: number) => {
    setDeleteID(id);
    setToastValues({ visible: true, action: "delete" });
  }, []);

  useEffect(() => {
    async function deleteItem() {
      try {
        const response = await apiHandler(
          `custom/v1/blog-posts/${deleteID}`,
          "DELETE",
          {},
          session?.token
        );
        if (response.status === 200) {
          setToastValues({
            message: response.data.message,
            status: 'OK',
            visible: true,
            action: "status"
          });
          setTriggerRefresh?.(true);
        } else if (response.response?.status === 403) {
          setToastValues({
            message: response.response?.data?.message,
            status: 'error',
            visible: true,
            action: "status"
          });
        }
      } catch (error: any) {
        setToastValues({
          message: error.message || 'Failed to delete post',
          status: 'error',
          visible: true,
          action: "status"
        });
      } finally {
        setVisiblePopup({ visible: false, title: "" });
      }
    }
    if (toastValues?.triggerAction) { //only call this api when there is a action trigger on delete
      deleteItem();
    }
  }, [toastValues?.triggerAction]);
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  let pageNumers = generatePageNumbers(currentPage, totalPages);

  return (
    <>
      <div className="col-12">
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white border-0 py-3">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-semibold">Blog Posts</h5>
              <button className="btn btn-secondary btn-sm" onClick={handleAdd}>
                <i className="fas fa-plus me-2"></i>Add New Post
              </button>
            </div>
          </div>
          <div className="card-body px-4 py-3">
            <div className="p-4">
              {loading ? (
                <div className="text-center p-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : !posts || posts.length === 0 && !loading ? (
                <div className="alert alert-info text-center">No posts found</div>
              ) : (
                <>
                  <Grid
                    data={posts?.map((post: BlogPostModel) => [
                      post.id,
                      post.title,
                      h('div', {
                        className: 'hstack gap-2 fs-15',
                        style: {
                          backgroundImage: `url(${post.thumbnail})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          width: '40px',
                          height: '40px',
                          position: 'relative',
                          borderRadius: '8px'
                        }
                      }),
                      post.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...',
                      post.categories ? post.categories.map(cat => cat.name).join(', ') : '-',
                      post.author,
                      new Date(post.date!).toLocaleDateString(),
                      h('div', { className: 'd-flex gap-2' }, [
                        h('button', {
                          className: 'btn btn-sm btn-outline-primary',
                          onClick: (e: any) => {
                            e.stopPropagation();
                            handleEdit(post);
                          }
                        }, [
                          h('i', { className: 'fas fa-edit me-1' }),
                          'Edit'
                        ]),
                        h('button', {
                          className: 'btn btn-sm btn-outline-danger',
                          onClick: (e: any) => {
                            e.stopPropagation();
                            handleDelete(post.id!);
                          }
                        }, [
                          h('i', { className: 'fas fa-trash-alt me-1' }),
                          'Delete'
                        ])
                      ])
                    ])}
                    columns={[
                      { name: 'ID', sort: true },
                      { name: 'Title' },
                      { name: 'Featured Image' },
                      { name: 'Content', width: '200px' },
                      { name: 'Category' },
                      { name: 'Author' },
                      { name: 'Date', sort: true },
                      { name: 'Actions', width: '200px' }
                    ]}
                    search={true}
                    className={{
                      container: 'table-responsive',
                      table: 'table table-hover',
                      th: 'px-4 py-3 bg-light',
                      td: 'px-4 py-3'
                    }}
                  />

                  {/* Pagination */}
                  <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage <= 1 || loading}
                    >
                      &larr;
                    </button>

                    <div className="d-flex gap-1">
                      {pageNumers?.map((page, index) => (
                        page === '...' ? (
                          <span key={`ellipsis-${index}`} className="px-2">...</span>
                        ) : (
                          <button
                            key={page}
                            onClick={() => handlePageChange(Number(page))}
                            className={`btn btn-sm ${currentPage === page
                              ? 'btn-primary'
                              : 'btn-outline-primary'
                              }`}
                            disabled={loading}
                          >
                            {page}
                          </button>
                        )
                      ))}
                    </div>

                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage >= totalPages || loading}
                    >
                      &rarr;
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <BlogForm
        itemValue={blogValues!}
        visiblePopup={visiblePopup}
        setVisiblePopup={setVisiblePopup}
        setTriggerRefresh={setTriggerRefresh}
      />

      {
        toastValues?.action === "delete" &&
        <DeleteToast toastValues={toastValues} setToastValues={setToastValues} />
      }
      {toastValues?.action === "status" &&
        <StatusToast toastValues={toastValues} setToastValues={setToastValues} />
      }
    </>
  );
};