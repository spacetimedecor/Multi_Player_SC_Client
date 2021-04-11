import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import React from 'react';
import { RootState } from '../state';

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
