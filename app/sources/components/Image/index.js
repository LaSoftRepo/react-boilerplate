

export default class Image extends Component {

  static defaultProps = {
    style: {
      width:  'auto',
      height: 'auto',

      overflow: 'hidden',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'top left',
    }
  }

  state = {
    src: null,
  }

  componentDidMount() {
    const { src, complete } = this.img;
    if (complete) {
      this.setState(() => ({ src }));
    }
  }

  onImageLoaded = ({ target: { src } }) => {
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
          ref={ self => this.img = self }
          style={ imgStyle }
          onLoad={ this.onImageLoaded }
          src={ src }
          srcSet={ srcSet }
          title={ title }
          alt={ alt }
        />
      </div>
    );
  }
}