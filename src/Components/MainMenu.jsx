import "../Components/CSS_Files/MainMenu.css";

export function MainMenu({ setMainMenuSelection }) {
  return (
    <div className="MainMenu_Container">
      <h2>Please select a data set</h2>
      <div>
        <h4 style={{ margin: "3px" }}>Test percentage sets</h4>
        <button
          className="Main_Menu_Button"
          style={{
            marginBottom: "8px",
          }}
          onClick={() => {
            setMainMenuSelection(1);
          }}
        >
          New York Times best sellers by title
        </button>
        <button
          className="Main_Menu_Button"
          onClick={() => {
            setMainMenuSelection(2);
          }}
        >
          NASA Meteors by weight
        </button>
      </div>

      <div>
        <h4 style={{ margin: "20px 3px 3px 3px" }}>
          Define your own percentages
        </h4>
        <button
          className="Main_Menu_Button"
          onClick={() => {
            setMainMenuSelection(3);
          }}
        >
          Custom percentage distribution
        </button>
      </div>
    </div>
  );
}
