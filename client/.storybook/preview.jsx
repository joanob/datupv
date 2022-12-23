// Storybook makes a 40px total margin
// A 360px viewport renders a 320px box
const customViewports = {
  small: {
    // 320px body
    name: "small",
    styles: {
      width: '360px',
      height: '640px',
    }
  },
  medium: {
    // 480px body
    name: "medium",
    styles: {
      width: '520px',
      height: '800px',
    }
  },
  tablet: {
    // 768px body
    name: "tablet",
    styles: {
      width: '808px',
      height: '460px',
    }
  },
  desktop: {
    // 1024px body
    name: "desktop",
    styles: {
      width: '1064px',
      height: '600px',
    }
  }
}


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    defaultViewport: "small",
    viewports: customViewports
  }
}
  
export const decorators = [
  (Story) => (
    <div className="light">
      <Story />
    </div>
  )
]