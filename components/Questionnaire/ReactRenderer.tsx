
import React, { useMemo } from 'react';
import { SmartFormsRenderer } from "@aehrc/smart-forms-renderer";

/**
 * This component is a wrapper around the SmartFormsRenderer component that adds a focus event listener to the document.
 * @param props 
 * @returns 
 */
function SmartFormsRendererWithFocus(props: any) {

  React.useEffect(() => {
    const l = function(event: any) {
        var element = event.target;
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            const linkId = element.getAttribute('id');
            props.onFocus && props.onFocus(linkId);
        }
    }
    document.addEventListener('focus', l, true); 
    return () => document.removeEventListener('focus', l);

  }, [])

  return SmartFormsRenderer(props);
}

export default SmartFormsRendererWithFocus;
