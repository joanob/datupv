interface Props {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeToggle = ({ theme, toggleTheme }: Props) => {
  return (
    <div className="theme-toggle-container" onClick={toggleTheme}>
      <div className="theme-toggle-button" id="button-4">
        <input type="checkbox" className="theme-toggle-checkbox" />
        <div className="theme-toggle-knobs"></div>
        <div className="theme-toggle-layer"></div>
      </div>
    </div>
  );
};

export default ThemeToggle;
