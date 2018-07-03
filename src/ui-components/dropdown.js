import React from 'react';
import { withState, withHandlers, compose} from 'recompose';

const dropdown = ({title, isExpand, handleClick, content}) => {
    return (
      <div className="dropdown">
        <div className="dropdown-bar">
          <a href="#" onClick={handleClick}>
            <p className="dropdown-title"> {title}
              <span className={isExpand ? "icon-caret-up" : "icon-caret-down"}></span>
            </p>
          </a>
        </div>
        <div className={isExpand ? "dropdown-content" : "dropdown-content hide"}>
            {content}
        </div>
      </div>
    )
};

const enhance = compose(
  withState('isExpand', 'setExpand', false),
  withHandlers({
    handleClick: props => events => props.setExpand(!props.isExpand)
  })
)

export default enhance(dropdown);
