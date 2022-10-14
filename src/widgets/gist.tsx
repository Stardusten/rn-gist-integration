import {
  AppEvents, RemId,
  renderWidget,
  useAPIEventListener, useGetRemsByIdsReactive,
  usePlugin,
  useRunAsync,
  WidgetLocation,
} from '@remnote/plugin-sdk';
import Gist from 'react-gist';
import { useState } from 'react';

export const GistWidget = () => {

  const plugin = usePlugin();
  const [change, setChange] = useState(false);

  const remId = useRunAsync(async () => {
    const context = await plugin.widget.getWidgetContext<WidgetLocation.UnderRemEditor>();
    return context.remId;
  }, []);

  const gistId = useRunAsync(async () => {
    const rem = await plugin.rem.findOne(remId);
    if (rem) {
      const remTextInMd = await plugin.richText.toMarkdown(rem.text);
      const match = remTextInMd.match(/https:\/\/gist\.github\.com\/\w+?\/(\w+)\s*/);
      if (match && match[1])
        return match[1];
    }
    return undefined;
  }, [remId, change]);

  // rerender when rem changed
  useAPIEventListener(AppEvents.RemChanged, remId, () => setChange(old => !old));

  return gistId
    ? <Gist id={ gistId }/>
    : <div/>;
};

renderWidget(GistWidget);
