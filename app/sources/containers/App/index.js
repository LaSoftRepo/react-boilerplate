
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
    return (
      <div className='app'>
        { this.props.hideHeader && <Header /> }
        { Children.toArray(this.props.children) }
        { this.props.hideFooter && <Footer /> }
      </div>
    );
  }
}
