import "../../../../../../assets/fullscreen-plugin.css";

const ImageFullBig = `<svg enable-background="new 0 0 32 32" height="32px" id="svg2" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg"><g id="background"><rect fill="none" height="32" width="32"/></g><g id="fullscreen"><path d="M20,8l8,8V8H20z M4,24h8l-8-8V24z"/><path d="M32,28V4H0v24h14v2H8v2h16v-2h-6v-2H32z M2,26V6h28v20H2z"/></g></svg>`;
const ImageFullCancel = `<svg enable-background="new 0 0 32 32" height="32px" id="svg2" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg"><g id="background"><rect fill="none" height="32" width="32"/></g><g id="fullscreen_x5F_cancel"><path d="M4,16v8h8L4,16z M0,4v24h14v2H8v2h16v-0.06c2.702-0.299,5.042-1.791,6.481-3.94H32V4H0z M23,29.999   c-3.865-0.008-6.994-3.135-7-6.999c0.006-3.865,3.135-6.994,7-7c3.864,0.006,6.991,3.135,6.999,7   C29.991,26.864,26.864,29.991,23,29.999z M30,17.35c-0.57-0.707-1.244-1.326-2-1.832V8h-8l6.896,6.896   C25.717,14.328,24.398,14,23,14c-4.972,0-9,4.028-9,9c0,1.054,0.19,2.061,0.523,3H2V6h28V17.35z"/><polygon points="19,25 21,27 23,25 25,27 27,25 25,23 27,21 25,19 23,21 21,19 19,21 21,23  "/></g></svg>`;

const Plugin = window.CKEditor5.core.Plugin;
const ButtonView = window.CKEditor5.ui.ButtonView;

export default class FullScreen extends Plugin {
  static get pluginName() {
    return "FullScreen";
  }

  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add("fullScreen", () => {
      const view = new ButtonView();
      let etat = 0; //si 0 position normale
      view.set({
        label: "Full Screen",
        icon: ImageFullBig,
        tooltip: true,
      });

      // Callback executed once the image is clicked.
      view.on("execute", () => {
        if (etat == 1) {
          editor.sourceElement.nextElementSibling.removeAttribute("id");
          document.body.removeAttribute("id");
          view.set({
            label: "Full Screen",
            icon: ImageFullBig,
            tooltip: true,
          });
          etat = 0;
        } else {
          editor.sourceElement.nextElementSibling.setAttribute(
            "id",
            "fullscreeneditor"
          );
          document.body.setAttribute("id", "fullscreenoverlay");
          view.set({
            label: "Normal Mode",
            icon: ImageFullCancel,
            tooltip: true,
          });
          etat = 1;
        }
      });

      return view;
    });
  }
}
