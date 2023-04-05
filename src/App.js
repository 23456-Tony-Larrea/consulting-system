import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import './helpers/Firebase';
import AppLocale from './lang';

import {
  adminRoot,
  UserRole,
} from './constants/defaultValues';
import { getDirection } from './helpers/Utils';
import { ProtectedRoute } from './helpers/authHelper';
import UserLayout from 'layout/UserLayout';

const ViewHome = React.lazy(() =>
  import(/* webpackChunkName: "views" */ './views/home')
);
const ViewMenu = React.lazy(() => import(/* webpackChunkName: "views" */ './views/app/admin/admin'));
const ViewMenuName = React.lazy(() => import(/* webpackChunkName: "views" */ './views/app/admin/adminName'));
const ViewMenuFileUser= React.lazy(() =>import(/* webpackChunkName: "views" */ './views/app/uploadsFiles/menuFileUsers'));
const ViewMenuFileIess= React.lazy(() =>import(/* webpackChunkName: "views" */ './views/app/uploadsFiles/menuFileIess'));
const ViewNewMenu = React.lazy(() =>import(/* webpackChunkName: "views" */ './containers/navs/NewMenu'));
const ViewMenuFilePolices= React.lazy(() =>import(/* webpackChunkName: "views" */ './views/app/uploadsFiles/menuFilePolices'));
const ViewMenuFileTeachers= React.lazy(() =>import(/* webpackChunkName: "views" */ './views/app/uploadsFiles/menuFileTeachers'));
const ViewMenuFileDoctors= React.lazy(() =>import(/* webpackChunkName: "views" */ './views/app/uploadsFiles/MenuFileDoctors'));
const ViewMenuFileAsamblea= React.lazy(() =>import(/* webpackChunkName: "views" */ './views/app/uploadsFiles/MenuFileAsamblea'));
const ViewMenuShareholder= React.lazy(() =>import(/* webpackChunkName: "views" */ './views/app/admin/MenuShareholders'));
const ViewMenuFileShareholder= React.lazy(() =>import(/* webpackChunkName: "views" */ './views/app/uploadsFiles/MenuFileCompaniesDos'));
const ViewMenuFileHandicapped = React.lazy(() =>import(/* webpackChunkName: "views" */ './views/app/uploadsFiles/MenuFileHandicapped'));

const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './views/app')
);
const ViewUser = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ './views/user')
);
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/error')
);
const ViewUnauthorized = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/unauthorized')
);
const Login = React.lazy(() =>
  import(/* webpackChunkName: "user-login" */ './views/user/login')
);
class App extends React.Component {
  constructor(props) {
    super(props);
    const direction = getDirection();
    if (direction.isRtl) {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }

  render() {
    const { locale } = this.props;
    const currentAppLocale = AppLocale[locale];

    return (
      
      <div className="h-100">
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <>
            <Suspense fallback={<div className="loading" />}>
              <Router>
                <Switch>
                  <ProtectedRoute
                    path={adminRoot}
                    component={ViewApp}
                    roles={[UserRole.Admin, UserRole.Editor]}
                  />
                  <Route
                    path="/user"
                    render={(props) => <ViewUser {...props} />}
                  />
                  <Route
                    path="/error"
                    exact
                    render={(props) => <ViewError {...props} />}
                  />
                  <Route
                    path="/unauthorized"
                    exact
                    render={(props) => <ViewUnauthorized {...props} />}
                  />
                
                  <Route
                    path="/menu"
                    exact
                    render={(props) => <ViewMenu {...props} />}
                  />
                 
                <Route
                  path="/menuName"
                  exact
                  render={(props) => <ViewMenuName {...props} />}
                  />
                  <Route
                  path="/menuFileUser"
                  exact
                  render={(props) => <ViewMenuFileUser {...props} />}
                  />
                  <Route
                  path="/menuFileIess"
                  exact
                  render={(props) => <ViewMenuFileIess {...props} />}
                  />
                  <Route
                  path="/newMenu"
                  exact
                  render={(props) => <ViewNewMenu {...props} />}
                  />
                  <Route
                  path="/menuFilePolices"
                  exact
                  render={(props) => <ViewMenuFilePolices {...props} />}
                  />
                  <Route
                  path="/menuFileTeachers"
                  exact
                  render={(props) => <ViewMenuFileTeachers {...props} />}
                  />
                  <Route
                  path="/menuFileDoctors"
                  exact
                  render={(props) => <ViewMenuFileDoctors {...props} />}
                  />
                  <Route
                  path="/familyTree"
                  exact
                  render={(props) => <ViewFamilyTree {...props} />}
                  />
                  <Route
                  path="/menuFileAsamblea"
                  exact
                  render={(props) => <ViewMenuFileAsamblea {...props} />}
                  />
                  <Route
                  path="/menuShareholder"
                  exact
                  render={(props) => <ViewMenuShareholder {...props} />}
                  />
                  <Route
                  path="/menuFileShareholder"
                  exact
                  render={(props) => <ViewMenuFileShareholder {...props} />}
                  />
  
                  <Route
                  path="/menuFileHandicapped"
                  exact
                  render={(props) => <ViewMenuFileHandicapped {...props} />}
                  />
                  <UserLayout>
                  <Route
                  path="/"
                  exact
                  render={(props) => <Login {...props} />}         
                  />
                  </UserLayout>
                  <Redirect to="/error" />
                </Switch>
              </Router>
            </Suspense>
          </>
        </IntlProvider>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser, settings }) => {
  const { currentUser } = authUser;
  const { locale } = settings;
  return { currentUser, locale };
};
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(App);
