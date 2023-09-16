import { BaseRenderer } from "@aehrc/smart-forms-renderer";
import { createRoot } from "react-dom";
import { buildForm, destroyForm } from "@aehrc/smart-forms-renderer";

const root = createRoot(document.getElementById("csiroForms"));
root.render(<BaseRenderer />);

window.buildForm = buildForm;
window.destroyForm = destroyForm;
