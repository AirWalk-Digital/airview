(self.webpackChunkairview_compliance_ui=self.webpackChunkairview_compliance_ui||[]).push([[55],{"../../node_modules/@mui/icons-material/Security.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";var _interopRequireDefault=__webpack_require__("../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");exports.Z=void 0;var _createSvgIcon=_interopRequireDefault(__webpack_require__("../../node_modules/@mui/icons-material/utils/createSvgIcon.js")),_jsxRuntime=__webpack_require__("../../node_modules/react/jsx-runtime.js"),_default=(0,_createSvgIcon.default)((0,_jsxRuntime.jsx)("path",{d:"M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"}),"Security");exports.Z=_default},"../../node_modules/@mui/icons-material/Warning.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";var _interopRequireDefault=__webpack_require__("../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");exports.Z=void 0;var _createSvgIcon=_interopRequireDefault(__webpack_require__("../../node_modules/@mui/icons-material/utils/createSvgIcon.js")),_jsxRuntime=__webpack_require__("../../node_modules/react/jsx-runtime.js"),_default=(0,_createSvgIcon.default)((0,_jsxRuntime.jsx)("path",{d:"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"}),"Warning");exports.Z=_default},"../../node_modules/@mui/material/ButtonGroup/ButtonGroup.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>ButtonGroup_ButtonGroup});var objectWithoutPropertiesLoose=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),esm_extends=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/extends.js"),react=__webpack_require__("../../node_modules/react/index.js"),clsx_m=__webpack_require__("../../node_modules/clsx/dist/clsx.m.js"),composeClasses=__webpack_require__("../../node_modules/@mui/utils/esm/composeClasses/composeClasses.js"),colorManipulator=__webpack_require__("../../node_modules/@mui/system/esm/colorManipulator.js"),capitalize=__webpack_require__("../../node_modules/@mui/material/utils/capitalize.js"),styled=__webpack_require__("../../node_modules/@mui/material/styles/styled.js"),useThemeProps=__webpack_require__("../../node_modules/@mui/material/styles/useThemeProps.js"),generateUtilityClass=__webpack_require__("../../node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js");function getButtonGroupUtilityClass(slot){return(0,generateUtilityClass.Z)("MuiButtonGroup",slot)}const ButtonGroup_buttonGroupClasses=(0,__webpack_require__("../../node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js").Z)("MuiButtonGroup",["root","contained","outlined","text","disableElevation","disabled","fullWidth","vertical","grouped","groupedHorizontal","groupedVertical","groupedText","groupedTextHorizontal","groupedTextVertical","groupedTextPrimary","groupedTextSecondary","groupedOutlined","groupedOutlinedHorizontal","groupedOutlinedVertical","groupedOutlinedPrimary","groupedOutlinedSecondary","groupedContained","groupedContainedHorizontal","groupedContainedVertical","groupedContainedPrimary","groupedContainedSecondary"]);var ButtonGroupContext=__webpack_require__("../../node_modules/@mui/material/ButtonGroup/ButtonGroupContext.js"),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const _excluded=["children","className","color","component","disabled","disableElevation","disableFocusRipple","disableRipple","fullWidth","orientation","size","variant"],ButtonGroupRoot=(0,styled.ZP)("div",{name:"MuiButtonGroup",slot:"Root",overridesResolver:(props,styles)=>{const{ownerState}=props;return[{[`& .${ButtonGroup_buttonGroupClasses.grouped}`]:styles.grouped},{[`& .${ButtonGroup_buttonGroupClasses.grouped}`]:styles[`grouped${(0,capitalize.Z)(ownerState.orientation)}`]},{[`& .${ButtonGroup_buttonGroupClasses.grouped}`]:styles[`grouped${(0,capitalize.Z)(ownerState.variant)}`]},{[`& .${ButtonGroup_buttonGroupClasses.grouped}`]:styles[`grouped${(0,capitalize.Z)(ownerState.variant)}${(0,capitalize.Z)(ownerState.orientation)}`]},{[`& .${ButtonGroup_buttonGroupClasses.grouped}`]:styles[`grouped${(0,capitalize.Z)(ownerState.variant)}${(0,capitalize.Z)(ownerState.color)}`]},styles.root,styles[ownerState.variant],!0===ownerState.disableElevation&&styles.disableElevation,ownerState.fullWidth&&styles.fullWidth,"vertical"===ownerState.orientation&&styles.vertical]}})((({theme,ownerState})=>(0,esm_extends.Z)({display:"inline-flex",borderRadius:(theme.vars||theme).shape.borderRadius},"contained"===ownerState.variant&&{boxShadow:(theme.vars||theme).shadows[2]},ownerState.disableElevation&&{boxShadow:"none"},ownerState.fullWidth&&{width:"100%"},"vertical"===ownerState.orientation&&{flexDirection:"column"},{[`& .${ButtonGroup_buttonGroupClasses.grouped}`]:(0,esm_extends.Z)({minWidth:40,"&:not(:first-of-type)":(0,esm_extends.Z)({},"horizontal"===ownerState.orientation&&{borderTopLeftRadius:0,borderBottomLeftRadius:0},"vertical"===ownerState.orientation&&{borderTopRightRadius:0,borderTopLeftRadius:0},"outlined"===ownerState.variant&&"horizontal"===ownerState.orientation&&{marginLeft:-1},"outlined"===ownerState.variant&&"vertical"===ownerState.orientation&&{marginTop:-1}),"&:not(:last-of-type)":(0,esm_extends.Z)({},"horizontal"===ownerState.orientation&&{borderTopRightRadius:0,borderBottomRightRadius:0},"vertical"===ownerState.orientation&&{borderBottomRightRadius:0,borderBottomLeftRadius:0},"text"===ownerState.variant&&"horizontal"===ownerState.orientation&&{borderRight:theme.vars?`1px solid rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.23)`:"1px solid "+("light"===theme.palette.mode?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)")},"text"===ownerState.variant&&"vertical"===ownerState.orientation&&{borderBottom:theme.vars?`1px solid rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.23)`:"1px solid "+("light"===theme.palette.mode?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)")},"text"===ownerState.variant&&"inherit"!==ownerState.color&&{borderColor:theme.vars?`rgba(${theme.vars.palette[ownerState.color].mainChannel} / 0.5)`:(0,colorManipulator.Fq)(theme.palette[ownerState.color].main,.5)},"outlined"===ownerState.variant&&"horizontal"===ownerState.orientation&&{borderRightColor:"transparent"},"outlined"===ownerState.variant&&"vertical"===ownerState.orientation&&{borderBottomColor:"transparent"},"contained"===ownerState.variant&&"horizontal"===ownerState.orientation&&{borderRight:`1px solid ${(theme.vars||theme).palette.grey[400]}`,[`&.${ButtonGroup_buttonGroupClasses.disabled}`]:{borderRight:`1px solid ${(theme.vars||theme).palette.action.disabled}`}},"contained"===ownerState.variant&&"vertical"===ownerState.orientation&&{borderBottom:`1px solid ${(theme.vars||theme).palette.grey[400]}`,[`&.${ButtonGroup_buttonGroupClasses.disabled}`]:{borderBottom:`1px solid ${(theme.vars||theme).palette.action.disabled}`}},"contained"===ownerState.variant&&"inherit"!==ownerState.color&&{borderColor:(theme.vars||theme).palette[ownerState.color].dark},{"&:hover":(0,esm_extends.Z)({},"outlined"===ownerState.variant&&"horizontal"===ownerState.orientation&&{borderRightColor:"currentColor"},"outlined"===ownerState.variant&&"vertical"===ownerState.orientation&&{borderBottomColor:"currentColor"})}),"&:hover":(0,esm_extends.Z)({},"contained"===ownerState.variant&&{boxShadow:"none"})},"contained"===ownerState.variant&&{boxShadow:"none"})}))),ButtonGroup_ButtonGroup=react.forwardRef((function ButtonGroup(inProps,ref){const props=(0,useThemeProps.Z)({props:inProps,name:"MuiButtonGroup"}),{children,className,color="primary",component="div",disabled=!1,disableElevation=!1,disableFocusRipple=!1,disableRipple=!1,fullWidth=!1,orientation="horizontal",size="medium",variant="outlined"}=props,other=(0,objectWithoutPropertiesLoose.Z)(props,_excluded),ownerState=(0,esm_extends.Z)({},props,{color,component,disabled,disableElevation,disableFocusRipple,disableRipple,fullWidth,orientation,size,variant}),classes=(ownerState=>{const{classes,color,disabled,disableElevation,fullWidth,orientation,variant}=ownerState,slots={root:["root",variant,"vertical"===orientation&&"vertical",fullWidth&&"fullWidth",disableElevation&&"disableElevation"],grouped:["grouped",`grouped${(0,capitalize.Z)(orientation)}`,`grouped${(0,capitalize.Z)(variant)}`,`grouped${(0,capitalize.Z)(variant)}${(0,capitalize.Z)(orientation)}`,`grouped${(0,capitalize.Z)(variant)}${(0,capitalize.Z)(color)}`,disabled&&"disabled"]};return(0,composeClasses.Z)(slots,getButtonGroupUtilityClass,classes)})(ownerState),context=react.useMemo((()=>({className:classes.grouped,color,disabled,disableElevation,disableFocusRipple,disableRipple,fullWidth,size,variant})),[color,disabled,disableElevation,disableFocusRipple,disableRipple,fullWidth,size,variant,classes.grouped]);return(0,jsx_runtime.jsx)(ButtonGroupRoot,(0,esm_extends.Z)({as:component,role:"group",className:(0,clsx_m.Z)(classes.root,className),ref,ownerState},other,{children:(0,jsx_runtime.jsx)(ButtonGroupContext.Z.Provider,{value:context,children})}))}))},"../../node_modules/@mui/material/Switch/Switch.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>Switch_Switch});var objectWithoutPropertiesLoose=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),esm_extends=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/extends.js"),react=__webpack_require__("../../node_modules/react/index.js"),clsx_m=__webpack_require__("../../node_modules/clsx/dist/clsx.m.js"),composeClasses=__webpack_require__("../../node_modules/@mui/utils/esm/composeClasses/composeClasses.js"),colorManipulator=__webpack_require__("../../node_modules/@mui/system/esm/colorManipulator.js"),capitalize=__webpack_require__("../../node_modules/@mui/material/utils/capitalize.js"),SwitchBase=__webpack_require__("../../node_modules/@mui/material/internal/SwitchBase.js"),useThemeProps=__webpack_require__("../../node_modules/@mui/material/styles/useThemeProps.js"),styled=__webpack_require__("../../node_modules/@mui/material/styles/styled.js"),generateUtilityClass=__webpack_require__("../../node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js");function getSwitchUtilityClass(slot){return(0,generateUtilityClass.Z)("MuiSwitch",slot)}const Switch_switchClasses=(0,__webpack_require__("../../node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js").Z)("MuiSwitch",["root","edgeStart","edgeEnd","switchBase","colorPrimary","colorSecondary","sizeSmall","sizeMedium","checked","disabled","input","thumb","track"]);var jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const _excluded=["className","color","edge","size","sx"],SwitchRoot=(0,styled.ZP)("span",{name:"MuiSwitch",slot:"Root",overridesResolver:(props,styles)=>{const{ownerState}=props;return[styles.root,ownerState.edge&&styles[`edge${(0,capitalize.Z)(ownerState.edge)}`],styles[`size${(0,capitalize.Z)(ownerState.size)}`]]}})((({ownerState})=>(0,esm_extends.Z)({display:"inline-flex",width:58,height:38,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle","@media print":{colorAdjust:"exact"}},"start"===ownerState.edge&&{marginLeft:-8},"end"===ownerState.edge&&{marginRight:-8},"small"===ownerState.size&&{width:40,height:24,padding:7,[`& .${Switch_switchClasses.thumb}`]:{width:16,height:16},[`& .${Switch_switchClasses.switchBase}`]:{padding:4,[`&.${Switch_switchClasses.checked}`]:{transform:"translateX(16px)"}}}))),SwitchSwitchBase=(0,styled.ZP)(SwitchBase.Z,{name:"MuiSwitch",slot:"SwitchBase",overridesResolver:(props,styles)=>{const{ownerState}=props;return[styles.switchBase,{[`& .${Switch_switchClasses.input}`]:styles.input},"default"!==ownerState.color&&styles[`color${(0,capitalize.Z)(ownerState.color)}`]]}})((({theme})=>({position:"absolute",top:0,left:0,zIndex:1,color:theme.vars?theme.vars.palette.Switch.defaultColor:`${"light"===theme.palette.mode?theme.palette.common.white:theme.palette.grey[300]}`,transition:theme.transitions.create(["left","transform"],{duration:theme.transitions.duration.shortest}),[`&.${Switch_switchClasses.checked}`]:{transform:"translateX(20px)"},[`&.${Switch_switchClasses.disabled}`]:{color:theme.vars?theme.vars.palette.Switch.defaultDisabledColor:`${"light"===theme.palette.mode?theme.palette.grey[100]:theme.palette.grey[600]}`},[`&.${Switch_switchClasses.checked} + .${Switch_switchClasses.track}`]:{opacity:.5},[`&.${Switch_switchClasses.disabled} + .${Switch_switchClasses.track}`]:{opacity:theme.vars?theme.vars.opacity.switchTrackDisabled:""+("light"===theme.palette.mode?.12:.2)},[`& .${Switch_switchClasses.input}`]:{left:"-100%",width:"300%"}})),(({theme,ownerState})=>(0,esm_extends.Z)({"&:hover":{backgroundColor:theme.vars?`rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})`:(0,colorManipulator.Fq)(theme.palette.action.active,theme.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"default"!==ownerState.color&&{[`&.${Switch_switchClasses.checked}`]:{color:(theme.vars||theme).palette[ownerState.color].main,"&:hover":{backgroundColor:theme.vars?`rgba(${theme.vars.palette[ownerState.color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})`:(0,colorManipulator.Fq)(theme.palette[ownerState.color].main,theme.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${Switch_switchClasses.disabled}`]:{color:theme.vars?theme.vars.palette.Switch[`${ownerState.color}DisabledColor`]:`${"light"===theme.palette.mode?(0,colorManipulator.$n)(theme.palette[ownerState.color].main,.62):(0,colorManipulator._j)(theme.palette[ownerState.color].main,.55)}`}},[`&.${Switch_switchClasses.checked} + .${Switch_switchClasses.track}`]:{backgroundColor:(theme.vars||theme).palette[ownerState.color].main}}))),SwitchTrack=(0,styled.ZP)("span",{name:"MuiSwitch",slot:"Track",overridesResolver:(props,styles)=>styles.track})((({theme})=>({height:"100%",width:"100%",borderRadius:7,zIndex:-1,transition:theme.transitions.create(["opacity","background-color"],{duration:theme.transitions.duration.shortest}),backgroundColor:theme.vars?theme.vars.palette.common.onBackground:`${"light"===theme.palette.mode?theme.palette.common.black:theme.palette.common.white}`,opacity:theme.vars?theme.vars.opacity.switchTrack:""+("light"===theme.palette.mode?.38:.3)}))),SwitchThumb=(0,styled.ZP)("span",{name:"MuiSwitch",slot:"Thumb",overridesResolver:(props,styles)=>styles.thumb})((({theme})=>({boxShadow:(theme.vars||theme).shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"}))),Switch_Switch=react.forwardRef((function Switch(inProps,ref){const props=(0,useThemeProps.Z)({props:inProps,name:"MuiSwitch"}),{className,color="primary",edge=!1,size="medium",sx}=props,other=(0,objectWithoutPropertiesLoose.Z)(props,_excluded),ownerState=(0,esm_extends.Z)({},props,{color,edge,size}),classes=(ownerState=>{const{classes,edge,size,color,checked,disabled}=ownerState,slots={root:["root",edge&&`edge${(0,capitalize.Z)(edge)}`,`size${(0,capitalize.Z)(size)}`],switchBase:["switchBase",`color${(0,capitalize.Z)(color)}`,checked&&"checked",disabled&&"disabled"],thumb:["thumb"],track:["track"],input:["input"]},composedClasses=(0,composeClasses.Z)(slots,getSwitchUtilityClass,classes);return(0,esm_extends.Z)({},classes,composedClasses)})(ownerState),icon=(0,jsx_runtime.jsx)(SwitchThumb,{className:classes.thumb,ownerState});return(0,jsx_runtime.jsxs)(SwitchRoot,{className:(0,clsx_m.Z)(classes.root,className),sx,ownerState,children:[(0,jsx_runtime.jsx)(SwitchSwitchBase,(0,esm_extends.Z)({type:"checkbox",icon,checkedIcon:icon,ref,ownerState},other,{classes:(0,esm_extends.Z)({},classes,{root:classes.switchBase})})),(0,jsx_runtime.jsx)(SwitchTrack,{className:classes.track,ownerState})]})}))},"../../node_modules/core-js/internals/string-trim-start.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";var $trimStart=__webpack_require__("../../node_modules/core-js/internals/string-trim.js").start,forcedStringTrimMethod=__webpack_require__("../../node_modules/core-js/internals/string-trim-forced.js");module.exports=forcedStringTrimMethod("trimStart")?function trimStart(){return $trimStart(this)}:"".trimStart},"../../node_modules/core-js/modules/es.string.trim-left.js":(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{var $=__webpack_require__("../../node_modules/core-js/internals/export.js"),trimStart=__webpack_require__("../../node_modules/core-js/internals/string-trim-start.js");$({target:"String",proto:!0,name:"trimStart",forced:"".trimLeft!==trimStart},{trimLeft:trimStart})},"../../node_modules/core-js/modules/es.string.trim-start.js":(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{__webpack_require__("../../node_modules/core-js/modules/es.string.trim-left.js");var $=__webpack_require__("../../node_modules/core-js/internals/export.js"),trimStart=__webpack_require__("../../node_modules/core-js/internals/string-trim-start.js");$({target:"String",proto:!0,name:"trimStart",forced:"".trimStart!==trimStart},{trimStart})},"../../node_modules/dayjs/plugin/relativeTime.js":function(module){module.exports=function(){"use strict";return function(r,e,t){r=r||{};var n=e.prototype,o={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function i(r,e,t,o){return n.fromToBase(r,e,t,o)}t.en.relativeTime=o,n.fromToBase=function(e,n,i,d,u){for(var f,a,s,l=i.$locale().relativeTime||o,h=r.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],m=h.length,c=0;c<m;c+=1){var y=h[c];y.d&&(f=d?t(e).diff(i,y.d,!0):i.diff(e,y.d,!0));var p=(r.rounding||Math.round)(Math.abs(f));if(s=f>0,p<=y.r||!y.r){p<=1&&c>0&&(y=h[c-1]);var v=l[y.l];u&&(p=u(""+p)),a="string"==typeof v?v.replace("%d",p):v(p,n,y.l,s);break}}if(n)return a;var M=s?l.future:l.past;return"function"==typeof M?M(a):M.replace("%s",a)},n.to=function(r,e){return i(r,e,this,!0)},n.from=function(r,e){return i(r,e,this)};var d=function(r){return r.$u?t.utc():t()};n.toNow=function(r){return this.to(d(this),r)},n.fromNow=function(r){return this.from(d(this),r)}}}()},"../../node_modules/dayjs/plugin/updateLocale.js":function(module){module.exports=function(){"use strict";return function(e,n,t){t.updateLocale=function(e,n){var o=t.Ls[e];if(o)return(n?Object.keys(n):[]).forEach((function(e){o[e]=n[e]})),o}}}()}}]);