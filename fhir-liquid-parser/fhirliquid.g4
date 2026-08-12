grammar fhirliquid;

import fhirpath;

@lexer::members {
	private inTag = false;
}

// FHIR Liquid template grammar, based on LiquidEngine.LiquidParser.
// FHIRPath expressions replace Liquid's native expression language.

liquidDocument
	: templateItem* EOF
	;

templateItem
	: TEXT                                                #textItem
	| outputStatement                                     #outputItem
	| ifStatement                                         #ifItem
	| forStatement                                        #forItem
	| legacyLoopStatement                                 #legacyLoopItem
	| captureStatement                                    #captureItem
	| includeStatement                                    #includeItem
	| assignStatement                                     #assignItem
	;

// A separate loop context keeps break, continue, and cycle out of places where
// LiquidEngine would reject them. Nested if/capture blocks retain that context.
loopItem
	: TEXT                                                #loopTextItem
	| outputStatement                                     #loopOutputItem
	| loopIfStatement                                     #loopIfItem
	| forStatement                                        #nestedForItem
	| legacyLoopStatement                                 #nestedLegacyLoopItem
	| captureStatement                                    #loopCaptureItem
	| includeStatement                                    #loopIncludeItem
	| assignStatement                                     #loopAssignItem
	| breakStatement                                      #breakItem
	| continueStatement                                   #continueItem
	| cycleStatement                                      #cycleItem
	;

outputStatement
	: OPEN_OUTPUT expression filter* CLOSE_OUTPUT
	;

filter
	: FILTER_SEPARATOR filterName (':' expression)?
	;

filterName
	: 'prepend'
	| 'markdownify'
	| 'upcase'
	| 'downcase'
	;

ifStatement
	: OPEN_CONTROL 'if' expression CLOSE_CONTROL
	  templateItem*
	  (OPEN_CONTROL 'elsif' expression CLOSE_CONTROL templateItem*)*
	  (OPEN_CONTROL 'else' CLOSE_CONTROL templateItem*)?
	  OPEN_CONTROL 'endif' CLOSE_CONTROL
	;

loopIfStatement
	: OPEN_CONTROL 'if' expression CLOSE_CONTROL
	  loopItem*
	  (OPEN_CONTROL 'elsif' expression CLOSE_CONTROL loopItem*)*
	  (OPEN_CONTROL 'else' CLOSE_CONTROL loopItem*)?
	  OPEN_CONTROL 'endif' CLOSE_CONTROL
	;

forStatement
	: OPEN_CONTROL 'for' variableName 'in' expression forModifier* CLOSE_CONTROL
	  loopItem*
	  (OPEN_CONTROL 'else' CLOSE_CONTROL templateItem*)?
	  OPEN_CONTROL 'endfor' CLOSE_CONTROL
	;

// Deprecated by LiquidEngine, but retained for compatibility.
legacyLoopStatement
	: OPEN_CONTROL 'loop' variableName 'in' expression forModifier* CLOSE_CONTROL
	  templateItem*
	  OPEN_CONTROL 'endloop' CLOSE_CONTROL
	;

forModifier
	: 'reversed'
	| 'limit' ':' INTEGER
	| 'offset' ':' INTEGER
	;

captureStatement
	: OPEN_CONTROL 'capture' variableName CLOSE_CONTROL
	  loopItem*
	  OPEN_CONTROL 'endcapture' CLOSE_CONTROL
	;

includeStatement
	: OPEN_CONTROL 'include' includeName includeParameter* CLOSE_CONTROL
	;

includeName
	: identifier (('.' | '-' | '/') identifier)*
	;

includeParameter
	: variableName '=' expression
	;

assignStatement
	: OPEN_CONTROL 'assign' variableName '=' expression CLOSE_CONTROL
	;

breakStatement
	: OPEN_CONTROL 'break' CLOSE_CONTROL
	;

continueStatement
	: OPEN_CONTROL 'continue' CLOSE_CONTROL
	;

cycleStatement
	: OPEN_CONTROL 'cycle' DOUBLE_QUOTED_STRING
	  (',' DOUBLE_QUOTED_STRING)* CLOSE_CONTROL
	;

variableName
	: identifier
	;

// Liquid permits double-quoted FHIRPath strings in output and assign tags.
literal
	: '{' '}'                                               #nullLiteral
	| ('true' | 'false')                                    #booleanLiteral
	| (STRING | DOUBLE_QUOTED_STRING)                        #stringLiteral
	| (INTEGER | DECIMAL)                                   #numberLiteral
	| LONGNUMBER                                            #longNumberLiteral
	| DATE                                                  #dateLiteral
	| DATETIME                                              #dateTimeLiteral
	| TIME                                                  #timeLiteral
	| quantity                                              #quantityLiteral
	;

