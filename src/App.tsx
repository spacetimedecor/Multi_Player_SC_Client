import React, { FunctionComponent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './socket';
import { AddToast, ToastProvider, useToasts } from 'react-toast-notifications';
import { Col, Container, Row } from 'react-bootstrap';

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
        <Container>
          <Row>
            <Col>1 of 1</Col>
          </Row>
        </Container>
      </MessageToasts>
    </ToastProvider>
  );
};

export default App;
