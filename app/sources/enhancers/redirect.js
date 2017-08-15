
/* High order component (HOC) for conditional redirection
 * Arguments:
 *
 *  condition {function}
 *  pathname  {string}
 *
 * Example of usage:
 *
 *  import { ifUserNotAuthorize } from './credentials';
 *
 *  @redirect(ifUserNotAuthorize, '/login')
 *  class SomeContainer extends React.Component {
 *    constructor(props) {
 *      super(props);
 *    }
 *  }
 *
 * for render function:
 *
 *  const SomeRestrictedContainer = redirect(ifUserNotAuthorize)((props) => <div></div>));
 */

import { replace } from 'react-router-redux';
import reactHOC from 'react-hoc';
import moize from 'moize';

const redirect = (condition, pathname = '/login') =>
  reactHOC(WrappedComponent =>
    @connect(({ router }) => ({ router }))
    class extends Component {
      constructor(props) {
        super(props);

        if (typeof condition !== 'function')
          throw new TypeError('redirect: "condition" (first argument) must be defined function');

        if (!pathname || !pathname.startsWith('/'))
          throw new TypeError(
            `redirect: Invalid pathname "${ pathname }". Path (second argument) should starts with slash "/"`
          );
      }

      componentWillMount() {
        this.checkCondition(this.props);
      }

      componentWillReceiveProps(nextProps) {
        if (nextProps.router.location !== this.props.router.location) {
          this.checkCondition(nextProps);
        }
      }

      checkCondition(props) {
        if (condition()) {
          props.dispatch(replace(
            { pathname },
            { from: props.router.location }) // Pass current location for returning ability
          );
        }
      }

      render() {
        return <WrappedComponent { ...this.props } />
      }
    }
  )

export default moize(redirect, { maxSize: 20 });
