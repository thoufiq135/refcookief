import { useState, useEffect } from "react";
import "./blog.css";
import { Link } from "react-router-dom";

function Blog() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [warn, setWarn] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [blogData, setBlogData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show,setshow]=useState(false)


    useEffect(() => {
        async function fetchBlogs() {
            try {
                const response = await fetch("http://localhost:5000/Blog", {
                    method: "POST",
                    credentials: "include",
                });

                const data = await response.json();
                if (response.status === 401) {
                    setRedirect(true);
                } else {
                    setBlogData(data); 
                    setRedirect(false);
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        }
        fetchBlogs();
    }, []);


    async function submitBlog() {
        if (!title || !content) {
            setWarn(true);
            return;
        }

        setLoading(true);
        setWarn(false);

        try {
            const response = await fetch("localhost:5000/Blog", {
                method: "POST",
                body: JSON.stringify({
                    Title: title,
                    Content: content,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const data = await response.json();

            if (response.status === 401) {
                setRedirect(true);
                setshow(false)
            } else {
                setshow(true)
                setBlogData((prev) => [data, ...prev]); 
                setRedirect(false);
                setTitle(""); 
                setContent("");
            }
        } catch (error) {
            console.error("Error submitting blog:", error);
        } finally {
            setLoading(false);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        submitBlog();
    }

    return (
        <>
            {redirect && (
                <p id="redirect">
                    Your session expired. Please <Link to="/Login">Login</Link>.
                </p>
            )}
            {warn && <h4>Please enter both title and content.</h4>}
            
            <form id="form" onSubmit={handleSubmit}>
                <div id="Group">
                    <label htmlFor="title">Title</label>
                    <input
                        placeholder="TITLE"
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div id="Group">
                    <label htmlFor="content">Description</label>
                    <input
                        id="content"
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div id="Group">
                    <button id="btn" type="submit" disabled={loading}>
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </form>


            {show && (
    <>
        <div className="blog-container">
            {blogData.length > 0 ? (
                blogData.map((blog, index) => (
                    <div key={index} className="card">
                        <h2>{blog.Title}</h2>
                        <h3 id="content">{blog.Content}</h3>
                        <p id="author">Author:{blog?.user?.Name || "Unknown"}</p>
                    </div>
                ))
            ) : (
                <p>No blogs available.</p>
            )}
        </div>
    </>
)}

          
        </>
    );
}

export default Blog;
