import { DOMProperty } from 'react-dom/lib/ReactInjection';

if (__EXPERIMENTAL_FEATURES__) {
  // Inject custom property attributes for ragrid.scss
  DOMProperty.injectDOMPropertyConfig({
    Properties: {
      'grid':     DOMProperty.MUST_USE_ATTRIBUTE,
      'ordering': DOMProperty.MUST_USE_ATTRIBUTE,

      'horizontally-aligned':     DOMProperty.MUST_USE_ATTRIBUTE,
      'vertically-aligned':       DOMProperty.MUST_USE_ATTRIBUTE,
      'horizontally-distributed': DOMProperty.MUST_USE_ATTRIBUTE,
      'vertically-distributed':   DOMProperty.MUST_USE_ATTRIBUTE,

      'columns': DOMProperty.MUST_USE_ATTRIBUTE,
    },
  });
}
