import axios from "axios";
import { useRouter } from "next/router";
import { useState, useMemo, forwardRef, useCallback, useRef } from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    const { default: Quill } = await import("quill");
    const { default: ImageUploader } = await import("quill-image-uploader");

    await import("react-quill/dist/quill.snow.css");
    await import("quill-image-uploader/dist/quill.imageUploader.min.css");

    Quill.register("modules/imageUploader", ImageUploader);

    return function comp(props) {
      return <RQ {...props} />;
    };
  },
  {
    ssr: false,
    loading: () => <p>Loading editor...</p>,
  }
);

const uploadImage = (file) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "dl2v0g0hy");

    axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        resolve(response.data.secure_url);
      })
      .catch((error) => {
        reject("Image upload failed. Please try again.");
        console.error("Error uploading image: ", error);
      });
  });
};

const QuillWrapper = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <ReactQuill {...props} />
    </div>
  );
});

QuillWrapper.displayName = 'QuillWrapper';

export default function Blog({
  _id,
  title: existingTitle,
  description: existingDescription,
  slug: existingSlug,
  blogcategory: existingBlogcategory,
  body: existingBody,
  tags: existingTags,
  status: existingStatus,
  mainImage: existingMainImage,
}) {
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();
  const quillRef = useRef();

  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [slug, setSlug] = useState(existingSlug || "");
  const [blogcategory, setBlogcategory] = useState(existingBlogcategory || []);
  const [body, setBody] = useState(existingBody || "");
  const [tags, setTags] = useState(existingTags || []);
  const [status, setStatus] = useState(existingStatus || "");
  const [mainImage, setMainImage] = useState(existingMainImage || "");

  async function createProduct(ev) {
    ev.preventDefault();
    const data = {
      title,
      description,
      slug,
      body,
      blogcategory,
      tags,
      status,
      mainImage,
    };
    try {
      if (_id) {
        await axios.put("/api/blogapi", { ...data, _id });
      } else {
        await axios.post("/api/blogapi", data);
      }
      setRedirect(true);
    } catch (error) {
      console.error("Error saving blog post:", error);
    }
  }

  if (redirect) {
    router.push("/");
    return null;
  }

  const handleSlugChange = (ev) => {
    const inputValue = ev.target.value;
    const newSlug = inputValue.replace(/\s+/g, "-");
    setSlug(newSlug);
  };

  const handleMainImageUpload = async (file) => {
    try {
      const imageUrl = await uploadImage(file);
      setMainImage(imageUrl);
    } catch (error) {
      console.error("Error uploading main image: ", error);
    }
  };

  const handleImageUrlInput = (url) => {
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (urlPattern.test(url)) {
      setMainImage(url);
    } else {
      console.error("Invalid image URL:", url);
    }
  };

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        try {
          const imageUrl = await uploadImage(file);
          insertToEditor(imageUrl);
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }
    };
  }, []);

  const insertToEditor = (url) => {
    if (quillRef.current) {
      const editor = quillRef.current.querySelector('.ql-editor');
      if (editor) {
        const range = document.getSelection().getRangeAt(0);
        const img = document.createElement('img');
        img.src = url;
        range.insertNode(img);
      }
    }
  };

  const handleImageUrl = () => {
    const url = prompt('Enter the image URL:');
    if (url && quillRef.current) {
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      if (urlPattern.test(url)) {
        insertToEditor(url);
      } else {
        console.error('Invalid image URL:', url);
      }
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image", "imageUrl"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
          imageUrl: handleImageUrl,
        },
      },
      imageUploader: {
        upload: uploadImage,
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  return (
    <form className="addWebsiteform" onSubmit={createProduct}>
      <div className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
        <label htmlFor="mainImage">Main Image</label>
        <input
          type="file"
          id="mainImage"
          onChange={(e) => handleMainImageUpload(e.target.files[0])}
          accept="image/*"
        />
        <input
          type="text"
          placeholder="Or enter image URL"
          onChange={(e) => handleImageUrlInput(e.target.value)}
        />
        {mainImage && (
          <img
            src={mainImage}
            alt="Main blog image"
            style={{ maxWidth: "100%", marginTop: "10px" }}
          />
        )}
      </div>
      <div className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          value={title}
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter small title "
        />
      </div>
      <div className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
        <label htmlFor="title">Description</label>
        <input
          type="text"
          value={description}
          id="description"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter small Description "
        />
      </div>
      <div className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
        <label htmlFor="slug">Slug</label>
        <input
          type="text"
          id="slug"
          value={slug}
          onChange={handleSlugChange}
          placeholder="Enter slug url"
          required
        />
      </div>
      <div className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          multiple
          value={blogcategory}
          onChange={(e) =>
            setBlogcategory(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
        >
          <option value="mobilecomputer">Mobile & Computer</option>
          <option value="tvappliance">TV,Appliances&Electronics</option>
          <option value="mensfashion">Men's Fashion</option>
          <option value="fashion">Women's Fashion</option>
          <option value="others">Other's</option>
        </select>
        <p className="existingcategory flex gap-1 mt-1 mb-1">
          selected:{" "}
          {Array.isArray(blogcategory) &&
            blogcategory.map((category) => (
              <span key={category}>{category}</span>
            ))}
        </p>
      </div>
      <div className="body w-100 flex flex-col flex-left mb-2">
        <label htmlFor="body">Blog Content</label>
        <QuillWrapper
          ref={quillRef}
          value={body}
          onChange={setBody}
          modules={modules}
          style={{ height: "400px", width: "1200px" }}
        />
      </div>
      <div className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
        <label htmlFor="tags">Tags</label>
        <select
          name="tags"
          id="tags"
          value={tags}
          onChange={(e) =>
            setTags(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          multiple
        >
          <option value="review">Review</option>
          <option value="comparison">Comparison</option>
          <option value="budget">Budget</option>
          <option value="premium">Premium</option>
          <option value="newrelease">New Release</option>
          <option value="howto">How-To</option>
          <option value="tips">Tips & Tricks</option>
          <option value="accessories">Accessories</option>
          <option value="software">Software</option>
          <option value="hardware">Hardware</option>
          <option value="mobile">Mobile</option>
          <option value="desktop">Desktop</option>
          <option value="gaming">Gaming</option>
          <option value="productivity">Productivity</option>
          <option value="security">Security</option>
        </select>
        <p className="existingcategory flex gap-1 mt-1 mb-1">
          selected:
          {Array.isArray(tags) &&
            tags.map((tag) => <span key={tag}>{tag}</span>)}
        </p>
      </div>
      <div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="status">Status</label>
        <select
          name="status"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">No select</option>
          <option value="draft">Draft</option>
          <option value="publish">Publish</option>
        </select>
        <p className="existingcategory flex gap-1 mt-1 mb-1">
          selected: <span>{status}</span>
        </p>
      </div>
      <div className="w-100 mb-2">
        <button type="submit" className="w-100 addwebbtn flex-center">
          Save Blog
        </button>
      </div>
    </form>
  );
}
