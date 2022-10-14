import {
  AppEvents, RemId,
  renderWidget,
  useTracker,
  WidgetLocation,
} from '@remnote/plugin-sdk';
import Gist from 'react-gist';

export const GistWidget = () => {

  const gistId = useTracker(async (plugin) => {
    const context = await plugin.widget.getWidgetContext<WidgetLocation.UnderRemEditor>();
    const remId = context.remId;
    const rem = await plugin.rem.findOne(remId);
    if (rem) {
      const remTextInMd = await plugin.richText.toMarkdown(rem.text);
      const match = remTextInMd.match(/https:\/\/gist\.github\.com\/\w+?\/(\w+)\s*/);
      if (match && match[1])
        return match[1];
    }
    return undefined;
  });

  return gistId
    ? <Gist id={ gistId }/>
    : <div/>;
};

renderWidget(GistWidget);
