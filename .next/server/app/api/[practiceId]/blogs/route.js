/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/[practiceId]/blogs/route";
exports.ids = ["app/api/[practiceId]/blogs/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2F%5BpracticeId%5D%2Fblogs%2Froute&page=%2Fapi%2F%5BpracticeId%5D%2Fblogs%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2F%5BpracticeId%5D%2Fblogs%2Froute.js&appDir=%2Fhome%2Fmatt%2Flumina-blue-redo-react%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fmatt%2Flumina-blue-redo-react&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2F%5BpracticeId%5D%2Fblogs%2Froute&page=%2Fapi%2F%5BpracticeId%5D%2Fblogs%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2F%5BpracticeId%5D%2Fblogs%2Froute.js&appDir=%2Fhome%2Fmatt%2Flumina-blue-redo-react%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fmatt%2Flumina-blue-redo-react&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_matt_lumina_blue_redo_react_src_app_api_practiceId_blogs_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/[practiceId]/blogs/route.js */ \"(rsc)/./src/app/api/[practiceId]/blogs/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/[practiceId]/blogs/route\",\n        pathname: \"/api/[practiceId]/blogs\",\n        filename: \"route\",\n        bundlePath: \"app/api/[practiceId]/blogs/route\"\n    },\n    resolvedPagePath: \"/home/matt/lumina-blue-redo-react/src/app/api/[practiceId]/blogs/route.js\",\n    nextConfigOutput,\n    userland: _home_matt_lumina_blue_redo_react_src_app_api_practiceId_blogs_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkYlNUJwcmFjdGljZUlkJTVEJTJGYmxvZ3MlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRiU1QnByYWN0aWNlSWQlNUQlMkZibG9ncyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRiU1QnByYWN0aWNlSWQlNUQlMkZibG9ncyUyRnJvdXRlLmpzJmFwcERpcj0lMkZob21lJTJGbWF0dCUyRmx1bWluYS1ibHVlLXJlZG8tcmVhY3QlMkZzcmMlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRmhvbWUlMkZtYXR0JTJGbHVtaW5hLWJsdWUtcmVkby1yZWFjdCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDeUI7QUFDdEc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9ob21lL21hdHQvbHVtaW5hLWJsdWUtcmVkby1yZWFjdC9zcmMvYXBwL2FwaS9bcHJhY3RpY2VJZF0vYmxvZ3Mvcm91dGUuanNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL1twcmFjdGljZUlkXS9ibG9ncy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL1twcmFjdGljZUlkXS9ibG9nc1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvW3ByYWN0aWNlSWRdL2Jsb2dzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL2hvbWUvbWF0dC9sdW1pbmEtYmx1ZS1yZWRvLXJlYWN0L3NyYy9hcHAvYXBpL1twcmFjdGljZUlkXS9ibG9ncy9yb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2F%5BpracticeId%5D%2Fblogs%2Froute&page=%2Fapi%2F%5BpracticeId%5D%2Fblogs%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2F%5BpracticeId%5D%2Fblogs%2Froute.js&appDir=%2Fhome%2Fmatt%2Flumina-blue-redo-react%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fmatt%2Flumina-blue-redo-react&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./src/app/api/[practiceId]/blogs/route.js":
/*!*************************************************!*\
  !*** ./src/app/api/[practiceId]/blogs/route.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\nasync function GET(request, { params }) {\n    // Await the params object before destructuring\n    const { practiceId } = await Promise.resolve(params);\n    try {\n        // First, fetch global blogs (where practice_id is null)\n        const globalBlogsResponse = await fetch('https://www.eyecareportal.com/api/blogs', {\n            headers: {\n                'Content-Type': 'application/json'\n            }\n        });\n        if (!globalBlogsResponse.ok) {\n            throw new Error(`Failed to fetch global blogs: ${globalBlogsResponse.statusText}`);\n        }\n        let globalBlogs = await globalBlogsResponse.json();\n        globalBlogs = Array.isArray(globalBlogs) ? globalBlogs : [];\n        // Then fetch practice-specific blogs\n        const practiceBlogsResponse = await fetch(`https://www.eyecareportal.com/api/blogs?practice_id=${practiceId}`, {\n            headers: {\n                'Content-Type': 'application/json'\n            }\n        });\n        let practiceBlogs = [];\n        if (practiceBlogsResponse.ok) {\n            const data = await practiceBlogsResponse.json();\n            practiceBlogs = Array.isArray(data) ? data : [];\n        } else if (practiceBlogsResponse.status !== 404) {\n            // Only throw error if it's not a 404 (which might mean no blogs for this practice)\n            throw new Error(`Failed to fetch practice blogs: ${practiceBlogsResponse.statusText}`);\n        }\n        // Combine both global and practice-specific blogs\n        const allBlogs = [\n            ...globalBlogs,\n            ...practiceBlogs\n        ];\n        // Filter out any non-visible blogs\n        const filteredBlogs = allBlogs.filter((blog)=>{\n            if (!blog) return false;\n            return blog.show === true;\n        });\n        // Add URLs to all blogs\n        const blogsWithUrls = filteredBlogs.map((blog)=>({\n                ...blog,\n                url: `/${practiceId}/blog/${blog.id}`\n            }));\n        // Sort by date (newest first)\n        const sortedBlogs = [\n            ...blogsWithUrls\n        ].sort((a, b)=>{\n            return new Date(b.date) - new Date(a.date);\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(sortedBlogs);\n    } catch (error) {\n        console.error('[Blogs API] Unhandled error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Internal server error',\n            message: error.message,\n            stack:  true ? error.stack : 0\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9bcHJhY3RpY2VJZF0vYmxvZ3Mvcm91dGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBMkM7QUFFcEMsZUFBZUMsSUFBSUMsT0FBTyxFQUFFLEVBQUVDLE1BQU0sRUFBRTtJQUMzQywrQ0FBK0M7SUFDL0MsTUFBTSxFQUFFQyxVQUFVLEVBQUUsR0FBRyxNQUFNQyxRQUFRQyxPQUFPLENBQUNIO0lBRTdDLElBQUk7UUFDRix3REFBd0Q7UUFDeEQsTUFBTUksc0JBQXNCLE1BQU1DLE1BQU0sMkNBQTJDO1lBQ2pGQyxTQUFTO2dCQUFFLGdCQUFnQjtZQUFtQjtRQUNoRDtRQUVBLElBQUksQ0FBQ0Ysb0JBQW9CRyxFQUFFLEVBQUU7WUFDM0IsTUFBTSxJQUFJQyxNQUFNLENBQUMsOEJBQThCLEVBQUVKLG9CQUFvQkssVUFBVSxFQUFFO1FBQ25GO1FBRUEsSUFBSUMsY0FBYyxNQUFNTixvQkFBb0JPLElBQUk7UUFDaERELGNBQWNFLE1BQU1DLE9BQU8sQ0FBQ0gsZUFBZUEsY0FBYyxFQUFFO1FBRTNELHFDQUFxQztRQUNyQyxNQUFNSSx3QkFBd0IsTUFBTVQsTUFBTSxDQUFDLG9EQUFvRCxFQUFFSixZQUFZLEVBQUU7WUFDN0dLLFNBQVM7Z0JBQUUsZ0JBQWdCO1lBQW1CO1FBQ2hEO1FBRUEsSUFBSVMsZ0JBQWdCLEVBQUU7UUFDdEIsSUFBSUQsc0JBQXNCUCxFQUFFLEVBQUU7WUFDNUIsTUFBTVMsT0FBTyxNQUFNRixzQkFBc0JILElBQUk7WUFDN0NJLGdCQUFnQkgsTUFBTUMsT0FBTyxDQUFDRyxRQUFRQSxPQUFPLEVBQUU7UUFDakQsT0FBTyxJQUFJRixzQkFBc0JHLE1BQU0sS0FBSyxLQUFLO1lBQy9DLG1GQUFtRjtZQUNuRixNQUFNLElBQUlULE1BQU0sQ0FBQyxnQ0FBZ0MsRUFBRU0sc0JBQXNCTCxVQUFVLEVBQUU7UUFDdkY7UUFFQSxrREFBa0Q7UUFDbEQsTUFBTVMsV0FBVztlQUFJUjtlQUFnQks7U0FBYztRQUVuRCxtQ0FBbUM7UUFDbkMsTUFBTUksZ0JBQWdCRCxTQUFTRSxNQUFNLENBQUNDLENBQUFBO1lBQ3BDLElBQUksQ0FBQ0EsTUFBTSxPQUFPO1lBQ2xCLE9BQU9BLEtBQUtDLElBQUksS0FBSztRQUN2QjtRQUVBLHdCQUF3QjtRQUN4QixNQUFNQyxnQkFBZ0JKLGNBQWNLLEdBQUcsQ0FBQ0gsQ0FBQUEsT0FBUztnQkFDL0MsR0FBR0EsSUFBSTtnQkFDUEksS0FBSyxDQUFDLENBQUMsRUFBRXhCLFdBQVcsTUFBTSxFQUFFb0IsS0FBS0ssRUFBRSxFQUFFO1lBQ3ZDO1FBRUEsOEJBQThCO1FBQzlCLE1BQU1DLGNBQWM7ZUFBSUo7U0FBYyxDQUFDSyxJQUFJLENBQUMsQ0FBQ0MsR0FBR0M7WUFDOUMsT0FBTyxJQUFJQyxLQUFLRCxFQUFFRSxJQUFJLElBQUksSUFBSUQsS0FBS0YsRUFBRUcsSUFBSTtRQUMzQztRQUVBLE9BQU9uQyxxREFBWUEsQ0FBQ2MsSUFBSSxDQUFDZ0I7SUFDM0IsRUFBRSxPQUFPTSxPQUFPO1FBQ2RDLFFBQVFELEtBQUssQ0FBQyxnQ0FBZ0NBO1FBQzlDLE9BQU9wQyxxREFBWUEsQ0FBQ2MsSUFBSSxDQUN0QjtZQUNFc0IsT0FBTztZQUNQRSxTQUFTRixNQUFNRSxPQUFPO1lBQ3RCQyxPQUFPQyxLQUFzQyxHQUFHSixNQUFNRyxLQUFLLEdBQUdFLENBQVNBO1FBQ3pFLEdBQ0E7WUFBRXJCLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyIvaG9tZS9tYXR0L2x1bWluYS1ibHVlLXJlZG8tcmVhY3Qvc3JjL2FwcC9hcGkvW3ByYWN0aWNlSWRdL2Jsb2dzL3JvdXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXF1ZXN0LCB7IHBhcmFtcyB9KSB7XG4gIC8vIEF3YWl0IHRoZSBwYXJhbXMgb2JqZWN0IGJlZm9yZSBkZXN0cnVjdHVyaW5nXG4gIGNvbnN0IHsgcHJhY3RpY2VJZCB9ID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKHBhcmFtcyk7XG4gIFxuICB0cnkge1xuICAgIC8vIEZpcnN0LCBmZXRjaCBnbG9iYWwgYmxvZ3MgKHdoZXJlIHByYWN0aWNlX2lkIGlzIG51bGwpXG4gICAgY29uc3QgZ2xvYmFsQmxvZ3NSZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL3d3dy5leWVjYXJlcG9ydGFsLmNvbS9hcGkvYmxvZ3MnLCB7XG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICB9KTtcblxuICAgIGlmICghZ2xvYmFsQmxvZ3NSZXNwb25zZS5vaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gZmV0Y2ggZ2xvYmFsIGJsb2dzOiAke2dsb2JhbEJsb2dzUmVzcG9uc2Uuc3RhdHVzVGV4dH1gKTtcbiAgICB9XG4gICAgXG4gICAgbGV0IGdsb2JhbEJsb2dzID0gYXdhaXQgZ2xvYmFsQmxvZ3NSZXNwb25zZS5qc29uKCk7XG4gICAgZ2xvYmFsQmxvZ3MgPSBBcnJheS5pc0FycmF5KGdsb2JhbEJsb2dzKSA/IGdsb2JhbEJsb2dzIDogW107XG5cbiAgICAvLyBUaGVuIGZldGNoIHByYWN0aWNlLXNwZWNpZmljIGJsb2dzXG4gICAgY29uc3QgcHJhY3RpY2VCbG9nc1Jlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vd3d3LmV5ZWNhcmVwb3J0YWwuY29tL2FwaS9ibG9ncz9wcmFjdGljZV9pZD0ke3ByYWN0aWNlSWR9YCwge1xuICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgfSk7XG5cbiAgICBsZXQgcHJhY3RpY2VCbG9ncyA9IFtdO1xuICAgIGlmIChwcmFjdGljZUJsb2dzUmVzcG9uc2Uub2spIHtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBwcmFjdGljZUJsb2dzUmVzcG9uc2UuanNvbigpO1xuICAgICAgcHJhY3RpY2VCbG9ncyA9IEFycmF5LmlzQXJyYXkoZGF0YSkgPyBkYXRhIDogW107XG4gICAgfSBlbHNlIGlmIChwcmFjdGljZUJsb2dzUmVzcG9uc2Uuc3RhdHVzICE9PSA0MDQpIHtcbiAgICAgIC8vIE9ubHkgdGhyb3cgZXJyb3IgaWYgaXQncyBub3QgYSA0MDQgKHdoaWNoIG1pZ2h0IG1lYW4gbm8gYmxvZ3MgZm9yIHRoaXMgcHJhY3RpY2UpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBmZXRjaCBwcmFjdGljZSBibG9nczogJHtwcmFjdGljZUJsb2dzUmVzcG9uc2Uuc3RhdHVzVGV4dH1gKTtcbiAgICB9XG5cbiAgICAvLyBDb21iaW5lIGJvdGggZ2xvYmFsIGFuZCBwcmFjdGljZS1zcGVjaWZpYyBibG9nc1xuICAgIGNvbnN0IGFsbEJsb2dzID0gWy4uLmdsb2JhbEJsb2dzLCAuLi5wcmFjdGljZUJsb2dzXTtcbiAgICBcbiAgICAvLyBGaWx0ZXIgb3V0IGFueSBub24tdmlzaWJsZSBibG9nc1xuICAgIGNvbnN0IGZpbHRlcmVkQmxvZ3MgPSBhbGxCbG9ncy5maWx0ZXIoYmxvZyA9PiB7XG4gICAgICBpZiAoIWJsb2cpIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiBibG9nLnNob3cgPT09IHRydWU7XG4gICAgfSk7XG4gICAgXG4gICAgLy8gQWRkIFVSTHMgdG8gYWxsIGJsb2dzXG4gICAgY29uc3QgYmxvZ3NXaXRoVXJscyA9IGZpbHRlcmVkQmxvZ3MubWFwKGJsb2cgPT4gKHtcbiAgICAgIC4uLmJsb2csXG4gICAgICB1cmw6IGAvJHtwcmFjdGljZUlkfS9ibG9nLyR7YmxvZy5pZH1gXG4gICAgfSkpO1xuXG4gICAgLy8gU29ydCBieSBkYXRlIChuZXdlc3QgZmlyc3QpXG4gICAgY29uc3Qgc29ydGVkQmxvZ3MgPSBbLi4uYmxvZ3NXaXRoVXJsc10uc29ydCgoYSwgYikgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKGIuZGF0ZSkgLSBuZXcgRGF0ZShhLmRhdGUpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHNvcnRlZEJsb2dzKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdbQmxvZ3MgQVBJXSBVbmhhbmRsZWQgZXJyb3I6JywgZXJyb3IpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgIHsgXG4gICAgICAgIGVycm9yOiAnSW50ZXJuYWwgc2VydmVyIGVycm9yJywgXG4gICAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsXG4gICAgICAgIHN0YWNrOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JyA/IGVycm9yLnN0YWNrIDogdW5kZWZpbmVkXG4gICAgICB9LFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKTtcbiAgfVxufSJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJHRVQiLCJyZXF1ZXN0IiwicGFyYW1zIiwicHJhY3RpY2VJZCIsIlByb21pc2UiLCJyZXNvbHZlIiwiZ2xvYmFsQmxvZ3NSZXNwb25zZSIsImZldGNoIiwiaGVhZGVycyIsIm9rIiwiRXJyb3IiLCJzdGF0dXNUZXh0IiwiZ2xvYmFsQmxvZ3MiLCJqc29uIiwiQXJyYXkiLCJpc0FycmF5IiwicHJhY3RpY2VCbG9nc1Jlc3BvbnNlIiwicHJhY3RpY2VCbG9ncyIsImRhdGEiLCJzdGF0dXMiLCJhbGxCbG9ncyIsImZpbHRlcmVkQmxvZ3MiLCJmaWx0ZXIiLCJibG9nIiwic2hvdyIsImJsb2dzV2l0aFVybHMiLCJtYXAiLCJ1cmwiLCJpZCIsInNvcnRlZEJsb2dzIiwic29ydCIsImEiLCJiIiwiRGF0ZSIsImRhdGUiLCJlcnJvciIsImNvbnNvbGUiLCJtZXNzYWdlIiwic3RhY2siLCJwcm9jZXNzIiwidW5kZWZpbmVkIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/[practiceId]/blogs/route.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2F%5BpracticeId%5D%2Fblogs%2Froute&page=%2Fapi%2F%5BpracticeId%5D%2Fblogs%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2F%5BpracticeId%5D%2Fblogs%2Froute.js&appDir=%2Fhome%2Fmatt%2Flumina-blue-redo-react%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fmatt%2Flumina-blue-redo-react&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();