import mixpanel from 'mixpanel-browser';

const devMode = import.meta.env.DEV;

// MixPanel.init(import.meta.env.VITE_MIXPANEL_TOKEN);

const actions = {
  init: (token: string) => {
    if(devMode) {
      console.log("Skipping MixPanel in dev mode");
      return;
    }

    mixpanel.init(token);
  },
  identify: (id: string) => {
    // Off in dev mode
    if (devMode) {
      return;
    }

    mixpanel.identify(id);
  },
  alias: (id: string) => {
    // Off in dev mode
    if (devMode) {
      return;
    }

    mixpanel.alias(id);
  },
  track: (name: string, props: any) => {
    // Off in dev mode
    if (devMode) {
      return;
    }

    mixpanel.track(name, props);
  },
  people: {
    set: (props: any) => {
      // Off in dev mode
      if (devMode) {
        return;
      }

      mixpanel.people.set(props);
    },
  },
};

export const MixPanel = actions;