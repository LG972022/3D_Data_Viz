function MainMenu({ setMainMenuSelection }) {
  return (
    <div>
      <h2>Please select a data set</h2>
      <div>
        <button style={{ display: "block" }}>
          New York Times Best Sellers by List Additions
        </button>

        <button
          style={{ display: "block" }}
          onClick={() => {
            setMainMenuSelection(1);
          }}
        >
          Meteors Fell to Earth By Weight
        </button>

        <button
          style={{ display: "block" }}
          onClick={() => {
            setMainMenuSelection(3);
          }}
        >
          Custom Percentage Distribution
        </button>
      </div>
    </div>
  );
}

export default MainMenu;
