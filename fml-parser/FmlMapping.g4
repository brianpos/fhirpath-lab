/**
 * Define a grammar called FhirMapper
 */
 grammar FmlMapping;

// starting point for parsing a mapping file
// in case we need nested ConceptMaps, we need to have this rule:
// structureMap : mapId conceptMap* structure* imports* group+

structureMap
  : metadataDeclaration*? conceptMapDeclaration*? mapDeclaration? structureDeclaration*? importDeclaration*? constantDeclaration*? groupDeclaration+ EOF
  ;

conceptMapDeclaration
  : 'conceptmap' url '{' conceptMapPrefix+ conceptMapCodeMap+ '}'
  ;

conceptMapPrefix
  : 'prefix' ID '=' url
  ;

conceptMapCodeMap
  : conceptMapSource '-' conceptMapTarget
  ;

conceptMapSource
  : ID ':' code
  ;

conceptMapTarget
  : ID ':' code
  ;

code
  : ID
  | STRING
  | DOUBLE_QUOTED_STRING
  ;

mapDeclaration
  : 'map' url '=' identifier
  ;

metadataDeclaration
  : METADATA_PREFIX qualifiedIdentifier '=' (literal | markdownLiteral)?  // value is optional to allow descendant maps to remove values from parents
  ;

markdownLiteral
  : TRIPLE_QUOTED_STRING_LITERAL
  ;

url
  : STRING
  | DOUBLE_QUOTED_STRING
  ;

identifier
  : ID
  | IDENTIFIER
  | DELIMITEDIDENTIFIER
  ;

structureDeclaration
  : 'uses' url ('alias' identifier)? 'as' ('source' | 'queried' | 'target' | 'produced') 
  ;

constantDeclaration 
  : 'let' ID '=' fpExpression ';' // which might just be a literal
  ;

groupDeclaration
  : 'group' ID parameters extends? typeMode? mapRules
  ;

parameters
  : '(' parameter (',' parameter)+ ')'
  ;

parameter
  : ('source' | 'target') ID typeIdentifier?
  ;

mapRules
  : '{' mapRule* '}'
  ;

typeMode
  : '<<' ('types' | 'type+') '>>'
  ;

extends
  : 'extends' ID
  ;

typeIdentifier
  : ':' identifier
  ;

mapRule
  : qualifiedIdentifier '->' qualifiedIdentifier ruleName? ';'  #mapSimpleCopy
  | mapTransformationRule ';'                                 #mapFhirMarkup
 	;

mapTransformationRule
  : ruleSource (',' ruleSource)* ('->' ruleTarget)? dependentExpression? ruleName?
  ;

ruleName
  : DOUBLE_QUOTED_STRING
  ;

ruleSource
  : qualifiedIdentifier 
    typeIdentifier? 
    sourceCardinality? 
    sourceDefault? 
    ('first' | 'not_first' | 'last' | 'not_last' | 'only_one')? 
    alias? 
    whereClause? 
    checkClause? 
    log?
  ;

ruleTarget
  : mapLineTarget (',' mapLineTarget)*
  ;

sourceCardinality
  : INTEGER '..' upperBound
  ;

upperBound
  : INTEGER
  | '*'
  ;

qualifiedIdentifier
  : (ID | IDENTIFIER | 'imports' | 'source' | 'target' | 'group' | 'prefix' | 'map' | 'uses' | 'let' | 'types' | 'extends' | 'where' | 'check' | 'alias' | 'div' | 'contains' | 'as' | 'is' | 'asc' | 'desc' | 'first' | 'last' ) 
    ('.' (ID | IDENTIFIER | 'imports' | 'source' | 'target' | 'group' | 'prefix' | 'map' | 'uses' | 'let' | 'types' | 'extends' | 'where' | 'check' | 'alias' | 'div' | 'contains' | 'as' | 'is' | 'asc' | 'desc' | 'first' | 'last'))*
  // : identifier ('.' identifier '[x]'?)*
  ;

sourceDefault
  : 'default' '(' fpExpression ')'
  | 'default' DOUBLE_QUOTED_STRING      // very old format from original version
  ;

alias
  : 'as' identifier
  ;

