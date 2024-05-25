export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["beams.jpg","favicon.png","fonts/AbrilFatface.ttf","fonts/PlayfairDisplay-Italic.ttf","fonts/Quicksand.ttf","fonts/SpaceGrotesk.ttf"]),
	mimeTypes: {".jpg":"image/jpeg",".png":"image/png",".ttf":"font/ttf"},
	_: {
		client: {"start":"_app/immutable/entry/start.CEmXhopi.js","app":"_app/immutable/entry/app.gi8Uk1tv.js","imports":["_app/immutable/entry/start.CEmXhopi.js","_app/immutable/chunks/entry.VIbE_Nhl.js","_app/immutable/chunks/scheduler.uoSMR5Ut.js","_app/immutable/chunks/index.DJ8iOWEq.js","_app/immutable/entry/app.gi8Uk1tv.js","_app/immutable/chunks/scheduler.uoSMR5Ut.js","_app/immutable/chunks/index.C5qq0cey.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js')),
			__memo(() => import('../output/server/nodes/5.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/games/[slug]",
				pattern: /^\/games\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/games/[slug]/admin",
				pattern: /^\/games\/([^/]+?)\/admin\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/games/[slug]/join",
				pattern: /^\/games\/([^/]+?)\/join\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
