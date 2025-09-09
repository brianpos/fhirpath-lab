/**
 * Positional information about a JSON node.
 * (Broken into property declaration and value declaration)
 */
export interface IJsonNodePosition {
  /** The line number on which the property declaration starts. */
  line: number;
  /** The column number on which the property declaration starts. */
  column: number;

  /** The absolute character index at which the property declaration starts. */
  prop_start_pos: number;
  /** The absolute character index at which the property declaration ends. */
  prop_stop_pos: number;

  /** The absolute character index at which the property value starts. */
  value_start_pos?: number;
  /** The absolute character index at which the property value ends. */
  value_stop_pos?: number;
}
