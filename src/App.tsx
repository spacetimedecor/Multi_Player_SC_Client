import React, { FunctionComponent, useEffect } from 'react';
import { Provider } from 'react-redux';
import ReactNotification from 'react-notifications-component';
import { Col, Container, Row } from 'react-bootstrap';

import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import store from './state';
import { MESSAGES, newMessage } from './messages/messages';
import UsersList from './components/UsersList';

const App = (): JSX.Element => {
  useEffect(() => {
    store.dispatch(newMessage(MESSAGES.WS_SETUP, {}));
  }, []);
  return (
    <Provider store={store}>
      <ReactNotification />
      <Container>
        <UsersList />
      </Container>
    </Provider>
  );
};

export default App;
