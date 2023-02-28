const Plugin = window.CKEditor5.core.Plugin;
const FileRepository = window.CKEditor5.upload.FileRepository;

/**
 * Similar to Simple upload adapter but customized for Strapi.
 * Inspired by https://github.com/ckeditor/ckeditor5/blob/master/packages/ckeditor5-upload/src/adapters/simpleuploadadapter.js
 */
export default class StrapiUploadAdapter extends Plugin {
  /**
   * @inheritDoc
   */
  static get requires() {
    return [FileRepository];
  }

  /**
   * @inheritDoc
   */
  static get pluginName() {
    return "StrapiUploadAdapter";
  }

  /**
   * @inheritDoc
   */
  init() {
    // backendUrl
    // uploadUrl
    // headers
    // responsive

    const options = this.editor.config.get("strapiUploadAdapter");

    if (!options) {
      return;
    }

    if (!options.uploadUrl) {
      console.warn(
        'strapi-upload-adapter-missing-uploadUrl: Missing the "uploadUrl" property in the "strapiUploadAdapter" editor configuration.'
      );

      return;
    }

    this.editor.plugins.get(FileRepository).createUploadAdapter = (loader) => {
      return new Adapter(loader, options);
    };
  }
}

/**
 * Upload adapter.
 *
 * @private
 */
class Adapter {
  /**
   * Creates a new adapter instance.
   */
  constructor(loader, options) {
    /**
     * FileLoader instance to use during the upload.
     *
     */
    this.loader = loader;

    /**
     * The configuration of the adapter.
     *
     */
    this.options = options;
  }

  /**
   * Starts the upload process.
   *
   * @returns {Promise}
   */
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          this._initRequest();
          this._initListeners(resolve, reject, file);
          this._sendRequest(file);
        })
    );
  }

  /**
   * Aborts the upload process.
   *
   * @returns {Promise}
   */
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  /**
   * Initializes the `XMLHttpRequest` object using the URL specified as
   * `strapiUpload.uploadUrl` in the editor's
   * configuration.
   *
   * @private
   */
  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest());

    xhr.open("POST", this.options.uploadUrl, true);
    xhr.responseType = "json";
  }

  /**
   * Initializes XMLHttpRequest listeners
   *
   * @private
   * @param {Function} resolve Callback function to be called when the request is successful.
   * @param {Function} reject Callback function to be called when the request cannot be completed.
   * @param {File} file Native File object.
   */
  _initListeners(resolve, reject, file) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = `Couldn't upload file: ${file.name}.`;

    xhr.addEventListener("error", () => reject(genericErrorText));
    xhr.addEventListener("abort", () => reject());
    xhr.addEventListener("load", () => {
      const response = xhr.response;

      if (!Array.isArray(response) || response.error || response.length !== 1) {
        return reject(
          response && response.error && response.error.message
            ? response.error.message
            : genericErrorText
        );
      }

      const { backendUrl, responsive } = this.options || {};
      const { name, url, alternativeText, formats, provider } = response[0];
      const defaultUrl = provider !== "local" ? url : backendUrl + url;

      if (formats && responsive) {
        let urls = { default: defaultUrl };
        let keys = Object.keys(formats).sort(
          (a, b) => formats[a].width - formats[b].width
        );
        keys.map((k) => (urls[formats[k].width] = backendUrl + formats[k].url));
        resolve({ alt: alternativeText || name, urls: urls });
      } else {
        resolve(
          url
            ? {
                alt: alternativeText || name,
                urls: { default: defaultUrl },
              }
            : null
        );
      }
    });

    // Upload progress when it is supported.
    /* istanbul ignore else */
    if (xhr.upload) {
      xhr.upload.addEventListener("progress", (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  /**
   * Prepares the data and sends the request.
   *
   * @private
   * @param {File} file File instance to be uploaded.
   */
  _sendRequest(file) {
    // Set headers if specified.
    const headers = this.options.headers || {};

    // Use the withCredentials flag if specified.
    const withCredentials = this.options.withCredentials || false;

    for (const headerName of Object.keys(headers)) {
      this.xhr.setRequestHeader(headerName, headers[headerName]);
    }

    this.xhr.withCredentials = withCredentials;

    // Prepare the form data.
    const data = new FormData();

    data.append("files", file);

    // Send the request.
    this.xhr.send(data);
  }
}
