# Misc fhirpath-lab notes
![](static/Square44x44Logo.scale-150.png "Fhirpath-lab logo")

Random notes on the various fhirpath engines that are supported by the fhirpath-lab.

## Expression Positioning Information
The position information is used in several places, and different engines read it differently.
Conversion between the formats is possible, but this is a great place to document what each one is doing to ease debugging if issues arise.

### HAPI/Java - fhirpath Parser/Lexer
* The start positioning information is captured in line/column format, and 1 based indexes.
* The end positioning information is captured in line/column format, and 1 based indexes, and refers to the character after the last one in the token (can be at end of line marker).
* to evaluate the length of a node, you would need to subtract the start position from the end position (and consider line breaks).

e.g. position information for the expression showing the boundary characters 
*(note that the single char tokens have the same start and end position)*
```
'start'    . substring(0 , 5)
^------^   |||        |||  || // 'start'
           ^^|        |||  || // .
             ^--------^||  || // substring
                       ^^  || // 0
                           ^^ // 5
```
* Operators have their position information in the opStart/opEnd properties, and refer to the operator token itself, not the bounds of the operands too.
* delimited identifiers positioning information is similar to a string, as shown above.
