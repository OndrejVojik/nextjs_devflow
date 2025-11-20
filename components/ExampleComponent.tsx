import React from "react";

const ExampleComponent: React.FC = () => {
  return (
    <div className="size-12 bg-blue-400">
      <div style={{ width: 50, height: 50, backgroundColor: "lightblue" }}>
        This div has a width of 50 pixels.
      </div>
    </div>
  );
};

export default ExampleComponent;
