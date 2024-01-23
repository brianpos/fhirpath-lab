// Generated from ./JSON5.g4 by ANTLR 4.13.1
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols
import {
	ATN,
	ATNDeserializer,
	CharStream,
	DecisionState, DFA,
	Lexer,
	LexerATNSimulator,
	RuleContext,
	PredictionContextCache,
	Token
} from "antlr4";
export default class JSON5Lexer extends Lexer {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly SINGLE_LINE_COMMENT = 7;
	public static readonly MULTI_LINE_COMMENT = 8;
	public static readonly LITERAL = 9;
	public static readonly STRING = 10;
	public static readonly NUMBER = 11;
	public static readonly NUMERIC_LITERAL = 12;
	public static readonly SYMBOL = 13;
	public static readonly IDENTIFIER = 14;
	public static readonly WS = 15;
	public static readonly EOF = Token.EOF;

	public static readonly channelNames: string[] = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	public static readonly literalNames: (string | null)[] = [ null, "'{'", 
                                                            "','", "'}'", 
                                                            "':'", "'['", 
                                                            "']'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, "SINGLE_LINE_COMMENT", 
                                                             "MULTI_LINE_COMMENT", 
                                                             "LITERAL", 
                                                             "STRING", "NUMBER", 
                                                             "NUMERIC_LITERAL", 
                                                             "SYMBOL", "IDENTIFIER", 
                                                             "WS" ];
	public static readonly modeNames: string[] = [ "DEFAULT_MODE", ];

