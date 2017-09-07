import { goBack } from 'react-router-redux'

import styles from './styles.module.scss'

@connect()
@CSSModules(styles)
export default class About extends PureComponent {
  render() {
    const { dispatch } = this.props;
    return (
      <div layout='columns'>
        <button onClick={ () => dispatch(goBack()) }>Back</button>
        <h2>React Boilerplate</h2>
        <div styleName='menu-icon'></div>
      </div>
    );
  }
}
