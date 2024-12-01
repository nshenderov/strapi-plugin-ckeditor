import {
  Plugin,
  FileRepository,
  logWarning,
  type FileLoader,
  type UploadAdapter,
  type SimpleUploadConfig,
  type UploadResponse,
} from 'ckeditor5';

export interface IStrapiUploadAdapterConfig extends SimpleUploadConfig {
  backendUrl?: string;
  responsive?: boolean;
}

export interface IStrapiUploadAdapter extends Plugin {
  initAdapter: (config: IStrapiUploadAdapterConfig) => void;
}

interface IStrapiAdapter extends UploadAdapter {
  loader: FileLoader;
  config: IStrapiUploadAdapterConfig;
}

export class StrapiUploadAdapter extends Plugin implements IStrapiUploadAdapter {
  public static get requires() {
    return [FileRepository] as const;
  }

  public static get pluginName() {
    return 'StrapiUploadAdapter' as const;
  }

  public init(): void {}

  public initAdapter(config: IStrapiUploadAdapterConfig): void {
    if (!config.uploadUrl) {
      logWarning('strapi-upload-adapter-missing-uploadurl');
      return;
    }

    this.editor.plugins.get(FileRepository).createUploadAdapter = loader => {
      return new Adapter(loader, config) as UploadAdapter;
    };
  }
}

/**
 * Upload adapter.
 *
 */
class Adapter implements IStrapiAdapter {
  /**
   * FileLoader instance to use during the upload.
   */
  public loader: FileLoader;

  /**
   * The configuration of the adapter.
   */
  public config: IStrapiUploadAdapterConfig;

  private xhr?: XMLHttpRequest;

  /**
   * Creates a new adapter instance.
   */
  constructor(loader: FileLoader, config: IStrapiUploadAdapterConfig) {
    this.loader = loader;
    this.config = config;
  }

  /**
   * Starts the upload process.
   */
  public upload(): Promise<UploadResponse> {
    return this.loader.file.then(
      file =>
        new Promise((resolve, reject) => {
          this.initRequest();
          this.initListeners(resolve, reject, file!);
          this.sendRequest(file!);
        })
    );
  }

  /**
   * Aborts the upload process.
   */
  public abort(): void {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  /**
   * Initializes the `XMLHttpRequest` object using the URL specified as
   * `strapiUpload.uploadUrl` in the editor's
   * configuration.
   */
  private initRequest(): void {
    const xhr = new XMLHttpRequest();
    this.xhr = xhr;

    xhr.open('POST', this.config.uploadUrl, true);
    xhr.responseType = 'json';
  }

  /**
   * Initializes XMLHttpRequest listeners
   *
   * resolve - Callback function to be called when the request is successful.
   * reject - Callback function to be called when the request cannot be completed.
   * file - Native File object.
   */
  private initListeners(
    resolve: (result: UploadResponse) => void,
    reject: (message?: string) => void,
    file: File
  ): void {
    const xhr = this.xhr!;
    const { loader } = this;
    const genericErrorText = `Couldn't upload file: ${file.name}.`;

    xhr.addEventListener('error', () => reject(genericErrorText));
    xhr.addEventListener('abort', () => reject());
    xhr.addEventListener('load', () => {
      const { response } = xhr;

      if (
        !Array.isArray(response) ||
        (typeof response === 'object' && 'error' in response) ||
        response.length !== 1
      ) {
        return reject(
          response && response.error && response.error.message
            ? response.error.message
            : genericErrorText
        );
      }

      const { backendUrl, responsive } = this.config || {};
      const { name, url, alternativeText, formats, provider } = response[0];
      const defaultUrl = provider !== 'local' ? url : backendUrl + url;

      if (formats && responsive) {
        const urls: { [k: string]: string } = { default: defaultUrl };
        const keys = Object.keys(formats).sort((a, b) => formats[a].width - formats[b].width);
        keys.forEach(k => {
          urls[formats[k].width] = provider !== 'local' ? url : backendUrl + formats[k].url;
        });
        resolve({ alt: alternativeText || name, urls });
      } else {
        resolve(
          url
            ? {
                alt: alternativeText || name,
                urls: { default: defaultUrl },
              }
            : {}
        );
      }

      return undefined;
    });

    // Upload progress when it is supported.
    if (xhr.upload) {
      xhr.upload.addEventListener('progress', evt => {
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
   * File - instance to be uploaded.
   */
  private sendRequest(file: File): void {
    // Set headers if specified.
    const headers = this.config.headers || {};

    // Use the withCredentials flag if specified.
    const withCredentials = this.config.withCredentials || false;

    Object.keys(headers).forEach(headerName => {
      this.xhr!.setRequestHeader(headerName, headers[headerName]);
    });

    this.xhr!.withCredentials = withCredentials;

    // Prepare the form data.
    const data = new FormData();

    data.append('files', file);

    // Send the request.
    this.xhr!.send(data);
  }
}
