import authHeader from "../services/AuthHeader";
import store from "../redux";

const API_URL = process.env.REACT_APP_API_URL;

export async function upload_handler(blobInfo: any, success:any , failure:any , progress:any ) {
  let xhr: any, formData;

  const blog = store.getState().BlogReducer.blog;
  if (blog === undefined) {
    return
  }

  const url = `${API_URL}api/v1/blogs/${blog.slug}/file_attach`;

  const header:any = authHeader();

  xhr = new XMLHttpRequest();
  xhr.withCredentials = false;
  xhr.open('POST', url);
  xhr.setRequestHeader('Authorization', header['Authorization'])

  xhr.upload.onprogress = function (e: any) {
    progress(e.loaded / e.total * 100);
  };

  xhr.onload = function() {
    var json;

    if (xhr.status === 403) {
      failure('HTTP Error: ' + xhr.status, { remove: true });
      return;
    }

    if (xhr.status < 200 || xhr.status >= 300) {
      failure('HTTP Error: ' + xhr.status);
      return;
    }

    json = JSON.parse(xhr.responseText);

    if (!json || typeof json.location != 'string') {
      failure('Invalid JSON: ' + xhr.responseText);
      return;
    }

    success(json.location);
  };

  xhr.onerror = function () {
    failure('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
  };

  formData = new FormData();
  formData.append('file', blobInfo.blob(), blobInfo.filename());

  xhr.send(formData);
}