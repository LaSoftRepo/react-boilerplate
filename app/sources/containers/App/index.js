import './styles.scss'

const Header = () => null
const Footer = () => null

@connect(({ router, language }) => ({ router, language }), null, null, { pure: false })
export default class App extends Component {
  static propTypes = {
    children:    PropTypes.node,
    hideHeader:  PropTypes.bool,
    hideFooter:  PropTypes.bool,
    hideSidebar: PropTypes.bool,
  }

  static defaultProps = {
    hideHeader:  false,
    hideFooter:  false,
    hideSidebar: false,
  }

  render() {
    return (
      <div className='app'>
        { this.props.hideHeader ? <Header /> : null }
        { Children.toArray(this.props.children) }
        { this.props.hideFooter ? <Footer /> : null }
      </div>
    );
  }
}
