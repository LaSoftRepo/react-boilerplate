/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/sources/translations`)
 */

import React     from 'react';
import PropTypes from 'prop-types';

import { connect }        from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider }   from 'react-intl';

import { DEFAULT_LOCALE } from './constants';
import { localeSelector } from './selectors';

const mapStateToProps = createSelector(
  localeSelector(),
  locale => ({ locale }),
);

@connect(mapStateToProps)
export default class LanguageProvider extends React.PureComponent {
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
        { React.Children.only(children) }
      </IntlProvider>
    );
  }
}
