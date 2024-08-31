import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor } from "ckeditor5";
import { Box, Loader } from "@strapi/design-system";
import "ckeditor5/ckeditor5.css";

import { getConfiguration } from "./configuration";
import { getGlobalStyling } from "./styling";
import MediaLib from "../MediaLib";

const Wrapper = styled("div")`
  ${({ editorStyles }) => editorStyles}
`;

const Editor = ({ onChange, name, value, disabled, preset, maxLength }) => {
  const [editorInstance, setEditorInstance] = useState(false);

  const [mediaLibVisible, setMediaLibVisible] = useState(false);

  const [config, setConfig] = useState(null);

  const [lengthMax, setLengthMax] = useState(false);

  const wordCounter = useRef(null);

  const handleToggleMediaLib = () => setMediaLibVisible((prev) => !prev);

  const handleCounter = (number) =>
    number > maxLength ? setLengthMax(true) : setLengthMax(false);

  const GlobalStyling = getGlobalStyling();

  useEffect(() => {
    (async () => {
      const config = await getConfiguration(
        preset,
        handleToggleMediaLib
      );
      setConfig(config);
    })();
  }, []);

  return (
    <>
      {config && <GlobalStyling />}
      <Wrapper editorStyles={config?.styles}>
        {!config && (
          <LoaderBox hasRadius background="neutral100">
            <Loader>Loading...</Loader>
          </LoaderBox>
        )}
        {config && (
          <>
            <CKEditor
              editor={ClassicEditor}
              config={config?.ckeditorConfig}
              disabled={disabled}
              data={value}
              onReady={(editor) => {
                if (config.ckeditorConfig.WordCountPlugin) {
                  const wordCountPlugin = editor.plugins.get("WordCount");
                  wordCountPlugin.on("update", (evt, stats) =>
                    handleCounter(stats.characters)
                  );
                  const wordCountWrapper = wordCounter.current;
                  wordCountWrapper?.appendChild(
                    wordCountPlugin.wordCountContainer
                  );
                }

                if (editor.plugins.has("ImageUploadEditing")) {
                  editor.plugins
                    .get("ImageUploadEditing")
                    .on("uploadComplete", (evt, { data, imageElement }) =>
                      editor.model.change((writer) =>
                        writer.setAttribute("alt", data.alt, imageElement)
                      )
                    );
                }

                setEditorInstance(editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                onChange({ target: { name, value: data } });
              }}
            />
            <MediaLib
              isOpen={mediaLibVisible}
              onToggle={handleToggleMediaLib}
              editor={editorInstance}
            />
            {config.ckeditorConfig.WordCountPlugin && (
              <CounterLoaderBox
                color={lengthMax ? "danger500" : "neutral400"}
                ref={wordCounter}
              >
                {!editorInstance && <Loader small>Loading...</Loader>}
              </CounterLoaderBox>
            )}
          </>
        )}
      </Wrapper>
    </>
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

const CounterLoaderBox = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
`;
const LoaderBox = styled(Box)`
  display: flex;
  height: 200px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export default Editor;
