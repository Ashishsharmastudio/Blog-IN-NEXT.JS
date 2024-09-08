import axios from "axios";
import { useRouter } from "next/router";
import { useState, useMemo, forwardRef } from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    const { default: Quill } = await import("quill");
    const { default: ImageUploader } = await import("quill-image-uploader");

    await import("react-quill/dist/quill.snow.css");
    await import("quill-image-uploader/dist/quill.imageUploader.min.css");

    Quill.register("modules/imageUploader", ImageUploader);

    return forwardRef(function comp(props, ref) {
      return <RQ ref={ref} {...props} />;
    });
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

export default function Blog({
  _id,
  title: existingTitle,
  slug: existingSlug,
  blogcategory: existingBlogcategory,
  description: existingDescription,
  tags: existingTags,
  status: existingStatus,
  mainImage: existingMainImage,
}) {
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState(existingTitle || "");
  const [slug, setSlug] = useState(existingSlug || "");
  const [blogcategory, setBlogcategory] = useState(existingBlogcategory || []);
  const [description, setDescription] = useState(existingDescription || "");
  const [tags, setTags] = useState(existingTags || []);
  const [status, setStatus] = useState(existingStatus || "");
  const [mainImage, setMainImage] = useState(existingMainImage || "");

  async function createProduct(ev) {
    ev.preventDefault();
    const data = {
      title,
      slug,
      description,
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
    try {
      const validUrl = new URL(url);
      setMainImage(validUrl.href);
    } catch (error) {
      console.error("Invalid image URL:", url);
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
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
          <option value="smartphones">Smartphones</option>
          <option value="laptops">Laptops</option>
          <option value="tablets">Tablets</option>
          <option value="desktopcomputers">Desktop Computers</option>
          <option value="smarthome">Smart Home Devices</option>
          <option value="wearables">Wearables</option>
          <option value="audio">Audio Equipment</option>
          <option value="gaming">Gaming Consoles and Accessories</option>
          <option value="cameras">Cameras and Photography Equipment</option>
          <option value="tv's">TVs and Home Entertainment Systems</option>
          <option value="computerperipherals">Computer Peripherals</option>
          <option value="networking">Networking Equipment</option>
          <option value="storage">Storage Devices</option>
          <option value="drones">Drones</option>
          <option value="vrar">VR/AR Headsets</option>
        </select>

        <p className="existingcategory flex gap-1 mt-1 mb-1">
          selected:{" "}
          {Array.isArray(blogcategory) &&
            blogcategory.map((category) => (
              <span key={category}>{category}</span>
            ))}
        </p>
      </div>
      <div className="description w-100 flex flex-col flex-left mb-2">
        <label htmlFor="description">Blog Content</label>
        <ReactQuill
          value={description}
          onChange={setDescription}
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
