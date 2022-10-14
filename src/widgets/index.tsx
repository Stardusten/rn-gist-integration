import { declareIndexPlugin, ReactRNPlugin, WidgetLocation } from '@remnote/plugin-sdk';
import '../style.css';
import '../App.css';

async function onActivate(plugin: ReactRNPlugin) {

  await plugin.app.registerPowerup(
    'Gist',
    'gistCode',
    'A Gist Code Block',
    { slots: [] }
  );

  await plugin.app.registerWidget(
    'gist',
    WidgetLocation.UnderRemEditor,
    {
      powerupFilter: 'gistCode',
      dimensions: {
        width: '100%',
        height: 'auto',
      }
    }
  )
}

async function onDeactivate(_: ReactRNPlugin) {}

declareIndexPlugin(onActivate, onDeactivate);
