
import React, { useMemo } from 'react';
import { SmartFormsRenderer } from "@aehrc/smart-forms-renderer";

/**
 * This component is a wrapper around the SmartFormsRenderer component that adds a focus event listener to the document.
 * @param props 
 * @returns 
 */
function SmartFormsRendererWithFocus(props: any) {

  React.useEffect(() => {
    const handleClick: EventListener = (event) => {
      const linkId = (event.currentTarget as HTMLElement).getAttribute('data-linkid');
      if (linkId) {
        props.onFocus && props.onFocus(linkId);
      }
    };

    const boxes = document.querySelectorAll('[data-linkid]');
    boxes.forEach((box) => {
      box.addEventListener('click', handleClick);
    });

    return () => {
      boxes.forEach((box) => {
        box.removeEventListener('click', handleClick);
      });
    };
  });

  return SmartFormsRenderer(props);
}

export default SmartFormsRendererWithFocus;
