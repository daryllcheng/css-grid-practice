import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const Alert = ({ alert, errorMessage, toggleAlert }) => {
  const actions = [<FlatButton label="Okay" primary={ true } onTouchTap={ () => toggleAlert() } />];
  console.log(`alert: ${ alert }, message: ${ errorMessage }`);
  return (
    <div>
      <Dialog actions={ actions } modal={ false } open={ alert }>
        { errorMessage }
      </Dialog>
    </div>
  );
}

export default Alert;