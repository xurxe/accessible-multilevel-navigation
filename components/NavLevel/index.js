import React, { useState } from 'react';
import NavLink from '../NavLink';

const NavSublevel = ({ data, level }) => {
  const [expanded, setExpanded] = useState(false);
  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <NavLink data={data} />
      <button type="button" onClick={handleClick} aria-pressed={expanded}>
        {expanded ? 'Collapse' : 'Expand'}
      </button>
      {expanded ? <NavLevel data={data.children} level={level + 1} /> : null}
    </>
  );
};

const NavLevel = ({ data, level }) => (
  <>
    <ul role={level == 0 ? 'tree' : 'group'}>
      {data.map(item => (
        <>
          {item.children ? (
            <li role="treeitem">
              <NavSublevel data={item} />
            </li>
          ) : (
            <li role="none">
              <NavLink data={item} />
            </li>
          )}
        </>
      ))}
    </ul>
  </>
);

export default NavLevel;
