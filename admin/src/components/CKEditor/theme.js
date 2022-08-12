const theme = `
.ck.ck-editor__main .ck-blurred{
    max-height: 200px;
}
.ck.ck-editor__main .ck-focused{
    max-height: 900px;
}

.ck-word-count {
    margin-top: 0.3rem;
    display: flex;
    justify-content: end;
    gap: 0.3rem;
    font-size: 0.7rem;
    font-weight: 500;
    color: #B3B3C4;
    text-transform: lowercase;
}

.ck.ck-block-toolbar-button {
    color:var(--ck-block-toolbar-button-color);
    font-size:0.7rem;
    background:none;
    box-shadow: none !important;
    border:none !important;
    background:none !important;
    outline: none !important;
    :hover{
        color:var(--ck-block-toolbar-button-hover-color);
    }
}

.ck.ck-sticky-panel .ck-sticky-panel__content_sticky{ top:64px }
.ck.ck-reset.ck-dropdown__panel.ck-dropdown__panel_sw.ck-dropdown__panel-visible{
    border-radius:4px;
}
.ck.ck-editor__main .ck-focused, .ck-blurred{
    overflow-y: auto;
    overflow-x: hidden;
    transition: max-height 0.5s ease-in-out;
    ::-webkit-scrollbar {
        width: 7px;
        
    }
    
    ::-webkit-scrollbar-track {
        background: var(--ck-scroll-track-background);
        border: none;
    }
    
    ::-webkit-scrollbar-thumb {
        transition:background 2s;
        background: var(--ck-scroll-thumb-background);
        border: 1px solid var(--ck-scroll-thumb-border-color);
    }
    ::-webkit-scrollbar-thumb:hover {
        transition:background 2s;
        background: var(--ck-scroll-thumb-hover-background);
    }
    ::-webkit-scrollbar-thumb:active {
        background: var(--ck-scroll-thumb-active-background);
    }
}

html[data-theme='light'] {

--ck-block-toolbar-button-color: #32324D;
--ck-block-toolbar-button-hover-color: #6b6b70;

--ck-scroll-track-background:rgb(242,242,242);
--ck-scroll-thumb-background:rgb(236,236,236);
--ck-scroll-thumb-border-color:#cdcdf8;
--ck-scroll-thumb-hover-background:#F0F0FF;
--ck-scroll-thumb-active-background:#D9D8FF;

--ck-color-editor-base-text:#1A1A1A;
/* Overrides the border radius setting in the theme. */
--ck-border-radius: 4px;

/* Helper variables to avoid duplication in the colors. */
--ck-color-base-border: #DCDCE4;
--ck-color-base-background:#ffffff;
--ck-custom-background: #ffffff;
--ck-custom-foreground: #dedede;
--ck-custom-border: #DCDCE4;
--ck-custom-white: hsl(0, 0%, 100%);

--ck-color-focus-outer-shadow:#F6F6F9;

--ck-color-base-focus: 	 	#bbbaf1;
--ck-color-base-active: 	    #F0F0FF;
--ck-color-base-active-focus:  #e2e2fd;
/* -- Overrides generic colors. ------------------------------------------------------------- */

--ck-color-base-foreground: var(--ck-custom-background);
--ck-color-focus-border: #bdc8fc;
--ck-color-text: #32324D;
/* --ck-color-text: hsl(240, 18%, 33%); */
--ck-color-shadow-drop: hsla(250, 31%, 80%, 0.1);
--ck-color-shadow-inner: hsla(250, 31%, 80%, 0.1);

/* -- Overrides the default .ck-button class colors. ---------------------------------------- */

--ck-color-button-default-background: var(--ck-custom-background);
--ck-color-button-default-hover-background: #F0F0FF;
--ck-color-button-default-active-background: #F6F6F9;
--ck-color-button-default-active-shadow: #dedefb;
--ck-color-button-default-disabled-background: var(--ck-custom-background);

--ck-color-button-on-background: #F6F6F9;
--ck-color-button-on-hover-background: #F0F0FF;
--ck-color-button-on-active-background: #F6F6F9;
--ck-color-button-on-active-shadow: #cdcdf8;
--ck-color-button-on-disabled-background: var(--ck-custom-foreground);

--ck-color-button-action-background: hsl(168, 76%, 42%);
--ck-color-button-action-hover-background: hsl(168, 76%, 38%);
--ck-color-button-action-active-background: hsl(168, 76%, 36%);
--ck-color-button-action-active-shadow: hsl(168, 75%, 34%);
--ck-color-button-action-disabled-background: hsl(168, 76%, 42%);
--ck-color-button-action-text: var(--ck-custom-white);

--ck-color-button-save: hsl(120, 100%, 46%);
--ck-color-button-cancel: hsl(15, 100%, 56%);

/* -- Overrides the default .ck-dropdown class colors. -------------------------------------- */

--ck-color-dropdown-panel-background: var(--ck-custom-background);
--ck-color-dropdown-panel-border: var(--ck-custom-foreground);

/* -- Overrides the default .ck-splitbutton class colors. ----------------------------------- */

--ck-color-split-button-hover-background: var(--ck-color-button-default-hover-background);
--ck-color-split-button-hover-border: var(--ck-custom-foreground);

/* -- Overrides the default .ck-input class colors. ----------------------------------------- */

--ck-color-input-background: var(--ck-custom-background);
--ck-color-input-border: hsl(257, 3%, 43%);
--ck-color-input-text: hsl(0, 0%, 98%);
--ck-color-input-disabled-background: hsl(0, 0%, 97%);
--ck-color-input-disabled-border: rgb(214, 214, 214);
--ck-color-input-disabled-text: hsl(0, 0%, 78%);

/* -- Overrides the default .ck-labeled-field-view class colors. ---------------------------- */

--ck-color-labeled-field-label-background: var(--ck-custom-background);

/* -- Overrides the default .ck-list class colors. ------------------------------------------ */

--ck-color-list-background: var(--ck-custom-background);
--ck-color-list-button-hover-background: #f4f4fb;
--ck-color-list-button-on-background: var(--ck-color-base-active);
--ck-color-list-button-on-background-focus: var(--ck-color-base-active-focus);
--ck-color-list-button-on-text: #271FE2;

/* -- Overrides the default .ck-balloon-panel class colors. --------------------------------- */

--ck-color-panel-background: var(--ck-custom-background);
--ck-color-panel-border: var(--ck-custom-border);

/* -- Overrides the default .ck-toolbar class colors. --------------------------------------- */

--ck-color-toolbar-background: var(--ck-custom-background);
--ck-color-toolbar-border: var(--ck-custom-border);

/* -- Overrides the default .ck-tooltip class colors. --------------------------------------- */

--ck-color-tooltip-background: #3a3955;
--ck-color-tooltip-text: hsl(0, 0%, 93%);

/* -- Overrides the default colors used by the ckeditor5-image package. --------------------- */

--ck-color-image-caption-background: hsl(0, 0%, 97%);
--ck-color-image-caption-text: hsl(0, 0%, 20%);

/* -- Overrides the default colors used by the ckeditor5-widget package. -------------------- */

--ck-color-widget-blurred-border: #cfcffa;
--ck-color-widget-hover-border: #c9c9e4;
--ck-color-widget-editable-focus-background: var(--ck-custom-white);

/* -- Overrides the default colors used by the ckeditor5-link package. ---------------------- */

--ck-color-link-default: hsl(209, 89%, 33%);

}

html[data-theme='dark'] {

--ck-block-toolbar-button-color: #ededed;
--ck-block-toolbar-button-hover-color: #cfcccc;

--ck-scroll-track-background:#3d3d57;
--ck-scroll-thumb-background:#181826;
--ck-scroll-thumb-border-color:rgb(70,70,70);
--ck-scroll-thumb-hover-background:#202033;
--ck-scroll-thumb-active-background:#2b2b45;

 --ck-color-editor-base-text:rgb(236, 236, 236);
 /* Overrides the border radius setting in the theme. */
 --ck-border-radius: 4px;

 /* Helper variables to avoid duplication in the colors. */
 --ck-color-base-border: #4A4A6A;
 /* --ck-color-base-background:#212134; */
 /* --ck-color-base-background:#292943; */
 --ck-color-base-background:#27273e;
 --ck-custom-background: #181826;
 --ck-custom-foreground: #26263b;
 --ck-custom-border: #4A4A6A;
 --ck-custom-white: hsl(0, 0%, 100%);

--ck-color-focus-outer-shadow:#212134;

 --ck-color-base-focus: 	 	#bbbaf1;
 --ck-color-base-active: 	    #8280fc;
 --ck-color-base-active-focus:  #7B79FF;
 /* -- Overrides generic colors. ------------------------------------------------------------- */

 --ck-color-base-foreground: var(--ck-custom-background);
 --ck-color-focus-border: #6765bd;
 --ck-color-text: hsl(0, 0%, 93%);
 --ck-color-shadow-drop: hsla(0, 0%, 0%, 0.2);
 --ck-color-shadow-inner: hsla(0, 0%, 0%, 0.1);

 /* -- Overrides the default .ck-button class colors. ---------------------------------------- */

 --ck-color-button-default-background: var(--ck-custom-background);
 --ck-color-button-default-hover-background: #262630;
 --ck-color-button-default-active-background: #7B79FF;
 --ck-color-button-default-active-shadow: #7B79FF;
 --ck-color-button-default-disabled-background: var(--ck-custom-background);

 --ck-color-button-on-background: #7776da;
 --ck-color-button-on-hover-background: #7B79FF;
 --ck-color-button-on-active-background: #8280fc;
 --ck-color-button-on-active-shadow: #807ed3;
 --ck-color-button-on-disabled-background: var(--ck-custom-foreground);

 --ck-color-button-action-background: hsl(168, 76%, 42%);
 --ck-color-button-action-hover-background: hsl(168, 76%, 38%);
 --ck-color-button-action-active-background: hsl(168, 76%, 36%);
 --ck-color-button-action-active-shadow: hsl(168, 75%, 34%);
 --ck-color-button-action-disabled-background: hsl(168, 76%, 42%);
 --ck-color-button-action-text: var(--ck-custom-white);

 --ck-color-button-save: hsl(120, 100%, 46%);
 --ck-color-button-cancel: hsl(15, 100%, 56%);

 /* -- Overrides the default .ck-dropdown class colors. -------------------------------------- */

 --ck-color-dropdown-panel-background: var(--ck-custom-background);
 --ck-color-dropdown-panel-border: var(--ck-custom-foreground);

 /* -- Overrides the default .ck-splitbutton class colors. ----------------------------------- */

 --ck-color-split-button-hover-background: var(--ck-color-button-default-hover-background);
 --ck-color-split-button-hover-border: var(--ck-custom-foreground);

 /* -- Overrides the default .ck-input class colors. ----------------------------------------- */

 --ck-color-input-background: var(--ck-custom-background);
 --ck-color-input-border: hsl(257, 3%, 43%);
 --ck-color-input-text: hsl(0, 0%, 98%);
 --ck-color-input-disabled-background: hsl(255, 4%, 21%);
 --ck-color-input-disabled-border: hsl(250, 3%, 38%);
 --ck-color-input-disabled-text: hsl(0, 0%, 78%);

 /* -- Overrides the default .ck-labeled-field-view class colors. ---------------------------- */

 --ck-color-labeled-field-label-background: var(--ck-custom-background);

 /* -- Overrides the default .ck-list class colors. ------------------------------------------ */

 --ck-color-list-background: var(--ck-custom-background);
 --ck-color-list-button-hover-background: #3d3d56;
 --ck-color-list-button-on-background: var(--ck-color-base-active);
 --ck-color-list-button-on-background-focus: var(--ck-color-base-active-focus);
 --ck-color-list-button-on-text: #ffffff;

 /* -- Overrides the default .ck-balloon-panel class colors. --------------------------------- */

 --ck-color-panel-background: var(--ck-custom-background);
 --ck-color-panel-border: var(--ck-custom-border);

 /* -- Overrides the default .ck-toolbar class colors. --------------------------------------- */

 --ck-color-toolbar-background: var(--ck-custom-background);
 --ck-color-toolbar-border: var(--ck-custom-border);

 /* -- Overrides the default .ck-tooltip class colors. --------------------------------------- */

 --ck-color-tooltip-background: #3a3955;
 --ck-color-tooltip-text: hsl(0, 0%, 93%);

 /* -- Overrides the default colors used by the ckeditor5-image package. --------------------- */

 --ck-color-image-caption-background: hsl(0, 0%, 97%);
 --ck-color-image-caption-text: hsl(0, 0%, 20%);

 /* -- Overrides the default colors used by the ckeditor5-widget package. -------------------- */

 --ck-color-widget-blurred-border: #7c7c96;
--ck-color-widget-hover-border: #666687;
 --ck-color-widget-editable-focus-background: var(--ck-custom-white);

 /* -- Overrides the default colors used by the ckeditor5-link package. ---------------------- */

 --ck-color-link-default: hsl(216, 100%, 75%);
}
`;
export default theme