externalConstant
	: '%' (identifier | STRING | DOUBLE_QUOTED_STRING)
	;

// Liquid keywords remain valid member names inside FHIRPath expressions.
identifier
	: IDENTIFIER
	| DELIMITEDIDENTIFIER
	| 'as' | 'contains' | 'in' | 'is' | 'asc' | 'desc' | 'sort'
	| 'if' | 'elsif' | 'else' | 'endif'
	| 'for' | 'endfor' | 'loop' | 'endloop' | 'reversed'
	| 'limit' | 'offset' | 'include' | 'assign'
	| 'capture' | 'endcapture' | 'break' | 'continue' | 'cycle'
	| 'prepend' | 'markdownify' | 'upcase' | 'downcase'
	;


/****************************************************************
    Liquid-aware lexical rules
*****************************************************************/

OPEN_OUTPUT
	: {!this.inTag}? '{{' {this.inTag = true;}
	;

OPEN_CONTROL
	: {!this.inTag}? '{%' {this.inTag = true;}
	;

// Outside a Liquid delimiter, everything is template text.
TEXT
	: {!this.inTag}? (('{' ~[{%] | ~'{')+ | '{')
	;

CLOSE_OUTPUT
	: {this.inTag}? '}}' {this.inTag = false;}
	;

CLOSE_CONTROL
	: {this.inTag}? '%}' {this.inTag = false;}
	;

FILTER_SEPARATOR : '||';
LESS_OR_EQUAL    : '<=';
GREATER_OR_EQUAL : '>=';
NOT_EQUAL        : '!=';
NOT_EQUIVALENT   : '!~';

IF              : 'if';
ELSIF           : 'elsif';
ELSE            : 'else';
ENDIF           : 'endif';
FOR             : 'for';
ENDFOR          : 'endfor';
LOOP            : 'loop';
ENDLOOP         : 'endloop';
REVERSED        : 'reversed';
LIMIT           : 'limit';
OFFSET          : 'offset';
INCLUDE         : 'include';
ASSIGN          : 'assign';
CAPTURE         : 'capture';
ENDCAPTURE      : 'endcapture';
BREAK           : 'break';
CONTINUE        : 'continue';
CYCLE           : 'cycle';
PREPEND         : 'prepend';
MARKDOWNIFY     : 'markdownify';
UPCASE          : 'upcase';
DOWNCASE        : 'downcase';

TRUE            : 'true';
FALSE           : 'false';
DIV             : 'div';
MOD             : 'mod';
IS              : 'is';
AS              : 'as';
IN              : 'in';
CONTAINS        : 'contains';
AND             : 'and';
OR              : 'or';
XOR             : 'xor';
IMPLIES         : 'implies';
SORT            : 'sort';
ASC             : 'asc';
DESC            : 'desc';

YEAR            : 'year';
MONTH           : 'month';
WEEK            : 'week';
DAY             : 'day';
HOUR            : 'hour';
MINUTE          : 'minute';
SECOND          : 'second';
MILLISECOND     : 'millisecond';
YEARS           : 'years';
MONTHS          : 'months';
WEEKS           : 'weeks';
DAYS            : 'days';
HOURS           : 'hours';
MINUTES         : 'minutes';
SECONDS         : 'seconds';
MILLISECONDS    : 'milliseconds';

THIS            : '$this';
INDEX           : '$index';
TOTAL           : '$total';

// FHIRPath tokens that can span template delimiters must only match inside
// Liquid tags; otherwise HTML quotes/comments can consume later Liquid tags.
DELIMITEDIDENTIFIER
	: {this.inTag}? '`' (ESC | .)*? '`'
	;

STRING
	: {this.inTag}? '\'' (ESC | .)*? '\''
	;

// LiquidEngine also accepts double-quoted FHIRPath strings.
DOUBLE_QUOTED_STRING
	: {this.inTag}? '"' (ESC | ~["\\])* '"'
	;

COMMENT
	: {this.inTag}? '/*' .*? '*/' -> channel(HIDDEN)
	;

LINE_COMMENT
	: {this.inTag}? '//' ~[\r\n]* -> channel(HIDDEN)
	;

DOT        : '.';
LBRACKET   : '[';
RBRACKET   : ']';
LPAREN     : '(';
RPAREN     : ')';
LBRACE     : '{';
RBRACE     : '}';
PLUS       : '+';
MINUS      : '-';
STAR       : '*';
SLASH      : '/';
AMPERSAND  : '&';
PIPE       : '|';
LESS       : '<';
GREATER    : '>';
EQUAL      : '=';
EQUIVALENT : '~';
COMMA      : ',';
COLON      : ':';
PERCENT    : '%';
