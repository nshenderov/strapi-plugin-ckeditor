import type { Core } from "@strapi/strapi";
import fs from "fs";

const config = ({ strapi }: { strapi: Core.Strapi }) => ({
  getUploadConfig(name) {
    return strapi.plugin("upload").service(name) ?? {};
  },
  getCKEditorConfig() {
    const appDir = process.cwd();

    const fileName = "ckeditor";

    for (const ext of ["js", "ts"]) {
      const filePath = `${appDir}/config/${fileName}.${ext}`;
      if (fs.existsSync(filePath)) {
        return (
          fs.readFileSync(filePath, "utf8") +
          "\nglobalThis.CKEConfig = CKEConfig()"
        );
      }
    }

    return "globalThis.CKEConfig = null";
  },
});

export default config;
