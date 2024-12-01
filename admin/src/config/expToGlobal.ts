import * as CKE from 'ckeditor5';

import { StrapiMediaLib, StrapiUploadAdapter } from '../plugins';
import { materialColors } from './colors';

export type ExportToGlobal = typeof CKE & {
  StrapiMediaLib: typeof StrapiMediaLib;
  StrapiUploadAdapter: typeof StrapiUploadAdapter;
  MaterialColors: typeof materialColors;
};

export function exportToGlobal() {
  window.SH_CKE = {
    ...CKE,
    StrapiMediaLib,
    StrapiUploadAdapter,
    MaterialColors: materialColors,
  };
}
