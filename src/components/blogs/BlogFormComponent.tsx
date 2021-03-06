import React, {useEffect, useState} from 'react';
import {connect, ConnectedProps} from "react-redux";
import {TRootState} from "../../index";
import {getBlog, setBlog} from "../../actions/BlogAction";
// @ts-ignore
import Time from 'react-time-format'
import i18n from "../../I18n";
import { Editor } from '@tinymce/tinymce-react';
import { upload_handler } from '../../requests/FileRequest';

const TINY_API_KEY = process.env.REACT_APP_TINY_API_KEY;

const connector = connect(
  ({ BlogReducer, MessageReducer, AuthReducer, ConfigurationReducer }: TRootState, {match}: any) => ({
    blog: BlogReducer.blog,
    user: AuthReducer.user,
    slug: match.params.slug,
    message: MessageReducer.message,
    lang: ConfigurationReducer.lang
  }),
  { getBlog, setBlog }
);

type TBlogProps = ConnectedProps<typeof connector>;

const BlogFormComponent: React.FC<TBlogProps> = ({lang, blog, user, slug, message, getBlog, setBlog}) => {
  const [title, setTitle] = useState('');
  const [preview, setPreview] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);

  // eslint-disable-next-line
  useEffect(() => {getBlog(slug)}, []);

  useEffect(() => {
    setTitle(blog === undefined ? '' : blog.title)
    setPreview(blog === undefined ? '' : blog.preview)
    setBody(blog === undefined ? '' : blog.body)
  }, [blog]);

  if (user === undefined || blog === undefined) {
    return (
      <div>
        {i18n.t('actions.loading')}
      </div>
    );
  }

  function handleSaveBlog(parm: any) {
    if (blog === undefined) {
      return
    }

    const formData = new FormData();
    formData.append('blog[title]', title)
    formData.append('blog[preview]', preview)
    formData.append('blog[body]', body)
    if (image !== null && image !== '') {
      formData.append('blog[image]', image)
    }

    setBlog(blog, formData).then(response => {
        window.location.assign(`/${lang}/blogs/${blog.slug}`)
      }).catch(error => {
        console.log('ERROR setBlog(blog, formData)', error)
      });
  }

  function handleTitleChange(event: any) {
    setTitle(event.target.value)
  }
  function handlePreviewChange(event: any) {
    setPreview(event.target.value)
  }
  function handleBodyChange(content: string) {
    setBody(content)
  }

  function handleImageChange(event: any) {
    event.preventDefault();

    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      setImage(file)
      setImagePreview(reader.result)
    }

    reader.readAsDataURL(file)
  }

  let $imagePreview;
  if (imagePreview) {
    $imagePreview = (<img src={imagePreview as string} className='w-100' alt='Preview' />);
  } else {
    $imagePreview = blog.imageTag
  }

  let alert = (<span />);
  if (message !== undefined && message !== '') {
    alert = (<span className="ml-3 alert alert-danger">ERROR: {message}</span>)
  }

  return (
    <div className="container">
      <div>
        <div>
          <div key={ blog.id } className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow h-md-250 position-relative">
            <div className="col-9 p-4 d-flex flex-column position-static">
              <h3 className="mb-0 mt-0">
                <input className="w-100" type="text" value={title} onChange={handleTitleChange} />
              </h3>
              <div className="mb-1 text-muted">
                <Time value={blog.created_at} format="YYYY-MM-DD" />
              </div>
              <p className="card-text mb-auto">
                <textarea className="w-100" value={preview} onChange={handlePreviewChange} />
              </p>
            </div>
            <div className="col-3 d-none d-lg-block">
              <div className="imgPreview">
                {$imagePreview}
              </div>
              <input className="fileInput"
                     type="file"
                     onChange={(e)=>handleImageChange(e)} />
            </div>
          </div>
          <div className="mt-3 shadow border rounded bg-white p-3">
            <Editor
              apiKey={TINY_API_KEY}
              initialValue={body}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image | removeformat | help',
                image_list: blog.attachments,
                images_upload_handler: upload_handler
              }}
              onEditorChange={handleBodyChange}
            />
          </div>
        </div>
      </div>
      <div className="pt-2 pb-5">
        <button className="btn btn-success" onClick={handleSaveBlog}>{i18n.t('actions.save')}</button>
        {alert}
      </div>
    </div>
  );
}


export default connector(BlogFormComponent);