whereClause
  : 'where' '(' fpExpression ')'
  ;

checkClause
  : 'check' '(' fpExpression ')'
  ;

log
  : 'log' '(' fpExpression ')'
  ;

dependentExpression
  : 'then' (groupInvocation (',' groupInvocation)* mapRules? | mapRules)
  ;

importDeclaration
	: 'imports' url
	;

mapLineTarget
  : qualifiedIdentifier ('=' transform)? alias? ('first' | 'share' | 'last' | 'single')?
  | '(' fpExpression ')' alias? ('first' | 'share' | 'last' | 'single')?     // pure fhirpath based variables
  | groupInvocation alias?     // alias is not required when simply invoking a group
  ;

transform
  : literal           // trivial constant transform
  | qualifiedIdentifier       // 'copy' transform
  | groupInvocation        // other named transforms
  | '(' fpExpression ')'      // fhirpath based expressions
  ;

groupInvocation
  : identifier '(' groupParamList? ')'
  ;

groupParamList
  : groupParam (',' groupParam)*
  ;

groupParam
  : literal
  | ID
  ;

fpExpression
        : fpTerm                                                      #termExpression
        | fpExpression '.' fpInvocation                               #invocationExpression
        | fpExpression '[' fpExpression ']'                           #indexerExpression
        | ('+' | '-') fpExpression                                    #polarityExpression
        | fpExpression ('*' | '/' | 'div' | 'mod') fpExpression       #multiplicativeExpression
        | fpExpression ('+' | '-' | '&') fpExpression                 #additiveExpression
        | fpExpression ('is' | 'as') fpTypeSpecifier                  #typeExpression
        | fpExpression ('|') fpExpression                             #unionExpression
        | fpExpression ('<=' | '<' | '>' | '>=') fpExpression         #inequalityExpression
        | fpExpression ('=' | '~' | '!=' | '!~') fpExpression         #equalityExpression
        | fpExpression ('in' | 'contains') fpExpression               #membershipExpression
        | fpExpression ('and') fpExpression                           #andExpression
        | fpExpression ('or' | 'xor') fpExpression                    #orExpression
        | fpExpression ('implies') fpExpression                       #impliesExpression
        //| (IDENTIFIER)? '=>' fpExpression                           #lambdaExpression
        ;

fpTerm
        : fpInvocation                                            #invocationTerm
        | literal                                                 #literalTerm
        | fpExternalConstant                                      #externalConstantTerm
        | '(' fpExpression ')'                                    #parenthesizedTerm
        ;

fpInvocation                          // Terms that can be used after the function/member invocation '.'
        : fpFunction                                            #functionInvocation
        | identifier                                            #memberInvocation
        | '$this'                                               #thisInvocation
        | '$index'                                              #indexInvocation
        | '$total'                                              #totalInvocation
        ;

fpExternalConstant
        : '%' ( identifier | STRING )
        ;

fpFunction
        : 'sort' '(' (fpSortArgument (',' fpSortArgument)*)? ')'
        | qualifiedIdentifier '(' fpParamList? ')'
        ;

fpSortArgument
        : fpExpression ('asc' | 'desc')?                          #sortDirectionArgument
        ;

fpParamList
        : fpExpression (',' fpExpression)*
        ;

fpTypeSpecifier
        : qualifiedIdentifier
        ;

constant
  : ID
  ;


literal
  : NULL_LITERAL                                          #nullLiteral
  | BOOL                                                  #booleanLiteral
  | fpQuantity                                            #quantityLiteral
  | LONGNUMBER                                            #longNumberLiteral
  | (INTEGER | DECIMAL)                                   #numberLiteral
  | DATE                                                  #dateLiteral
  | DATETIME                                              #dateTimeLiteral
  | TIME                                                  #timeLiteral
  | STRING                                                #stringLiteral
  | DOUBLE_QUOTED_STRING                                  #quotedStringLiteral
  ;

  // : BOOL
  // | DATE
  // | DATE_TIME
  // | TIME
  // | NUMBER
  // // | ID            // added to allow for constant use
  // | DELIMITED_IDENTIFIER
  // | SINGLE_QUOTED_STRING
  // | DOUBLE_QUOTED_STRING
  // ;