	public static readonly ruleNames: string[] = [
		"T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "SINGLE_LINE_COMMENT", 
		"MULTI_LINE_COMMENT", "LITERAL", "STRING", "DOUBLE_QUOTE_CHAR", "SINGLE_QUOTE_CHAR", 
		"ESCAPE_SEQUENCE", "NUMBER", "NUMERIC_LITERAL", "SYMBOL", "HEX", "INT", 
		"EXP", "IDENTIFIER", "IDENTIFIER_START", "IDENTIFIER_PART", "UNICODE_SEQUENCE", 
		"NEWLINE", "WS",
	];


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(this, JSON5Lexer._ATN, JSON5Lexer.DecisionsToDFA, new PredictionContextCache());
	}

	public get grammarFileName(): string { return "JSON5.g4"; }

	public get literalNames(): (string | null)[] { return JSON5Lexer.literalNames; }
	public get symbolicNames(): (string | null)[] { return JSON5Lexer.symbolicNames; }
	public get ruleNames(): string[] { return JSON5Lexer.ruleNames; }

	public get serializedATN(): number[] { return JSON5Lexer._serializedATN; }

	public get channelNames(): string[] { return JSON5Lexer.channelNames; }

	public get modeNames(): string[] { return JSON5Lexer.modeNames; }

	public static readonly _serializedATN: number[] = [4,0,15,247,6,-1,2,0,
	7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,
	7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,
	16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,
	2,24,7,24,1,0,1,0,1,1,1,1,1,2,1,2,1,3,1,3,1,4,1,4,1,5,1,5,1,6,1,6,1,6,1,
	6,5,6,68,8,6,10,6,12,6,71,9,6,1,6,1,6,3,6,75,8,6,1,6,1,6,1,7,1,7,1,7,1,
	7,5,7,83,8,7,10,7,12,7,86,9,7,1,7,1,7,1,7,1,7,1,7,1,8,1,8,1,8,1,8,1,8,1,
	8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,3,8,106,8,8,1,9,1,9,5,9,110,8,9,10,9,12,9,
	113,9,9,1,9,1,9,1,9,5,9,118,8,9,10,9,12,9,121,9,9,1,9,3,9,124,8,9,1,10,
	1,10,3,10,128,8,10,1,11,1,11,3,11,132,8,11,1,12,1,12,1,12,1,12,1,12,1,12,
	1,12,1,12,1,12,1,12,3,12,144,8,12,1,13,1,13,1,13,5,13,149,8,13,10,13,12,
	13,152,9,13,3,13,154,8,13,1,13,3,13,157,8,13,1,13,1,13,4,13,161,8,13,11,
	13,12,13,162,1,13,3,13,166,8,13,1,13,1,13,1,13,4,13,171,8,13,11,13,12,13,
	172,3,13,175,8,13,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,
	3,14,188,8,14,1,15,1,15,1,16,1,16,1,17,1,17,1,17,5,17,197,8,17,10,17,12,
	17,200,9,17,3,17,202,8,17,1,18,1,18,3,18,206,8,18,1,18,5,18,209,8,18,10,
	18,12,18,212,9,18,1,19,1,19,5,19,216,8,19,10,19,12,19,219,9,19,1,20,1,20,
	1,20,3,20,224,8,20,1,21,1,21,3,21,228,8,21,1,22,1,22,1,22,1,22,1,22,1,22,
	1,23,1,23,1,23,3,23,239,8,23,1,24,4,24,242,8,24,11,24,12,24,243,1,24,1,
	24,2,69,84,0,25,1,1,3,2,5,3,7,4,9,5,11,6,13,7,15,8,17,9,19,10,21,0,23,0,
	25,0,27,11,29,12,31,13,33,0,35,0,37,0,39,14,41,0,43,0,45,0,47,0,49,15,1,
	0,14,4,0,10,10,13,13,34,34,92,92,4,0,10,10,13,13,39,39,92,92,10,0,34,34,
	39,39,47,47,92,92,98,98,102,102,110,110,114,114,116,116,118,118,12,0,10,
	10,13,13,34,34,39,39,48,57,92,92,98,98,102,102,110,110,114,114,116,118,
	120,120,1,0,48,57,2,0,88,88,120,120,2,0,43,43,45,45,3,0,48,57,65,70,97,
	102,1,0,49,57,2,0,69,69,101,101,661,0,36,36,65,90,95,95,97,122,170,170,
	181,181,186,186,192,214,216,246,248,705,710,721,736,740,748,748,750,750,
	880,884,886,887,890,893,895,895,902,902,904,906,908,908,910,929,931,1013,
	1015,1153,1162,1327,1329,1366,1369,1369,1376,1416,1488,1514,1519,1522,1568,
	1610,1646,1647,1649,1747,1749,1749,1765,1766,1774,1775,1786,1788,1791,1791,
	1808,1808,1810,1839,1869,1957,1969,1969,1994,2026,2036,2037,2042,2042,2048,
	2069,2074,2074,2084,2084,2088,2088,2112,2136,2144,2154,2160,2183,2185,2190,
	2208,2249,2308,2361,2365,2365,2384,2384,2392,2401,2417,2432,2437,2444,2447,
	2448,2451,2472,2474,2480,2482,2482,2486,2489,2493,2493,2510,2510,2524,2525,
	2527,2529,2544,2545,2556,2556,2565,2570,2575,2576,2579,2600,2602,2608,2610,
	2611,2613,2614,2616,2617,2649,2652,2654,2654,2674,2676,2693,2701,2703,2705,
	2707,2728,2730,2736,2738,2739,2741,2745,2749,2749,2768,2768,2784,2785,2809,
	2809,2821,2828,2831,2832,2835,2856,2858,2864,2866,2867,2869,2873,2877,2877,
	2908,2909,2911,2913,2929,2929,2947,2947,2949,2954,2958,2960,2962,2965,2969,
	2970,2972,2972,2974,2975,2979,2980,2984,2986,2990,3001,3024,3024,3077,3084,
	3086,3088,3090,3112,3114,3129,3133,3133,3160,3162,3165,3165,3168,3169,3200,
	3200,3205,3212,3214,3216,3218,3240,3242,3251,3253,3257,3261,3261,3293,3294,
	3296,3297,3313,3314,3332,3340,3342,3344,3346,3386,3389,3389,3406,3406,3412,
	3414,3423,3425,3450,3455,3461,3478,3482,3505,3507,3515,3517,3517,3520,3526,
	3585,3632,3634,3635,3648,3654,3713,3714,3716,3716,3718,3722,3724,3747,3749,
	3749,3751,3760,3762,3763,3773,3773,3776,3780,3782,3782,3804,3807,3840,3840,
	3904,3911,3913,3948,3976,3980,4096,4138,4159,4159,4176,4181,4186,4189,4193,
	4193,4197,4198,4206,4208,4213,4225,4238,4238,4256,4293,4295,4295,4301,4301,
	4304,4346,4348,4680,4682,4685,4688,4694,4696,4696,4698,4701,4704,4744,4746,
	4749,4752,4784,4786,4789,4792,4798,4800,4800,4802,4805,4808,4822,4824,4880,
	4882,4885,4888,4954,4992,5007,5024,5109,5112,5117,5121,5740,5743,5759,5761,
	5786,5792,5866,5873,5880,5888,5905,5919,5937,5952,5969,5984,5996,5998,6000,
	6016,6067,6103,6103,6108,6108,6176,6264,6272,6276,6279,6312,6314,6314,6320,
	6389,6400,6430,6480,6509,6512,6516,6528,6571,6576,6601,6656,6678,6688,6740,
	6823,6823,6917,6963,6981,6988,7043,7072,7086,7087,7098,7141,7168,7203,7245,
	7247,7258,7293,7296,7304,7312,7354,7357,7359,7401,7404,7406,7411,7413,7414,
	7418,7418,7424,7615,7680,7957,7960,7965,7968,8005,8008,8013,8016,8023,8025,
	8025,8027,8027,8029,8029,8031,8061,8064,8116,8118,8124,8126,8126,8130,8132,
	8134,8140,8144,8147,8150,8155,8160,8172,8178,8180,8182,8188,8305,8305,8319,
	8319,8336,8348,8450,8450,8455,8455,8458,8467,8469,8469,8473,8477,8484,8484,
	8486,8486,8488,8488,8490,8493,8495,8505,8508,8511,8517,8521,8526,8526,8579,
	8580,11264,11492,11499,11502,11506,11507,11520,11557,11559,11559,11565,
	11565,11568,11623,11631,11631,11648,11670,11680,11686,11688,11694,11696,
	11702,11704,11710,11712,11718,11720,11726,11728,11734,11736,11742,11823,
	11823,12293,12294,12337,12341,12347,12348,12353,12438,12445,12447,12449,
	12538,12540,12543,12549,12591,12593,12686,12704,12735,12784,12799,13312,
	19903,19968,42124,42192,42237,42240,42508,42512,42527,42538,42539,42560,
	42606,42623,42653,42656,42725,42775,42783,42786,42888,42891,42954,42960,
	42961,42963,42963,42965,42969,42994,43009,43011,43013,43015,43018,43020,
	43042,43072,43123,43138,43187,43250,43255,43259,43259,43261,43262,43274,
	43301,43312,43334,43360,43388,43396,43442,43471,43471,43488,43492,43494,
	43503,43514,43518,43520,43560,43584,43586,43588,43595,43616,43638,43642,
	43642,43646,43695,43697,43697,43701,43702,43705,43709,43712,43712,43714,
	43714,43739,43741,43744,43754,43762,43764,43777,43782,43785,43790,43793,
	43798,43808,43814,43816,43822,43824,43866,43868,43881,43888,44002,44032,
	55203,55216,55238,55243,55291,63744,64109,64112,64217,64256,64262,64275,
	64279,64285,64285,64287,64296,64298,64310,64312,64316,64318,64318,64320,
	64321,64323,64324,64326,64433,64467,64829,64848,64911,64914,64967,65008,
	65019,65136,65140,65142,65276,65313,65338,65345,65370,65382,65470,65474,
	65479,65482,65487,65490,65495,65498,65500,65536,65547,65549,65574,65576,
	65594,65596,65597,65599,65613,65616,65629,65664,65786,66176,66204,66208,
	66256,66304,66335,66349,66368,66370,66377,66384,66421,66432,66461,66464,
	66499,66504,66511,66560,66717,66736,66771,66776,66811,66816,66855,66864,
	66915,66928,66938,66940,66954,66956,66962,66964,66965,66967,66977,66979,
	66993,66995,67001,67003,67004,67072,67382,67392,67413,67424,67431,67456,
	67461,67463,67504,67506,67514,67584,67589,67592,67592,67594,67637,67639,
	67640,67644,67644,67647,67669,67680,67702,67712,67742,67808,67826,67828,
	67829,67840,67861,67872,67897,67968,68023,68030,68031,68096,68096,68112,
	68115,68117,68119,68121,68149,68192,68220,68224,68252,68288,68295,68297,
	68324,68352,68405,68416,68437,68448,68466,68480,68497,68608,68680,68736,
	68786,68800,68850,68864,68899,69248,69289,69296,69297,69376,69404,69415,
	69415,69424,69445,69488,69505,69552,69572,69600,69622,69635,69687,69745,
	69746,69749,69749,69763,69807,69840,69864,69891,69926,69956,69956,69959,
	69959,69968,70002,70006,70006,70019,70066,70081,70084,70106,70106,70108,
	70108,70144,70161,70163,70187,70207,70208,70272,70278,70280,70280,70282,
	70285,70287,70301,70303,70312,70320,70366,70405,70412,70415,70416,70419,
	70440,70442,70448,70450,70451,70453,70457,70461,70461,70480,70480,70493,
	70497,70656,70708,70727,70730,70751,70753,70784,70831,70852,70853,70855,
	70855,71040,71086,71128,71131,71168,71215,71236,71236,71296,71338,71352,
	71352,71424,71450,71488,71494,71680,71723,71840,71903,71935,71942,71945,
	71945,71948,71955,71957,71958,71960,71983,71999,71999,72001,72001,72096,
	72103,72106,72144,72161,72161,72163,72163,72192,72192,72203,72242,72250,
	72250,72272,72272,72284,72329,72349,72349,72368,72440,72704,72712,72714,
	72750,72768,72768,72818,72847,72960,72966,72968,72969,72971,73008,73030,
	73030,73056,73061,73063,73064,73066,73097,73112,73112,73440,73458,73474,
	73474,73476,73488,73490,73523,73648,73648,73728,74649,74880,75075,77712,
	77808,77824,78895,78913,78918,82944,83526,92160,92728,92736,92766,92784,
	92862,92880,92909,92928,92975,92992,92995,93027,93047,93053,93071,93760,
	93823,93952,94026,94032,94032,94099,94111,94176,94177,94179,94179,94208,
	100343,100352,101589,101632,101640,110576,110579,110581,110587,110589,110590,
	110592,110882,110898,110898,110928,110930,110933,110933,110948,110951,110960,
	111355,113664,113770,113776,113788,113792,113800,113808,113817,119808,119892,
	119894,119964,119966,119967,119970,119970,119973,119974,119977,119980,119982,
	119993,119995,119995,119997,120003,120005,120069,120071,120074,120077,120084,
	120086,120092,120094,120121,120123,120126,120128,120132,120134,120134,120138,
	120144,120146,120485,120488,120512,120514,120538,120540,120570,120572,120596,
	120598,120628,120630,120654,120656,120686,120688,120712,120714,120744,120746,
	120770,120772,120779,122624,122654,122661,122666,122928,122989,123136,123180,
	123191,123197,123214,123214,123536,123565,123584,123627,124112,124139,124896,
	124902,124904,124907,124909,124910,124912,124926,124928,125124,125184,125251,
	125259,125259,126464,126467,126469,126495,126497,126498,126500,126500,126503,
	126503,126505,126514,126516,126519,126521,126521,126523,126523,126530,126530,
	126535,126535,126537,126537,126539,126539,126541,126543,126545,126546,126548,
	126548,126551,126551,126553,126553,126555,126555,126557,126557,126559,126559,
	126561,126562,126564,126564,126567,126570,126572,126578,126580,126583,126585,
	126588,126590,126590,126592,126601,126603,126619,126625,126627,126629,126633,
	126635,126651,131072,173791,173824,177977,177984,178205,178208,183969,183984,
	191456,194560,195101,196608,201546,201552,205743,436,0,48,57,95,95,178,
	179,185,185,188,190,768,879,1155,1161,1425,1469,1471,1471,1473,1474,1476,
	1477,1479,1479,1552,1562,1611,1641,1648,1648,1750,1756,1759,1764,1767,1768,
	1770,1773,1776,1785,1809,1809,1840,1866,1958,1968,1984,1993,2027,2035,2045,
	2045,2070,2073,2075,2083,2085,2087,2089,2093,2137,2139,2200,2207,2250,2273,
	2275,2307,2362,2364,2366,2383,2385,2391,2402,2403,2406,2415,2433,2435,2492,
	2492,2494,2500,2503,2504,2507,2509,2519,2519,2530,2531,2534,2543,2548,2553,
	2558,2558,2561,2563,2620,2620,2622,2626,2631,2632,2635,2637,2641,2641,2662,
	2673,2677,2677,2689,2691,2748,2748,2750,2757,2759,2761,2763,2765,2786,2787,
	2790,2799,2810,2815,2817,2819,2876,2876,2878,2884,2887,2888,2891,2893,2901,
	2903,2914,2915,2918,2927,2930,2935,2946,2946,3006,3010,3014,3016,3018,3021,
	3031,3031,3046,3058,3072,3076,3132,3132,3134,3140,3142,3144,3146,3149,3157,
	3158,3170,3171,3174,3183,3192,3198,3201,3203,3260,3260,3262,3268,3270,3272,
	3274,3277,3285,3286,3298,3299,3302,3311,3315,3315,3328,3331,3387,3388,3390,
	3396,3398,3400,3402,3405,3415,3422,3426,3427,3430,3448,3457,3459,3530,3530,
	3535,3540,3542,3542,3544,3551,3558,3567,3570,3571,3633,3633,3636,3642,3655,
	3662,3664,3673,3761,3761,3764,3772,3784,3790,3792,3801,3864,3865,3872,3891,
	3893,3893,3895,3895,3897,3897,3902,3903,3953,3972,3974,3975,3981,3991,3993,
	4028,4038,4038,4139,4158,4160,4169,4182,4185,4190,4192,4194,4196,4199,4205,
	4209,4212,4226,4237,4239,4253,4957,4959,4969,4988,5870,5872,5906,5909,5938,
	5940,5970,5971,6002,6003,6068,6099,6109,6109,6112,6121,6128,6137,6155,6157,
	6159,6169,6277,6278,6313,6313,6432,6443,6448,6459,6470,6479,6608,6618,6679,
	6683,6741,6750,6752,6780,6783,6793,6800,6809,6832,6862,6912,6916,6964,6980,
	6992,7001,7019,7027,7040,7042,7073,7085,7088,7097,7142,7155,7204,7223,7232,
	7241,7248,7257,7376,7378,7380,7400,7405,7405,7412,7412,7415,7417,7616,7679,
	8204,8205,8255,8256,8276,8276,8304,8304,8308,8313,8320,8329,8400,8432,8528,
	8578,8581,8585,9312,9371,9450,9471,10102,10131,11503,11505,11517,11517,
	11647,11647,11744,11775,12295,12295,12321,12335,12344,12346,12441,12442,
	12690,12693,12832,12841,12872,12879,12881,12895,12928,12937,12977,12991,
	42528,42537,42607,42610,42612,42621,42654,42655,42726,42737,43010,43010,
	43014,43014,43019,43019,43043,43047,43052,43052,43056,43061,43136,43137,
	43188,43205,43216,43225,43232,43249,43263,43273,43302,43309,43335,43347,
	43392,43395,43443,43456,43472,43481,43493,43493,43504,43513,43561,43574,
	43587,43587,43596,43597,43600,43609,43643,43645,43696,43696,43698,43700,
	43703,43704,43710,43711,43713,43713,43755,43759,43765,43766,44003,44010,
	44012,44013,44016,44025,64286,64286,65024,65039,65056,65071,65075,65076,
	65101,65103,65296,65305,65343,65343,65799,65843,65856,65912,65930,65931,
	66045,66045,66272,66299,66336,66339,66369,66369,66378,66378,66422,66426,
	66513,66517,66720,66729,67672,67679,67705,67711,67751,67759,67835,67839,
	67862,67867,68028,68029,68032,68047,68050,68095,68097,68099,68101,68102,
	68108,68111,68152,68154,68159,68168,68221,68222,68253,68255,68325,68326,
	68331,68335,68440,68447,68472,68479,68521,68527,68858,68863,68900,68903,
	68912,68921,69216,69246,69291,69292,69373,69375,69405,69414,69446,69460,
	69506,69509,69573,69579,69632,69634,69688,69702,69714,69744,69747,69748,
	69759,69762,69808,69818,69826,69826,69872,69881,69888,69890,69927,69940,
	69942,69951,69957,69958,70003,70003,70016,70018,70067,70080,70089,70092,
	70094,70105,70113,70132,70188,70199,70206,70206,70209,70209,70367,70378,
	70384,70393,70400,70403,70459,70460,70462,70468,70471,70472,70475,70477,
	70487,70487,70498,70499,70502,70508,70512,70516,70709,70726,70736,70745,
	70750,70750,70832,70851,70864,70873,71087,71093,71096,71104,71132,71133,
	71216,71232,71248,71257,71339,71351,71360,71369,71453,71467,71472,71483,
	71724,71738,71904,71922,71984,71989,71991,71992,71995,71998,72000,72000,
	72002,72003,72016,72025,72145,72151,72154,72160,72164,72164,72193,72202,
	72243,72249,72251,72254,72263,72263,72273,72283,72330,72345,72751,72758,
	72760,72767,72784,72812,72850,72871,72873,72886,73009,73014,73018,73018,
	73020,73021,73023,73029,73031,73031,73040,73049,73098,73102,73104,73105,
	73107,73111,73120,73129,73459,73462,73472,73473,73475,73475,73524,73530,
	73534,73538,73552,73561,73664,73684,74752,74862,78912,78912,78919,78933,
	92768,92777,92864,92873,92912,92916,92976,92982,93008,93017,93019,93025,
	93824,93846,94031,94031,94033,94087,94095,94098,94180,94180,94192,94193,
	113821,113822,118528,118573,118576,118598,119141,119145,119149,119154,119163,
	119170,119173,119179,119210,119213,119362,119364,119488,119507,119520,119539,
	119648,119672,120782,120831,121344,121398,121403,121452,121461,121461,121476,
	121476,121499,121503,121505,121519,122880,122886,122888,122904,122907,122913,
	122915,122916,122918,122922,123023,123023,123184,123190,123200,123209,123566,
	123566,123628,123641,124140,124153,125127,125142,125252,125258,125264,125273,
	126065,126123,126125,126127,126129,126132,126209,126253,126255,126269,127232,
	127244,130032,130041,917760,917999,3,0,10,10,13,13,8232,8233,6,0,9,10,13,
	13,32,32,160,160,8195,8195,65279,65279,269,0,1,1,0,0,0,0,3,1,0,0,0,0,5,
	1,0,0,0,0,7,1,0,0,0,0,9,1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,0,0,15,1,0,0,0,
	0,17,1,0,0,0,0,19,1,0,0,0,0,27,1,0,0,0,0,29,1,0,0,0,0,31,1,0,0,0,0,39,1,
	0,0,0,0,49,1,0,0,0,1,51,1,0,0,0,3,53,1,0,0,0,5,55,1,0,0,0,7,57,1,0,0,0,
	9,59,1,0,0,0,11,61,1,0,0,0,13,63,1,0,0,0,15,78,1,0,0,0,17,105,1,0,0,0,19,
	123,1,0,0,0,21,127,1,0,0,0,23,131,1,0,0,0,25,133,1,0,0,0,27,174,1,0,0,0,
	29,187,1,0,0,0,31,189,1,0,0,0,33,191,1,0,0,0,35,201,1,0,0,0,37,203,1,0,
	0,0,39,213,1,0,0,0,41,223,1,0,0,0,43,227,1,0,0,0,45,229,1,0,0,0,47,238,
	1,0,0,0,49,241,1,0,0,0,51,52,5,123,0,0,52,2,1,0,0,0,53,54,5,44,0,0,54,4,
	1,0,0,0,55,56,5,125,0,0,56,6,1,0,0,0,57,58,5,58,0,0,58,8,1,0,0,0,59,60,
	5,91,0,0,60,10,1,0,0,0,61,62,5,93,0,0,62,12,1,0,0,0,63,64,5,47,0,0,64,65,
	5,47,0,0,65,69,1,0,0,0,66,68,9,0,0,0,67,66,1,0,0,0,68,71,1,0,0,0,69,70,
	1,0,0,0,69,67,1,0,0,0,70,74,1,0,0,0,71,69,1,0,0,0,72,75,3,47,23,0,73,75,
	5,0,0,1,74,72,1,0,0,0,74,73,1,0,0,0,75,76,1,0,0,0,76,77,6,6,0,0,77,14,1,
	0,0,0,78,79,5,47,0,0,79,80,5,42,0,0,80,84,1,0,0,0,81,83,9,0,0,0,82,81,1,
	0,0,0,83,86,1,0,0,0,84,85,1,0,0,0,84,82,1,0,0,0,85,87,1,0,0,0,86,84,1,0,
	0,0,87,88,5,42,0,0,88,89,5,47,0,0,89,90,1,0,0,0,90,91,6,7,0,0,91,16,1,0,
	0,0,92,93,5,116,0,0,93,94,5,114,0,0,94,95,5,117,0,0,95,106,5,101,0,0,96,
	97,5,102,0,0,97,98,5,97,0,0,98,99,5,108,0,0,99,100,5,115,0,0,100,106,5,
	101,0,0,101,102,5,110,0,0,102,103,5,117,0,0,103,104,5,108,0,0,104,106,5,
	108,0,0,105,92,1,0,0,0,105,96,1,0,0,0,105,101,1,0,0,0,106,18,1,0,0,0,107,
	111,5,34,0,0,108,110,3,21,10,0,109,108,1,0,0,0,110,113,1,0,0,0,111,109,
	1,0,0,0,111,112,1,0,0,0,112,114,1,0,0,0,113,111,1,0,0,0,114,124,5,34,0,
	0,115,119,5,39,0,0,116,118,3,23,11,0,117,116,1,0,0,0,118,121,1,0,0,0,119,
	117,1,0,0,0,119,120,1,0,0,0,120,122,1,0,0,0,121,119,1,0,0,0,122,124,5,39,
	0,0,123,107,1,0,0,0,123,115,1,0,0,0,124,20,1,0,0,0,125,128,8,0,0,0,126,
	128,3,25,12,0,127,125,1,0,0,0,127,126,1,0,0,0,128,22,1,0,0,0,129,132,8,
	1,0,0,130,132,3,25,12,0,131,129,1,0,0,0,131,130,1,0,0,0,132,24,1,0,0,0,
	133,143,5,92,0,0,134,144,3,47,23,0,135,144,3,45,22,0,136,144,7,2,0,0,137,
	144,8,3,0,0,138,144,5,48,0,0,139,140,5,120,0,0,140,141,3,33,16,0,141,142,
	3,33,16,0,142,144,1,0,0,0,143,134,1,0,0,0,143,135,1,0,0,0,143,136,1,0,0,
	0,143,137,1,0,0,0,143,138,1,0,0,0,143,139,1,0,0,0,144,26,1,0,0,0,145,153,
	3,35,17,0,146,150,5,46,0,0,147,149,7,4,0,0,148,147,1,0,0,0,149,152,1,0,
	0,0,150,148,1,0,0,0,150,151,1,0,0,0,151,154,1,0,0,0,152,150,1,0,0,0,153,
	146,1,0,0,0,153,154,1,0,0,0,154,156,1,0,0,0,155,157,3,37,18,0,156,155,1,
	0,0,0,156,157,1,0,0,0,157,175,1,0,0,0,158,160,5,46,0,0,159,161,7,4,0,0,
	160,159,1,0,0,0,161,162,1,0,0,0,162,160,1,0,0,0,162,163,1,0,0,0,163,165,
	1,0,0,0,164,166,3,37,18,0,165,164,1,0,0,0,165,166,1,0,0,0,166,175,1,0,0,
	0,167,168,5,48,0,0,168,170,7,5,0,0,169,171,3,33,16,0,170,169,1,0,0,0,171,
	172,1,0,0,0,172,170,1,0,0,0,172,173,1,0,0,0,173,175,1,0,0,0,174,145,1,0,
	0,0,174,158,1,0,0,0,174,167,1,0,0,0,175,28,1,0,0,0,176,177,5,73,0,0,177,
	178,5,110,0,0,178,179,5,102,0,0,179,180,5,105,0,0,180,181,5,110,0,0,181,
	182,5,105,0,0,182,183,5,116,0,0,183,188,5,121,0,0,184,185,5,78,0,0,185,
	186,5,97,0,0,186,188,5,78,0,0,187,176,1,0,0,0,187,184,1,0,0,0,188,30,1,
	0,0,0,189,190,7,6,0,0,190,32,1,0,0,0,191,192,7,7,0,0,192,34,1,0,0,0,193,
	202,5,48,0,0,194,198,7,8,0,0,195,197,7,4,0,0,196,195,1,0,0,0,197,200,1,
	0,0,0,198,196,1,0,0,0,198,199,1,0,0,0,199,202,1,0,0,0,200,198,1,0,0,0,201,
	193,1,0,0,0,201,194,1,0,0,0,202,36,1,0,0,0,203,205,7,9,0,0,204,206,3,31,
	15,0,205,204,1,0,0,0,205,206,1,0,0,0,206,210,1,0,0,0,207,209,7,4,0,0,208,
	207,1,0,0,0,209,212,1,0,0,0,210,208,1,0,0,0,210,211,1,0,0,0,211,38,1,0,
	0,0,212,210,1,0,0,0,213,217,3,41,20,0,214,216,3,43,21,0,215,214,1,0,0,0,
	216,219,1,0,0,0,217,215,1,0,0,0,217,218,1,0,0,0,218,40,1,0,0,0,219,217,
	1,0,0,0,220,224,7,10,0,0,221,222,5,92,0,0,222,224,3,45,22,0,223,220,1,0,
	0,0,223,221,1,0,0,0,224,42,1,0,0,0,225,228,3,41,20,0,226,228,7,11,0,0,227,
	225,1,0,0,0,227,226,1,0,0,0,228,44,1,0,0,0,229,230,5,117,0,0,230,231,3,
	33,16,0,231,232,3,33,16,0,232,233,3,33,16,0,233,234,3,33,16,0,234,46,1,
	0,0,0,235,236,5,13,0,0,236,239,5,10,0,0,237,239,7,12,0,0,238,235,1,0,0,
	0,238,237,1,0,0,0,239,48,1,0,0,0,240,242,7,13,0,0,241,240,1,0,0,0,242,243,
	1,0,0,0,243,241,1,0,0,0,243,244,1,0,0,0,244,245,1,0,0,0,245,246,6,24,0,
	0,246,50,1,0,0,0,28,0,69,74,84,105,111,119,123,127,131,143,150,153,156,
	162,165,172,174,187,198,201,205,210,217,223,227,238,243,1,6,0,0];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!JSON5Lexer.__ATN) {
			JSON5Lexer.__ATN = new ATNDeserializer().deserialize(JSON5Lexer._serializedATN);
		}

		return JSON5Lexer.__ATN;
	}


	static DecisionsToDFA = JSON5Lexer._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );
}