import React from 'react';
import { SmartFormsRenderer, useQuestionnaireStore } from "@aehrc/smart-forms-renderer";

/**
 * This component is a wrapper around the SmartFormsRenderer component that adds a focus event listener to the document.
 * @param props
 * @returns
 */
function SmartFormsRendererWithFocus(props: any) {
  const linkId = useQuestionnaireStore.use.focusedLinkId();

  React.useEffect(() => {
    props.onFocus(linkId);
  }, [linkId]);

  return SmartFormsRenderer(props);
}

export default SmartFormsRendererWithFocus;
