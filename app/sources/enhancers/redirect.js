
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

import { replace } from 'react-router-redux'
import reactHOC from 'react-hoc'
import moize from 'moize'

const redirect = (condition, pathname = '/login') => (
  reactHOC(WrappedComponent => (
    @connect(({ router }) => ({ router }))
    class extends Component {
      static propTypes = {
        router: PropTypes.shape({
          location: PropTypes.any,
        }),
      }

      static defaultProps = {
        router: {},
      }

      static checkCondition(props) {
        if (condition()) {
          props.dispatch(replace({
            pathname,
            state: {
              from: props.router.location // Pass current location vis context for returning ability
            },
          }));
        }
      }

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
        this.constructor.checkCondition(this.props);
      }

      componentWillReceiveProps(nextProps) {
        const { router } = this.props;
        if (nextProps.router.location !== router.location) {
          this.constructor.checkCondition(nextProps);
        }
      }

      render() {
        return <WrappedComponent { ...this.props } />
      }
    }
  ))
)

export default moize(redirect, { maxSize: 20 });
