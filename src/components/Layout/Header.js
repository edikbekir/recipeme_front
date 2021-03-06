import Avatar from 'components/Avatar';
import { UserCard } from 'components/Card';
import Notifications from 'components/Notifications';
import SearchInput from 'components/SearchInput';
import Cart from 'components/Cart';
import { notificationsData } from 'demos/header';
import withBadge from 'hocs/withBadge';
import React from 'react';
import en from '../../assets/img/languages/en.png';
import ua from '../../assets/img/languages/ua.png';
import {
  MdClearAll,
  MdExitToApp,
  MdHelp,
  MdInsertChart,
  MdMessage,
  MdNotificationsActive,
  MdNotificationsNone,
  MdPersonPin,
  MdSettingsApplications,
} from 'react-icons/md';
import { NavLink as Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { userActions } from '../../data/actions/user';
import { searchActions } from '../../data/actions/search';
import {
  Button,
  ListGroup,
  ListGroupItem,
  // NavbarToggler,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
  NavLink as BSNavLink
} from 'reactstrap';
import bn from 'utils/bemnames';

const bem = bn.create('header');

const MdNotificationsActiveWithBadge = withBadge({
  size: 'md',
  color: 'primary',
  style: {
    top: -10,
    right: -10,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  children: <small>5</small>,
})(MdNotificationsActive);

class Header extends React.Component {
  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false,
  };

  toggleNotificationPopover = () => {
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover,
    });

    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true });
    }
  };

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
    });
  };

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };

  render() {
    const { isNotificationConfirmed } = this.state;
    const { i18n, t } = this.props;
    return (
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
        <Nav navbar>
          <SearchInput t={t} onSearch={this.props.onSearch} searchResult={this.props.search} />
        </Nav>

        <Nav navbar className={bem.e('nav-right')}>
          <NavItem>
            <span className="languageIcon" onClick={() => i18n.changeLanguage('en')}>
              <img style={{width: '40px'}} src={en} />
            </span>
            <span className="languageIcon" onClick={() => i18n.changeLanguage('ua')}>
              <img style={{width: '40px'}} src={ua} />
            </span>
          </NavItem>
          <NavItem className="d-inline-flex">
            <Redirect
              className="text-uppercase"
              to="/view-cart"
              activeClassName="active"
              exact={true}
            >
              <Cart />
            </Redirect>
          </NavItem>

          <NavItem>
            <NavLink id="Popover2">
              <Avatar
                onClick={this.toggleUserCardPopover}
                className="can-click"
              />
            </NavLink>
            <Popover
              placement="bottom-end"
              isOpen={this.state.isOpenUserCardPopover}
              toggle={this.toggleUserCardPopover}
              target="Popover2"
              className="p-0 border-0"
              style={{ minWidth: 250 }}
            >
              <PopoverBody className="p-0 border-light">
                <UserCard
                  title={this.props.user && this.props.user.first_name}
                  subtitle={this.props.user && this.props.user.email}
                  className="border-light"
                >
                  <ListGroup flush>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdPersonPin /> Profile
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdInsertChart /> Stats
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdMessage /> Messages
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdSettingsApplications /> Settings
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdHelp /> Help
                    </ListGroupItem>
                    <ListGroupItem onClick={this.props.logout} tag="button" action className="border-light">
                      <MdExitToApp /> Logout
                    </ListGroupItem>
                  </ListGroup>
                </UserCard>
              </PopoverBody>
            </Popover>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

function mapDispatchToProps(dispatch){
  return {
    logout: () => dispatch(userActions.logout()),
    onSearch: query => dispatch(searchActions.search(query))
  }
}

function mapStateToProps(state){
  const { user } = state.user;
  const { search } = state.search;
  return {
    user,
    search
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
