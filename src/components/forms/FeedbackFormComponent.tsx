import i18n from "../../I18n";
import React, {useState} from "react";
import {connect, ConnectedProps} from "react-redux";
// @ts-ignore
import { isEmail } from 'validator';
import {IFeedback} from "../../interfaces/IFeedback";
import {create} from "../../actions/FeedbackAction";
import {TRootState} from "../../index";

const connector = connect(
  ({ FeedbackReducer }: TRootState) => ({
    apiLoading: FeedbackReducer.apiLoading,
  }),
  {create}
);

type TFeedbackFormProps = ConnectedProps<typeof connector>;

const FeedbackFormComponent: React.FC<TFeedbackFormProps> = ({apiLoading, create}) => {
  const [notify, setNotify] = useState({message: '',  type: ''});
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [errors, setErrors] = useState<IFeedback>({name: '', email: '', subject: '', message: ''});

  const validateForm = () => {
    let valid = true;

    Object.keys(errors).forEach(
      (key) => {
        switch (key) {
          case 'name': validateField(key, name); break;
          case 'email': validateField(key, email); break;
          case 'subject': validateField(key, subject); break;
          case 'message': validateField(key, message); break;
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

  const validateField = (name:string, value:string) => {
    switch (name) {
      case 'name':
        errors.name =
          value.length < 2
            ? i18n.t('errors.field_required')
            : '';
        break;
      case 'email':
        errors.email =
          value.length < 2
            ? i18n.t('errors.field_required')
            : isEmail(value)
            ? ''
            : i18n.t('errors.email_not_valid')
        break;
      case 'subject':
        errors.subject =
          value.length < 2
            ? i18n.t('errors.field_required')
            : '';
        break;
      case 'message':
        errors.message =
          value.length < 2
            ? i18n.t('errors.field_required')
            : '';
        break;
      default:
        break;
    }

    setErrors({...errors})
  }

  const handleChange = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;

    switch (name) {
      case 'name': setName(value); break;
      case 'email': setEmail(value); break;
      case 'subject': setSubject(value); break;
      case 'message': setMessage(value); break;
      default: break;
    }

    validateField(name, value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(validateForm()) {
      console.log('VALID', apiLoading)
      create({name, email, subject, message}).then(() => {
        setName('')
        setEmail('')
        setSubject('')
        setMessage('')
        setNotify({message: 'Ваша заявка добавлена!',  type: 'success'})
      })
      .catch(() => {
        setNotify({message: 'Не удалось подать заявку :( попробуйте еще',  type: 'danger'})
      });
    }
  };

  return (
    <div className="contact-form">
      <form onSubmit={handleSubmit} className="contactform contact_form">
        <div className="returnmessage valid-feedback p-15px-b"
             data-success="Your message has been received, We will contact you soon." />
        <div className="empty_notice invalid-feedback p-15px-b"><span>Please Fill Required Fields</span></div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <input
                type="text"
                placeholder={i18n.t('contacts.your_name')}
                className="form-control"
                name="name"
                value={name}
                onChange={handleChange}
              />
              {errors.name.length > 0 && <span className='theme-color'>{errors.name}</span>}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <input
                type="text"
                placeholder={i18n.t('contacts.email_address')}
                className="form-control"
                name="email"
                value={email}
                onChange={handleChange}
              />
              {errors.email.length > 0 && <span className='theme-color'>{errors.email}</span>}
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <input
                type="text"
                placeholder={i18n.t('contacts.subject')}
                className="form-control"
                name="subject"
                value={subject}
                onChange={handleChange}
              />
              {errors.subject.length > 0 && <span className='theme-color'>{errors.subject}</span>}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <textarea
                placeholder={i18n.t('contacts.message')}
                className="form-control"
                name="message"
                rows={2}
                value={message}
                onChange={handleChange}
              />
              {errors.message.length > 0 && <span className='theme-color'>{errors.message}</span>}
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
                      ? (<button className='loading_btn' disabled={true}>
                          <div className="load-circle position-relative">
                            <span className="one" />
                          </div>
                         </button>)
                      : (
                        <button className="px-btn theme">
                          <span>{i18n.t('contacts.contact_us')}</span>
                          <i className="arrow" />
                         </button>
                        )
                  }
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default connector(FeedbackFormComponent);
