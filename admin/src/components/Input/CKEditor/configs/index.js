import { toolbarEditor } from './toolbar';
import { toolbarBalloonEditor } from './toolbarBalloon';
import { blockBalloonEditor } from './blockBalloon';

const baseConfigs = {
    ...toolbarEditor,
    ...toolbarBalloonEditor,
    ...blockBalloonEditor
}

export default baseConfigs;
