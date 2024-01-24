import { createTheme, MantineProvider, Button, TextInput, PasswordInput } from '@mantine/core';

const theme = createTheme({
  fontFamily: 'Epilogue, Inter',
  primaryColor: 'blue',
  colors: {
    blue: [
      "#b9bfd2",
      "#747d94",
      "#616f97",
      "#425283",
      "#1f3871",
      "#19316a",
      "#213770",
      "#082053",
      "#00113d",
      "#000a25",
      "#081B4E"
    ],
    orange: [
      "#ffcaba",
      "#ffa48e",
      "#ff8f6e",
      "#ff7a4f",
      "#ff6530",
      "#ff5011",
      "#e64600",
      "#b33f00",
      "#802e00",
      "#4d1d00",
      "#f43724",
      "#F21A05"
    ],
    gray: [
      "#f5f6f8",
      "#eaecf0",
      "#e0e0e0",
      "#d6d6d6",
      "#cccccc",
      "#c2c2c2",
      "#b8b8b8",
      "#adadad",
      "#a3a3a3",
      "#999999",
      "#777777"
    ]
  },
  components: {
    Button: Button.extend({
      defaultProps: {
        size: 'lg',
        radius: 'md'
      }
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        size: 'lg',
        radius: 'md',
        fw: 700,
      },
      styles: {
        input: {
          color: '#293D71',
        }
      },
    }),
    PasswordInput: PasswordInput.extend({
      defaultProps: {
        size: 'lg',
        radius: 'md',
        fw: 700
      },
      styles: {
        input: {
          color: '#293D71',
        }
      },
    })
  }
});

export default function MantineProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider 
      theme={theme} 
      // defaultColorScheme='dark'
    >{children}</MantineProvider>
  );
}