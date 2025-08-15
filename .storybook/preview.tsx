import { ThemeProvider } from "@emotion/react";
import React from "react";
import type { Preview } from "@storybook/react-vite";
import { theme } from "../src/components/App/ui/theme";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        dark: { name: "Dark", value: "rgb(32, 33, 36)" },
      },
    },

    layout: "centered",

    a11y: { test: "todo" },
  },
  initialGlobals: {
    backgrounds: { value: "dark" },
  },

  decorators: [
    (Story) => {
      return (
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
