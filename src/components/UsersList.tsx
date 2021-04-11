import { ListGroup } from 'react-bootstrap';
import { DefaultRootState, useSelector, useStore } from 'react-redux';
import React from 'react';
import { ApplicationState, RootState } from '../state';

export default (): JSX.Element => {
  const currentUsers: string[] = useSelector(
    (state: RootState) => state.App.currentUsers
  );

  return (
    <ListGroup>
      {currentUsers &&
        currentUsers.map((user: string) => (
          <ListGroup.Item key={user}>{user}</ListGroup.Item>
        ))}
    </ListGroup>
  );
};
