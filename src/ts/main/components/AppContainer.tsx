import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Header from './Header';
import Homepage from './Homepage';
import { createUser, changeAvatar, Registration } from '../../Registration';
import { Route, withRouter, Switch } from 'react-router-dom';
import { UserState } from '../../Registration/model';
import { ProfileBuilder } from '../../ProfileBuilder';

export interface AppContainerStateProps {
  dispatch: Dispatch<{}>;
  users: any;
}

interface AppContainerProps extends AppContainerStateProps {}

class AppContainer extends React.Component<AppContainerProps, {}> {
  public render(): JSX.Element {

    const { dispatch } = this.props;

    const dispatchCreateUser: any = (user: UserState) => dispatch(createUser(user));
    const dispatchChangeAvatar: any = (email: string, avatar: string) => dispatch(changeAvatar(email, avatar ));
    return (
      <div>
        <Header />
        <Switch>
          <Route exact={true} path="/" component={Homepage} />
          <Route
            exact={true}
            path="/registration"
            render={() => <Registration createUser={dispatchCreateUser} />}
          />
          <Route
            exact={true}
            path="/profile-builder"
            render={() => <ProfileBuilder classes={{ }} theme={{ }} changeAvatar={dispatchChangeAvatar}/>}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state: any, _ownProps: any) => ({
    users: state.userReducer
});

export default withRouter(connect(mapStateToProps)(AppContainer));
