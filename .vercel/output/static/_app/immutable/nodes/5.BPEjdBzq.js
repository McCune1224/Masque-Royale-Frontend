import{s as b,n as h}from"../chunks/scheduler.uoSMR5Ut.js";import{S as x,i as k,e as c,s as C,c as m,a as v,f as S,d as n,n as o,g as d,h as f,m as H,t as u,b as _,j as I}from"../chunks/index.C5qq0cey.js";import{g as E}from"../chunks/ProgressBar.svelte_svelte_type_style_lang.BUHJqjdN.js";function g(i){let e,r="Return to Home Page";return{c(){e=c("a"),e.textContent=r,this.h()},l(t){e=m(t,"A",{class:!0,href:!0,"data-svelte-h":!0}),H(e)!=="svelte-1u1uj9r"&&(e.textContent=r),this.h()},h(){o(e,"class","btn btn-md variant-filled-surface"),o(e,"href","/")},m(t,a){d(t,e,a)},d(t){t&&n(e)}}}function p(i){let e,r,t=i[0].game.id+"",a;return{c(){e=c("h1"),r=u("Hello from "),a=u(t),this.h()},l(s){e=m(s,"H1",{class:!0});var l=v(e);r=_(l,"Hello from "),a=_(l,t),l.forEach(n),this.h()},h(){o(e,"class","h1")},m(s,l){d(s,e,l),f(e,r),f(e,a)},p(s,l){l&1&&t!==(t=s[0].game.id+"")&&I(a,t)},d(s){s&&n(e)}}}function j(i){let e,r,t=i[0].error&&g(),a=i[0].game&&p(i);return{c(){e=c("section"),t&&t.c(),r=C(),a&&a.c(),this.h()},l(s){e=m(s,"SECTION",{class:!0});var l=v(e);t&&t.l(l),r=S(l),a&&a.l(l),l.forEach(n),this.h()},h(){o(e,"class","container h-full mx-auto flex flex-col gap-4 px-4 sm:px-0")},m(s,l){d(s,e,l),t&&t.m(e,null),f(e,r),a&&a.m(e,null)},p(s,[l]){s[0].error?t||(t=g(),t.c(),t.m(e,r)):t&&(t.d(1),t=null),s[0].game?a?a.p(s,l):(a=p(s),a.c(),a.m(e,null)):a&&(a.d(1),a=null)},i:h,o:h,d(s){s&&n(e),t&&t.d(),a&&a.d()}}}function y(i,e,r){let{data:t}=e;const a=E();return t.error&&(console.log(t.error),a.trigger({message:"Invalid Game ID "+t.gameId,background:"variant-filled-error"})),i.$$set=s=>{"data"in s&&r(0,t=s.data)},[t]}class A extends x{constructor(e){super(),k(this,e,y,j,b,{data:0})}}export{A as component};