import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { AddToast, ToastProvider, useToasts } from 'react-toast-notifications';
import { Col, Container, Row } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import store from './state';

export let ToastAdder: AddToast;

const MessageToasts: FunctionComponent = ({ children }): JSX.Element => {
  const { addToast } = useToasts();
  ToastAdder = addToast;
  return <div className="App">{children}</div>;
};

const App = (): JSX.Element => {
  return (
    <ToastProvider autoDismissTimeout={1000}>
      <MessageToasts>
        <Provider store={store}>
          <Container>
            <Row>
              <Col>1 of 1</Col>
            </Row>
          </Container>
        </Provider>
      </MessageToasts>
    </ToastProvider>
  );
};

export default App;
