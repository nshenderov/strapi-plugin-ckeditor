import { toolbarEditor } from './toolbar';
import { toolbarBaloonEditor } from './toolbarBaloon';
import { blockBaloonEditor } from './blockBaloon';

const baseConfigs = {
    ...toolbarEditor,
    ...toolbarBaloonEditor,
    ...blockBaloonEditor
}

export default baseConfigs;
