
import { withRouter } from 'react-router'
import './styles.scss'

const Header = () => null
const Footer = () => null

@withRouter
@connect(({ router, language }) => ({ router, language }))
export default class App extends Component {
  static propTypes = {
    hideHeader:  PropTypes.bool,
    hideFooter:  PropTypes.bool,
    // hideSidebar: PropTypes.bool,
  }

  static defaultProps = {
    hideHeader:  false,
    hideFooter:  false,
    // hideSidebar: false,
  }

  render() {
    const { hideHeader, hideFooter, children } = this.props;
    return (
      <div className='app'>
        { hideHeader && <Header /> }
        { Children.toArray(children) }
        { hideFooter && <Footer /> }
      </div>
    );
  }
}
