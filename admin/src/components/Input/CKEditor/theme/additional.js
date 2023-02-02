import { css } from "styled-components";

export const additional = css`

/* --- expanding --- */

.ck.ck-editor__main .ck-blurred {
    max-height: 200px;
  }
.ck.ck-editor__main .ck-focused {
  	max-height: 700px;
  }

/* --- color-grid --- */

.ck.ck-color-ui-dropdown {
	--ck-color-grid-tile-size: 22px !important;
}
.ck.ck-color-grid__tile{
	width:auto;
}
.ck.ck-color-ui-dropdown .ck-color-grid {
	grid-gap: 2px;
}
.ck.ck-color-ui-dropdown .ck-color-grid .ck-button {
	border-radius: 2px;
}
.ck.ck-color-ui-dropdown .ck.ck-color-grid .ck-color-grid__tile:hover:not(.ck-disabled),
.ck.ck-color-ui-dropdown .ck.ck-color-grid .ck-color-grid__tile:focus:not(.ck-disabled) {
	z-index: 1;
	transform: scale(1.1);
	border-radius: 2px;
}

/* --- color-picker --- */

.ck[dir=rtl] .ck-color-input{
  margin: 0 8px 8px 0 !important;
  padding: 3px 5px 0 0 !important;
}

.ck .ck-color-input{
  margin: 0 0 8px 8px ;
  padding: 3px 0 0 6px;
  border-radius:2px ;
  font-size:.77rem !important;
  width: 58px !important;
}
.ck .ck-color-picker{
  margin: 0 3px 8px 3px;
  border-radius:2px !important;
  width: 27px !important;
}
.ck .ck-color-picker-save{
  margin: 0 0 8px 0;
  border-radius:2px !important;
  width:27px !important;
}


/* ---- Style feature config ------------------------------------------------------ */

:root {
	--ck-georgia-serif-font-stack: Georgia,Times,Times New Roman,serif;
}

.ck-content h1.document-title {
	font-family: var(--ck-georgia-serif-font-stack);
	font-size: 50px;
	font-weight: bold;
	border: 0;
}

.ck-content h2.document-subtitle {
	font-family: var(--ck-georgia-serif-font-stack);
	font-size: 20px;
	font-weight: bold;
	color: #d1d1d1;
	letter-spacing: 10px;
}

.ck-content p.callout {
	--border-color: #e91e1e;
	padding: 1.2em 2em;
	border: 1px solid var(--border-color);
	border-left: 10px solid var(--border-color);
	background: #fff9fb;
	border-radius: 5px;
	margin: 1.5em 2em;
	box-shadow: 5px 5px 0 #ffe6ef;
}

.ck-content blockquote.side-quote {
	font-family: var(--ck-georgia-serif-font-stack);
	font-style: normal;
	float: right;
	width: 35%;
	position: relative;
	border: 0;
	overflow: visible;
	z-index: 1;
	margin-left: 1em;
}

.ck-content blockquote.side-quote::before {
	content: "“";
	position: absolute;
	top: -37px;
	left: -10px;
	display: block;
	font-size: 200px;
	color: #e7e7e7;
	z-index: -1;
	line-height: 1;
}

.ck-content blockquote.side-quote p {
	font-size: 2em;
	line-height: 1;
}

.ck-content blockquote.side-quote p:last-child:not(:first-child) {
	font-size: 1.3em;
	text-align: right;
	color: #555;
}

.ck-content span.needs-clarification {
	outline: 1px dashed #c8a24b;
	background: #ffe19c;
	border-radius: 2px;
	position: relative;
}

.ck-content span.needs-clarification::after {
	content: "?";
	display: inline-block;
	color: #fff;
	background: #3b3b3b;
	font-size: 12px;
	vertical-align: super;
	width: 12px;
	height: 12px;
	line-height: 12px;
	border-radius: 10px;
	text-align: center;
	position: absolute;
	right: -6px;
	top: -6px;
	font-weight: bold;
	letter-spacing: initial;
}

.ck-content span.wide-spacing {
	letter-spacing: 0.3em;
}

.ck-content span.small-caps {
	font-variant: small-caps;
}

.ck-content span.spoiler {
	background: #000;
	color: #000;
}

.ck-content span.spoiler:hover {
	background: #000;
	color: #fff;
}

.ck-content pre.stylish-code {
	border-color: transparent;
	margin-left: 2em;
	margin-right: 2em;
	border-radius: 10px;
}

.ck-content pre.stylish-code::before {
	content: "";
	display: block;
	height: 13px;
	background: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NCAxMyI+CiAgPGNpcmNsZSBjeD0iNi41IiBjeT0iNi41IiByPSI2LjUiIGZpbGw9IiNGMzZCNUMiLz4KICA8Y2lyY2xlIGN4PSIyNi41IiBjeT0iNi41IiByPSI2LjUiIGZpbGw9IiNGOUJFNEQiLz4KICA8Y2lyY2xlIGN4PSI0Ny41IiBjeT0iNi41IiByPSI2LjUiIGZpbGw9IiM1NkM0NTMiLz4KPC9zdmc+Cg==);
	margin-bottom: 8px;
	background-repeat: no-repeat;
}

.ck-content pre.stylish-code-dark,
.ck-content pre.stylish-code-bright {
	padding: 1em;
}

.ck-content pre.stylish-code-dark {
	background: #272822;
	box-shadow: 5px 5px 0 #0000001f;
	color: white;
}

.ck-content pre.stylish-code-dark code {
	color: white;
}

.ck-content pre.stylish-code-bright {
	background: #dddfe0;
	color: #000;
	box-shadow: 5px 5px 0 #b3b3b3;
}

.ck-content pre.stylish-code-bright code {
	color: #222;
}

` 