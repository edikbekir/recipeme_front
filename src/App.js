import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import AuthPage from 'pages/AuthPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';
import { withTranslation } from 'react-i18next';


const AlertPage = React.lazy(() => import('pages/AlertPage'));
const AuthModalPage = React.lazy(() => import('pages/AuthModalPage'));
const BadgePage = React.lazy(() => import('pages/BadgePage'));
const ButtonGroupPage = React.lazy(() => import('pages/ButtonGroupPage'));
const ButtonPage = React.lazy(() => import('pages/ButtonPage'));
const CardPage = React.lazy(() => import('pages/CardPage'));
const ChartPage = React.lazy(() => import('pages/ChartPage'));
const DashboardPage = React.lazy(() => import('pages/DashboardPage'));
const DropdownPage = React.lazy(() => import('pages/DropdownPage'));
const FormPage = React.lazy(() => import('pages/FormPage'));
const CreateRecipePage = React.lazy(() => import('pages/CreateRecipePage'));
const RecipePage = React.lazy(() => import('pages/RecipePage'));
const PopularRecipes = React.lazy(() => import('pages/PopularRecipes'));
const InputGroupPage = React.lazy(() => import('pages/InputGroupPage'));
const ModalPage = React.lazy(() => import('pages/ModalPage'));
const ProgressPage = React.lazy(() => import('pages/ProgressPage'));
const TablePage = React.lazy(() => import('pages/TablePage'));
const TypographyPage = React.lazy(() => import('pages/TypographyPage'));
const WidgetPage = React.lazy(() => import('pages/WidgetPage'));
const FoodTypesPage = React.lazy(() => import('pages/FoodTypesPage'));
const ProductsPage = React.lazy(() => import('pages/ProductsPage'));
const ViewCartPage = React.lazy(() => import('pages/ViewCartPage'));
const DishesRecognitionPage = React.lazy(() => import('pages/DishesRecognitionPage'));
const VideoRecognitionPage = React.lazy(() => import('pages/VideoRecognitionPage'));

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};


class App extends React.Component {
  mergeProps = (props, currentProps) => {
    return { ...props, ...currentProps};
  }
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch t={this.props.t} i18n={this.props.i18n}>
            <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />

            <MainLayout {...this.props} breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                <Route exact path="/" component={props => (<DashboardPage {...this.mergeProps(this.props, props)}/> )} />
                <Route exact path="/recipes" component={props => (<CreateRecipePage {...this.mergeProps(this.props, props)}/> )} />
                <Route exact path="/popular" component={props => (<PopularRecipes {...this.mergeProps(this.props, props)}/> )} />
                <Route path="/recipes/:id" component={props => (<RecipePage {...this.mergeProps(this.props, props)}/> )} />
                <Route exact path="/shop/types" component={props => (<FoodTypesPage {...this.mergeProps(this.props, props)}/> )} />
                <Route exact path="/processing/image" component={props => (<DishesRecognitionPage {...this.mergeProps(this.props, props)} /> )} />
                <Route exact path="/processing/video" component={props => (<VideoRecognitionPage {...this.mergeProps(this.props, props)}/> )} />
                <Route path="/shop/types/:id/products" component={props => (<ProductsPage {...this.mergeProps(this.props, props)} /> )} />
                <Route exact path="/login-modal" component={props => (<AuthModalPage {...this.mergeProps(this.props, props)}/> )} />
                <Route exact path="/view-cart" component={props => (<ViewCartPage {...this.mergeProps(this.props, props)}/> )} />
                <Route exact path="/buttons" component={props => (<ButtonPage {...this.mergeProps(this.props, props)}/> )} />
                <Route exact path="/cards" component={props => (<CardPage {...this.mergeProps(this.props, props)}/> )} />
                <Route exact path="/widgets" component={props => (<WidgetPage {...this.mergeProps(this.props, props)}/> )} />
                <Route exact path="/typography" component={props => (<TypographyPage {...this.mergeProps(this.props, props)}/> )} />
                <Route exact path="/alerts" component={props => (<AlertPage {...this.mergeProps(this.props, props)}/> )} />
                <Route exact path="/tables" component={props => (<TablePage {...this.mergeProps(this.props, props)}/> )} />
                <Route exact path="/badges" component={props => (<BadgePage {...this.mergeProps(this.props, props)}/> )} />
                <Route
                  exact
                  path="/button-groups"
                  component={props => (<ButtonGroupPage {...this.mergeProps(this.props, props)}/> )}
                />
                <Route exact path="/dropdowns" component={props => (<DropdownPage {...this.mergeProps(this.props, props)}/> )} />
                <Route exact path="/progress" component={props => (<ProgressPage {...this.mergeProps(this.props, props)}/> )} />
                <Route exact path="/modals" component={props => (<ModalPage {...this.mergeProps(this.props, props)}/> )} />
                <Route exact path="/forms" component={props => (<FormPage {...this.mergeProps(this.props, props)}/> )} />
                <Route exact path="/input-groups" component={props => (<InputGroupPage {...this.mergeProps(this.props, props)}/> )} />
                <Route exact path="/charts" component={props => (<ChartPage {...this.mergeProps(this.props, props)}/> )} />
              </React.Suspense>
            </MainLayout>
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default withTranslation('common')(App);
