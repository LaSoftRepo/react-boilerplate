import Types from 'helpers/types'

import './styles.scss'

export default class ErrorBoundary extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    children: PropTypes.any.isRequired,
    message:  Types.stringOrNode,
  }

  static defaultProps = {
    message: <span><strong>Oops!</strong> There was an error.</span>,
  }

  state = {
    hasError:  false,
    errorInfo: null,
  }

  componentDidCatch(hasError, errorInfo) {
    // eslint-disable-next-line
    this.setState({
      hasError,
      errorInfo,
    });
  }

  render() {
    const { children, message   } = this.props;
    const { hasError, errorInfo } = this.state;

    return hasError ? (
      <div className='error-boundary-container'>
        <p><h3>{ message }</h3></p>
        <pre>
          <code>{ errorInfo.componentStack }</code>
        </pre>
      </div>
    ) : children;
  }
}
