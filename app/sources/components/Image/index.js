

export default class Image extends Component {

  static propTypes = {
    alt:     PropTypes.string,
    title:   PropTypes.string,
    sources: PropTypes.object,
    style:   PropTypes.object,
  }

  static defaultProps = {
    alt: '',
    title: '',
    sources: {},

    style: {
      width:  'auto',
      height: 'auto',

      overflow: 'hidden',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'top left',
    },
  }

  state = {
    src: null,
  }

  componentDidMount() {
    const { src, complete } = this.img;
    if (complete) {
      // eslint-disable-next-line react/no-did-mount-set-state, react/no-set-state
      this.setState(() => ({ src }));
    }
  }

  handleImageLoaded = ({ target: { src } }) => {
    // eslint-disable-next-line react/no-set-state
    this.setState(() => ({ src }));
  }

  render() {
    const { sources, style, title, alt } = this.props;
    const { placeholder, src, srcSet } = sources;

    const imgStyle = {
      width:      'auto',
      height:     'auto',

      display:    'block',
      opacity:    this.state.src ? 1 : 0,
      transition: placeholder ? 'opacity 0.2s ease-in' : void 0,
    };

    const divStyle = {
      ...style,
      backgroundImage: `url("${ placeholder }")`
    };

    return (
      <div style={ divStyle }>
        <img
          ref={ self => { this.img = self } }
          style={ imgStyle }
          onLoad={ this.handleImageLoaded }
          src={ src }
          srcSet={ srcSet }
          title={ title }
          alt={ alt }
        />
      </div>
    );
  }
}
