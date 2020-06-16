import { Content, Footer, Header, Sidebar } from 'components/Layout';
import { Redirect } from 'react-router-dom';
import React from 'react';
import {
  MdImportantDevices,
  MdLoyalty,
} from 'react-icons/md';

import {
  connect
} from 'react-redux';

import NotificationSystem from 'react-notification-system';
import { NOTIFICATION_SYSTEM_STYLE } from 'utils/constants';

class MainLayout extends React.Component {
  static isSidebarOpen() {
    return document
      .querySelector('.cr-sidebar')
      .classList.contains('cr-sidebar--open');
  }

  componentDidUpdate(prevProps){
    if(this.props.success !== prevProps.success ){
      setTimeout(() => {
        if (!this.notificationSystem) {
          return;
        }

        this.notificationSystem.addNotification({
          title: <MdImportantDevices />,
          message: 'Entity successfully created.',
          level: 'info',
        });
      }, 1000);
    }
  }

  componentDidMount() {
    this.checkBreakpoint(this.props.breakpoint);
  }

  checkBreakpoint(breakpoint) {
    switch (breakpoint) {
      case 'xs':
      case 'sm':
      case 'md':
        return this.openSidebar('close');

      case 'lg':
      case 'xl':
      default:
        return this.openSidebar('open');
    }
  }

  openSidebar(openOrClose) {
    if (openOrClose === 'open') {
      return document
        .querySelector('.cr-sidebar')
        .classList.add('cr-sidebar--open');
    }
    document.querySelector('.cr-sidebar').classList.remove('cr-sidebar--open');
  }

  render() {
    const { children, i18n, t } = this.props;

    return (
      <main className="cr-app bg-light">
        { !this.props.user.loggedIn && <Redirect to="/login" /> }

        <Sidebar i18n={i18n} t={t} />
        <Content fluid onClick={this.handleContentClick}>
          <Header i18n={i18n} t={t} />
          {children}
          <Footer />
        </Content>

        <NotificationSystem
          dismissible={false}
          ref={notificationSystem =>
            (this.notificationSystem = notificationSystem)
          }
          style={NOTIFICATION_SYSTEM_STYLE}
        />
      </main>
    );
  }
}

function mapStateToProps(state){
  const loading = Object.values(state).map(v => v.loading).reduce((boolean, loading) => loading || boolean, false);
  const success = Object.values(state).map(v => v.success).reduce((boolean, success) => success || boolean, false);
  return {
    loading,
    success,
    user: state.user
  }
}
export default connect(mapStateToProps)(MainLayout);
