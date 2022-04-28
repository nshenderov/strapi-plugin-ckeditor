import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import styled, {createGlobalStyle } from "styled-components";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {Editor as CustomClassicEditor} from './build/ckeditor';
import { Box } from "@strapi/design-system/Box";
import { prefixFileUrlWithBackendUrl, request, auth } from '@strapi/helper-plugin';
import MediaLib from "../MediaLib";
import pluginId from '../../pluginId';
import defStyles from './styles'

const EditorStyle = createGlobalStyle `
.ck-editor__styled__container{
	position: relative;
	width:100%;
	${({ styles }) => styles}
}
`
const Wrapper = styled(Box)``;


const Editor = ({ onChange, name, value, disabled  }) => {

//####### strapi media lib connector #############################################################################################
	const [mediaLibVisible, setMediaLibVisible] = useState(false);
	const [editor, setEditor] = useState();
	const [uploadCfg, setUploadCfg] = useState();
	const toggleMediaLib = (editor) => {
		if (editor) {
		  setEditor(editor);
		}
		setMediaLibVisible((prev) => !prev);
	  };
	const handleChangeAssets = (assets) => {
		let newValue = value ? value : "";
		assets.map((asset) => {
		if (asset.mime.includes("image")) {
			if(uploadCfg?.responsiveDimensions){
				let set =''
				let keys = Object.keys(asset.formats)
				console.log(asset)
				keys?.map(k=>{
				let str = prefixFileUrlWithBackendUrl(asset.formats[k].url) + ` ${asset.formats[k].width}w,` 
				set = set + str
				})
				const imgTag = `<figure><img src="${asset.url}" alt="${asset.alt}" srcset="${set}"></img></figure>`;
				newValue = `${newValue}${imgTag}`;
			}else{
				const imgTag = `<figure><img src="${asset.url}" alt="${asset.alt}"></img></figure>`;
				newValue = `${newValue}${imgTag}`;
			}
		}
		// Handle videos and other type of files by adding some code
		});
		onChange({ target: { name, value: newValue } });
		toggleMediaLib()
	};

//####### config #############################################################################################
	const [config, setConfig] = useState();
	const [pluginCfg, setPluginCfg] = useState({styles:defStyles});
	const uploadUrl = `${prefixFileUrlWithBackendUrl('/upload')}`
	const headers = {Authorization: 'Bearer ' + auth.getToken(),}
	useEffect(() => {
		// load the editor config
		(async () => {
		  const editor = await request(`/${pluginId}/config/editor`, { method: 'GET' });
		  const plugin = await request(`/${pluginId}/config/plugin`, { method: 'GET' });
		  const upload = await request(`/${pluginId}/config/uploadcfg`, { method: 'GET' });

		  if(editor){
			setConfig({
				...config,
				editor:{
					...editor,
					strapiMediaLib:{
						onToggle: toggleMediaLib,
						label: 'Media library'
						},
					strapiUpload:{
						uploadUrl,
						headers,
					}
				}
			})
		  }
		  if(plugin){
			setPluginCfg({
				...pluginCfg,
				...plugin,
			})
		  }
		  if(upload){
			setUploadCfg({
				...uploadCfg,
				...upload,
			})
		  }
		})();
	
		return () => {
		};
	}, []);

  
//####### theme #############################################################################################
useEffect(() => {
	const strapiTheme = localStorage.getItem('STRAPI_THEME');
    if (strapiTheme)
    document.documentElement.setAttribute('data-theme', strapiTheme)
    return () => {
    }
  }, [])

  return (
    <Wrapper className='ck-editor__styled__container'>
	  <EditorStyle styles={pluginCfg.styles}/>
      {config && 
	  <CKEditor
        editor={CustomClassicEditor}
        disabled={disabled}
        data={value || ""}
        onReady={(editor) => editor.setData(value || "")}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange({ target: { name, value: data } });
        }}
		config={config?.editor}
	  />}
	  <MediaLib
        isOpen={mediaLibVisible}
        onChange={handleChangeAssets}
        onToggle={toggleMediaLib}
      />
	  
    </Wrapper>
  );
};

Editor.defaultProps = {
  value: "",
  disabled: false,
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Editor;