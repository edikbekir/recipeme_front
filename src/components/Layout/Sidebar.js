import logoImage from 'assets/img/logo/logo.png';
import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import SourceLink from 'components/SourceLink';
import React from 'react';
import {
  MdDashboard,
  MdGrade,
  MdBook,
  MdKeyboardArrowDown,
  MdSettings,
  MdInsertPhoto,
  MdVideocam,
  MdShoppingBasket,
  MdAdd
} from 'react-icons/md';

import {
  FaBook
} from 'react-icons/fa';

import { NavLink } from 'react-router-dom';
import {
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

// const pageProcessing = [];

const navItems = [
  { to: '/', name: 'dashboard', exact: true, Icon: MdDashboard },
];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenRecipes: false,
    isOpenProcessing: false
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    const processing = [
      { to: '/processing/image', name: this.props.t('image'), exact: false, Icon: MdInsertPhoto },
      { to: '/processing/video', name: this.props.t('video'), exact: false, Icon: MdVideocam },
    ];

    const recipes = [
      {
        to: '/popular',
        name: this.props.t('popular'),
        exact: false,
        Icon: MdGrade
      },
      {
        to: '/recipes/processed',
        name: this.props.t('processed'),
        exact: false,
        Icon: MdBook,
      },
      {
        to: '/recipes',
        name: this.props.t('create'),
        exact: true,
        Icon: MdAdd,
      }
    ];
    const { t } = this.props;
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            <SourceLink className="navbar-brand d-flex">
              <img
                src={logoImage}
                width="40"
                height="30"
                className="pr-2"
                alt=""
              />
              <span className="text-white">
                Recipeme
              </span>
            </SourceLink>
          </Navbar>

          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{t('dashboard')}</span>
                </BSNavLink>
              </NavItem>
            ))}

            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Recipes')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <FaBook className={bem.e('nav-item-icon')} />
                  <span className=" align-self-start">{t('recipes')}</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenRecipes
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenRecipes}>
              {recipes.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Processing')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdSettings className={bem.e('nav-item-icon')} />
                  <span className="">{t('processing')}</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenProcessing
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenProcessing}>
              {processing.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
            <NavItem className={bem.e('nav-item')}>
              <BSNavLink
                id="showNavItem"
                to="/shop/types"
                tag={NavLink}
                activeClassName="active"
                exact={true}
              >
                <MdShoppingBasket className={bem.e('nav-item-icon')} />
                <span className="">{t('shop')}</span>
              </BSNavLink>
            </NavItem>
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
