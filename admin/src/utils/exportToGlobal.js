import * as cke from 'ckeditor5';
import {
  StrapiMediaLib,
  StrapiUploadAdapter,
} from '../components/Input/plugins';
import { materialColors } from '../components/Input/presets/colors';

globalThis.SH_CKE = {
  ...cke,
  StrapiMediaLib: StrapiMediaLib,
  StrapiUploadAdapter: StrapiUploadAdapter,
  MaterialColors: materialColors,
};
