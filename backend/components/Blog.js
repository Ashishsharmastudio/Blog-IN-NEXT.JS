import axios from "axios";
import { useRouter } from "next/router";
import { useState, useMemo } from "react";
import dynamic from 'next/dynamic';
import Quill, { Delta } from 'quill';
import 'react-quill/dist/quill.snow.css';
import 'quill-image-uploader/dist/quill.imageUploader.min.css';
import ImageUploader from 'quill-image-uploader';

Quill.register('modules/imageUploader', ImageUploader);

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const QuillNoSSRWrapper = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    return function comp({ forwardedRef, ...props }) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false }
);

const uploadImage = (file) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'dl2v0g0hy');

    axios.post(`https://api.cloudinary.com/v1_1/dl2v0g0hy/image/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        resolve(response.data.secure_url);
      })
      .catch((error) => {
        reject('Image upload failed. Please try again.');
        console.error('Error uploading image: ', error);
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

  const [title, setTitle] = useState(existingTitle || '');
  const [slug, setSlug] = useState(existingSlug || '');
  const [blogcategory, setBlogcategory] = useState(existingBlogcategory || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [tags, setTags] = useState(existingTags || '');
  const [status, setStatus] = useState(existingStatus || '');
  const [mainImage, setMainImage] = useState(existingMainImage || '');

  async function createProduct(ev) {
    ev.preventDefault();
    const data = { title, slug, description, blogcategory, tags, status, mainImage };
    console.log("Data being sent:", data); // Debugging log
    try {
      if (_id) {
        await axios.put('/api/blogapi', { ...data, _id });
      } else {
        await axios.post('/api/blogapi', data);
      }
      setRedirect(true);
    } catch (error) {
      console.error("Error saving blog post:", error);
    }
  }

  if (redirect) {
    router.push('/');
    return null;
  }

  const handleSlugChange = (ev) => {
    const inputValue = ev.target.value;
    const newSlug = inputValue.replace(/\s+/g, '-');
    setSlug(newSlug);
  };

  const handleMainImageUpload = async (file) => {
    try {
      const imageUrl = await uploadImage(file);
      setMainImage(imageUrl);
      console.log("Main image uploaded to Cloudinary::", imageUrl); // Debugging log
    } catch (error) {
      console.error('Error uploading main image: ', error);
    }
  };

  const handleImageUrlInput = async (url) => {
    try {
      // Basic URL validation
      const validUrl = new URL(url);
      setMainImage(validUrl.href);
      console.log("Image URL set:", validUrl.href);
    } catch (error) {
      console.error("Invalid image URL:", url);
    }
  };

  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
    imageUploader: {
      upload: uploadImage
    },
    clipboard: {
      matchVisual: false,
      matchers: [
        ['IMG', (node, delta) => {
          const src = node.getAttribute('src');
          return delta.compose(new Delta().insert({ image: src }));
        }]
      ]
    }
  }), []);

  return (
    <>
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
          {mainImage && <img src={mainImage} alt="Main blog image" style={{maxWidth: '100%', marginTop: '10px'}} />}
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
            <option value="htmlcssjs">Html, Css and JavaScript</option>
            <option value="nextjs">Next js and React js</option>
            <option value="database">Database</option>
            <option value="deployment">Deployment</option>
          </select>
          <p className="existingcategory flex gap-1 mt-1 mb-1">
            selected:{' '}
            {Array.isArray(existingBlogcategory) &&
              existingBlogcategory.map((category) => (
                <span key={category}>{category}</span>
              ))}
          </p>
        </div>
        <div className="description w-100 flex flex-col flex-left mb-2">
          <label htmlFor="description">Blog Content</label>
          <QuillNoSSRWrapper
            value={description}
            onChange={setDescription}
            modules={modules}
            style={{ height: '400px', width: '1200px' }}
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
            <option value="html">Html</option>
            <option value="css">Css</option>
            <option value="javascript">JavaScript</option>
            <option value="nextjs">nextjs</option>
            <option value="reactjs">reactjs</option>
            <option value="database">database</option>
          </select>
          <p className="existingcategory flex gap-1 mt-1 mb-1">
            selected:
            {Array.isArray(existingTags) &&
              existingTags.map((category) => (
                <span key={category}>{category}</span>
              ))}
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
            selected: <span>{existingStatus}</span>
          </p>
        </div>
        <div className="w-100 mb-2">
          <button type="submit" className="w-100 addwebbtn flex-center">
            Save Blog
          </button>
        </div>
      </form>
    </>
  );
}
