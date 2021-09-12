import PropTypes from "prop-types";
import Button from "./Button";
import { useLocation } from "react-router";

const Header = ({ title, onAdd, showAddTask }) => {
  const location = useLocation();

  return (
    <header className="header">
      <h1>{title}</h1>
      {/* By default, showAddTask comes as false so you have to check if it is false at first and then change the corresponsinding elements */}
      {location.pathname === "/" && (
        <Button
          color={!showAddTask ? "darkgreen" : "red"}
          text={!showAddTask ? "Add" : "Close"}
          onClick={onAdd}
        />
      )}
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

Header.defaultProps = {
  title: "Task Tracker",
};

export default Header;
