
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

/* High order component for conditional redirection
 * Example of usage:
 *   import ifUserNotAuthorize from './checkCredentials'
 *   @redirect(ifUserNotAuthorize, '/login')
 *   class SomeContainer extends Component {
 *     constructor(props) {
 *       super(props);
 *     }
 *   }
 * or:
 *  const SomeRestrictedContainer = redirect(ifUserNotAuthorize)((props) => <div></div>));
 */
export default (condition, toPath = '/login') => WrappedComponent =>
  @connect(({ router }) => ({ router }))
  class extends Component {
    componentWillMount() {
      this.checkCondition(this.props);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.router.location !== this.props.router.location) {
        this.checkCondition(nextProps);
      }
    }

    checkCondition(params) {
      if (toPath && toPath.startsWith('/')) {
        if (condition()) {
          // TODO check if /login router exists
          params.dispatch(replace({ pathname: toPath }));
        }
      } else {
        console.warn(`redirect. Invalid pathname "${ toPath }"`);
      }
    }

    render() {
      return <WrappedComponent { ...this.props } />
    }
  }
