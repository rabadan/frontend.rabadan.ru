import {connect, ConnectedProps} from "react-redux";
import {TRootState} from "../../index";
import React, {useEffect, useState} from "react";
import i18n from "../../I18n";
import {IPage} from "../../interfaces/IPage";
import {getPage, setPage} from "../../actions/PageAction";
import {setMessage} from "../../actions/MessageAction";
import {Editor} from "@tinymce/tinymce-react";
import {upload_handler} from "../../requests/FileRequest";
const TINY_API_KEY = process.env.REACT_APP_TINY_API_KEY;

const connector = connect(
  ({ ConfigurationReducer, PageReducer }: TRootState, {slug}: any) => ({
    lang: ConfigurationReducer.lang,
    page: PageReducer.page,
    apiLoading: PageReducer.apiLoading,
    slug: slug
  }),
  {getPage, setPage}
);

type TPageEditFormProps = ConnectedProps<typeof connector>;

const PageEditForm: React.FC<TPageEditFormProps> = ({page, slug, getPage, setPage, apiLoading}) => {
  const [formPage, setFormPage] = useState<IPage>();
  const [errors, setErrors] = useState<IPage>({body: "", breadcrumb: "", footer: "", h1: "", id: "", image: "", lang: "", seo_desc: "", seo_key: "", slug: "", title: "", created_at: "", updated_at: ""});
  const [notify, setNotify] = useState({message: '',  type: ''});

  console.log('slug', slug)

  useEffect(() => {getPage(slug)}, [getPage, slug]);
  useEffect(() => {setFormPage(page)}, [page]);

  if (!formPage || !page) {
    return (<div className='p-5'>Loading...</div>)
  }

  const validateForm = () => {
    let valid = true;

    Object.keys(errors).forEach(
      (key) => {
        switch (key) {
          case 'title': validateField(key, formPage.title); break;
          case 'h1': validateField(key, formPage.h1); break;
          case 'footer': validateField(key, formPage.footer); break;
          case 'seo_desc': validateField(key, formPage.seo_desc); break;
          case 'seo_key': validateField(key, formPage.seo_key); break;
          default: break;
        }
      }
    )

    Object.values(errors).forEach(
      (value) => {
        value.length > 0 && (valid = false)
      }
    );

    return valid;
  }


  const validateField = (name:string, _value:string) => {
    const value:string = _value || "";

    switch (name) {
      case 'title': errors.title = value.length < 1 ? i18n.t('errors.field_required') : ''; break;
      case 'h1': errors.h1 = value.length < 1 ? i18n.t('errors.field_required') : ''; break;
      case 'footer': errors.footer = value.length < 1 ? i18n.t('errors.field_required') : ''; break;
      case 'seo_desc': errors.seo_desc = value.length < 1 ? i18n.t('errors.field_required') : ''; break;
      case 'seo_key': errors.seo_key = value.length < 1 ? i18n.t('errors.field_required') : ''; break;
      default: break;
    }

    setErrors({...errors})
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(validateForm()) {
      const formData = new FormData();
      formData.append('page[title]', formPage.title)
      formData.append('page[h1]', formPage.h1)
      formData.append('page[footer]', formPage.footer)
      formData.append('page[body]', formPage.body)
      formData.append('page[seo_desc]', formPage.seo_desc)
      formData.append('page[seo_key]', formPage.seo_key)

      setPage(page.slug, formData).then(() => {
        setFormPage(page)
        setMessage('')
        setNotify({message: 'Ваша заявка добавлена!',  type: 'success'})
      })
        .catch(() => {
          setNotify({message: 'Не удалось подать заявку :( попробуйте еще',  type: 'danger'})
        });
    }
  }

  const handleChange = (event: any) => {
    event.preventDefault();
    const name = event.target.name || "";
    const value = event.target.value || "";
    let new_value = { [name]: value } as any;
    setFormPage({...formPage, ...new_value })
    validateField(name, value)
  }

  function handleBodyChange(content: string) {
    const value = content || "";
    let new_value = { ['body']: value } as any;
    setFormPage({...formPage, ...new_value })
    validateField('body', value)
  }

  const myInput = (attr:string, val: string, error: string) => {
    return (
      <div className="col-auto">
        <label className="sr-only" htmlFor={`inlineFormInput_${attr}`}>{i18n.t(`fields.${attr}`)}</label>
        <div className="input-group mb-2">
          <div className="input-group-prepend">
            <div className="input-group-text dark-color" style={{minWidth: '200px'}}>
              {i18n.t(`fields.${attr}`)}
            </div>
          </div>
          <input
            type="text"
            id={`inlineFormInput_${attr}`}
            placeholder={i18n.t(`fields.${attr}`)}
            className="form-control"
            name={attr}
            value={val || ""}
            onChange={handleChange}
          />
          {error.length > 0 && (
            <div className="input-group-append">
              <div className="input-group-text" style={{background: '#ffaaaa'}}>{error}</div>
            </div>)}
        </div>
      </div>
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="page-edit-form">
        {myInput('title', formPage.title, errors.title)}
        {myInput('h1', formPage.h1, errors.h1)}
        {myInput('footer', formPage.footer, errors.footer)}
        {myInput('seo_desc', formPage.seo_desc, errors.seo_desc)}
        {myInput('seo_key', formPage.seo_key, errors.seo_key)}

        <div className="col-md-12">
          <div className="my-3 shadow border rounded bg-white">
            <Editor
              apiKey={TINY_API_KEY}
              initialValue={formPage.body}
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
                image_list: formPage.attachments,
                images_upload_handler: upload_handler
              }}
              onEditorChange={handleBodyChange}
            />
          </div>
        </div>

        <div className="col-md-12">
          <div>
            {notify.message && (<div className={`alert alert-${notify.type}`} role="alert">{notify.message}</div>)}
          </div>
          <div className="send">
            <div className="form-group">
              {
                apiLoading
                  ? (<button className="" disabled={true}>{i18n.t('actions.saving')}</button>)
                  : (
                    <button className="btn btn-success">
                      <span>{i18n.t('contacts.contact_us')}</span>
                    </button>
                  )
              }
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default connector(PageEditForm);