import "./book.css";

const Slide = ({ children, direction, startAnimation }) => {
  const transitionProperties = startAnimation
    ? { left: "100%", opacity: 1 }
    : {};

  return (
    <div className="slide" style={transitionProperties}>
      {children}
    </div>
  );
};
export default Slide;
