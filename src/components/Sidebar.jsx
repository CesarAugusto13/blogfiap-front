import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const icons = {
  home: '🏠',
  admin: '⚙️',
  about: 'ℹ️',
  login: '🔑',
  register: '📝',
};

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      style={{
        ...styles.sidebar,
        width: expanded ? '220px' : '60px',
      }}
    >
      <nav>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <NavLink
              to="/"
              exact
              style={styles.link}
              activeStyle={styles.activeLink}
              title="Home"
            >
              <span style={styles.icon}>{icons.home}</span>
              {expanded && <span style={styles.linkText}>Home</span>}
            </NavLink>
          </li>
        <li style={styles.navItem}>
            <NavLink
              to="/admin"
              style={styles.link}
              activeStyle={styles.activeLink}
              title="Admin"
            >
              <span style={styles.icon}>{icons.admin}</span>
              {expanded && <span style={styles.linkText}>Admin</span>}
            </NavLink>
        </li>
          <li style={styles.navItem}>
            <NavLink
              to="/login"
              style={styles.link}
              activeStyle={styles.activeLink}
              title="Login"
            >
              <span style={styles.icon}>{icons.login}</span>
              {expanded && <span style={styles.linkText}>Login</span>}
            </NavLink>
          </li>
          <li style={styles.navItem}>
            <NavLink
              to="/register"
              style={styles.link}
              activeStyle={styles.activeLink}
              title="Registrar"
            >
              <span style={styles.icon}>{icons.register}</span>
              {expanded && <span style={styles.linkText}>Registrar</span>}
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

const styles = {
  sidebar: {
    height: '100vh',
    backgroundColor: '#1e272e',
    paddingTop: '20px',
    paddingLeft: '10px',
    boxSizing: 'border-box',
    position: 'fixed',
    top: 0,
    left: 0,
    color: '#d2dae2',
    overflowX: 'hidden',
    transition: 'width 0.3s ease',
    borderRight: '1px solid #485460',
  },
  navList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  navItem: {
    marginBottom: '15px',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    color: '#d2dae2',
    textDecoration: 'none',
    padding: '10px 12px',
    borderRadius: '4px',
    whiteSpace: 'nowrap',
  },
  activeLink: {
    backgroundColor: '#485460',
    fontWeight: '700',
  },
  icon: {
    fontSize: '20px',
    width: '30px',
    textAlign: 'center',
  },
  linkText: {
    marginLeft: '10px',
    fontSize: '16px',
  },
};

export default Sidebar;
