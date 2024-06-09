import { StructureMap, ConceptMap, StructureMapStructure, StructureMapGroupRule, Resource, Coding, StructureMapGroup, StructureMapGroupRuleTarget, StructureMapGroupRuleTargetParameter, StructureMapGroupRuleSource } from "fhir/r4b";

class StructureMapUtilitiesRender {
    private static readonly RENDER_MULTIPLE_TARGETS_ONELINE = true;

    constructor() {}

    public static render(map: StructureMap): string {
        let b: string[] = [];
        b.push(`map "${map.url}" = "${this.escapeJson(map.name)}"\n\n`);

        if (map.title) {
            b.push(`/// title = "${this.escapeJson(map.title)}"\n`);
        }
        if (map.status) {
            b.push(`/// status = "${map.status}"\n`);
        }
        if (map.description) {
            this.renderMultilineDoco(b, map.description, 0);
            b.push("\n");
        }
        this.renderConceptMaps(b, map);
        this.renderUses(b, map);
        this.renderImports(b, map);
        map.group.forEach(g => this.renderGroup(b, g));
        return b.join("");
    }

    private static renderConceptMaps(b: string[], map: StructureMap): void {
        map.contained?.forEach(r => {
            if (r.resourceType === "ConceptMap") {
                this.produceConceptMap(b, r as ConceptMap);
            }
        });
    }

    private static produceConceptMap(b: string[], cm: ConceptMap): void {
        let prefixesSrc: { [key: string]: string } = {};
        let prefixesTgt: { [key: string]: string } = {};
        let prefix: string = 's';
        cm.group?.forEach(cg => {
            if (cg.source && !prefixesSrc[cg.source]) {
                prefixesSrc[cg.source] = prefix;
                b.push(`  prefix ${prefix} = "${cg.source}"\n`);
                prefix = String.fromCharCode(prefix.charCodeAt(0) + 1);
            }
            if (cg.target && !prefixesTgt[cg.target]) {
                prefixesTgt[cg.target] = prefix;
                b.push(`  prefix ${prefix} = "${cg.target}"\n`);
                prefix = String.fromCharCode(prefix.charCodeAt(0) + 1);
            }
        });
        b.push('');
        // cm.group?.forEach(cg => {
        //     cg.element?.forEach(ce => {
        //         b.push(`  ${prefixesSrc[cg.source!]}:"${ce.target.eq}" ${this.getChar(ce.equivalence)} ${prefixesTgt[cg.target!]}:"${ce.target[0].code}"`);
        //     });
        // });
        b.push('}\n\n');
    }

    private static getChar(equivalence: Coding): string {
        switch (equivalence.code) {
            case "relatedto": return "-";
            case "equal": return "=";
            case "equivalent": return "==";
            case "disjoint": return "!=";
            case "wider": return "<=";
            case "narrower": return ">=";
            default: return "??";
        }
    }

    private static renderUses(b: string[], map: StructureMap): void {
        map.structure?.forEach(s => {
            b.push(`uses "${s.url}" as ${s.mode}`);
            this.renderDoco(b, s.documentation);
            b.push('\n');
        });
        if (map.structure?.length) b.push('\n');
    }

    private static renderImports(b: string[], map: StructureMap): void {
        map.import?.forEach(s => {
            b.push(`imports "${s}"`);
        });
        b.push('');
    }

    private static renderGroup(b: string[], g: StructureMapGroup): void {
        if (g.documentation) {
            this.renderMultilineDoco(b, g.documentation, 0);
        }
        let groupLine = `group ${g.name}(`;
        let first = true;
        g.input.forEach(gi => {
            if (!first) {
                groupLine += ", ";
            } else {
                first = false;
            }
            groupLine += `${gi.mode} ${gi.name}`;
            if (gi.type) {
                groupLine += ` : ${gi.type}`;
            }
        });
        groupLine += ")";
        if (g.extends) {
            groupLine += ` extends ${g.extends}`;
        }
    
        if (g.typeMode) {
            switch (g.typeMode) {
                case "types":
                    groupLine += " <<types>>";
                    break;
                case "type-and-types":
                    groupLine += " <<type+>>";
                    break;
                default:
                    // handle other cases or default case if necessary
                    break;
            }
        }
        groupLine += " {\n";
        b.push(groupLine);
    
        g.rule.forEach(r => {
            this.renderRule(b, r, 2);
        });
    
        b.push("}\n\n");
    }
    
    private static renderRule(b: string[], r: StructureMapGroupRule, indent: number): void {
        if (r.documentation?.includes('\n')) {
            this.renderMultilineDoco(b, r.documentation, indent);
        }
    
        const indentString = ' '.repeat(indent);
        b.push(indentString);
        let canBeAbbreviated = this.checkIsSimple(r);
    
        let isFirst = true;
        r.source.forEach(rs => {
            if (!isFirst) {
                b.push(", ");
            } else {
                isFirst = false;
            }
            this.renderSource(b, rs, canBeAbbreviated);
        });
    
        if (r.target && r.target.length > 0) {
            b.push(" -> ");
            isFirst = true;
            r.target.forEach(rt => {
                if (!isFirst) {
                    b.push(", ");
                } else {
                    isFirst = false;
                }
                if (this.RENDER_MULTIPLE_TARGETS_ONELINE) {
                    this.renderTarget(b, rt, canBeAbbreviated);
                } else {
                    b.push("\n" + ' '.repeat(indent + 4));
                    this.renderTarget(b, rt, canBeAbbreviated);
                }
            });
        }
    
        if (r.rule && r.rule.length > 0) {
            b.push(" then {\n");
            r.rule.forEach(ir => {
                this.renderRule(b, ir, indent + 2);
            });
            b.push(`${indentString}}`);
        } else {
            if (r.dependent && r.dependent.length > 0) {
                b.push(" then ");
                isFirst = true;
                r.dependent.forEach(rd => {
                    if (!isFirst) {
                        b.push(", ");
                    } else {
                        isFirst = false;
                    }
                    let paramList = rd.variable.join(", ");
                    b.push(`${rd.name}(${paramList})`);
                });
            }
        }
    
        if (r.name && !this.matchesName(r.name, r.source)) {
            let formattedName = this.formatName(r.name);
            b.push(` ${formattedName}`);
        }
    
        b.push(";");
        if (r.documentation && !r.documentation?.includes('\n')) {
            this.renderDoco(b, r.documentation);
        }
    b.push("\n");
    }

