import * as cke from 'ckeditor5';
import { StrapiMediaLib, StrapiUploadAdapter } from '../Input/plugins';
import { materialColors } from '../Input/presets/colors';

globalThis.SH_CKE = cke;
globalThis.SH_CKE.StrapiMediaLib = StrapiMediaLib;
globalThis.SH_CKE.StrapiUploadAdapter = StrapiUploadAdapter;
globalThis.SH_CKE.MaterialColors = materialColors;
