const  countries = [{"label":"Afghanistan","value":"AF"},{"label":"Îles Åland","value":"AX"},{"label":"Albanie","value":"AL"},{"label":"Algérie","value":"DZ"},{"label":"Samoa américaines","value":"AS"},{"label":"Andorre","value":"AD"},{"label":"Angola","value":"AO"},{"label":"Anguilla","value":"AI"},{"label":"Antarctique","value":"AQ"},{"label":"Antigua-et-Barbuda","value":"AG"},{"label":"Argentine","value":"AR"},{"label":"Arménie","value":"AM"},{"label":"Aruba","value":"AW"},{"label":"Australie","value":"AU"},{"label":"Autriche","value":"AT"},{"label":"Azerbaïdjan","value":"AZ"},{"label":"Bahamas","value":"BS"},{"label":"Bahreïn","value":"BH"},{"label":"Bangladesh","value":"BD"},{"label":"Barbade","value":"BB"},{"label":"Bélarus","value":"BY"},{"label":"Belgique","value":"BE"},{"label":"Belize","value":"BZ"},{"label":"Bénin","value":"BJ"},{"label":"Bermudes","value":"BM"},{"label":"Bhoutan","value":"BT"},{"label":"Bolivie","value":"BO"},{"label":"Bosnie-Herzégovine","value":"BA"},{"label":"Botswana","value":"BW"},{"label":"Île Bouvet","value":"BV"},{"label":"Brésil","value":"BR"},{"label":"Territoire britannique de l'océan Indien","value":"IO"},{"label":"Brunéi Darussalam","value":"BN"},{"label":"Bulgarie","value":"BG"},{"label":"Burkina Faso","value":"BF"},{"label":"Burundi","value":"BI"},{"label":"Cambodge","value":"KH"},{"label":"Cameroun","value":"CM"},{"label":"Canada","value":"CA"},{"label":"Cap-Vert","value":"CV"},{"label":"Îles Caïmans","value":"KY"},{"label":"République centrafricaine","value":"CF"},{"label":"Tchad","value":"TD"},{"label":"Chili","value":"CL"},{"label":"Chine","value":"CN"},{"label":"Île Christmas","value":"CX"},{"label":"Îles Cocos - Keeling","value":"CC"},{"label":"Colombie","value":"CO"},{"label":"Comores","value":"KM"},{"label":"Congo-Brazzaville","value":"CG"},{"label":"République démocratique du Congo","value":"CD"},{"label":"Îles Cook","value":"CK"},{"label":"Costa Rica","value":"CR"},{"label":"Côte d’Ivoire","value":"CI"},{"label":"Croatie","value":"HR"},{"label":"Cuba","value":"CU"},{"label":"Chypre","value":"CY"},{"label":"République tchèque","value":"CZ"},{"label":"Danemark","value":"DK"},{"label":"Djibouti","value":"DJ"},{"label":"Dominique","value":"DM"},{"label":"République dominicaine","value":"DO"},{"label":"Équateur","value":"EC"},{"label":"Égypte","value":"EG"},{"label":"El Salvador","value":"SV"},{"label":"Guinée équatoriale","value":"GQ"},{"label":"Érythrée","value":"ER"},{"label":"Estonie","value":"EE"},{"label":"Éthiopie","value":"ET"},{"label":"Îles Malouines","value":"FK"},{"label":"Îles Féroé","value":"FO"},{"label":"Fidji","value":"FJ"},{"label":"Finlande","value":"FI"},{"label":"France","value":"FR"},{"label":"Guyane française","value":"GF"},{"label":"Polynésie française","value":"PF"},{"label":"Terres australes françaises","value":"TF"},{"label":"Gabon","value":"GA"},{"label":"Gambie","value":"GM"},{"label":"Géorgie","value":"GE"},{"label":"Allemagne","value":"DE"},{"label":"Ghana","value":"GH"},{"label":"Gibraltar","value":"GI"},{"label":"Grèce","value":"GR"},{"label":"Groenland","value":"GL"},{"label":"Grenade","value":"GD"},{"label":"Guadeloupe","value":"GP"},{"label":"Guam","value":"GU"},{"label":"Guatemala","value":"GT"},{"label":"Guernesey","value":"GG"},{"label":"Guinée","value":"GN"},{"label":"Guinée-Bissau","value":"GW"},{"label":"Guyana","value":"GY"},{"label":"Haïti","value":"HT"},{"label":"Îles Heard et MacDonald","value":"HM"},{"label":"État de la Cité du Vatican","value":"VA"},{"label":"Honduras","value":"HN"},{"label":"R.A.S. chinoise de Hong Kong","value":"HK"},{"label":"Hongrie","value":"HU"},{"label":"Islande","value":"IS"},{"label":"Inde","value":"IN"},{"label":"Indonésie","value":"ID"},{"label":"Iran","value":"IR"},{"label":"Irak","value":"IQ"},{"label":"Irlande","value":"IE"},{"label":"Île de Man","value":"IM"},{"label":"Israël","value":"IL"},{"label":"Italie","value":"IT"},{"label":"Jamaïque","value":"JM"},{"label":"Japon","value":"JP"},{"label":"Jersey","value":"JE"},{"label":"Jordanie","value":"JO"},{"label":"Kazakhstan","value":"KZ"},{"label":"Kenya","value":"KE"},{"label":"Kiribati","value":"KI"},{"label":"Corée du Nord","value":"KP"},{"label":"Corée du Sud","value":"KR"},{"label":"Koweït","value":"KW"},{"label":"Kirghizistan","value":"KG"},{"label":"Laos","value":"LA"},{"label":"Lettonie","value":"LV"},{"label":"Liban","value":"LB"},{"label":"Lesotho","value":"LS"},{"label":"Libéria","value":"LR"},{"label":"Libye","value":"LY"},{"label":"Liechtenstein","value":"LI"},{"label":"Lituanie","value":"LT"},{"label":"Luxembourg","value":"LU"},{"label":"R.A.S. chinoise de Macao","value":"MO"},{"label":"Macédoine","value":"MK"},{"label":"Madagascar","value":"MG"},{"label":"Malawi","value":"MW"},{"label":"Malaisie","value":"MY"},{"label":"Maldives","value":"MV"},{"label":"Mali","value":"ML"},{"label":"Malte","value":"MT"},{"label":"Îles Marshall","value":"MH"},{"label":"Martinique","value":"MQ"},{"label":"Mauritanie","value":"MR"},{"label":"Maurice","value":"MU"},{"label":"Mayotte","value":"YT"},{"label":"Mexique","value":"MX"},{"label":"États fédérés de Micronésie","value":"FM"},{"label":"Moldavie","value":"MD"},{"label":"Monaco","value":"MC"},{"label":"Mongolie","value":"MN"},{"label":"Montserrat","value":"MS"},{"label":"Maroc","value":"MA"},{"label":"Mozambique","value":"MZ"},{"label":"Myanmar","value":"MM"},{"label":"Namibie","value":"NA"},{"label":"Nauru","value":"NR"},{"label":"Népal","value":"NP"},{"label":"Pays-Bas","value":"NL"},{"label":"Antilles néerlandaises","value":"AN"},{"label":"Nouvelle-Calédonie","value":"NC"},{"label":"Nouvelle-Zélande","value":"NZ"},{"label":"Nicaragua","value":"NI"},{"label":"Niger","value":"NE"},{"label":"Nigéria","value":"NG"},{"label":"Niue","value":"NU"},{"label":"Île Norfolk","value":"NF"},{"label":"Îles Mariannes du Nord","value":"MP"},{"label":"Norvège","value":"NO"},{"label":"Oman","value":"OM"},{"label":"Pakistan","value":"PK"},{"label":"Palaos","value":"PW"},{"label":"Territoire palestinien","value":"PS"},{"label":"Panama","value":"PA"},{"label":"Papouasie-Nouvelle-Guinée","value":"PG"},{"label":"Paraguay","value":"PY"},{"label":"Pérou","value":"PE"},{"label":"Philippines","value":"PH"},{"label":"Pitcairn","value":"PN"},{"label":"Pologne","value":"PL"},{"label":"Portugal","value":"PT"},{"label":"Porto Rico","value":"PR"},{"label":"Qatar","value":"QA"},{"label":"Réunion","value":"RE"},{"label":"Roumanie","value":"RO"},{"label":"Russie","value":"RU"},{"label":"Rwanda","value":"RW"},{"label":"Sainte-Hélène","value":"SH"},{"label":"Saint-Kitts-et-Nevis","value":"KN"},{"label":"Sainte-Lucie","value":"LC"},{"label":"Saint-Pierre-et-Miquelon","value":"PM"},{"label":"Saint-Vincent-et-les Grenadines","value":"VC"},{"label":"Samoa","value":"WS"},{"label":"Saint-Marin","value":"SM"},{"label":"Sao Tomé-et-Principe","value":"ST"},{"label":"Arabie saoudite","value":"SA"},{"label":"Sénégal","value":"SN"},{"label":"Serbie-et-Monténégro","value":"CS"},{"label":"Seychelles","value":"SC"},{"label":"Sierra Leone","value":"SL"},{"label":"Singapour","value":"SG"},{"label":"Slovaquie","value":"SK"},{"label":"Slovénie","value":"SI"},{"label":"Îles Salomon","value":"SB"},{"label":"Somalie","value":"SO"},{"label":"Afrique du Sud","value":"ZA"},{"label":"Géorgie du Sud et les îles Sandwich du Sud","value":"GS"},{"label":"Espagne","value":"ES"},{"label":"Sri Lanka","value":"LK"},{"label":"Soudan","value":"SD"},{"label":"Suriname","value":"SR"},{"label":"Svalbard et Île Jan Mayen","value":"SJ"},{"label":"Swaziland","value":"SZ"},{"label":"Suède","value":"SE"},{"label":"Suisse","value":"CH"},{"label":"Syrie","value":"SY"},{"label":"Taïwan","value":"TW"},{"label":"Tadjikistan","value":"TJ"},{"label":"Tanzanie","value":"TZ"},{"label":"Thaïlande","value":"TH"},{"label":"Timor oriental","value":"TL"},{"label":"Togo","value":"TG"},{"label":"Tokelau","value":"TK"},{"label":"Tonga","value":"TO"},{"label":"Trinité-et-Tobago","value":"TT"},{"label":"Tunisie","value":"TN"},{"label":"Turquie","value":"TR"},{"label":"Turkménistan","value":"TM"},{"label":"Îles Turks et Caïques","value":"TC"},{"label":"Tuvalu","value":"TV"},{"label":"Ouganda","value":"UG"},{"label":"Ukraine","value":"UA"},{"label":"Émirats arabes unis","value":"AE"},{"label":"Royaume-Uni","value":"GB"},{"label":"États-Unis","value":"US"},{"label":"Îles Mineures Éloignées des États-Unis","value":"UM"},{"label":"Uruguay","value":"UY"},{"label":"Ouzbékistan","value":"UZ"},{"label":"Vanuatu","value":"VU"},{"label":"Venezuela","value":"VE"},{"label":"Viêt Nam","value":"VN"},{"label":"Îles Vierges britanniques","value":"VG"},{"label":"Îles Vierges des États-Unis","value":"VI"},{"label":"Wallis-et-Futuna","value":"WF"},{"label":"Sahara occidental","value":"EH"},{"label":"Yémen","value":"YE"},{"label":"Zambie","value":"ZM"},{"label":"Zimbabwe","value":"ZW"}];
  
  export  {countries};