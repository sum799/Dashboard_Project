import { Dispatch, PropsWithChildren, createContext, use, useReducer } from 'react';
import { Config, initialConfig } from 'config';
import { getColor } from 'helpers/echart-utils';
import { getItemFromStore } from 'lib/utils';
import {
  ACTIONTYPE,
  COLLAPSE_NAVBAR,
  EXPAND_NAVBAR,
  SET_CONFIG,
  settingsReducer,
} from 'reducers/SettingsReducer';

interface SettingsContextInterFace {
  config: Config;
  configDispatch: Dispatch<ACTIONTYPE>;
  setConfig: (payload: Partial<Config>) => void;
  handleDrawerToggle: () => void;
  toggleNavbarCollapse: () => void;
  getThemeColor: (color: string) => string;
}

export const SettingsContext = createContext({} as SettingsContextInterFace);

const SettingsProvider = ({ children }: PropsWithChildren) => {
// File header: SettingsProvider stores global configuration (font family,
// appearance options) and exposes a `useSettingsContext` hook for components
// to read/update settings. Changing defaults here affects the whole app.
  const configState: Config = {
    ...initialConfig,
    sidenavCollapsed: getItemFromStore('sidenavCollapsed', initialConfig.sidenavCollapsed),
    fontFamily: getItemFromStore('fontFamily', initialConfig.fontFamily),
    darkMode: getItemFromStore('darkMode', initialConfig.darkMode) === 'true',
  };
  const [config, configDispatch] = useReducer(settingsReducer, configState);

  const setConfig = (payload: Partial<Config>) => {
    configDispatch({
      type: SET_CONFIG,
      payload,
    });
  };

  const handleDrawerToggle = () => {
    setConfig({
      openNavbarDrawer: !config.openNavbarDrawer,
    });
  };

  const toggleNavbarCollapse = () => {
    if (config.sidenavCollapsed) {
      configDispatch({
        type: EXPAND_NAVBAR,
      });
    } else {
      configDispatch({
        type: COLLAPSE_NAVBAR,
      });
    }
  };

  const getThemeColor = (color: string) => {
    return getColor(color);
  };

  return (
    <SettingsContext
      value={{
        config,
        configDispatch,
        setConfig,
        handleDrawerToggle,
        toggleNavbarCollapse,
        getThemeColor,
      }}
    >
      {children}
    </SettingsContext>
  );
};

export const useSettingsContext = () => use(SettingsContext);

export default SettingsProvider;
