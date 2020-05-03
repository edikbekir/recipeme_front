import AuthForm, { STATE_LOGIN } from 'components/AuthForm';
import React from 'react';
import { userActions } from '../data/actions/user';
import ErrorMessage from '../components/ErrorMessage';
import { connect } from 'react-redux';
import { Card, Col, Row } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class AuthPage extends React.Component {
  state = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    password_confirmation: '',
  };

  handleAuthState = authState => {
    if (authState === STATE_LOGIN) {
      this.props.history.push('/login');
    } else {
      this.props.history.push('/signup');
    }
  };

  handleLogoClick = () => {
    this.props.history.push('/');
  };

  onChangeData = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  resetPreviousPage = () => {
    if (this.props.authState === STATE_LOGIN) {
      this.props.resetLoginPage({ type: 'LOGIN_REQUEST' });
    } else {
      this.props.resetSignupPage({ type: 'SIGNUP_REQUEST' });
    }
  }

  componentWillUnmount = () => {
    this.resetPreviousPage();
  }

  render() {
    return (
      <Row
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        { this.props.user.loggedIn && <Redirect to="/" /> }
        <Col md={6} lg={4}>
          <ErrorMessage error={this.props.user.error} />
          <Card body>
            <AuthForm
              data={this.state}
              authState={this.props.authState}
              onChangeAuthState={this.handleAuthState}
              onLogoClick={this.handleLogoClick}
              submitAuth={this.props.handleSubmit}
              onChange={this.onChangeData}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

function mapDispatchToProps(dispatch){
  return {
    handleSubmit: (params, authState) => dispatch(userActions.signupOrLogin(params, authState)),
    resetLoginPage: action => dispatch(action),
    resetSignupPage: action => dispatch(action)
  }
}

function mapStateToProps(state){
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