// note that quantity has to require units here because if not there is no differentiator from a bare number
fpQuantity
    : (INTEGER | DECIMAL) ('year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond')          #quantityWithDate
    | (INTEGER | DECIMAL) ('years' | 'months' | 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds')  #quantityWithDatePlural
    | (INTEGER | DECIMAL) STRING                                                                                      #quantityWithUcum // UCUM syntax for units of measure
    ;

    /*
     * Syntax for embedded ConceptMaps excluded for now
     *
    conceptMap
        : 'conceptMap' '"#'	IDENTIFIER '{' (prefix)+ conceptMapping '}'
        ;

    prefix
    	: 'prefix' conceptMappingVar '=' URL
    	;

    conceptMappingVar
    	:  IDENTIFIER
    	;
    conceptMapping
    	:  conceptMappingVar ':' field
    	   (('<=' | '=' | '==' | '!=' '>=' '>-' | '<-' | '~') conceptMappingVar ':' field) | '--'
    	;
    */




/****************************************************************
    Lexical rules from FhirPath
*****************************************************************/

NULL_LITERAL
  : '{' '}'
  ;

BOOL
    : 'true'
    | 'false'
    ;

DATE
    : '@' DATEFORMAT
    ;

DATETIME
    : '@' DATEFORMAT 'T' (TIMEFORMAT TIMEZONEOFFSETFORMAT?)?
    ;

TIME
    : '@' 'T' TIMEFORMAT
    ;

fragment DATEFORMAT
    : [0-9][0-9][0-9][0-9] ('-'[0-9][0-9] ('-'[0-9][0-9])?)?
    ;

fragment TIMEFORMAT
    : [0-9][0-9] (':'[0-9][0-9] (':'[0-9][0-9] ('.'[0-9]+)?)?)?
    ;

fragment TIMEZONEOFFSETFORMAT
    : ('Z' | ('+' | '-') [0-9][0-9]':'[0-9][0-9])
    ;

LONGNUMBER
    : [0-9]+ 'L'
    ;

DECIMAL
    : [0-9]* '.' [0-9]+
    ;

INTEGER
    : [0-9]+
    ;

// // Also allows leading zeroes now (just like CQL and XSD)
// NUMBER
//     : [0-9]+('.' [0-9]+)?
//     ;

ID
    : ([A-Za-z])([A-Za-z0-9])*
    ;


// FHIR_ELEMENT_PATH_WITH_SLICE
//   : ID ('.' ID (':' ID)? '[x]'?)*
//   ;

IDENTIFIER
    : ([A-Za-z] | '_')([A-Za-z0-9] | '_')*            // Added _ to support CQL (FHIR could constrain it out)
    ;

DELIMITEDIDENTIFIER
    : '`' (ESC | .)*? '`'
    ;

STRING
    : '\'' (ESC | .)*? '\''
    ;

// Kept for FML-specific syntax (metadata, rule names, etc.)
DOUBLE_QUOTED_STRING
  : '"' (ESC | .)*? '"'
  // : '"' ( ~["\r\n] )* '"' 
  ;

TRIPLE_QUOTED_STRING_LITERAL
  : '"""' [\r\n] (.)*? [\r\n] '"""' ('\r\n'|'\r'|'\n'|EOF)
  ;


// Pipe whitespace to the HIDDEN channel to support retrieving source text through the parser.
WS
    : [ \r\n\t]+ -> channel(HIDDEN)
    ;

COMMENT
        : '/*' .*? '*/' -> channel(HIDDEN)
        ;

METADATA_PREFIX
      : '/// '
      ;

LINE_COMMENT
        : '//' ~[/] ~[\r\n]* -> channel(HIDDEN)
        ;

// INLINE_COMMENT
//   : [ \t]* C_STYLE_COMMENT
//   | [ \t]* LINE_COMMENT
//   ;

fragment ESC
        : '\\' ([`"'\\/fnrt] | UNICODE)    // allow \", \', \\, \/, \f, etc. and \uXXX
        ;

fragment UNICODE
        : 'u' HEX HEX HEX HEX
        ;

fragment HEX
        : [0-9a-fA-F]
        ;
