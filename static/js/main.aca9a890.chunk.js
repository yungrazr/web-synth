(this["webpackJsonpweb-synth"]=this["webpackJsonpweb-synth"]||[]).push([[0],{21:function(e,t,c){},22:function(e,t,c){},30:function(e,t,c){},31:function(e,t,c){"use strict";c.r(t);var n=c(2),a=c.n(n),i=c(13),o=c.n(i),s=(c(21),c(4)),r=(c(22),c(16)),l=function e(){Object(r.a)(this,e)};l.context=new(window.AudioContext||window.webkitAudioContext),l.masterGainNode=l.context.createGain();var u=l,d=c(5),j=c(15),b=(c(7),c(3)),m=c(0),h=function(e){var t=e.oscNum,c=e.play,a=Object(n.useState)([]),i=Object(s.a)(a,2),o=i[0],r=i[1];Object(n.useEffect)((function(){var e=[],t=function(){var t=u.context.createGain();t.gain.setValueAtTime(.3,u.context.currentTime),t.connect(u.masterGainNode);var c=u.context.createOscillator();c.frequency.setValueAtTime(262,u.context.currentTime),c.detune.setValueAtTime(0,u.context.currentTime),c.start();var n={note:null,playing:!1,oscillatorNode:c,oscillatorGainNode:t,frequency:c.frequency.value,detune:c.detune.value,type:c.type,gain:30};e.push(n)};t(),t(),t(),t(),t(),t(),r(e)}),[]),Object(n.useEffect)((function(){if(void 0===o||0===o.length);else if(c){if(null!=c.playNote&&null==c.stopNote)return void function(e,t){var c=Object(j.a)(o);for(var n in c){var a=Object(d.a)({},c[n]);if(null==a.note){a.playing=!0,a.note=t,a.frequency=e,a.oscillatorNode.frequency.setValueAtTime(e,u.context.currentTime);try{a.oscillatorNode.connect(a.oscillatorGainNode),c[n]=a}catch(i){console.log("Playing Osc"+i)}break}}r(Object(j.a)(c))}(c.frequency,c.playNote);if(null!=c.stopNote&&null==c.playNote)return void function(e){for(var t in o){var c=o;if(c[t].note===e){c[t].note=null,c[t].playing=!1;try{o[t].oscillatorNode.disconnect(o[t].oscillatorGainNode),r(c)}catch(n){console.log("Stopped osc"+n)}break}}}(c.stopNote)}}),[c]);return void 0===o||0===o.length?null:Object(m.jsxs)("div",{className:"oscillator-container",children:[Object(m.jsxs)("h1",{className:"oscillator-title",children:["OSC ",t]}),Object(m.jsxs)("div",{className:"oscillator-tune-container",children:[Object(m.jsx)("h3",{className:"oscillator-title-small",children:"TUNE"}),Object(m.jsx)(b.Knob,{onChange:function(e){var t=[];for(var c in o){var n=o[c];n.oscillatorNode.detune.setValueAtTime(e,u.context.currentTime),n.detune=e,t.push(n)}r(t)},unlockDistance:10,min:-500,max:500,preciseMode:!0,rotateDegrees:180,value:o[0].detune}),Object(m.jsxs)("p",{children:[Math.round(o[0].detune)," cent"]})]}),Object(m.jsxs)("div",{className:"oscillator-type-container",children:[Object(m.jsx)("h3",{className:"oscillator-title-small",children:"TYPE"}),Object(m.jsx)(b.Knob,{onChange:function(e){var t=Math.round(e),c=[];for(var n in o){var a=o[n];switch(t){case 1:a.oscillatorNode.type="sine",a.type="sine";break;case 2:a.oscillatorNode.type="sawtooth",a.type="sawtooth";break;case 3:a.oscillatorNode.type="square",a.type="square";break;case 4:a.oscillatorNode.type="triangle",a.type="triangle";break;default:a.oscillatorNode.type="sine",a.type="sine"}c.push(a)}r(c)},unlockDistance:10,preciseMode:!0,min:1,max:5,rotateDegrees:180,value:function(){switch(o[0].type){case"sine":return 1;case"sawtooth":return 2;case"square":return 3;case"triangle":return 4;default:return 1}}()}),Object(m.jsx)("p",{children:o[0].type})]}),Object(m.jsxs)("div",{className:"oscillator-vol-container",children:[Object(m.jsx)("h3",{className:"oscillator-title-small",children:"MIX"}),Object(m.jsx)(b.Knob,{onChange:function(e){var t=[];for(var c in o){var n=o[c];n.oscillatorGainNode.gain.setValueAtTime(Math.round(e)/100,u.context.currentTime),n.gain=Math.round(e),t.push(n)}r(t)},unlockDistance:10,min:0,max:100,preciseMode:!0,rotateDegrees:225,value:o[0].gain}),Object(m.jsx)("p",{children:Math.round(o[0].gain)})]})]})},O=function(){var e=Object(n.useState)(),t=Object(s.a)(e,2),c=t[0],a=t[1],i=Object(n.useState)(),o=Object(s.a)(i,2),r=o[0],l=o[1],j=Object(n.useState)(),h=Object(s.a)(j,2),O=h[0],x=h[1],N=Object(n.useState)(!1),y=Object(s.a)(N,2),f=y[0],v=y[1];Object(n.useEffect)((function(){!function(){var e=u.context.createDelay();e.delayTime.setValueAtTime(.15,u.context.currentTime);var t=u.context.createGain();t.gain.setValueAtTime(.6,u.context.currentTime);var c=u.context.createBiquadFilter();c.frequency.setValueAtTime(1e3,u.context.currentTime),e.connect(t),t.connect(c),c.connect(e),u.masterGainNode.connect(e);var n={frequency:1e3,filterNode:c},i={gain:.6,feedbackNode:t};a({delayTime:.15,delayNode:e}),l(i),x(n)}()}),[]);return c&&O&&r?Object(m.jsxs)("div",{className:"oscillator-container",children:[Object(m.jsx)("h1",{className:"oscillator-title",children:"DELAY"}),Object(m.jsxs)("div",{className:"oscillator-tune-container",children:[Object(m.jsx)("h3",{className:"oscillator-title-small",children:"TIME"}),Object(m.jsx)(b.Knob,{onChange:function(e){var t=Object(d.a)({},c);t.delayNode.delayTime.setValueAtTime(e,u.context.currentTime),t.delayTime=e,a(t)},unlockDistance:10,min:0,max:1,preciseMode:!0,rotateDegrees:180,value:c.delayTime}),Object(m.jsxs)("p",{children:[c.delayTime.toFixed(2),"sec"]})]}),Object(m.jsxs)("div",{className:"oscillator-tune-container",children:[Object(m.jsx)("h3",{className:"oscillator-title-small",children:"FEEDBACK"}),Object(m.jsx)(b.Knob,{onChange:function(e){var t=Object(d.a)({},r);t.gain=e,t.feedbackNode.gain.setValueAtTime(e,u.context.currentTime),l(t)},unlockDistance:10,min:0,max:.95,preciseMode:!0,rotateDegrees:180,value:r.gain}),Object(m.jsx)("p",{children:r.gain.toFixed(2)})]}),Object(m.jsxs)("div",{className:"oscillator-vol-container",children:[Object(m.jsx)("h3",{className:"oscillator-title-small",children:"CUTOFF"}),Object(m.jsx)(b.Knob,{onChange:function(e){var t=Object(d.a)({},O);t.frequency=e,t.filterNode.frequency.setValueAtTime(e,u.context.currentTime),x(t)},unlockDistance:10,preciseMode:!0,min:0,max:4e3,rotateDegrees:180,value:O.frequency}),Object(m.jsxs)("p",{children:[Math.round(O.frequency),"hz"]})]}),Object(m.jsx)("h3",{onClick:function(){f?(v(!1),c.delayNode.disconnect(u.context.destination)):(v(!0),c.delayNode.connect(u.context.destination))},children:f?"Turn Off":"Turn On"})]}):null},x=function(){var e=Object(n.useState)(),t=Object(s.a)(e,2),c=t[0],a=t[1];Object(n.useEffect)((function(){!function(){var e=u.context.createBiquadFilter();e.frequency.value=1e3,e.type="lowpass",e.Q.value=1,u.masterGainNode.connect(e),e.connect(u.context.destination);var t={frequency:e.frequency.value,type:e.type,Q:e.Q.value,filterNode:e};a(t)}()}),[]);return void 0===c?null:Object(m.jsxs)("div",{className:"oscillator-container",children:[Object(m.jsx)("h1",{className:"oscillator-title",children:"FILTER"}),Object(m.jsxs)("div",{className:"oscillator-tune-container",children:[Object(m.jsx)("h3",{className:"oscillator-title-small",children:"CUTOFF"}),Object(m.jsx)(b.Knob,{onChange:function(e){var t=Object(d.a)({},c);t.filterNode.frequency.value=e,t.frequency=e,a(t)},unlockDistance:10,min:0,max:4e3,preciseMode:!0,rotateDegrees:180,value:c.frequency}),Object(m.jsxs)("p",{children:[Math.round(c.frequency),"hz"]})]}),Object(m.jsxs)("div",{className:"oscillator-tune-container",children:[Object(m.jsx)("h3",{className:"oscillator-title-small",children:"RES"}),Object(m.jsx)(b.Knob,{onChange:function(e){console.log(c);var t=Object(d.a)({},c);t.filterNode.Q.value=e,t.Q=e,a(t)},unlockDistance:10,min:.01,max:15,preciseMode:!0,rotateDegrees:180,value:c.Q}),Object(m.jsx)("p",{children:c.Q.toFixed(2)})]}),Object(m.jsxs)("div",{className:"oscillator-vol-container",children:[Object(m.jsx)("h3",{className:"oscillator-title-small",children:"TYPE"}),Object(m.jsx)(b.Knob,{onChange:function(e){var t=Math.round(e),n=Object(d.a)({},c);switch(t){case 1:n.filterNode.type="lowpass",n.type="lowpass";break;case 2:n.filterNode.type="highpass",n.type="highpass";break;case 3:n.filterNode.type="bandpass",n.type="bandpass";break;default:n.filterNode.type="lowpass",n.type="lowpass"}a(n)},unlockDistance:10,preciseMode:!0,min:1,max:4,rotateDegrees:180,value:function(){switch(c.type){case"lowpass":return 1;case"highpass":return 2;case"bandpass":return 3;default:return 1}}()}),Object(m.jsx)("p",{children:c.type})]})]})},N=function(){var e=c(24),t=Object(n.useState)(),a=Object(s.a)(t,2),i=a[0],o=a[1],r=Object(n.useState)(!1),l=Object(s.a)(r,2),j=l[0],h=l[1];Object(n.useEffect)((function(){!function(){var t=e(u.context);t.time=5,t.wet.value=.8,t.dry.value=1,t.filterType="lowpass",t.cutoff.value=4e3,u.masterGainNode.connect(t),o({decay:5,wet:.8,dry:1,reverbNode:t})}()}),[]);return void 0===i?null:Object(m.jsxs)("div",{className:"oscillator-container",children:[Object(m.jsx)("h1",{className:"oscillator-title",children:"REVERB"}),Object(m.jsxs)("div",{className:"oscillator-tune-container",children:[Object(m.jsx)("h3",{className:"oscillator-title-small",children:"DECAY"}),Object(m.jsx)(b.Knob,{onChange:function(e){var t=Object(d.a)({},i);t.reverbNode.time=e,t.decay=e,o(t)},unlockDistance:10,min:0,max:10,preciseMode:!0,rotateDegrees:220,value:i.decay}),Object(m.jsxs)("p",{children:[Math.round(i.decay),"sec"]})]}),Object(m.jsxs)("div",{className:"oscillator-tune-container",children:[Object(m.jsx)("h3",{className:"oscillator-title-small",children:"WET"}),Object(m.jsx)(b.Knob,{onChange:function(e){var t=Object(d.a)({},i);t.reverbNode.wet.value=e,t.wet=e,o(t)},unlockDistance:10,min:0,max:1,preciseMode:!0,rotateDegrees:220,value:i.wet}),Object(m.jsx)("p",{children:i.wet.toFixed(2)})]}),Object(m.jsxs)("div",{className:"oscillator-vol-container",children:[Object(m.jsx)("h3",{className:"oscillator-title-small",children:"DRY"}),Object(m.jsx)(b.Knob,{onChange:function(e){var t=Object(d.a)({},i);t.reverbNode.dry.value=e,t.dry=e,o(t)},unlockDistance:10,preciseMode:!0,min:0,max:1,rotateDegrees:220,value:i.dry}),Object(m.jsx)("p",{children:i.dry.toFixed(2)})]}),Object(m.jsx)("h3",{onClick:function(){j?(h(!1),i.reverbNode.disconnect(u.context.destination)):(h(!0),i.reverbNode.connect(u.context.destination))},children:j?"Turn Off":"Turn On"})]})},y=c(9),f=(c(29),c(30),function(){var e=Object(n.useState)(!1),t=Object(s.a)(e,2),c=t[0],a=t[1],i=y.a.fromNote("c3"),o=y.a.fromNote("c5"),r=[{key:"z",midiNumber:48},{key:"s",midiNumber:49},{key:"x",midiNumber:50},{key:"d",midiNumber:51},{key:"c",midiNumber:52},{key:"v",midiNumber:53},{key:"g",midiNumber:54},{key:"b",midiNumber:55},{key:"h",midiNumber:56},{key:"n",midiNumber:57},{key:"j",midiNumber:58},{key:"m",midiNumber:59},{key:"q",midiNumber:60},{key:"2",midiNumber:61},{key:"w",midiNumber:62},{key:"3",midiNumber:63},{key:"e",midiNumber:64},{key:"r",midiNumber:65},{key:"5",midiNumber:66},{key:"t",midiNumber:67},{key:"6",midiNumber:68},{key:"y",midiNumber:69},{key:"7",midiNumber:70},{key:"u",midiNumber:71},{key:"i",midiNumber:72}],l=new Map([[48,130.8],[49,138.6],[50,146.8],[51,155.6],[52,164.8],[53,174.61],[54,185],[55,196],[56,207.65],[57,220],[58,233.08],[59,246.9],[60,262],[61,277.2],[62,293.7],[63,311.2],[64,329.7],[65,349.3],[66,370.1],[67,392.1],[68,415.4],[69,440],[70,466.1],[71,493.8],[72,523.2]]),d=Object(n.useState)(.5),j=Object(s.a)(d,2),f=j[0],v=j[1],p=Object(n.useState)({playNote:null,stopNote:null}),g=Object(s.a)(p,2),k=g[0],T=g[1];var w=function(e){v(Math.round(e)/100),u.masterGainNode.gain.setValueAtTime(Math.round(e)/100,u.context.currentTime)};return!1===c?Object(m.jsx)("div",{className:"App",children:Object(m.jsxs)("div",{className:"splash-screen",children:[Object(m.jsx)("h1",{children:"Moms.On.My.Synth"}),Object(m.jsx)("p",{onClick:function(){return a(!0),u.masterGainNode.connect(u.context.destination),void u.masterGainNode.gain.setValueAtTime(.2,u.context.currentTime)},children:"Click here to start"})]})}):Object(m.jsxs)("div",{className:"App",children:[Object(m.jsxs)("div",{className:"top-row",children:[Object(m.jsx)(h,{oscNum:1,play:k}),Object(m.jsx)(h,{oscNum:2,play:k}),Object(m.jsx)(h,{oscNum:3,play:k}),Object(m.jsx)(x,{}),Object(m.jsx)(O,{}),Object(m.jsx)(N,{}),Object(m.jsxs)("div",{className:"master-volume-container",children:[Object(m.jsx)("h1",{className:"oscillator-title",children:"MASTER VOL"}),Object(m.jsx)(b.Knob,{onChange:w,unlockDistance:10,preciseMode:!0,min:0,max:100,rotateDegrees:225,value:100*f}),Object(m.jsx)("p",{children:Math.round(100*f)})]})]}),Object(m.jsx)("div",{className:"bottom-row",children:Object(m.jsx)("div",{className:"piano-container",children:Object(m.jsx)(y.b,{noteRange:{first:i,last:o},playNote:function(e){console.log(e),function(e){T({playNote:e,frequency:l.get(e),stopNote:null})}(e)},stopNote:function(e){T({stopNote:e,playNote:null})},keyboardShortcuts:r})})})]})}),v=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,32)).then((function(t){var c=t.getCLS,n=t.getFID,a=t.getFCP,i=t.getLCP,o=t.getTTFB;c(e),n(e),a(e),i(e),o(e)}))};o.a.render(Object(m.jsx)(a.a.StrictMode,{children:Object(m.jsx)(f,{})}),document.getElementById("root")),v()},7:function(e,t,c){}},[[31,1,2]]]);
//# sourceMappingURL=main.aca9a890.chunk.js.map