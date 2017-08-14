/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/sources/translations`)
 */
import { IntlProvider }   from 'react-intl';

import { DEFAULT_LOCALE } from './constants';
import { localeSelector } from './selectors';

const mapStateToProps = createSelector(
  localeSelector(),
  locale => ({ locale }),
);

@connect(mapStateToProps)
export default class LanguageProvider extends Component {
  static propTypes = {
    locale:   PropTypes.string,
    messages: PropTypes.object,
    children: PropTypes.element.isRequired,
  }

  static defaultProps = {
    locale:   DEFAULT_LOCALE,
    messages: {},
  }

  render() {
    const { locale, messages, children } = this.props;
    return (
      <IntlProvider locale={ locale } key={ locale } messages={ messages[locale] }>
        { Children.only(children) }
      </IntlProvider>
    );
  }
}