    private static checkIsSimple(r: StructureMapGroupRule): boolean {
        const sourceIsSimple = r.source.length === 1 && r.source[0].element !== undefined && r.source[0].variable !== undefined;
        const targetIsSimple = r.target?.length === 1 && r.target[0].variable !== undefined &&
                               (r.target[0].transform === undefined || r.target[0].transform === "create") &&
                               r.target[0].parameter?.length === 0;
        const hasNoDependents = r.dependent?.length === 0;
        const hasNoSubRules = r.rule?.length === 0;
    
        return sourceIsSimple && targetIsSimple && hasNoDependents && hasNoSubRules;
    }
    
    private static renderSource(b: string[], rs: StructureMapGroupRuleSource, abbreviate: boolean): void {
        b.push(rs.context || "");
        if (rs.context === "@search") {
            b.push(`(${rs.element})`);
        } else if (rs.element) {
            b.push(`.${rs.element}`);
        }
        if (rs.type) {
            b.push(` : ${rs.type}`);
            if (rs.min !== undefined) {
                b.push(` ${rs.min}..${rs.max}`);
            }
        }
    
        if (rs.listMode) {
            b.push(` ${rs.listMode}`);
        }
        // if (rs.defaultValue) {
        //     b.push(` default "${this.escapeJson(rs.defaultValue.toString())}"`);
        // }
        if (!abbreviate && rs.variable) {
            b.push(` as ${rs.variable}`);
        }
        if (rs.condition) {
            b.push(` where ${rs.condition}`);
        }
        if (rs.check) {
            b.push(` check ${rs.check}`);
        }
        if (rs.logMessage) {
            b.push(` log ${rs.logMessage}`);
        }
    }
    
    private static renderTarget(b: string[], rt: StructureMapGroupRuleTarget, abbreviate: boolean): void {
        if (rt.context) {
            b.push(rt.context);
            if (rt.element) {
                b.push(`.${rt.element}`);
            }
        }
        if (!abbreviate && rt.transform) {
            if (rt.context) b.push(" = ");
            if (rt.transform === "copy" && rt.parameter && rt.parameter.length === 1) {
                this.renderTransformParam(b, rt.parameter[0]);
            } else if (rt.transform === "evaluate" && rt.parameter) {
                if (rt.parameter.length === 1) {
                    b.push(`(${this.formatParam(rt.parameter[0])})`);
                } else if (rt.parameter.length === 2) {
                    b.push(`${rt.transform}(${this.formatParam(rt.parameter[0])}, ${this.formatParam(rt.parameter[1])})`);
                }
            } else {
                let params = rt.parameter?.map(p => this.formatParam(p)).join(", ");
                b.push(`${rt.transform}(${params})`);
            }
        }
        if (!abbreviate && rt.variable) {
            b.push(` as ${rt.variable}`);
        }
        rt.listMode?.forEach(lm => {
            b.push(` ${lm}`);
            if (lm === "share") {
                b.push(` ${rt.listRuleId}`);
            }
        });
    }
    
    private static renderTransformParam(b: string[], param: StructureMapGroupRuleTargetParameter): void {
        b.push(this.formatParam(param));
    }
    
    private static formatParam(param: StructureMapGroupRuleTargetParameter): string {
        // Simplified type checks and formatting, adjust as necessary for your FHIR package
        if (param.valueBoolean) {
            return `${param.valueBoolean}`;
        }
        if (param.valueString) {
            return `"${param.valueString}"`;
        }
        if (param.valueId) {
            return `${param.valueId}`;
        }
        if (param.valueDecimal) {
            return param.valueDecimal.toString();
        }
        if (param.valueInteger) {
            return param.valueInteger.toString();
        }
        return "error!";
    }
    
    private static formatName(name: string): string {
        return name.startsWith("\"") ? name : `"${name}"`;
    }
    
    private static matchesName(name: string, sources: StructureMapGroupRuleSource[]): boolean {
        return sources.some(source => `"${source.element}"` === name || `"${source.element}-${source.type}"` === name);
    }

    private static escapeJson(str: string): string {
        return str.replace(/"/g, '\\"');
    }

    private static renderDoco(b: string[], doco: string|undefined): void {
        if (!doco) return;
        if (b.length !== 0 && !b[b.length - 1].endsWith("\n"))
            b.push(" ");
        if (doco.startsWith("//")) {
            b.push(`${doco.replace(/\r\n|\r|\n/g, " ")}`);
            return
        }
        b.push(`// ${doco.replace(/\r\n|\r|\n/g, " ")}`);
    }

    private static renderMultilineDoco(b: string[], doco: string, indent: number): void {
        if (!doco) return;
        let lines = doco.split(/\r\n|\r|\n/);
        lines.forEach(line => {
            this.renderDoco(b, line);
        });
    }
}

export default StructureMapUtilitiesRender;
