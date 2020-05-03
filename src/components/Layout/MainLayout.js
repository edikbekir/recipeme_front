import { Content, Footer, Header, Sidebar } from 'components/Layout';
import React from 'react';
import {
  MdImportantDevices,
  // MdCardGiftcard,
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
    const { children } = this.props;
    return (
      <main className="cr-app bg-light">
        <Sidebar />
        <Content fluid onClick={this.handleContentClick}>
          <Header />
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
    success
  }
}
export default connect(mapStateToProps)(MainLayout);
