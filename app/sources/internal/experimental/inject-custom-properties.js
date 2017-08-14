// We should manually inject allowing custom attributes while we waiting for custom attributes in next react.js version.
// TODO After releasing with this PR:
//    https://github.com/facebook/react/pull/10385
// remove current property injects

import { DOMProperty } from 'react-dom/lib/ReactInjection';

if (__EXPERIMENTAL__) {
  // Inject custom property attributes for ragrid.scss
  DOMProperty.injectDOMPropertyConfig({
    Properties: {
      //'visibility': DOMProperty.MUST_USE_ATTRIBUTE,

      'layout':  DOMProperty.MUST_USE_ATTRIBUTE,
      'reverse': DOMProperty.MUST_USE_ATTRIBUTE,
      'center':  DOMProperty.MUST_USE_ATTRIBUTE,
      'nowrap':  DOMProperty.MUST_USE_ATTRIBUTE,

      'horizontal-align':      DOMProperty.MUST_USE_ATTRIBUTE,
      'vertical-align':        DOMProperty.MUST_USE_ATTRIBUTE,
      'horizontal-distribute': DOMProperty.MUST_USE_ATTRIBUTE,
      'vertical-distribute':   DOMProperty.MUST_USE_ATTRIBUTE,

      'columns':      DOMProperty.MUST_USE_ATTRIBUTE,
      'column-count': DOMProperty.MUST_USE_ATTRIBUTE,
    },
  });
}
