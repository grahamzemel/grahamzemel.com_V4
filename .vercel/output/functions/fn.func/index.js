globalThis.global = globalThis;
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key2, value) => {
  __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// .svelte-kit/output/server/chunks/index.js
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function set_current_component(component10) {
  current_component = component10;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function getContext(key2) {
  return get_current_component().$$.context.get(key2);
}
function escape(value, is_attr = false) {
  const str = String(value);
  const pattern2 = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern2.lastIndex = 0;
  let escaped2 = "";
  let last = 0;
  while (pattern2.test(str)) {
    const i = pattern2.lastIndex - 1;
    const ch = str[i];
    escaped2 += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped2 + str.substring(last);
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
function validate_component(component10, name2) {
  if (!component10 || !component10.$$render) {
    if (name2 === "svelte:component")
      name2 += " this={...}";
    throw new Error(`<${name2}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name2}>.`);
  }
  return component10;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      // these will be immediately discarded
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css3) => css3.code).join("\n"),
          map: null
          // TODO
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name2, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  const assignment = boolean && value === true ? "" : `="${escape(value, true)}"`;
  return ` ${name2}${assignment}`;
}
var current_component, ATTR_REGEX, CONTENT_REGEX, missing_component, on_destroy;
var init_chunks = __esm({
  ".svelte-kit/output/server/chunks/index.js"() {
    ATTR_REGEX = /[&"]/g;
    CONTENT_REGEX = /[&<]/g;
    missing_component = {
      $$render: () => ""
    };
  }
});

// .svelte-kit/output/server/chunks/hooks.server.js
var hooks_server_exports = {};
__export(hooks_server_exports, {
  handle: () => handle
});
async function handle({ event, resolve: resolve2 }) {
  if (event.url.pathname.startsWith("/admin")) {
    const cookies = event.request.headers.get("cookie") || "";
    const match = cookies.match(/gz_admin=([^;]+)/);
    const token = match ? match[1] : null;
    if (token !== ADMIN_TOKEN) {
      return new Response(null, {
        status: 302,
        headers: { location: "/" }
      });
    }
  }
  return resolve2(event);
}
var ADMIN_TOKEN;
var init_hooks_server = __esm({
  ".svelte-kit/output/server/chunks/hooks.server.js"() {
    ADMIN_TOKEN = "gz_admin_a8f3e7c2d1b9";
  }
});

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse3;
    exports.serialize = serialize2;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse3(str, options2) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options2 || {};
      var dec = opt.decode || decode;
      var index10 = 0;
      while (index10 < str.length) {
        var eqIdx = str.indexOf("=", index10);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(";", index10);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index10 = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var key2 = str.slice(index10, eqIdx).trim();
        if (void 0 === obj[key2]) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key2] = tryDecode(val, dec);
        }
        index10 = endIdx + 1;
      }
      return obj;
    }
    function serialize2(name2, val, options2) {
      var opt = options2 || {};
      var enc = opt.encode || encode2;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name2)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name2 + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function encode2(val) {
      return encodeURIComponent(val);
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]" || val instanceof Date;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// node_modules/set-cookie-parser/lib/set-cookie.js
var require_set_cookie = __commonJS({
  "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
    "use strict";
    var defaultParseOptions = {
      decodeValues: true,
      map: false,
      silent: false
    };
    function isNonEmptyString(str) {
      return typeof str === "string" && !!str.trim();
    }
    function parseString2(setCookieValue, options2) {
      var parts = setCookieValue.split(";").filter(isNonEmptyString);
      var nameValuePairStr = parts.shift();
      var parsed = parseNameValuePair(nameValuePairStr);
      var name2 = parsed.name;
      var value = parsed.value;
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      try {
        value = options2.decodeValues ? decodeURIComponent(value) : value;
      } catch (e) {
        console.error(
          "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
          e
        );
      }
      var cookie = {
        name: name2,
        value
      };
      parts.forEach(function(part) {
        var sides = part.split("=");
        var key2 = sides.shift().trimLeft().toLowerCase();
        var value2 = sides.join("=");
        if (key2 === "expires") {
          cookie.expires = new Date(value2);
        } else if (key2 === "max-age") {
          cookie.maxAge = parseInt(value2, 10);
        } else if (key2 === "secure") {
          cookie.secure = true;
        } else if (key2 === "httponly") {
          cookie.httpOnly = true;
        } else if (key2 === "samesite") {
          cookie.sameSite = value2;
        } else {
          cookie[key2] = value2;
        }
      });
      return cookie;
    }
    function parseNameValuePair(nameValuePairStr) {
      var name2 = "";
      var value = "";
      var nameValueArr = nameValuePairStr.split("=");
      if (nameValueArr.length > 1) {
        name2 = nameValueArr.shift();
        value = nameValueArr.join("=");
      } else {
        value = nameValuePairStr;
      }
      return { name: name2, value };
    }
    function parse3(input, options2) {
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      if (!input) {
        if (!options2.map) {
          return [];
        } else {
          return {};
        }
      }
      if (input.headers) {
        if (typeof input.headers.getSetCookie === "function") {
          input = input.headers.getSetCookie();
        } else if (input.headers["set-cookie"]) {
          input = input.headers["set-cookie"];
        } else {
          var sch = input.headers[Object.keys(input.headers).find(function(key2) {
            return key2.toLowerCase() === "set-cookie";
          })];
          if (!sch && input.headers.cookie && !options2.silent) {
            console.warn(
              "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
            );
          }
          input = sch;
        }
      }
      if (!Array.isArray(input)) {
        input = [input];
      }
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      if (!options2.map) {
        return input.filter(isNonEmptyString).map(function(str) {
          return parseString2(str, options2);
        });
      } else {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
          var cookie = parseString2(str, options2);
          cookies2[cookie.name] = cookie;
          return cookies2;
        }, cookies);
      }
    }
    function splitCookiesString2(cookiesString) {
      if (Array.isArray(cookiesString)) {
        return cookiesString;
      }
      if (typeof cookiesString !== "string") {
        return [];
      }
      var cookiesStrings = [];
      var pos = 0;
      var start;
      var ch;
      var lastComma;
      var nextStart;
      var cookiesSeparatorFound;
      function skipWhitespace() {
        while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
          pos += 1;
        }
        return pos < cookiesString.length;
      }
      function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
      }
      while (pos < cookiesString.length) {
        start = pos;
        cookiesSeparatorFound = false;
        while (skipWhitespace()) {
          ch = cookiesString.charAt(pos);
          if (ch === ",") {
            lastComma = pos;
            pos += 1;
            skipWhitespace();
            nextStart = pos;
            while (pos < cookiesString.length && notSpecialChar()) {
              pos += 1;
            }
            if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
              cookiesSeparatorFound = true;
              pos = nextStart;
              cookiesStrings.push(cookiesString.substring(start, lastComma));
              start = pos;
            } else {
              pos = lastComma + 1;
            }
          } else {
            pos += 1;
          }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
          cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
      }
      return cookiesStrings;
    }
    module.exports = parse3;
    module.exports.parse = parse3;
    module.exports.parseString = parseString2;
    module.exports.splitCookiesString = splitCookiesString2;
  }
});

// node_modules/@vercel/analytics/dist/index.js
function isBrowser() {
  return typeof window !== "undefined";
}
function detectEnvironment() {
  try {
    const env = "development";
    if (env === "development" || env === "test") {
      return "development";
    }
  } catch (e) {
  }
  return "production";
}
function setMode(mode = "auto") {
  if (mode === "auto") {
    window.vam = detectEnvironment();
    return;
  }
  window.vam = mode;
}
function getMode() {
  return window.vam || "production";
}
function isDevelopment() {
  return getMode() === "development";
}
function inject(props = {
  debug: true
}) {
  var _a;
  if (!isBrowser())
    return;
  setMode(props.mode);
  initQueue();
  if (props.beforeSend) {
    (_a = window.va) == null ? void 0 : _a.call(window, "beforeSend", props.beforeSend);
  }
  const src = isDevelopment() ? "https://va.vercel-scripts.com/v1/script.debug.js" : "/_vercel/insights/script.js";
  if (document.head.querySelector(`script[src*="${src}"]`))
    return;
  const script = document.createElement("script");
  script.src = src;
  script.defer = true;
  script.setAttribute("data-sdkn", name);
  script.setAttribute("data-sdkv", version);
  if (isDevelopment() && props.debug === false) {
    script.setAttribute("data-debug", "false");
  }
  document.head.appendChild(script);
}
var name, version, initQueue;
var init_dist = __esm({
  "node_modules/@vercel/analytics/dist/index.js"() {
    name = "@vercel/analytics";
    version = "1.0.1";
    initQueue = () => {
      if (window.va)
        return;
      window.va = function a(...params) {
        (window.vaq = window.vaq || []).push(params);
      };
    };
  }
});

// .svelte-kit/output/server/entries/pages/_layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => Layout
});
var css, Layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.svelte.js"() {
    init_chunks();
    init_dist();
    css = {
      code: "html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale\n}body{--tw-bg-opacity:1;background-color:rgb(18 18 23 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))\n}body *::-moz-selection{--tw-bg-opacity:1;background-color:rgb(51 255 124 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(0 0 0 / var(--tw-text-opacity))\n}body *::selection{--tw-bg-opacity:1;background-color:rgb(51 255 124 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(0 0 0 / var(--tw-text-opacity))\n}body::-moz-selection{--tw-bg-opacity:1;background-color:rgb(51 255 124 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(0 0 0 / var(--tw-text-opacity))\n}body::selection{--tw-bg-opacity:1;background-color:rgb(51 255 124 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(0 0 0 / var(--tw-text-opacity))\n}",
      map: null
    };
    Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      inject({ mode: "production" });
      $$result.css.add(css);
      return `${slots.default ? slots.default({}) : ``}

${$$result.head += `<!-- HEAD_svelte-trllss_START -->${$$result.title = `<title>Graham Zemel</title>`, ""}<link rel="canonical" href="https://grahamzemel.com/"><meta name="title" content="Graham Zemel"><meta name="description" content="Hello! I'm a full-stack developer, ethical hacker, and Director of Technology for IFC on the Hill at CU Boulder."><meta name="author" content="Graham Zemel"><meta property="og:title" content="Graham Zemel"><meta property="og:description" content="Hello! I'm a full-stack developer, ethical hacker, and Director of Technology for IFC on the Hill at CU Boulder."><meta property="og:url" content="https://grahamzemel.com/"><meta property="og:image" content="https://grahamzemel.com/og-img.png"><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url" content="https://grahamzemel.com/"><meta property="twitter:title" content="Graham Zemel"><meta property="twitter:description" content="Hello! I'm a full-stack developer, ethical hacker, and Director of Technology for IFC on the Hill at CU Boulder."><meta property="twitter:image" content="https://grahamzemel.com/og-img.png"><!-- HEAD_svelte-trllss_END -->`, ""}`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  component: () => component,
  fonts: () => fonts,
  imports: () => imports,
  index: () => index,
  stylesheets: () => stylesheets
});
var index, component_cache, component, imports, stylesheets, fonts;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    index = 0;
    component = async () => component_cache ?? (component_cache = (await Promise.resolve().then(() => (init_layout_svelte(), layout_svelte_exports))).default);
    imports = ["_app/immutable/nodes/0.83cf80a6.js", "_app/immutable/chunks/index.ba56c314.js"];
    stylesheets = ["_app/immutable/assets/0.a81151c3.css"];
    fonts = [];
  }
});

// .svelte-kit/output/server/chunks/stores.js
var getStores, page;
var init_stores = __esm({
  ".svelte-kit/output/server/chunks/stores.js"() {
    init_chunks();
    getStores = () => {
      const stores = getContext("__svelte__");
      return {
        /** @type {typeof page} */
        page: {
          subscribe: stores.page.subscribe
        },
        /** @type {typeof navigating} */
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        /** @type {typeof updated} */
        updated: stores.updated
      };
    };
    page = {
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
  }
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error2
});
var Error2;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    init_chunks();
    init_stores();
    Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      $$unsubscribe_page();
      return `<h1>${escape($page.status)}</h1>
<p>${escape($page.error?.message)}</p>`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  component: () => component2,
  fonts: () => fonts2,
  imports: () => imports2,
  index: () => index2,
  stylesheets: () => stylesheets2
});
var index2, component_cache2, component2, imports2, stylesheets2, fonts2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    index2 = 1;
    component2 = async () => component_cache2 ?? (component_cache2 = (await Promise.resolve().then(() => (init_error_svelte(), error_svelte_exports))).default);
    imports2 = ["_app/immutable/nodes/1.0b694f2c.js", "_app/immutable/chunks/index.ba56c314.js", "_app/immutable/chunks/stores.9ce819b5.js", "_app/immutable/chunks/singletons.a2923fce.js"];
    stylesheets2 = [];
    fonts2 = [];
  }
});

// .svelte-kit/output/server/entries/pages/admin/_layout.svelte.js
var layout_svelte_exports2 = {};
__export(layout_svelte_exports2, {
  default: () => Layout2
});
var Layout2;
var init_layout_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/admin/_layout.svelte.js"() {
    init_chunks();
    init_stores();
    Layout2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let currentPath;
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      const navItems = [
        { href: "/admin", label: "Overview" },
        { href: "/admin/income", label: "Income" },
        { href: "/admin/stripe", label: "Startups" },
        {
          href: "/admin/cashflow",
          label: "Cash Flow"
        },
        {
          href: "/admin/settings",
          label: "Settings"
        }
      ];
      currentPath = $page.url.pathname;
      $$unsubscribe_page();
      return `${$$result.head += `<!-- HEAD_svelte-13z1pv5_START --><link rel="manifest" href="/manifest.json"><meta name="theme-color" content="#111827"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><meta name="apple-mobile-web-app-title" content="Income Engine"><link rel="apple-touch-icon" href="/icons/icon-192.svg"><!-- HEAD_svelte-13z1pv5_END -->`, ""}


<div class="fixed inset-0 bg-[#fafafa] text-gray-900 overflow-y-auto z-50">
  <header class="bg-white border-b border-gray-200 sticky top-0 z-10"><div class="max-w-6xl mx-auto px-6 flex items-center justify-between h-14"><div class="flex items-center gap-8"><a href="/admin" class="text-sm font-semibold text-gray-900 tracking-tight">Income Engine</a>
        <nav class="flex gap-1">${each(navItems, (item) => {
        return `<a${add_attribute("href", item.href, 0)} class="${"px-3 py-1.5 rounded-md text-sm transition-colors " + escape(
          currentPath === item.href ? "bg-gray-100 text-gray-900 font-medium" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50",
          true
        )}">${escape(item.label)}
            </a>`;
      })}</nav></div>
      <div class="flex items-center gap-3">${``}
        ${``}
        <button class="text-xs text-gray-400 hover:text-gray-600 transition">Sign out
        </button></div></div></header>

  
  <main class="max-w-6xl mx-auto px-6 py-8">${slots.default ? slots.default({}) : ``}</main></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  component: () => component3,
  fonts: () => fonts3,
  imports: () => imports3,
  index: () => index3,
  stylesheets: () => stylesheets3
});
var index3, component_cache3, component3, imports3, stylesheets3, fonts3;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    index3 = 2;
    component3 = async () => component_cache3 ?? (component_cache3 = (await Promise.resolve().then(() => (init_layout_svelte2(), layout_svelte_exports2))).default);
    imports3 = ["_app/immutable/nodes/2.ad8bd146.js", "_app/immutable/chunks/index.ba56c314.js", "_app/immutable/chunks/stores.9ce819b5.js", "_app/immutable/chunks/singletons.a2923fce.js", "_app/immutable/chunks/api.1b4253c7.js"];
    stylesheets3 = [];
    fonts3 = [];
  }
});

// .svelte-kit/output/server/entries/pages/_page.svelte.js
var page_svelte_exports = {};
__export(page_svelte_exports, {
  default: () => Page
});
var BackgroundBlob, css$8, Hero, BookMeeting, css$7, BookMeetingButton, css$6, Socials, Visibility, css$5, AboutSection, css$4, FeaturedProjects, css$3, Blog, css$2, ProjectsGrid, css$1, Work, Footer, css2, GetInTouch, Page;
var init_page_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_page.svelte.js"() {
    init_chunks();
    BackgroundBlob = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return ``;
    });
    css$8 = {
      code: '@media(min-width: 640px){}.hero-title.svelte-i4ssko{font-family:Source Serif Pro, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;font-size:3.75rem;line-height:1;font-weight:700}@media(min-width: 640px){.hero-title.svelte-i4ssko{font-size:6rem;line-height:1}}.hero-subtitle.svelte-i4ssko{margin-top:2rem;font-size:1.25rem;line-height:1.75rem;font-weight:300}@media(min-width: 640px){.hero-subtitle.svelte-i4ssko{font-size:1.5rem;line-height:2rem}}.hero-subbertitle.svelte-i4ssko{margin-top:2rem;font-size:1.125rem;line-height:1.75rem;font-weight:300}@media(min-width: 640px){.hero-subbertitle.svelte-i4ssko{font-size:1.125rem;line-height:1.75rem}}.hero-role.svelte-i4ssko{margin-top:1rem;font-size:1.125rem;line-height:1.75rem;font-weight:300}@media(min-width: 640px){.hero-role.svelte-i4ssko{font-size:1.25rem;line-height:1.75rem}}a.svelte-i4ssko:hover{background-image:linear-gradient(to right, var(--tw-gradient-stops));--tw-gradient-from:#34F8FF var(--tw-gradient-from-position);--tw-gradient-from-position:  ;--tw-gradient-to:rgb(52 248 255 / 0)  var(--tw-gradient-from-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to);--tw-gradient-to:#110DFF var(--tw-gradient-to-position);--tw-gradient-to-position:  ;-webkit-background-clip:text;background-clip:text;color:transparent;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}.custom-fade-in.svelte-i4ssko{animation:svelte-i4ssko-fade-in-animation 1000ms cubic-bezier(0.4, 0, 0.2, 1);animation-fill-mode:both}.anim-delay-500.svelte-i4ssko{animation-delay:500ms}.anim-delay-900.svelte-i4ssko{animation-delay:900ms}@keyframes svelte-i4ssko-fade-in-animation{0%{opacity:0}100%{opacity:100%}}',
      map: null
    };
    Hero = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$8);
      return `<section class="mt-32 md:mt-64"><div class="hero-title custom-fade-in anim-delay-500 svelte-i4ssko" data-admin-mobile-trigger="name">Graham Zemel</div>

  <p class="hero-subtitle custom-fade-in anim-delay-900 svelte-i4ssko">Full Stack Developer | Artificial Intelligence | Ethical Hacking
  </p>
  <p class="hero-role custom-fade-in anim-delay-900 svelte-i4ssko">Director of Technology, <a href="https://ifconthehill.org" class="svelte-i4ssko">IFC on the Hill</a>
    (CU Boulder)
  </p>
  <p class="hero-subbertitle custom-fade-in anim-delay-900 svelte-i4ssko"><a href="https://grahamzemel.com" class="svelte-i4ssko">grahamzemel.com</a></p>
</section>`;
    });
    BookMeeting = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { showModal = false } = $$props;
      if ($$props.showModal === void 0 && $$bindings.showModal && showModal !== void 0)
        $$bindings.showModal(showModal);
      return `${showModal ? `<div class="fixed inset-0 z-10 bg-secondary-700/30"></div>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0"><div class="mx-auto overflow-x-hidden rounded-lg bg-[#101010] shadow-xl w-full h-full md:max-w-[85vw] md:max-h-[85vh]"><div class="relative p-6"><button type="button" class="absolute top-4 right-4 rounded-lg p-1 text-center font-medium text-secondary-500 transition-all hover:bg-secondary-100"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path></svg></button>

        <h3 class="text-lg font-medium text-secondary-900">Book a meeting</h3>

        <div class="flex justify-center"><iframe title="Cal.com" class="mt-6 mb-3 w-full max-w-[95vw] md:max-w-[80vw] h-[800px] overflow-auto" src="https://app.cal.com/grahamzemel/quick-chat" frameborder="0"></iframe></div></div></div></div>` : ``}`;
    });
    css$7 = {
      code: ".meet-button.svelte-11pczf3{position:absolute;height:4rem;width:16rem;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));cursor:pointer;align-items:center;overflow:hidden;border-radius:0.75rem;background-image:linear-gradient(to bottom right, var(--tw-gradient-stops));--tw-gradient-from:#3377FF var(--tw-gradient-from-position);--tw-gradient-from-position:  ;--tw-gradient-to:rgb(51 119 255 / 0)  var(--tw-gradient-from-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to);--tw-gradient-to:#0C55FF var(--tw-gradient-to-position);--tw-gradient-to-position:  ;--tw-shadow:0 25px 50px -12px rgb(0 0 0 / 0.25);--tw-shadow-colored:0 25px 50px -12px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:300ms;transition-timing-function:cubic-bezier(0, 0, 0.2, 1)\n}.meet-button.svelte-11pczf3:hover{--tw-scale-x:1.1;--tw-scale-y:1.05;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))\n}",
      map: null
    };
    BookMeetingButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { noMargin = false } = $$props;
      let showModal = false;
      if ($$props.noMargin === void 0 && $$bindings.noMargin && noMargin !== void 0)
        $$bindings.noMargin(noMargin);
      $$result.css.add(css$7);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        $$rendered = `${validate_component(BookMeeting, "BookMeeting").$$render(
          $$result,
          { showModal },
          {
            showModal: ($$value) => {
              showModal = $$value;
              $$settled = false;
            }
          },
          {}
        )}

<button class="${"h-16 w-64 flex justify-center items-center " + escape(noMargin ? "" : "mt-10", true)}"><div class="meet-button svelte-11pczf3"></div>
  <div class="text-center text-white font-semibold z-10 pointer-events-none flex justify-content items-center"><svg class="w-5 h-5 right-1.5 relative" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192zM224 248c13.3 0 24 10.7 24 24v56h56c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v56c0 13.3-10.7 24-24 24s-24-10.7-24-24V376H144c-13.3 0-24-10.7-24-24s10.7-24 24-24h56V272c0-13.3 10.7-24 24-24z"></path></svg>
    <span class="ml-2">Book a meeting</span></div>
</button>`;
      } while (!$$settled);
      return $$rendered;
    });
    css$6 = {
      code: ".socials-row.svelte-1l07cqj{margin-top:2.5rem;display:flex;-webkit-user-select:none;-moz-user-select:none;user-select:none;align-items:center;gap:1rem}@media(min-width: 768px){.socials-row.svelte-1l07cqj{position:fixed;bottom:8rem;left:0px;z-index:30;margin-left:-2rem;--tw-rotate:-90deg;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));flex-direction:row;align-items:flex-end;gap:1.25rem}}.email.svelte-1l07cqj{display:flex;font-size:1.25rem;line-height:1.75rem;font-weight:400;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}@media(min-width: 768px){.email.svelte-1l07cqj{position:fixed;bottom:8rem;right:0px;z-index:30;margin-right:-2rem;--tw-rotate:90deg;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));flex-direction:row;align-items:flex-end;gap:1.25rem;font-size:1.125rem;line-height:1.75rem;font-weight:300}}.icon.svelte-1l07cqj{height:1.25rem;width:1.25rem;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}@media(min-width: 768px){.icon.svelte-1l07cqj{--tw-rotate:90deg;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}}a.svelte-1l07cqj{cursor:pointer;border-radius:9999px;border-width:2px;--tw-border-opacity:1;border-color:rgb(42 60 81 / var(--tw-border-opacity));padding:0.5rem}a.svelte-1l07cqj:hover{--tw-border-opacity:1;border-color:rgb(51 119 255 / var(--tw-border-opacity))}@media(min-width: 768px){a.svelte-1l07cqj{border-style:none;padding:0px}}.no-border.svelte-1l07cqj{border-style:none;padding:0px}.icon.svelte-1l07cqj:hover{--tw-text-opacity:1;color:rgb(51 119 255 / var(--tw-text-opacity))}.email.svelte-1l07cqj:hover{--tw-text-opacity:1;color:rgb(51 119 255 / var(--tw-text-opacity))}.custom-fade-in-socials.svelte-1l07cqj{animation:svelte-1l07cqj-fade-in-animation 1000ms cubic-bezier(0.4, 0, 0.2, 1);animation-fill-mode:both;animation-delay:500ms}.scroll-msg.svelte-1l07cqj{animation:svelte-1l07cqj-fade-in-animation 1000ms cubic-bezier(0.4, 0, 0.2, 1);animation-fill-mode:both;animation-delay:1000ms;margin-top:6rem;-webkit-user-select:none;-moz-user-select:none;user-select:none;text-align:center;font-weight:300;--tw-text-opacity:1;color:rgb(156 163 175 / var(--tw-text-opacity))}@media(min-width: 768px){.scroll-msg.svelte-1l07cqj{margin-top:55vh}}@keyframes svelte-1l07cqj-fade-in-animation{0%{opacity:0}100%{opacity:100%}}",
      map: null
    };
    Socials = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css$6);
      return `

<div class="socials-row custom-fade-in-socials svelte-1l07cqj"><p class="font-light lg:block md:block hidden">Socials:</p>
  
  <a href="https://www.linkedin.com/in/grahamzemel/" target="_blank" rel="noopener noreferer" class="svelte-1l07cqj"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="icon svelte-1l07cqj"><title>LinkedIn</title><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
  <a href="https://www.instagram.com/grahamzemel/" target="_blank" rel="noopener noreferer" class="svelte-1l07cqj"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="icon svelte-1l07cqj"><title>Instagram</title><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
  <a href="https://twitter.com/grahamzemel" target="_blank" rel="noopener noreferer" class="svelte-1l07cqj"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="icon svelte-1l07cqj"><title>Twitter</title><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
  <a href="https://github.com/grahamzemel" target="_blank" rel="noopener noreferer" class="svelte-1l07cqj"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="icon svelte-1l07cqj"><title>GitHub</title><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>
  <a href="https://grahamzemel.com/pass" target="_blank" rel="noopener noreferrer" class="svelte-1l07cqj"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="icon svelte-1l07cqj"><title>Contact Card</title><path d="M12 2c-2.7 0-5.8 1.5-6 4.5-0.1 1.4 0.3 2.7 1 3.7 0.7 1 0.8 2.2 0.5 3.3-0.3 1.1-1.2 2.2-2.5 2.5-2 0.5-3.5 2.2-3.5 4.2v1.6c0 0.9 0.7 1.6 1.6 1.6h16.8c0.9 0 1.6-0.7 1.6-1.6v-1.6c0-2-1.5-3.7-3.5-4.2-1.3-0.3-2.2-1.4-2.5-2.5-0.3-1.1-0.2-2.3 0.5-3.3 0.7-1 1.1-2.3 1-3.7-0.2-3-3.3-4.5-6-4.5z"></path></svg></a></div>

<div class="custom-fade-in-socials svelte-1l07cqj"><p class="md:hidden md:mt-0 mt-12 font-light">${validate_component(BookMeetingButton, "BookMeetingButton").$$render($$result, { noMargin: true }, {}, {})}
    <br>
    Or shoot me an email:
  </p>
  <a href="mailto:me@grahamzemel.com?subject=Hello!" target="_blank" rel="noopener noreferer" class="email no-border svelte-1l07cqj">me@grahamzemel.com
  </a></div>

<div class="scroll-msg svelte-1l07cqj">scroll to see more
  <br>

  <svg class="animate-bounce h-5 w-5 mx-auto mt-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 14.975q-.2 0-.375-.062T11.3 14.7l-4.6-4.6q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7l-4.6 4.6q-.15.15-.325.213t-.375.062Z"></path></svg>
</div>`;
    });
    Visibility = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { visibilityUpdate } = $$props;
      let { hasObserverSupport = false } = $$props;
      let { observerOptions = {
        rootMargin: `0px 0px 0px 0px`,
        threshold: 1
      } } = $$props;
      let element;
      onDestroy(() => {
      });
      if ($$props.visibilityUpdate === void 0 && $$bindings.visibilityUpdate && visibilityUpdate !== void 0)
        $$bindings.visibilityUpdate(visibilityUpdate);
      if ($$props.hasObserverSupport === void 0 && $$bindings.hasObserverSupport && hasObserverSupport !== void 0)
        $$bindings.hasObserverSupport(hasObserverSupport);
      if ($$props.observerOptions === void 0 && $$bindings.observerOptions && observerOptions !== void 0)
        $$bindings.observerOptions(observerOptions);
      return `<div${add_attribute("this", element, 0)}></div>`;
    });
    css$5 = {
      code: ".custom-transition.svelte-1skvpac.svelte-1skvpac{transition-property:opacity;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:1500ms}.link-highlight.svelte-1skvpac.svelte-1skvpac{--tw-text-opacity:1;color:rgb(51 119 255 / var(--tw-text-opacity));text-decoration-line:underline;text-decoration-color:rgb(51 119 255 / 0.6);text-underline-offset:4px}.link-highlight.svelte-1skvpac.svelte-1skvpac:hover{--tw-text-opacity:1;color:rgb(51 255 124 / var(--tw-text-opacity));text-decoration-color:rgb(51 255 124 / 0.7);transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}.current-grid.svelte-1skvpac.svelte-1skvpac{display:grid;grid-template-columns:repeat(1, minmax(0, 1fr));gap:1.5rem}@media(min-width: 1024px){.current-grid.svelte-1skvpac.svelte-1skvpac{grid-template-columns:repeat(2, minmax(0, 1fr))}}.tech-grid.svelte-1skvpac.svelte-1skvpac{display:grid;grid-template-columns:repeat(2, minmax(0, 1fr));gap:1rem}@media(min-width: 640px){.tech-grid.svelte-1skvpac.svelte-1skvpac{grid-template-columns:repeat(4, minmax(0, 1fr))}}@media(min-width: 1024px){.tech-grid.svelte-1skvpac.svelte-1skvpac{grid-template-columns:repeat(8, minmax(0, 1fr))}}.tech-badge.svelte-1skvpac.svelte-1skvpac{display:flex;flex-direction:column;align-items:center;gap:0.5rem}.tech-icon.svelte-1skvpac.svelte-1skvpac{display:flex;height:3.5rem;width:3.5rem;align-items:center;justify-content:center;border-radius:1rem;border-width:1px;--tw-border-opacity:1;border-color:rgb(30 41 59 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(11 15 20 / var(--tw-bg-opacity));--tw-shadow:0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.tech-icon.svelte-1skvpac img.svelte-1skvpac{height:2rem;width:2rem;filter:brightness(0) invert(1)}.tech-label.svelte-1skvpac.svelte-1skvpac{font-size:0.75rem;line-height:1rem;--tw-text-opacity:1;color:rgb(156 163 175 / var(--tw-text-opacity))}.focus-grid.svelte-1skvpac.svelte-1skvpac{display:grid;grid-template-columns:repeat(1, minmax(0, 1fr));gap:1.5rem}@media(min-width: 1024px){.focus-grid.svelte-1skvpac.svelte-1skvpac{grid-template-columns:repeat(3, minmax(0, 1fr))}}.focus-card.svelte-1skvpac.svelte-1skvpac{border-radius:0.5rem;background-color:rgb(7 10 13 / var(--tw-bg-opacity));--tw-bg-opacity:0.6;padding:1.5rem;--tw-shadow:0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.writing-section.svelte-1skvpac.svelte-1skvpac{border-radius:0.5rem;border-width:1px;--tw-border-opacity:1;border-color:rgb(30 41 59 / var(--tw-border-opacity));background-color:rgb(7 10 13 / var(--tw-bg-opacity));--tw-bg-opacity:0.6;padding:1.5rem}.writing-grid.svelte-1skvpac.svelte-1skvpac{margin-top:1.5rem;display:grid;grid-template-columns:repeat(1, minmax(0, 1fr));gap:1rem}@media(min-width: 640px){.writing-grid.svelte-1skvpac.svelte-1skvpac{grid-template-columns:repeat(2, minmax(0, 1fr))}}.link-card.svelte-1skvpac.svelte-1skvpac{border-radius:0.5rem;border-width:1px;border-color:rgb(13 162 255 / 0.3);--tw-bg-opacity:1;background-color:rgb(11 15 20 / var(--tw-bg-opacity));padding:1rem;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}.link-card.svelte-1skvpac.svelte-1skvpac:hover{--tw-border-opacity:1;border-color:rgb(51 119 255 / var(--tw-border-opacity))}.link-title.svelte-1skvpac.svelte-1skvpac{font-weight:600;--tw-text-opacity:1;color:rgb(51 119 255 / var(--tw-text-opacity))}.link-subtitle.svelte-1skvpac.svelte-1skvpac{margin-top:0.25rem;display:block;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(156 163 175 / var(--tw-text-opacity))}",
      map: null
    };
    AboutSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let isVisible = false;
      let hasChanged = false;
      let hasObserverSupport = true;
      const techStack = [
        {
          label: "HTML5",
          slug: "html5",
          bg: "#e34f26"
        },
        {
          label: "JavaScript",
          slug: "javascript",
          bg: "#f7df1e"
        },
        {
          label: "CSS3",
          iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
          bg: "#1572b6"
        },
        {
          label: "Svelte",
          slug: "svelte",
          bg: "#ff3e00"
        },
        {
          label: "Tailwind CSS",
          slug: "tailwindcss",
          bg: "#38bdf8"
        },
        { label: "npm", slug: "npm", bg: "#cb0000" },
        {
          label: "Node.js",
          slug: "nodedotjs",
          bg: "#3c873a"
        },
        {
          label: "VS Code",
          iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
          bg: "#007acc"
        }
      ];
      $$result.css.add(css$5);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        $$rendered = `<div class="sm:mt-[30vh] mt-[20vh]" aria-hidden="true">${validate_component(Visibility, "Visibility").$$render(
          $$result,
          {
            visibilityUpdate: (state) => {
              if (!hasChanged && state !== false) {
                hasChanged = true;
                isVisible = state;
              }
            },
            hasObserverSupport
          },
          {
            hasObserverSupport: ($$value) => {
              hasObserverSupport = $$value;
              $$settled = false;
            }
          },
          {}
        )}</div>

<section class="${"section-band custom-transition " + escape(
          !hasObserverSupport || isVisible ? "opacity-100" : "opacity-0",
          true
        ) + " svelte-1skvpac"}"><h1 class="font-serif font-bold sm:text-6xl text-4xl">About Me</h1>
  <p class="mt-4 text-lg text-gray-300 w-full">I build full-stack systems with a backend focus and a growing front-end
    practice. I write daily for
    <a class="link-highlight svelte-1skvpac" href="https://thegrayarea.tech" target="_blank" rel="noopener noreferer">The Gray Area
    </a>
    and serve as Director of Technology for
    <a class="link-highlight svelte-1skvpac" href="https://ifconthehill.org" target="_blank" rel="noopener noreferer">IFC on the Hill
    </a>
    at CU Boulder.
  </p>

  <div class="current-grid mt-10 svelte-1skvpac"><article class="focus-card svelte-1skvpac"><h3 class="text-2xl font-semibold">IFC on the Hill</h3>
      <p class="mt-3 text-gray-300 leading-relaxed">As Director of Technology, I built
        <a class="link-highlight svelte-1skvpac" href="https://ifceventhub.netlify.app/" target="_blank" rel="noopener noreferer">IFC EventHub
        </a>
        from the ground up to standardize event registration and safety
        workflows, and I also built the
        <a class="link-highlight svelte-1skvpac" href="https://hillneighborhoodslag.netlify.app/" target="_blank" rel="noopener noreferer">Student Living Advocacy Group (SLAG)
        </a>
        platform to make housing issues easier to document, aggregate, and act
        on.
      </p>
      <ul class="mt-4 list-disc ml-5 text-gray-300 space-y-1"><li>Structured event submissions and notifications</li>
        <li>Emergency contact visibility and compliance support</li>
        <li>Neighborhood-focused reporting and advocacy</li></ul></article>

    <article class="focus-card svelte-1skvpac"><h3 class="text-2xl font-semibold">Startup Founder</h3>
      <p class="mt-3 text-gray-300 leading-relaxed">I\u2019m rolling out
        <a class="link-highlight svelte-1skvpac" href="https://fratdoor.com" target="_blank" rel="noopener noreferer">FratDoor
        </a>
        across 21 fraternities (2,500+ members) to replace paper lists with a
        fast, structured door-check system.
      </p>
      <p class="mt-3 text-gray-300 leading-relaxed">FratDoor is my most promising startup so far, and I\u2019m actively searching
        for new prospects to adopt it and pioneer deployments at additional
        schools.
      </p>
      <p class="mt-3 text-gray-300 leading-relaxed">I\u2019m also building
        <a class="link-highlight svelte-1skvpac" href="https://text-cloaker.com" target="_blank" rel="noopener noreferer">TextCloaker
        </a>,
        a web app that cloaks AI-generated text to reduce AI-detector flags while
        keeping it readable.
      </p></article></div>

  <h2 class="mt-12 font-serif font-bold sm:text-3xl text-2xl">Tech Stack
  </h2>
  <div class="tech-grid mt-6 svelte-1skvpac">${each(techStack, (tech) => {
          return `<div class="tech-badge svelte-1skvpac"${add_attribute("aria-label", tech.label, 0)}><div class="tech-icon svelte-1skvpac"${add_attribute("style", `background:${tech.bg}`, 0)}><img${add_attribute("src", tech.iconUrl ?? `https://cdn.simpleicons.org/${tech.slug}/ffffff?viewbox=auto&size=48`, 0)}${add_attribute("alt", `${tech.label} logo`, 0)} loading="lazy" class="svelte-1skvpac"></div>
        <span class="tech-label svelte-1skvpac">${escape(tech.label)}</span>
      </div>`;
        })}</div>

  <h2 class="mt-12 font-serif font-bold sm:text-3xl text-2xl">Focus Areas
  </h2>
  <div class="focus-grid mt-6 svelte-1skvpac"><article class="focus-card svelte-1skvpac"><h3 class="text-2xl font-semibold">Web Development</h3>
      <p class="mt-3 text-gray-300 leading-relaxed">I have extensive experience in web development, primarily focusing on
        back-end systems. Recently I\u2019ve been exploring front-end work and
        experimenting with modern UI frameworks. I also publish SEO tips and
        step-by-step portfolio guides on
        <a class="link-highlight svelte-1skvpac" href="https://thegrayarea.tech" target="_blank" rel="noopener noreferer">The Gray Area
        </a>.
        This site was a trial run with
        cutting-edge front-end tools \u2014 the source is on
        <a class="link-highlight svelte-1skvpac" href="https://github.com/grahamzemel" target="_blank" rel="noopener noreferer">GitHub
        </a>
        if you want to explore.
      </p></article>

    <article class="focus-card svelte-1skvpac"><h3 class="text-2xl font-semibold">Cybersecurity</h3>
      <p class="mt-3 text-gray-300 leading-relaxed">When I\u2019m not writing or building web apps, I dive into cybersecurity.
        There\u2019s nothing like discovering a P1 vulnerability after days of bug
        hunting. I\u2019ve built scripts that automate penetration tests and surface
        vulnerabilities faster. For a deeper take, read my satirical piece on
        <a class="link-highlight svelte-1skvpac" href="https://thegrayarea.tech/finding-p1-vulnerabilities-a-step-by-step-guide-b88521195204" target="_blank" rel="noopener noreferer">hacking
        </a>
        and online safety.
      </p></article>

    <article class="focus-card svelte-1skvpac"><h3 class="text-2xl font-semibold">Writing</h3>
      <p class="mt-3 text-gray-300 leading-relaxed">I publish my best work through
        <a class="link-highlight svelte-1skvpac" href="https://thegrayarea.tech" target="_blank" rel="noopener noreferer">The Gray Area
        </a>
        with over half a million readers, and share daily articles on my personal
        profile. I stay active across platforms for readers who want more.
      </p></article></div>

  <div class="writing-section mt-6 svelte-1skvpac"><div class="writing-header"><h3 class="text-2xl font-semibold">Papers &amp; Writing</h3>
      <p class="mt-2 text-gray-300">My papers and long-form writing live on
        <a class="link-highlight svelte-1skvpac" href="https://thegrayarea.tech" target="_blank" rel="noopener noreferer">thegrayarea.tech
        </a>
        alongside daily posts and curated publications.
      </p></div>
    <div class="writing-grid svelte-1skvpac"><a class="link-card svelte-1skvpac" href="https://thegrayarea.tech" target="_blank" rel="noopener noreferer"><span class="link-title svelte-1skvpac">The Gray Area</span>
        <span class="link-subtitle svelte-1skvpac">Publications, papers, and essays</span></a>
      <a class="link-card svelte-1skvpac" href="https://medium.com/@grahamzemel" target="_blank" rel="noopener noreferer"><span class="link-title svelte-1skvpac">Medium</span>
        <span class="link-subtitle svelte-1skvpac">@grahamzemel</span></a>
      <a class="link-card svelte-1skvpac" href="https://twitter.com/grahamzemel" target="_blank" rel="noopener noreferer"><span class="link-title svelte-1skvpac">Twitter</span>
        <span class="link-subtitle svelte-1skvpac">@grahamzemel</span></a>
      <a class="link-card svelte-1skvpac" href="https://twitter.com/tgaonmedium" target="_blank" rel="noopener noreferer"><span class="link-title svelte-1skvpac">TGA Twitter</span>
        <span class="link-subtitle svelte-1skvpac">@tgaonmedium</span></a></div></div>
</section>`;
      } while (!$$settled);
      return $$rendered;
    });
    css$4 = {
      code: ".custom-transition.svelte-lpofh5.svelte-lpofh5.svelte-lpofh5{transition-property:opacity;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:1500ms}.featured-grid.svelte-lpofh5.svelte-lpofh5.svelte-lpofh5{display:grid;grid-template-columns:repeat(1, minmax(0, 1fr));align-items:stretch;gap:2rem}@media(min-width: 1024px){.featured-grid.svelte-lpofh5.svelte-lpofh5.svelte-lpofh5{grid-template-columns:repeat(2, minmax(0, 1fr))}}.featured-card.svelte-lpofh5.svelte-lpofh5.svelte-lpofh5{display:flex;flex-direction:column;overflow:hidden;border-radius:0.75rem;background-color:rgb(7 10 13 / var(--tw-bg-opacity));--tw-bg-opacity:0.6;--tw-shadow:0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.featured-body.svelte-lpofh5.svelte-lpofh5.svelte-lpofh5{display:flex;flex-direction:column;padding:1.5rem}.tag-row.svelte-lpofh5.svelte-lpofh5.svelte-lpofh5{display:flex;flex-wrap:wrap;gap:0.5rem}.tag.svelte-lpofh5.svelte-lpofh5.svelte-lpofh5{display:inline-flex;align-items:center;gap:0.25rem;border-radius:9999px;padding-left:0.5rem;padding-right:0.5rem;padding-top:0.25rem;padding-bottom:0.25rem;font-size:0.75rem;line-height:1rem;font-weight:600}.section-block.svelte-lpofh5.svelte-lpofh5.svelte-lpofh5{border-top-width:1px;--tw-border-opacity:1;border-color:rgb(30 41 59 / var(--tw-border-opacity));padding-top:1rem}.section-title.svelte-lpofh5.svelte-lpofh5.svelte-lpofh5{font-size:0.875rem;line-height:1.25rem;text-transform:uppercase;letter-spacing:0.1em;--tw-text-opacity:1;color:rgb(156 163 175 / var(--tw-text-opacity))}.stack-grid.svelte-lpofh5.svelte-lpofh5.svelte-lpofh5{margin-top:1rem;display:grid;grid-template-columns:repeat(2, minmax(0, 1fr));gap:1rem}@media(min-width: 640px){.stack-grid.svelte-lpofh5.svelte-lpofh5.svelte-lpofh5{grid-template-columns:repeat(3, minmax(0, 1fr))}}@media(min-width: 1024px){.stack-grid.svelte-lpofh5.svelte-lpofh5.svelte-lpofh5{grid-template-columns:repeat(5, minmax(0, 1fr))}}.stack-item.svelte-lpofh5.svelte-lpofh5.svelte-lpofh5{display:flex;flex-direction:column;align-items:center;gap:0.5rem}.stack-icon.svelte-lpofh5.svelte-lpofh5.svelte-lpofh5{display:flex;height:3rem;width:3rem;align-items:center;justify-content:center;border-radius:1rem;border-width:1px;--tw-border-opacity:1;border-color:rgb(30 41 59 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(11 15 20 / var(--tw-bg-opacity));--tw-shadow:0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.stack-icon.svelte-lpofh5 img.svelte-lpofh5.svelte-lpofh5{height:1.75rem;width:1.75rem;-o-object-fit:contain;object-fit:contain;filter:brightness(0) invert(1)}.stack-label.svelte-lpofh5.svelte-lpofh5.svelte-lpofh5{font-size:0.75rem;line-height:1rem;--tw-text-opacity:1;color:rgb(156 163 175 / var(--tw-text-opacity))}.stack-icon--svg.svelte-lpofh5 svg{height:1.75rem;width:1.75rem;color:#ffffff}.feature-list.svelte-lpofh5.svelte-lpofh5.svelte-lpofh5{margin-top:0.75rem;margin-left:1.25rem;list-style-type:disc}.feature-list.svelte-lpofh5>.svelte-lpofh5:not([hidden])~.svelte-lpofh5:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(0.25rem * var(--tw-space-y-reverse))}.feature-list.svelte-lpofh5.svelte-lpofh5.svelte-lpofh5{--tw-text-opacity:1;color:rgb(209 213 219 / var(--tw-text-opacity))}.stats-row.svelte-lpofh5.svelte-lpofh5.svelte-lpofh5{display:grid;grid-template-columns:repeat(2, minmax(0, 1fr));gap:1rem}.stat-card.svelte-lpofh5.svelte-lpofh5.svelte-lpofh5{border-radius:0.5rem;border-width:1px;--tw-border-opacity:1;border-color:rgb(30 41 59 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(11 15 20 / var(--tw-bg-opacity));padding-left:1rem;padding-right:1rem;padding-top:0.75rem;padding-bottom:0.75rem}.stat-num.svelte-lpofh5.svelte-lpofh5.svelte-lpofh5{font-size:1.5rem;line-height:2rem;font-weight:700;--tw-text-opacity:1;color:rgb(51 119 255 / var(--tw-text-opacity))}.stat-label.svelte-lpofh5.svelte-lpofh5.svelte-lpofh5{font-size:0.75rem;line-height:1rem;text-transform:uppercase;letter-spacing:0.1em;--tw-text-opacity:1;color:rgb(156 163 175 / var(--tw-text-opacity))}.link-highlight.svelte-lpofh5.svelte-lpofh5.svelte-lpofh5{--tw-text-opacity:1;color:rgb(51 119 255 / var(--tw-text-opacity));text-decoration-line:underline;text-decoration-color:rgb(51 119 255 / 0.6);text-underline-offset:4px}.link-highlight.svelte-lpofh5.svelte-lpofh5.svelte-lpofh5:hover{--tw-text-opacity:1;color:rgb(51 255 124 / var(--tw-text-opacity));text-decoration-color:rgb(51 255 124 / 0.7);transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}.cta-button.svelte-lpofh5.svelte-lpofh5.svelte-lpofh5{margin-left:auto;margin-right:auto;display:inline-flex;width:100%;max-width:24rem;align-items:center;justify-content:center;gap:0.75rem;border-radius:9999px;border-width:1px;border-color:rgb(43 108 176 / 0.6);background-image:linear-gradient(to right, var(--tw-gradient-stops));--tw-gradient-from:#1b4a7a var(--tw-gradient-from-position);--tw-gradient-from-position:  ;--tw-gradient-to:rgb(27 74 122 / 0)  var(--tw-gradient-from-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to);--tw-gradient-via-position:  ;--tw-gradient-to:rgb(22 58 97 / 0)  var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), #163a61 var(--tw-gradient-via-position), var(--tw-gradient-to);--tw-gradient-to:#132f4f var(--tw-gradient-to-position);--tw-gradient-to-position:  ;padding-top:0.75rem;padding-bottom:0.75rem;padding-left:1.25rem;padding-right:1.25rem;--tw-shadow:0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;box-shadow:0 10px 30px rgba(20, 46, 86, 0.35), inset 0 0 0 1px rgba(122, 175, 255, 0.2)}.cta-button.svelte-lpofh5.svelte-lpofh5.svelte-lpofh5:hover{border-color:rgb(125 179 255 / 0.8);--tw-gradient-from:#225a96 var(--tw-gradient-from-position);--tw-gradient-from-position:  ;--tw-gradient-to:rgb(34 90 150 / 0)  var(--tw-gradient-from-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to);--tw-gradient-via-position:  ;--tw-gradient-to:rgb(29 76 123 / 0)  var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), #1d4c7b var(--tw-gradient-via-position), var(--tw-gradient-to);--tw-gradient-to:#193f63 var(--tw-gradient-to-position);--tw-gradient-to-position:  ;box-shadow:0 14px 40px rgba(25, 60, 110, 0.45), inset 0 0 0 1px rgba(140, 190, 255, 0.35)}.cta-label.svelte-lpofh5.svelte-lpofh5.svelte-lpofh5{font-size:1rem;line-height:1.5rem;font-weight:600;color:rgb(18 18 23 / var(--tw-text-opacity));--tw-text-opacity:1;color:rgb(207 229 255 / var(--tw-text-opacity))}.cta-divider.svelte-lpofh5.svelte-lpofh5.svelte-lpofh5{height:1rem;width:1px;background-color:rgb(147 197 253 / 0.4)}.cta-url.svelte-lpofh5.svelte-lpofh5.svelte-lpofh5{font-size:0.875rem;line-height:1.25rem;color:rgb(191 219 254 / 0.8)}.cta-arrow.svelte-lpofh5.svelte-lpofh5.svelte-lpofh5{font-size:0.875rem;line-height:1.25rem;color:rgb(191 219 254 / 0.8)}.cta-row.svelte-lpofh5.svelte-lpofh5.svelte-lpofh5{display:flex;flex-wrap:wrap;align-items:center;gap:1rem}.cta-inline.svelte-lpofh5.svelte-lpofh5.svelte-lpofh5{--tw-text-opacity:1;color:rgb(51 119 255 / var(--tw-text-opacity));transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}.cta-inline.svelte-lpofh5.svelte-lpofh5.svelte-lpofh5:hover{--tw-text-opacity:1;color:rgb(51 255 124 / var(--tw-text-opacity))}",
      map: null
    };
    FeaturedProjects = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let isVisible = false;
      let hasChanged = false;
      let hasObserverSupport = true;
      const indexedDbIcon = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <ellipse cx="12" cy="5" rx="7" ry="3"></ellipse>
      <path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5"></path>
      <path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"></path>
    </svg>
  `;
      const projects = [
        {
          title: "FratDoor",
          description: "A comprehensive check-in and event management platform built and deployed as Director of Technology for IFC on the Hill at CU Boulder, serving 2,500+ users across 21 fraternities.",
          image: "/fratdoor.png",
          demoLink: "https://fratdoor.com",
          repoLink: null,
          tags: ["Web", "Internet", "IFC", "Website"],
          stack: [
            {
              label: "Svelte",
              slug: "svelte",
              bg: "#ff3e00"
            },
            {
              label: "Node.js",
              slug: "nodedotjs",
              bg: "#3c873a"
            },
            {
              label: "Express",
              slug: "express",
              bg: "#1f2937"
            },
            {
              label: "Firestore",
              slug: "firebase",
              bg: "#ffca28"
            },
            {
              label: "Heroku",
              iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-plain.svg",
              bg: "#430098"
            },
            {
              label: "Memcached",
              iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/memcached/memcached-plain.svg",
              bg: "#0f766e"
            },
            {
              label: "AWS S3",
              iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
              bg: "#f59e0b"
            },
            {
              label: "Stripe",
              slug: "stripe",
              bg: "#635bff"
            },
            {
              label: "Vonage",
              slug: "vonage",
              bg: "#e10098"
            },
            {
              label: "IndexedDB",
              iconSvg: indexedDbIcon,
              bg: "#1d4ed8"
            }
          ],
          highlights: [
            "Card scanning + ID validation for high-volume check-ins",
            "Real-time attendance, capacity tracking, and guest list controls",
            "Offline-first sync for network-interrupted environments",
            "Silent alarm with SMS notifications to administrators"
          ],
          achievements: [
            "Reduced Firestore reads by 70\u201380% via caching",
            "Optimistic UI updates with conflict resolution",
            "Analytics dashboard for attendance and guest list trends"
          ],
          stats: [
            { label: "Fraternities", value: "21" },
            { label: "Total Members", value: "2,500+" }
          ],
          companion: {
            label: "Companion product: IFC EventHub (party registration + oversight)",
            href: "https://ifceventhub.netlify.app/"
          }
        },
        {
          title: "TextCloaker",
          description: "Worried about being falsely accused for AI\u2011generated content? Cloak your text to make sure it\u2019s shown as 100% human\u2011generated. I built TextCloaker after seeing students and creators flagged by brittle detectors and wanted a fast, accessible way to protect legitimate work.",
          image: "/textcloakerss.png",
          demoLink: "https://text-cloaker.com",
          repoLink: null,
          tags: ["AI", "Web", "Internet", "Website"],
          stack: [
            {
              label: "Svelte",
              slug: "svelte",
              bg: "#ff3e00"
            },
            {
              label: "Firebase",
              slug: "firebase",
              bg: "#ffca28"
            },
            {
              label: "Chrome Extension",
              slug: "googlechrome",
              bg: "#4285f4"
            },
            {
              label: "TypeScript",
              slug: "typescript",
              bg: "#3178c6"
            },
            {
              label: "Vite",
              slug: "vite",
              bg: "#646cff"
            }
          ],
          highlights: [
            "Cloak, Un\u2011Cloak, and AI Check workflows",
            "Paraphrase + Synonym tools for quick rewrites",
            "Unicode + zero\u2011width transformations for stealth",
            "Keeps output readable with minimal visible changes",
            "Chrome extension workflow for Google Docs"
          ],
          achievements: [
            "Chrome extension integrated with Google Docs",
            "Explored in The Gray Area (May 2023)",
            "Featured in AI tool directories and reviews",
            "1,000,000+ words cloaked",
            "Active development with expanded obfuscation planned"
          ],
          stats: [
            {
              label: "Active Users (90 days)",
              value: "3,000+"
            },
            {
              label: "Words Cloaked",
              value: "1,000,000+"
            }
          ]
        }
      ];
      const getDomain = (url) => {
        try {
          return new URL(url).hostname.replace(/^www\\./, "");
        } catch {
          return url;
        }
      };
      const getClassesForTag = (tag) => {
        switch (tag) {
          case "Quantum":
            return "bg-red-50 text-red-600";
          case "AI":
            return "bg-orange-50 text-orange-600";
          case "Web":
            return "bg-lime-50 text-lime-600";
          case "Game":
            return "bg-pink-50 text-pink-600";
          case "Extension":
            return "bg-cyan-50 text-cyan-600";
          case "Internet":
            return "bg-teal-50 text-teal-600";
          case "Python":
            return "bg-green-50 text-green-600";
          case "Telegram":
            return "bg-blue-50 text-blue-600";
          case "Shell":
            return "bg-purple-50 text-purple-600";
          case "Bash":
            return "bg-red-50 text-red-600";
          case "Library":
            return "bg-indigo-50 text-indigo-600";
          case "Automation":
            return "bg-yellow-50 text-yellow-600";
          case "Hackathon":
            return "bg-pink-50 text-pink-600";
          case "Crypto":
            return "bg-blue-50 text-blue-600";
          case "IFC":
            return "bg-amber-50 text-amber-600";
          default:
            return "bg-blue-50 text-blue-600";
        }
      };
      $$result.css.add(css$4);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        $$rendered = `<div class="sm:mt-[16vh] mt-[10vh]" aria-hidden="true">${validate_component(Visibility, "Visibility").$$render(
          $$result,
          {
            visibilityUpdate: (state) => {
              if (!hasChanged && state !== false) {
                hasChanged = true;
                isVisible = state;
              }
            },
            hasObserverSupport
          },
          {
            hasObserverSupport: ($$value) => {
              hasObserverSupport = $$value;
              $$settled = false;
            }
          },
          {}
        )}</div>

<section class="${"section-band custom-transition " + escape(
          !hasObserverSupport || isVisible ? "opacity-100" : "opacity-0",
          true
        ) + " svelte-lpofh5"}"><h1 class="font-serif font-bold sm:text-6xl text-4xl">Featured Projects
  </h1>

  <div class="featured-grid mt-10 svelte-lpofh5">${each(projects, (project) => {
          return `<article class="featured-card svelte-lpofh5"><div class="featured-media"><img${add_attribute("src", project.image, 0)}${add_attribute("alt", project.title, 0)} class="aspect-video object-cover w-full rounded-t-xl" loading="lazy"></div>
        <div class="featured-body svelte-lpofh5"><div class="featured-head"><div><h3 class="text-2xl font-semibold">${escape(project.title)}</h3>
              <p class="mt-2 text-gray-300">${escape(project.description)}</p></div>
            <div class="tag-row mt-4 svelte-lpofh5">${each(project.tags, (tag) => {
            return `<span class="${"tag " + escape(getClassesForTag(tag), true) + " svelte-lpofh5"}">${escape(tag)}</span>`;
          })}</div>
            <div class="mt-4 flex justify-center">${project.demoLink && !project.repoLink ? `<a class="cta-button svelte-lpofh5"${add_attribute("href", project.demoLink, 0)} target="_blank" rel="noopener noreferer"><span class="cta-label svelte-lpofh5">Try it</span>
                  <span class="cta-divider svelte-lpofh5" aria-hidden="true"></span>
                  <span class="cta-url svelte-lpofh5">${escape(getDomain(project.demoLink))}</span>
                  <span class="cta-arrow svelte-lpofh5" aria-hidden="true">\u2197</span>
                </a>` : `<div class="cta-row svelte-lpofh5">${project.demoLink ? `<a class="cta-inline svelte-lpofh5"${add_attribute("href", project.demoLink, 0)} target="_blank" rel="noopener noreferer">Try it \u2192 ${escape(getDomain(project.demoLink))}
                    </a>` : ``}
                  ${project.repoLink ? `<a class="cta-inline svelte-lpofh5"${add_attribute("href", project.repoLink, 0)} target="_blank" rel="noopener noreferer">View repo
                    </a>` : ``}
                </div>`}
            </div></div>

          ${project.stats ? `<div class="stats-row mt-6 svelte-lpofh5">${each(project.stats, (stat) => {
            return `<div class="stat-card svelte-lpofh5"><div class="stat-num svelte-lpofh5">${escape(stat.value)}</div>
                  <div class="stat-label svelte-lpofh5">${escape(stat.label)}</div>
                </div>`;
          })}
            </div>` : ``}

          <div class="section-block mt-6 svelte-lpofh5"><h4 class="section-title svelte-lpofh5">Tech Stack</h4>
            <div class="stack-grid svelte-lpofh5">${each(project.stack, (item) => {
            return `<div class="stack-item svelte-lpofh5"${add_attribute("aria-label", item.label, 0)}>${item.iconSvg ? `<div class="stack-icon stack-icon--svg svelte-lpofh5"${add_attribute("style", `background:${item.bg}`, 0)}><!-- HTML_TAG_START -->${item.iconSvg}<!-- HTML_TAG_END -->
                    </div>` : `<div class="stack-icon svelte-lpofh5"${add_attribute("style", `background:${item.bg}`, 0)}><img${add_attribute("src", item.iconUrl ?? `https://cdn.simpleicons.org/${item.slug}/ffffff?viewbox=auto&size=48`, 0)}${add_attribute("alt", `${item.label} logo`, 0)} loading="lazy" class="svelte-lpofh5">
                    </div>`}
                  <span class="stack-label svelte-lpofh5">${escape(item.label)}</span>
                </div>`;
          })}
            </div></div>

          <div class="section-block mt-6 svelte-lpofh5"><h4 class="section-title svelte-lpofh5">Core Features</h4>
            <ul class="feature-list svelte-lpofh5">${each(project.highlights, (item) => {
            return `<li class="svelte-lpofh5">${escape(item)}</li>`;
          })}
            </ul></div>

          <div class="section-block mt-6 svelte-lpofh5"><h4 class="section-title svelte-lpofh5">Technical Achievements</h4>
            <ul class="feature-list svelte-lpofh5">${each(project.achievements, (item) => {
            return `<li class="svelte-lpofh5">${escape(item)}</li>`;
          })}
            </ul></div>

          ${project.companion ? `<p class="mt-6 text-gray-300"><a class="link-highlight svelte-lpofh5"${add_attribute("href", project.companion.href, 0)} target="_blank" rel="noopener noreferer">${escape(project.companion.label)}</a>
            </p>` : ``}</div>
      </article>`;
        })}</div>
</section>`;
      } while (!$$settled);
      return $$rendered;
    });
    css$3 = {
      code: "@media(max-width: 640px){#statsBig.svelte-3cq3yn.svelte-3cq3yn{display:none}}.custom-transition.svelte-3cq3yn.svelte-3cq3yn{transition-property:opacity;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:1500ms}.card.svelte-3cq3yn.svelte-3cq3yn{display:flex;flex-direction:column;border-radius:0.9rem;overflow:hidden;box-shadow:0 2px 8px rgba(0, 0, 0, 0.1);text-decoration:none;max-width:100%;padding-top:2rem;margin:0 auto;color:inherit}.card.svelte-3cq3yn img.svelte-3cq3yn{max-height:300px;height:auto;width:100%}.card.svelte-3cq3yn h2.svelte-3cq3yn{margin:0;padding:1rem;background:rgba(100, 100, 100, 0.7);color:white;font-size:1.2rem}.card.svelte-3cq3yn p.svelte-3cq3yn{margin:0;padding:1rem;background:white;color:#333;font-size:1rem}",
      map: null
    };
    Blog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let isVisible = false;
      let hasChanged = false;
      let hasObserverSupport = true;
      let metadata = {
        title: "The Gray Area",
        description: "For all kinds of developers, hackers, and tech-savvy readers | Now welcoming new writers!",
        images: ["./grayarea.jpg"]
      };
      $$result.css.add(css$3);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        $$rendered = `<div class="sm:mt-[12vh] mt-[8vh]" aria-hidden="true">${validate_component(Visibility, "Visibility").$$render(
          $$result,
          {
            visibilityUpdate: (state) => {
              if (!hasChanged && state !== false) {
                hasChanged = true;
                isVisible = state;
              }
            },
            hasObserverSupport
          },
          {
            hasObserverSupport: ($$value) => {
              hasObserverSupport = $$value;
              $$settled = false;
            }
          },
          {}
        )}</div>

<section class="${"section-band custom-transition " + escape(
          !hasObserverSupport || isVisible ? "opacity-100" : "opacity-0",
          true
        ) + " svelte-3cq3yn"}"><h1 class="font-serif font-bold sm:text-6xl text-4xl">The Gray Area</h1>
  <br>
  <h2 class="font-serif font-bold sm:text-3xl text-xl">I initially created The Gray Area to provide an educational resource for
    beginner programmers or cybersecurity enthusiasts, but it&#39;s since become so
    much more.
  </h2>
  <br>
  <div class="block flex space-x-64 justify-center text-center p-4 ml-[1rem] svelte-3cq3yn" id="statsBig"><div><div class="text-5xl font-bold">30+</div>
      <div class="text-2xl text-gray-500">Writers</div></div>
    <div><div class="text-5xl font-bold">2,000,000+</div>
      <div class="text-2xl text-gray-500">Readers</div></div>
    <div><div class="text-5xl font-bold">250+</div>
      <div class="text-2xl text-gray-500">Posts</div></div></div>
  <br>
  <div class="card svelte-3cq3yn" style="border-radius: 0.9rem;"><a href="https://thegrayarea.tech" target="_blank" rel="noopener noreferrer">${metadata.images ? `<img style="border-top-right-radius: 0.9rem; border-top-left-radius: 0.9rem;"${add_attribute("src", metadata.images[0], 0)}${add_attribute("alt", metadata.title, 0)} class="svelte-3cq3yn">` : ``}
      <h2 class="svelte-3cq3yn">${escape(metadata.title)}</h2>
      <p class="svelte-3cq3yn">${escape(metadata.description)}</p></a></div>
  <br><br>

  <div id="blog" class="blog flex justify-center items-center lg:block md:block hidden"><ul class="blog__slider grid grid-cols-3 w-50% lg:w-33%">${`<p class="blog__intro">Please wait, obtaining posts from
          <a href="https://medium.com/the-gray-area" aria-label="The Gray Area on Medium">The Gray Area</a></p>`}</ul></div>
  <div class="lg:hidden md:hidden block flex justify-between text-center p-4"><div><div class="text-3xl font-bold">30+</div>
      <div class="text-lg text-gray-500">Writers</div></div>
    <div><div class="text-3xl font-bold">2,000,000+</div>
      <div class="text-lg text-gray-500">Readers</div></div>
    <div><div class="text-3xl font-bold">250+</div>
      <div class="text-lg text-gray-500">Posts</div></div></div>
</section>`;
      } while (!$$settled);
      return $$rendered;
    });
    css$2 = {
      code: ".project-filter.svelte-1yqr93t.svelte-1yqr93t{margin-top:2.5rem;display:flex;flex-direction:column;gap:1rem}.filter-bar.svelte-1yqr93t.svelte-1yqr93t{display:flex;flex-direction:column;gap:0.75rem}@media(min-width: 1024px){.filter-bar.svelte-1yqr93t.svelte-1yqr93t{flex-direction:row;align-items:center}}.filter-input.svelte-1yqr93t.svelte-1yqr93t{width:100%;border-radius:0.75rem;border-width:1px;--tw-border-opacity:1;border-color:rgb(30 41 59 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(11 15 20 / var(--tw-bg-opacity));padding-left:1rem;padding-right:1rem;padding-top:0.75rem;padding-bottom:0.75rem;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(229 231 235 / var(--tw-text-opacity))}.filter-input.svelte-1yqr93t.svelte-1yqr93t::-moz-placeholder{--tw-text-opacity:1;color:rgb(107 114 128 / var(--tw-text-opacity))}.filter-input.svelte-1yqr93t.svelte-1yqr93t::placeholder{--tw-text-opacity:1;color:rgb(107 114 128 / var(--tw-text-opacity))}.filter-input.svelte-1yqr93t.svelte-1yqr93t{height:3.25rem}.filter-stats.svelte-1yqr93t.svelte-1yqr93t{display:inline-flex;align-items:center;gap:0.5rem;border-radius:0.75rem;border-width:1px;--tw-border-opacity:1;border-color:rgb(30 41 59 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(11 15 20 / var(--tw-bg-opacity));padding-left:1rem;padding-right:1rem;padding-top:0.75rem;padding-bottom:0.75rem;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(209 213 219 / var(--tw-text-opacity));height:3.25rem}.filter-count.svelte-1yqr93t.svelte-1yqr93t{font-size:1.125rem;line-height:1.75rem;font-weight:600;--tw-text-opacity:1;color:rgb(51 119 255 / var(--tw-text-opacity))}.filter-label.svelte-1yqr93t.svelte-1yqr93t{font-size:0.75rem;line-height:1rem;text-transform:uppercase;letter-spacing:0.1em;--tw-text-opacity:1;color:rgb(107 114 128 / var(--tw-text-opacity))}.filter-reset.svelte-1yqr93t.svelte-1yqr93t{border-radius:0.75rem;border-width:1px;--tw-border-opacity:1;border-color:rgb(30 41 59 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(11 15 20 / var(--tw-bg-opacity));padding-left:1rem;padding-right:1rem;padding-top:0.75rem;padding-bottom:0.75rem;font-size:0.75rem;line-height:1rem;text-transform:uppercase;letter-spacing:0.1em;--tw-text-opacity:1;color:rgb(156 163 175 / var(--tw-text-opacity));transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;height:3.25rem}.filter-reset.svelte-1yqr93t.svelte-1yqr93t:hover{--tw-border-opacity:1;border-color:rgb(51 119 255 / var(--tw-border-opacity));--tw-text-opacity:1;color:rgb(51 255 124 / var(--tw-text-opacity))}@media(min-width: 1024px){.project-filter.svelte-1yqr93t.svelte-1yqr93t{position:static;padding:0;-webkit-backdrop-filter:none;backdrop-filter:none;background:transparent}}.tag-row.svelte-1yqr93t.svelte-1yqr93t{display:flex;flex-wrap:wrap;gap:0.5rem}.tag-chip.svelte-1yqr93t.svelte-1yqr93t{display:inline-flex;align-items:center;gap:0.5rem;border-radius:9999px;border-width:1px;--tw-border-opacity:1;border-color:rgb(30 41 59 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(11 15 20 / var(--tw-bg-opacity));padding-left:0.75rem;padding-right:0.75rem;padding-top:0.25rem;padding-bottom:0.25rem;font-size:0.75rem;line-height:1rem;--tw-text-opacity:1;color:rgb(209 213 219 / var(--tw-text-opacity));transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}.tag-chip.svelte-1yqr93t.svelte-1yqr93t:hover{--tw-border-opacity:1;border-color:rgb(51 119 255 / var(--tw-border-opacity));--tw-text-opacity:1;color:rgb(51 255 124 / var(--tw-text-opacity))}.tag-chip--active.svelte-1yqr93t.svelte-1yqr93t{--tw-border-opacity:1;border-color:rgb(51 119 255 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(18 35 58 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(51 255 124 / var(--tw-text-opacity))}.tag-count.svelte-1yqr93t.svelte-1yqr93t{border-radius:9999px;--tw-bg-opacity:1;background-color:rgb(21 36 55 / var(--tw-bg-opacity));padding-left:0.5rem;padding-right:0.5rem;padding-top:0.125rem;padding-bottom:0.125rem;font-size:10px;--tw-text-opacity:1;color:rgb(156 163 175 / var(--tw-text-opacity))}.filter-select.svelte-1yqr93t.svelte-1yqr93t{display:inline-flex;align-items:center;gap:0.5rem;border-radius:0.75rem;border-width:1px;--tw-border-opacity:1;border-color:rgb(30 41 59 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(11 15 20 / var(--tw-bg-opacity));padding-left:1rem;padding-right:1rem;padding-top:0.5rem;padding-bottom:0.5rem;font-size:0.75rem;line-height:1rem;text-transform:uppercase;letter-spacing:0.1em;--tw-text-opacity:1;color:rgb(156 163 175 / var(--tw-text-opacity));height:3.25rem}.filter-select.svelte-1yqr93t select.svelte-1yqr93t{background-color:transparent;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(229 231 235 / var(--tw-text-opacity));outline:2px solid transparent;outline-offset:2px}.projects-grid.svelte-1yqr93t.svelte-1yqr93t{display:grid;grid-template-columns:repeat(1, minmax(0, 1fr));gap:1.5rem}@media(min-width: 768px){.projects-grid.svelte-1yqr93t.svelte-1yqr93t{grid-template-columns:repeat(2, minmax(0, 1fr))}}@media(min-width: 1280px){.projects-grid.svelte-1yqr93t.svelte-1yqr93t{grid-template-columns:repeat(3, minmax(0, 1fr))}}.project-card.svelte-1yqr93t.svelte-1yqr93t{position:relative;display:flex;flex-direction:column;overflow:hidden;border-radius:0.75rem;border-width:1px;border-color:rgb(30 41 59 / 0.8);background-color:rgb(7 10 13 / var(--tw-bg-opacity));--tw-bg-opacity:0.6;--tw-shadow:0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);aspect-ratio:1 / 1}.project-card--emphasis.svelte-1yqr93t.svelte-1yqr93t{border-width:1px;border-color:rgb(13 162 255 / 0.2);--tw-shadow:0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.project-card.svelte-1yqr93t.svelte-1yqr93t{border-width:1px;border-color:rgb(30 41 59 / 0.8)}.featured-badge.svelte-1yqr93t.svelte-1yqr93t{position:absolute;top:1rem;right:1rem;border-radius:9999px;--tw-bg-opacity:1;background-color:rgb(18 35 58 / var(--tw-bg-opacity));padding-left:1rem;padding-right:1rem;padding-top:0.5rem;padding-bottom:0.5rem;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;--tw-text-opacity:1;color:rgb(51 255 124 / var(--tw-text-opacity))}.project-media.svelte-1yqr93t.svelte-1yqr93t{width:100%;height:42%}.project-media.svelte-1yqr93t img.svelte-1yqr93t{height:100%;width:100%;-o-object-fit:cover;object-fit:cover}.project-body.svelte-1yqr93t.svelte-1yqr93t{display:flex;height:100%;flex-direction:column;justify-content:space-between;gap:0.75rem;padding:1.25rem}.project-title.svelte-1yqr93t.svelte-1yqr93t{font-size:1.125rem;line-height:1.75rem;font-weight:600}.project-desc.svelte-1yqr93t.svelte-1yqr93t{margin-top:0.5rem;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(209 213 219 / var(--tw-text-opacity));display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}.project-tags.svelte-1yqr93t.svelte-1yqr93t{display:flex;flex-wrap:wrap;gap:0.5rem}.tag.svelte-1yqr93t.svelte-1yqr93t{display:inline-flex;align-items:center;gap:0.25rem;border-radius:9999px;padding-left:0.5rem;padding-right:0.5rem;padding-top:0.25rem;padding-bottom:0.25rem;font-size:0.75rem;line-height:1rem;font-weight:600}.project-links.svelte-1yqr93t.svelte-1yqr93t{display:flex;flex-wrap:wrap;gap:0.75rem;font-size:1rem;line-height:1.5rem;color:rgb(18 18 23 / var(--tw-text-opacity));--tw-text-opacity:1;color:rgb(51 119 255 / var(--tw-text-opacity))}.project-link.svelte-1yqr93t.svelte-1yqr93t{display:inline-flex;align-items:center;border-radius:9999px;border-width:1px;border-color:rgb(43 108 176 / 0.4);--tw-bg-opacity:1;background-color:rgb(14 28 47 / var(--tw-bg-opacity));padding-left:0.75rem;padding-right:0.75rem;padding-top:0.25rem;padding-bottom:0.25rem;font-size:0.875rem;line-height:1.25rem;font-weight:600;color:rgb(191 219 254 / 0.9);transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}.project-link.svelte-1yqr93t.svelte-1yqr93t:hover{border-color:rgb(90 167 255 / 0.7);--tw-text-opacity:1;color:rgb(219 234 254 / var(--tw-text-opacity))}",
      map: null
    };
    ProjectsGrid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let normalizedQuery;
      let filteredProjects;
      let sortedProjects;
      const projects = [
        {
          title: "FratDoor",
          description: "Comprehensive check-in + event management platform for IFC on the Hill at CU Boulder.",
          image: "/fratdoor.png",
          tags: ["Web", "Internet", "IFC"],
          repoLink: null,
          demoLink: "https://fratdoor.com",
          featured: true
        },
        {
          title: "Text Cloaker",
          description: "Cloak AI-generated text to reduce detector flags while keeping meaning intact.",
          image: "/textcloakerss.png",
          tags: ["AI", "Web", "Internet"],
          repoLink: null,
          demoLink: "https://text-cloaker.com",
          featured: true
        },
        {
          title: "IFC EventHub",
          description: "Centralized event registration and safety workflow hub for IFC chapters.",
          image: "/ifc-eventhub.png",
          tags: ["Web", "Internet", "IFC"],
          repoLink: null,
          demoLink: "https://ifceventhub.netlify.app/"
        },
        {
          title: "Student Living Advocacy Group",
          description: "Reporting hub for off-campus housing experiences on the Hill in Boulder.",
          image: "/slag.png",
          tags: ["Web", "Internet", "IFC"],
          repoLink: null,
          demoLink: "https://hillneighborhoodslag.netlify.app/"
        },
        {
          title: "The Vault Collection",
          description: "Unity + C# mobile collection (Flappy Bird, Stacker, Pong, Brick Breaker). My breakthrough App Store release with payments + ads integration.",
          image: "/vaultcollection.png",
          tags: ["App", "Game"],
          repoLink: null,
          demoLink: null
        },
        {
          title: "Graham Zemel (.com)",
          description: "Version 4.0 of my personal website built with SvelteKit and TailwindCSS.",
          image: "/grahamzemel.com.png",
          tags: ["Internet"],
          repoLink: "https://github.com/grahamzemel/grahamzemel.com",
          demoLink: "https://grahamzemel.com"
        },
        {
          title: "Game Bank",
          description: "Play a variety of popular games online with friends or solo. In development.",
          image: "/gamebank.png",
          tags: ["Game", "Web"],
          repoLink: "https://github.com/grahamzemel/gamebank",
          demoLink: "https://gamebank.netlify.app"
        },
        {
          title: "QuantumChat",
          description: "Quantum chat room using quantum key distribution to encrypt traffic.",
          image: "/quantumss.png",
          tags: ["Quantum", "AI"],
          repoLink: null,
          demoLink: "https://quantum-chat.netlify.app"
        },
        {
          title: "Powerschool GPA Calculator",
          description: "Chrome extension to calculate weighted/unweighted GPAs in PowerSchool.",
          image: "/powerschoolss.png",
          tags: ["Internet", "Extension"],
          repoLink: "https://github.com/grahamzemel/PowerschoolGPACalculator",
          demoLink: "https://chrome.google.com/webstore/detail/powerschool-gpa-calculato/dgfnbmfhjioifionnlcklnpfkkjjglbj?hl=en&authuser=0"
        },
        {
          title: "Medium Twitter Bot",
          description: "Automation bot that posts new Gray Area articles to Twitter.",
          image: "/tgaonmediumss.png",
          tags: ["Python", "Telegram"],
          repoLink: "https://github.com/grahamzemel/MediumTwitterBot",
          demoLink: "https://twitter.com/TGAonMedium"
        },
        {
          title: "Web Heck Scanner",
          description: "Bug-hunting toolkit combining common scanners and workflows.",
          image: "/webheckscannerss.png",
          tags: ["Shell", "Internet", "Bash"],
          repoLink: "https://github.com/grahamzemel/WebHeckScanner",
          demoLink: null
        },
        {
          title: "Hecker Bot",
          description: "Telegram bot that automates hacking processes for bug hunting.",
          image: "/heckerbotss.jpg",
          tags: ["Automation", "Telegram"],
          repoLink: null,
          demoLink: "https://t.me/heckerbot2022bot"
        },
        {
          title: "Bash Bunny",
          description: "Hotplug attack scripts for physical pen-testing with Bash Bunny.",
          image: "/bashbunnyss.png",
          tags: ["Automation", "Bash"],
          repoLink: "https://github.com/grahamzemel/Hotplug_Attacks",
          demoLink: null
        },
        {
          title: "IDOR Automation",
          description: "Python scripts for parsing data from hacked sites and IDOR testing.",
          image: "/idorss.png",
          tags: ["Python", "Automation"],
          repoLink: "https://github.com/grahamzemel/idorAutomation",
          demoLink: null
        },
        {
          title: "Aesculapius",
          description: "MetroHacks 2022 healthcare track winner built with Svelte + Tailwind.",
          image: "/aesculapiusss.png",
          tags: ["Web", "Hackathon"],
          repoLink: "https://github.com/grahamzemel/Aesculapius-FrontEnd",
          demoLink: "https://aesculapius.tech"
        },
        {
          title: "Template Project",
          description: "Starter template with Svelte/Bulma frontend and Python backend.",
          image: "/templateprojss.png",
          tags: ["Web", "Internet"],
          repoLink: "https://github.com/grahamzemel/TemplateProj",
          demoLink: null
        },
        {
          title: "Crypto Token Template",
          description: "ERC20 token template for web3 developers.",
          image: "/cryptoss.png",
          tags: ["Internet", "Crypto"],
          repoLink: "https://github.com/grahamzemel/CreateCryptoToken",
          demoLink: null
        },
        {
          title: "Discrete Mathematics",
          description: "Notes and resources from my discrete math class.",
          image: "/fractalsss.png",
          tags: ["Python"],
          repoLink: "https://github.com/grahamzemel/DiscreteMath",
          demoLink: null
        },
        {
          title: "GPU Prices",
          description: "Live GPU pricing table with filters and sorting by type and price.",
          image: "/gpuprices.png",
          tags: ["Web", "Internet", "Automation"],
          repoLink: null,
          demoLink: "https://gpuprices.xyz"
        },
        {
          title: "Macbook Prices",
          description: "Up-to-date Macbook pricing with filters and model comparisons.",
          image: "/macbookprices.png",
          tags: ["Web", "Internet", "Automation"],
          repoLink: null,
          demoLink: "https://macbookprices.xyz"
        },
        {
          title: "Laptop Prices",
          description: "Live laptop pricing table with filters and sorting options.",
          image: "/laptopprices.png",
          tags: ["Web", "Internet", "Automation"],
          repoLink: null,
          demoLink: "https://laptopprices.xyz"
        }
      ];
      const projectsWithWebsite = projects.map((project) => {
        const tags = project.demoLink ? Array.from(/* @__PURE__ */ new Set([...project.tags, "Website"])) : project.tags;
        return { ...project, tags };
      });
      let query = "";
      let activeTag = null;
      const getDomain = (url) => {
        try {
          return new URL(url).hostname.replace(/^www\./, "");
        } catch {
          return url;
        }
      };
      const getTagClass = (tag) => {
        switch (tag) {
          case "Quantum":
            return "bg-red-50 text-red-600";
          case "AI":
            return "bg-orange-50 text-orange-600";
          case "Web":
            return "bg-lime-50 text-lime-600";
          case "Game":
            return "bg-pink-50 text-pink-600";
          case "App":
            return "bg-emerald-50 text-emerald-600";
          case "Extension":
            return "bg-cyan-50 text-cyan-600";
          case "Website":
            return "bg-sky-50 text-sky-600";
          case "Internet":
            return "bg-teal-50 text-teal-600";
          case "Python":
            return "bg-green-50 text-green-600";
          case "Telegram":
            return "bg-blue-50 text-blue-600";
          case "Shell":
            return "bg-purple-50 text-purple-600";
          case "Bash":
            return "bg-red-50 text-red-600";
          case "Library":
            return "bg-indigo-50 text-indigo-600";
          case "Automation":
            return "bg-yellow-50 text-yellow-600";
          case "Hackathon":
            return "bg-pink-50 text-pink-600";
          case "Crypto":
            return "bg-blue-50 text-blue-600";
          case "IFC":
            return "bg-amber-50 text-amber-600";
          default:
            return "bg-blue-50 text-blue-600";
        }
      };
      const tagCounts = projectsWithWebsite.reduce(
        (acc, project) => {
          project.tags.forEach((tag) => {
            acc[tag] = (acc[tag] || 0) + 1;
          });
          return acc;
        },
        {}
      );
      const sortedTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a]);
      $$result.css.add(css$2);
      normalizedQuery = query.trim().toLowerCase();
      filteredProjects = projectsWithWebsite.filter((project) => {
        const matchesQuery = normalizedQuery ? `${project.title} ${project.description} ${project.tags.join(" ")}`.toLowerCase().includes(normalizedQuery) : true;
        return matchesQuery;
      });
      sortedProjects = [...filteredProjects].sort((a, b) => {
        {
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        }
      });
      return `<div class="project-filter svelte-1yqr93t"><div class="filter-bar svelte-1yqr93t"><input class="filter-input svelte-1yqr93t" type="search" placeholder="Search projects"${add_attribute("value", query, 0)}>
      <div class="filter-stats svelte-1yqr93t"><span class="filter-count svelte-1yqr93t">${escape(sortedProjects.length)}</span>
        <span class="filter-label svelte-1yqr93t">projects</span></div>
      <label class="filter-select svelte-1yqr93t"><span>Sort</span>
        <select class="svelte-1yqr93t"><option value="featured">Featured first</option><option value="az">A \u2192 Z</option><option value="za">Z \u2192 A</option><option value="tags">Most tags</option></select></label>
      <button class="filter-reset svelte-1yqr93t" type="button">Clear Search
      </button>
      <button class="filter-reset svelte-1yqr93t" type="button">Clear Tag
      </button></div>
  <div class="tag-row svelte-1yqr93t"><button class="${"tag-chip " + escape("tag-chip--active", true) + " svelte-1yqr93t"}" type="button">All
      <span class="tag-count svelte-1yqr93t">${escape(projectsWithWebsite.length)}</span></button>
    ${each(sortedTags, (tag) => {
        return `<button class="${"tag-chip " + escape(activeTag === tag ? "tag-chip--active" : "", true) + " svelte-1yqr93t"}" type="button">${escape(tag)}
        <span class="tag-count svelte-1yqr93t">${escape(tagCounts[tag])}</span>
      </button>`;
      })}</div></div>

${sortedProjects.length === 0 ? `<p class="mt-8 text-gray-400">No projects match this filter.</p>` : `<div class="projects-grid mt-8 svelte-1yqr93t">${each(sortedProjects, (project, index10) => {
        return `<article class="${"project-card " + escape(index10 < 3 ? "project-card--emphasis" : "", true) + " svelte-1yqr93t"}">${project.featured ? `<div class="featured-badge svelte-1yqr93t">Featured</div>` : ``}
        <div class="project-media svelte-1yqr93t"><img${add_attribute("src", project.image, 0)}${add_attribute("alt", project.title, 0)} loading="lazy" class="svelte-1yqr93t"></div>
        <div class="project-body svelte-1yqr93t"><div><h3 class="project-title svelte-1yqr93t">${escape(project.title)}</h3>
            <p class="project-desc svelte-1yqr93t">${escape(project.description)}</p></div>
          <div class="project-tags svelte-1yqr93t">${each(project.tags, (tag) => {
          return `<span class="${"tag " + escape(getTagClass(tag), true) + " svelte-1yqr93t"}">${escape(tag)}</span>`;
        })}</div>
          <div class="project-links svelte-1yqr93t">${project.demoLink ? `<a class="project-link svelte-1yqr93t"${add_attribute("href", project.demoLink, 0)} target="_blank" rel="noopener noreferer">Website: ${escape(getDomain(project.demoLink))}
              </a>` : ``}
            ${project.repoLink ? `<a class="project-link svelte-1yqr93t"${add_attribute("href", project.repoLink, 0)} target="_blank" rel="noopener noreferer">Repo
              </a>` : ``}
          </div></div>
      </article>`;
      })}</div>`}`;
    });
    css$1 = {
      code: ".custom-transition.svelte-1ncf0pz{transition-property:opacity;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:1500ms}",
      map: null
    };
    Work = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let isVisible = false;
      let hasChanged = false;
      let hasObserverSupport = true;
      $$result.css.add(css$1);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        $$rendered = `<div class="sm:mt-[12vh] mt-[8vh]" aria-hidden="true">${validate_component(Visibility, "Visibility").$$render(
          $$result,
          {
            visibilityUpdate: (state) => {
              if (!hasChanged && state !== false) {
                hasChanged = true;
                isVisible = state;
              }
            },
            hasObserverSupport
          },
          {
            hasObserverSupport: ($$value) => {
              hasObserverSupport = $$value;
              $$settled = false;
            }
          },
          {}
        )}</div>

<section class="${"section-band custom-transition " + escape(
          !hasObserverSupport || isVisible ? "opacity-100" : "opacity-0",
          true
        ) + " svelte-1ncf0pz"}"><h1 class="font-serif font-bold sm:text-6xl text-4xl">Projects</h1>
  ${validate_component(ProjectsGrid, "ProjectsGrid").$$render($$result, {}, {}, {})}
</section>`;
      } while (!$$settled);
      return $$rendered;
    });
    Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<footer class="mt-[16vh] text-center text-sm"><p class="text-gray-400">Built with Svelte &amp; Tailwind - <a href="https://github.com/grahamzemel/grahamzemel.com" target="_blank" rel="noopener noreferer">See inside!
    </a></p>
  <p class="text-gray-500">\xA9 Graham Zemel ${escape((/* @__PURE__ */ new Date()).getFullYear())}. All rights reserved.
  </p></footer>
<div class="h-10" aria-hidden="true"></div>`;
    });
    css2 = {
      code: ".custom-transition.svelte-zt4loq{transition-property:opacity;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:1500ms}.contact-button.svelte-zt4loq{position:absolute;height:4rem;width:16rem;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));cursor:pointer;align-items:center;overflow:hidden;border-radius:0.75rem;background-image:linear-gradient(to bottom right, var(--tw-gradient-stops));--tw-gradient-from:#3377FF var(--tw-gradient-from-position);--tw-gradient-from-position:  ;--tw-gradient-to:rgb(51 119 255 / 0)  var(--tw-gradient-from-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to);--tw-gradient-to:#0C55FF var(--tw-gradient-to-position);--tw-gradient-to-position:  ;--tw-shadow:0 25px 50px -12px rgb(0 0 0 / 0.25);--tw-shadow-colored:0 25px 50px -12px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:300ms;transition-timing-function:cubic-bezier(0, 0, 0.2, 1)}.contact-button.svelte-zt4loq:hover{--tw-scale-x:1.1;--tw-scale-y:1.05;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}",
      map: null
    };
    GetInTouch = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let isVisible = false;
      let hasChanged = false;
      let hasObserverSupport = true;
      $$result.css.add(css2);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        $$rendered = `<div class="mt-[8vh]" aria-hidden="true">${validate_component(Visibility, "Visibility").$$render(
          $$result,
          {
            visibilityUpdate: (state) => {
              if (!hasChanged && state !== false) {
                hasChanged = true;
                isVisible = state;
              }
            },
            hasObserverSupport
          },
          {
            hasObserverSupport: ($$value) => {
              hasObserverSupport = $$value;
              $$settled = false;
            }
          },
          {}
        )}</div>

<section id="get-in-touch" class="${"section-band custom-transition " + escape(
          !hasObserverSupport || isVisible ? "opacity-100" : "opacity-0",
          true
        ) + " svelte-zt4loq"}"><h1 class="font-serif font-bold sm:text-6xl text-4xl">Get In Touch</h1>
  <h2 class="text-lg sm:text-xl">Let&#39;s talk about potential collaborations, current projects, anything you
    want!
  </h2>
  <h3 class="mt-2 text-gray-400">Timezone: <b>GMT-5</b>, New York/USA
    </h3>

  <div class="flex flex-col md:flex-row items-center md:gap-8"><a href="mailto:me@grahamzemel.com?subject=Hello!" target="_blank" rel="noopener noreferer" class="mt-10 h-16 w-64 flex justify-center items-center"><div class="contact-button svelte-zt4loq"></div>
      <div class="text-center text-white font-semibold z-10 pointer-events-none flex justify-content items-center"><svg class="w-5 h-5 right-1.5 relative" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"></path></svg>
        <span class="ml-2">Shoot me an email!</span></div></a>

    ${validate_component(BookMeetingButton, "BookMeetingButton").$$render($$result, {}, {}, {})}</div>

  <p class="mt-6 text-gray-400">LinkedIn:
    <a class="text-accent-300 hover:text-accent-200 transition-colors" href="https://www.linkedin.com/in/grahamzemel/" target="_blank" rel="noopener noreferer">grahamzemel
    </a></p>
</section>`;
      } while (!$$settled);
      return $$rendered;
    });
    Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${validate_component(BackgroundBlob, "BackgroundBlob").$$render($$result, {}, {}, {})}

<main class="absolute top-0 left-0 z-10 w-full h-full"><div class="md:max-w-7xl 2xl:mx-auto xl:mx-32 lg:mx-32 md:mx-24 sm:mx-16 mx-10">${validate_component(Hero, "Hero").$$render($$result, {}, {}, {})}
    ${validate_component(Socials, "Socials").$$render($$result, {}, {}, {})}

    ${validate_component(AboutSection, "AboutSection").$$render($$result, {}, {}, {})}
    ${validate_component(FeaturedProjects, "FeaturedProjects").$$render($$result, {}, {}, {})}
    ${validate_component(Blog, "Blog").$$render($$result, {}, {}, {})}
    ${validate_component(Work, "Work").$$render($$result, {}, {}, {})}
    ${validate_component(GetInTouch, "GetInTouch").$$render($$result, {}, {}, {})}

    ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div></main>`;
    });
  }
});

// .svelte-kit/output/server/nodes/3.js
var __exports4 = {};
__export(__exports4, {
  component: () => component4,
  fonts: () => fonts4,
  imports: () => imports4,
  index: () => index4,
  stylesheets: () => stylesheets4
});
var index4, component_cache4, component4, imports4, stylesheets4, fonts4;
var init__4 = __esm({
  ".svelte-kit/output/server/nodes/3.js"() {
    index4 = 3;
    component4 = async () => component_cache4 ?? (component_cache4 = (await Promise.resolve().then(() => (init_page_svelte(), page_svelte_exports))).default);
    imports4 = ["_app/immutable/nodes/3.b5fb8bd7.js", "_app/immutable/chunks/index.ba56c314.js"];
    stylesheets4 = ["_app/immutable/assets/3.af1a366e.css"];
    fonts4 = [];
  }
});

// .svelte-kit/output/server/entries/pages/admin/_page.svelte.js
var page_svelte_exports2 = {};
__export(page_svelte_exports2, {
  default: () => Page2
});
var Page2;
var init_page_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/admin/_page.svelte.js"() {
    init_chunks();
    Page2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let upcoming;
      upcoming = [].slice(0, 8);
      upcoming[0] || null;
      [].filter((s2) => s2.active !== false);
      [].filter((s2) => s2.active === false);
      return `${$$result.head += `<!-- HEAD_svelte-15ff7af_START -->${$$result.title = `<title>Overview | Income Engine</title>`, ""}<!-- HEAD_svelte-15ff7af_END -->`, ""}

${`<p class="text-gray-400 text-sm mt-8">Loading...</p>`}


${``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/4.js
var __exports5 = {};
__export(__exports5, {
  component: () => component5,
  fonts: () => fonts5,
  imports: () => imports5,
  index: () => index5,
  stylesheets: () => stylesheets5
});
var index5, component_cache5, component5, imports5, stylesheets5, fonts5;
var init__5 = __esm({
  ".svelte-kit/output/server/nodes/4.js"() {
    index5 = 4;
    component5 = async () => component_cache5 ?? (component_cache5 = (await Promise.resolve().then(() => (init_page_svelte2(), page_svelte_exports2))).default);
    imports5 = ["_app/immutable/nodes/4.f91073c9.js", "_app/immutable/chunks/index.ba56c314.js", "_app/immutable/chunks/api.1b4253c7.js"];
    stylesheets5 = [];
    fonts5 = [];
  }
});

// .svelte-kit/output/server/entries/pages/admin/cashflow/_page.svelte.js
var page_svelte_exports3 = {};
__export(page_svelte_exports3, {
  default: () => Page3
});
var CHART_W, CHART_H, Page3;
var init_page_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/admin/cashflow/_page.svelte.js"() {
    init_chunks();
    CHART_W = 600;
    CHART_H = 140;
    Page3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let filtered;
      let days = 90;
      const PAD = { top: 10, right: 10, bottom: 20, left: 10 };
      filtered = [].filter((p) => {
        return true;
      });
      (() => {
        const w = {};
        for (const p of filtered) {
          const d = /* @__PURE__ */ new Date(p.date + "T12:00:00");
          const ws = new Date(d);
          ws.setDate(d.getDate() - d.getDay());
          const key2 = ws.toISOString().slice(0, 10);
          if (!w[key2])
            w[key2] = { payments: [], total: 0 };
          w[key2].payments.push(p);
          w[key2].total += p.amount;
        }
        return Object.entries(w).sort((a, b) => a[0].localeCompare(b[0]));
      })();
      filtered[0] || null;
      [].filter((p) => p.isModified).length;
      (() => {
        if (!filtered.length)
          return null;
        const w = CHART_W - PAD.left - PAD.right;
        const h = CHART_H - PAD.top - PAD.bottom;
        let running = 0;
        const points = filtered.map((p, i) => {
          running += p.amount;
          return {
            x: PAD.left + (filtered.length > 1 ? i / (filtered.length - 1) * w : w / 2),
            y: 0,
            // set below
            total: running,
            ...p
          };
        });
        const maxTotal = Math.max(...points.map((p) => p.total), 1);
        for (const p of points) {
          p.y = PAD.top + h - p.total / maxTotal * h;
        }
        const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
        const areaPath = linePath + ` L ${points[points.length - 1].x} ${CHART_H - PAD.bottom} L ${points[0].x} ${CHART_H - PAD.bottom} Z`;
        return { points, linePath, areaPath, maxTotal };
      })();
      return `${$$result.head += `<!-- HEAD_svelte-17msmz5_START -->${$$result.title = `<title>Cash Flow | Income Engine</title>`, ""}<!-- HEAD_svelte-17msmz5_END -->`, ""}

<div class="flex justify-between items-center mb-6"><div><h1 class="text-2xl font-semibold text-gray-900">Cash Flow</h1>
    <p class="text-sm text-gray-400 mt-1">When your money arrives</p></div>
  <div class="flex gap-1.5">${each([30, 60, 90, 180], (d) => {
        return `<button class="${"px-3 py-1.5 rounded-md text-xs font-medium transition " + escape(
          days === d ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-500 hover:text-gray-900",
          true
        )}">${escape(d)}d
      </button>`;
      })}</div></div>

${`<p class="text-gray-400 text-sm">Loading...</p>`}`;
    });
  }
});

// .svelte-kit/output/server/nodes/5.js
var __exports6 = {};
__export(__exports6, {
  component: () => component6,
  fonts: () => fonts6,
  imports: () => imports6,
  index: () => index6,
  stylesheets: () => stylesheets6
});
var index6, component_cache6, component6, imports6, stylesheets6, fonts6;
var init__6 = __esm({
  ".svelte-kit/output/server/nodes/5.js"() {
    index6 = 5;
    component6 = async () => component_cache6 ?? (component_cache6 = (await Promise.resolve().then(() => (init_page_svelte3(), page_svelte_exports3))).default);
    imports6 = ["_app/immutable/nodes/5.f1e94838.js", "_app/immutable/chunks/index.ba56c314.js", "_app/immutable/chunks/api.1b4253c7.js"];
    stylesheets6 = [];
    fonts6 = [];
  }
});

// .svelte-kit/output/server/entries/pages/admin/income/_page.svelte.js
var page_svelte_exports4 = {};
__export(page_svelte_exports4, {
  default: () => Page4
});
var Page4;
var init_page_svelte4 = __esm({
  ".svelte-kit/output/server/entries/pages/admin/income/_page.svelte.js"() {
    init_chunks();
    Page4 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let activeSources;
      let inactiveSources;
      let sources = [];
      activeSources = sources.filter((s2) => s2.active !== false);
      inactiveSources = sources.filter((s2) => s2.active === false);
      activeSources.reduce((s2, src) => s2 + (src.estimatedMonthly || 0), 0);
      inactiveSources.reduce((s2, src) => s2 + (src.estimatedMonthly || 0), 0);
      return `${$$result.head += `<!-- HEAD_svelte-kllxsf_START -->${$$result.title = `<title>Income | Income Engine</title>`, ""}<!-- HEAD_svelte-kllxsf_END -->`, ""}

<div class="flex justify-between items-center mb-8"><div><h1 class="text-2xl font-semibold text-gray-900">Income Sources</h1>
    <p class="text-sm text-gray-400 mt-1">Manage where your money comes from</p></div>
  <button class="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition">Add source
  </button></div>

${`<p class="text-gray-400 text-sm">Loading...</p>`}


${``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/6.js
var __exports7 = {};
__export(__exports7, {
  component: () => component7,
  fonts: () => fonts7,
  imports: () => imports7,
  index: () => index7,
  stylesheets: () => stylesheets7
});
var index7, component_cache7, component7, imports7, stylesheets7, fonts7;
var init__7 = __esm({
  ".svelte-kit/output/server/nodes/6.js"() {
    index7 = 6;
    component7 = async () => component_cache7 ?? (component_cache7 = (await Promise.resolve().then(() => (init_page_svelte4(), page_svelte_exports4))).default);
    imports7 = ["_app/immutable/nodes/6.4a4ea243.js", "_app/immutable/chunks/index.ba56c314.js", "_app/immutable/chunks/api.1b4253c7.js"];
    stylesheets7 = [];
    fonts7 = [];
  }
});

// .svelte-kit/output/server/entries/pages/admin/settings/_page.svelte.js
var page_svelte_exports5 = {};
__export(page_svelte_exports5, {
  default: () => Page5
});
var Page5;
var init_page_svelte5 = __esm({
  ".svelte-kit/output/server/entries/pages/admin/settings/_page.svelte.js"() {
    init_chunks();
    Page5 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let config = {};
      const DEFAULT_NOTIFICATION_SETTINGS = {
        enabled: true,
        channels: { push: true },
        autoSendTestOnSubscribe: true,
        quietHours: {
          enabled: false,
          start: "22:00",
          end: "08:00",
          timezone: "America/Denver"
        },
        events: {
          chargeSucceeded: true,
          chargeMinimumAmount: 5,
          chargeAccounts: { textcloaker: true, fratdoor: true },
          payoutCreated: false,
          payoutPaid: true,
          payoutAccounts: { textcloaker: true, fratdoor: true },
          subscriptionCanceled: true,
          subscriptionCanceledAccounts: { textcloaker: true, fratdoor: true },
          incomePaydayToday: true,
          incomePaydayTomorrow: true,
          incomeSourceTypes: {
            hourly: true,
            business: true,
            other: true
          },
          fratdoorBalanceReady: true,
          fratdoorBalanceMinimumAmount: 10,
          fratdoorPayoutRecorded: true,
          dailyDigest: false,
          dailyDigestLookaheadDays: 7
        }
      };
      function ensureNotificationSettings(raw = {}) {
        return {
          ...DEFAULT_NOTIFICATION_SETTINGS,
          ...raw,
          channels: {
            ...DEFAULT_NOTIFICATION_SETTINGS.channels,
            ...raw.channels || {}
          },
          quietHours: {
            ...DEFAULT_NOTIFICATION_SETTINGS.quietHours,
            ...raw.quietHours || {}
          },
          events: {
            ...DEFAULT_NOTIFICATION_SETTINGS.events,
            ...raw.events || {},
            chargeAccounts: {
              ...DEFAULT_NOTIFICATION_SETTINGS.events.chargeAccounts,
              ...raw.events?.chargeAccounts || {}
            },
            payoutAccounts: {
              ...DEFAULT_NOTIFICATION_SETTINGS.events.payoutAccounts,
              ...raw.events?.payoutAccounts || {}
            },
            subscriptionCanceledAccounts: {
              ...DEFAULT_NOTIFICATION_SETTINGS.events.subscriptionCanceledAccounts,
              ...raw.events?.subscriptionCanceledAccounts || {}
            },
            incomeSourceTypes: {
              ...DEFAULT_NOTIFICATION_SETTINGS.events.incomeSourceTypes,
              ...raw.events?.incomeSourceTypes || {}
            }
          }
        };
      }
      Object.entries(config.payPeriodCalendars || {});
      ensureNotificationSettings(config.notifications);
      return `${$$result.head += `<!-- HEAD_svelte-gzsk9t_START -->${$$result.title = `<title>Settings | Income Engine</title>`, ""}<!-- HEAD_svelte-gzsk9t_END -->`, ""}

<div class="mb-8"><h1 class="text-2xl font-semibold text-gray-900">Settings</h1>
  <p class="text-sm text-gray-400 mt-1">Tax rates, pay period calendars</p></div>

${`<p class="text-gray-400 text-sm">Loading...</p>`}`;
    });
  }
});

// .svelte-kit/output/server/nodes/7.js
var __exports8 = {};
__export(__exports8, {
  component: () => component8,
  fonts: () => fonts8,
  imports: () => imports8,
  index: () => index8,
  stylesheets: () => stylesheets8
});
var index8, component_cache8, component8, imports8, stylesheets8, fonts8;
var init__8 = __esm({
  ".svelte-kit/output/server/nodes/7.js"() {
    index8 = 7;
    component8 = async () => component_cache8 ?? (component_cache8 = (await Promise.resolve().then(() => (init_page_svelte5(), page_svelte_exports5))).default);
    imports8 = ["_app/immutable/nodes/7.6463b162.js", "_app/immutable/chunks/index.ba56c314.js", "_app/immutable/chunks/api.1b4253c7.js"];
    stylesheets8 = [];
    fonts8 = [];
  }
});

// .svelte-kit/output/server/entries/pages/admin/stripe/_page.svelte.js
var page_svelte_exports6 = {};
__export(page_svelte_exports6, {
  default: () => Page6
});
function aggregateByDate(entries, dateKey, valueKey) {
  const daily = {};
  for (const entry of entries || []) {
    const rawDate = entry?.[dateKey];
    const dayKey = toDayKey(rawDate);
    if (!dayKey)
      continue;
    daily[dayKey] = Math.round(((daily[dayKey] || 0) + Number(entry?.[valueKey] || 0)) * 100) / 100;
  }
  return Object.entries(daily).map(([date, amount]) => ({ date, amount })).sort((a, b) => a.date.localeCompare(b.date));
}
function toDayKey(value) {
  if (!value)
    return "";
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value))
    return value;
  const date = new Date(value);
  if (Number.isNaN(date.getTime()))
    return "";
  return date.toISOString().slice(0, 10);
}
function fmtShortDate(value) {
  if (!value)
    return "";
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value) ? /* @__PURE__ */ new Date(`${value}T12:00:00`) : new Date(value);
  if (Number.isNaN(date.getTime()))
    return "";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
var Page6;
var init_page_svelte6 = __esm({
  ".svelte-kit/output/server/entries/pages/admin/stripe/_page.svelte.js"() {
    init_chunks();
    Page6 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let pays;
      let otData;
      let stripePayoutSeries;
      let tab = "fratdoor";
      let balances = {};
      let payouts = {};
      let analytics = { customers: [], subscriptions: [] };
      let oneTime = {};
      let paypal = null;
      const CHART = {
        width: 720,
        height: 220,
        pad: { top: 16, right: 18, bottom: 34, left: 52 }
      };
      function buildLineChart(entries, valueKey = "amount") {
        if (!entries?.length)
          return null;
        const values = entries.map((entry) => Number(entry?.[valueKey] || 0));
        const max = Math.max(...values, 1);
        const min = 0;
        const innerWidth = CHART.width - CHART.pad.left - CHART.pad.right;
        const innerHeight = CHART.height - CHART.pad.top - CHART.pad.bottom;
        const points = entries.map((entry, index10) => {
          const value = Number(entry?.[valueKey] || 0);
          const x = CHART.pad.left + (entries.length > 1 ? index10 / (entries.length - 1) * innerWidth : innerWidth / 2);
          const y = CHART.pad.top + innerHeight - (value - min) / Math.max(max - min, 1) * innerHeight;
          return {
            ...entry,
            value,
            x,
            y,
            label: fmtShortDate(entry.date)
          };
        });
        const linePath = points.map((point, index10) => `${index10 === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
        const areaPath = `${linePath} L ${points[points.length - 1].x} ${CHART.height - CHART.pad.bottom} L ${points[0].x} ${CHART.height - CHART.pad.bottom} Z`;
        return {
          points,
          linePath,
          areaPath,
          ticks: [max, max / 2, 0],
          xLabels: [
            points[0]?.label || "",
            points[Math.floor((points.length - 1) / 2)]?.label || "",
            points[points.length - 1]?.label || ""
          ]
        };
      }
      Object.keys(balances).sort((a, b) => {
        if (a === "fratdoor")
          return -1;
        if (b === "fratdoor")
          return 1;
        if (a === "textcloaker")
          return -1;
        if (b === "textcloaker")
          return 1;
        return a.localeCompare(b);
      });
      pays = payouts[tab] || [];
      (analytics.customers || []).find((entry) => entry.account === tab);
      (analytics.subscriptions || []).find((entry) => entry.account === tab);
      otData = oneTime[tab];
      stripePayoutSeries = aggregateByDate(pays.filter((entry) => entry.status === "paid"), "arrivalDate", "amount");
      buildLineChart(stripePayoutSeries, "amount");
      buildLineChart(otData?.oneTime?.daily, "amount");
      buildLineChart(paypal?.dailyNetRevenue, "amount");
      buildLineChart(paypal?.payoutTrend, "amount");
      return `${$$result.head += `<!-- HEAD_svelte-10qt5f2_START -->${$$result.title = `<title>Startups | Income Engine</title>`, ""}<!-- HEAD_svelte-10qt5f2_END -->`, ""}

<div class="mb-6"><h1 class="text-2xl font-semibold text-gray-900">Startups</h1>
  <p class="text-sm text-gray-400 mt-1">Subscriptions, one-time purchases, and FratDoor ticketing fee payouts.</p></div>

${`<p class="text-gray-400 text-sm">Loading...</p>`}`;
    });
  }
});

// .svelte-kit/output/server/nodes/8.js
var __exports9 = {};
__export(__exports9, {
  component: () => component9,
  fonts: () => fonts9,
  imports: () => imports9,
  index: () => index9,
  stylesheets: () => stylesheets9
});
var index9, component_cache9, component9, imports9, stylesheets9, fonts9;
var init__9 = __esm({
  ".svelte-kit/output/server/nodes/8.js"() {
    index9 = 8;
    component9 = async () => component_cache9 ?? (component_cache9 = (await Promise.resolve().then(() => (init_page_svelte6(), page_svelte_exports6))).default);
    imports9 = ["_app/immutable/nodes/8.17d9bffe.js", "_app/immutable/chunks/index.ba56c314.js", "_app/immutable/chunks/api.1b4253c7.js"];
    stylesheets9 = [];
    fonts9 = [];
  }
});

// .svelte-kit/output/server/entries/endpoints/api/admin-auth/_server.js
var server_exports = {};
__export(server_exports, {
  DELETE: () => DELETE,
  POST: () => POST
});
function isSecure(request) {
  const url = new URL(request.url);
  return url.protocol === "https:";
}
async function POST({ request }) {
  const body = await request.json().catch(() => null);
  if (!body || body.key !== "Jetset14#") {
    return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
  }
  const secure = isSecure(request);
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Set-Cookie": `gz_admin=${ADMIN_TOKEN2}; Path=/; HttpOnly;${secure ? " Secure;" : ""} SameSite=${secure ? "Strict" : "Lax"}; Max-Age=3600`,
      "Content-Type": "application/json"
    }
  });
}
async function DELETE({ request }) {
  const secure = isSecure(request);
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Set-Cookie": `gz_admin=; Path=/; HttpOnly;${secure ? " Secure;" : ""} SameSite=${secure ? "Strict" : "Lax"}; Max-Age=0`,
      "Content-Type": "application/json"
    }
  });
}
var ADMIN_TOKEN2;
var init_server = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/admin-auth/_server.js"() {
    ADMIN_TOKEN2 = "gz_admin_a8f3e7c2d1b9";
  }
});

// .svelte-kit/output/server/entries/endpoints/pass/_server.js
var server_exports2 = {};
__export(server_exports2, {
  GET: () => GET
});
async function GET() {
  return new Response(null, {
    status: 302,
    headers: {
      location: "https://github.com/grahamzemel/AppleWalletBusinessCard/raw/main/grahamzemel.pkpass"
    }
  });
}
var init_server2 = __esm({
  ".svelte-kit/output/server/entries/endpoints/pass/_server.js"() {
  }
});

// .svelte-kit/output/server/chunks/internal.js
init_chunks();
var base = "";
var assets = base;
var initial = { base, assets };
function reset() {
  base = initial.base;
  assets = initial.assets;
}
var public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
function afterUpdate() {
}
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { constructors } = $$props;
  let { components = [] } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  let { data_2 = null } = $$props;
  {
    setContext("__svelte__", stores);
  }
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.constructors === void 0 && $$bindings.constructors && constructors !== void 0)
    $$bindings.constructors(constructors);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0)
    $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0)
    $$bindings.data_1(data_1);
  if ($$props.data_2 === void 0 && $$bindings.data_2 && data_2 !== void 0)
    $$bindings.data_2(data_2);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      stores.page.set(page2);
    }
    $$rendered = `



${constructors[1] ? `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${constructors[2] ? `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {
              default: () => {
                return `${validate_component(constructors[2] || missing_component, "svelte:component").$$render(
                  $$result,
                  { data: data_2, form, this: components[2] },
                  {
                    this: ($$value) => {
                      components[2] = $$value;
                      $$settled = false;
                    }
                  },
                  {}
                )}`;
              }
            }
          )}` : `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, form, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {}
          )}`}`;
        }
      }
    )}` : `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, form, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {}
    )}`}

${``}`;
  } while (!$$settled);
  return $$rendered;
});
var options = {
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "default-src": ["*", "unsafe-inline", "unsafe-eval"], "worker-src": ["self", "blob:"], "img-src": ["*"], "script-src": ["*", "unsafe-inline", "unsafe-eval", "blob:"], "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  track_server_fetches: false,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root: Root,
  service_worker: false,
  templates: {
    app: ({ head, body, assets: assets2, nonce, env }) => '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <link\n      rel="icon"\n      type="image/svg+xml"\n      href="' + assets2 + `/favicon.svg"
    />
    <meta name="title" content="Graham Zemel" />
    <meta name="description" content="Hi! I'm Graham Zemel, a full stack developer, startup founder, and cybersecurity enthusiast!" />
    <meta name="viewport" content="width=device-width" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.js"><\/script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/addons/p5.sound.min.js"><\/script>
    <script src="` + assets2 + '/sketch.cjs"><\/script>\n\n    ' + head + '\n  </head>\n\n  <body data-sveltekit-preload-data="hover" class="overflow-x-hidden">\n    <div style="display: contents">' + body + "</div>\n  </body>\n</html>\n",
    error: ({ status, message }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "1drf6e"
};
function get_hooks() {
  return Promise.resolve().then(() => (init_hooks_server(), hooks_server_exports));
}

// node_modules/devalue/src/utils.js
var escaped = {
  "<": "\\u003C",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var DevalueError = class extends Error {
  /**
   * @param {string} message
   * @param {string[]} keys
   */
  constructor(message, keys) {
    super(message);
    this.name = "DevalueError";
    this.path = keys.join("");
  }
};
function is_primitive(thing) {
  return Object(thing) !== thing;
}
var object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(
  Object.prototype
).sort().join("\0");
function is_plain_object(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function get_escaped_char(char) {
  switch (char) {
    case '"':
      return '\\"';
    case "<":
      return "\\u003C";
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "	":
      return "\\t";
    case "\b":
      return "\\b";
    case "\f":
      return "\\f";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return char < " " ? `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
  }
}
function stringify_string(str) {
  let result = "";
  let last_pos = 0;
  const len = str.length;
  for (let i = 0; i < len; i += 1) {
    const char = str[i];
    const replacement = get_escaped_char(char);
    if (replacement) {
      result += str.slice(last_pos, i) + replacement;
      last_pos = i + 1;
    }
  }
  return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}

// node_modules/devalue/src/uneval.js
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafe_chars = /[<\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
function uneval(value, replacer) {
  const counts = /* @__PURE__ */ new Map();
  const keys = [];
  const custom = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (!is_primitive(thing)) {
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      if (replacer) {
        const str2 = replacer(thing);
        if (typeof str2 === "string") {
          custom.set(thing, str2);
          return;
        }
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach((value2, i) => {
            keys.push(`[${i}]`);
            walk(value2);
            keys.pop();
          });
          break;
        case "Set":
          Array.from(thing).forEach(walk);
          break;
        case "Map":
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive(key2) : "..."})`
            );
            walk(value2);
            keys.pop();
          }
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          for (const key2 in thing) {
            keys.push(`.${key2}`);
            walk(thing[key2]);
            keys.pop();
          }
      }
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a, b) => b[1] - a[1]).forEach((entry, i) => {
    names.set(entry[0], get_name(i));
  });
  function stringify2(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (is_primitive(thing)) {
      return stringify_primitive(thing);
    }
    if (custom.has(thing)) {
      return custom.get(thing);
    }
    const type = get_type(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify2(thing.valueOf())})`;
      case "RegExp":
        return `new RegExp(${stringify_string(thing.source)}, "${thing.flags}")`;
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = (
          /** @type {any[]} */
          thing.map(
            (v, i) => i in thing ? stringify2(v) : ""
          )
        );
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify2).join(",")}])`;
      default:
        const obj = `{${Object.keys(thing).map((key2) => `${safe_key(key2)}:${stringify2(thing[key2])}`).join(",")}}`;
        const proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? `Object.assign(Object.create(null),${obj})` : `Object.create(null)`;
        }
        return obj;
    }
  }
  const str = stringify2(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name2, thing) => {
      params.push(name2);
      if (custom.has(thing)) {
        values.push(
          /** @type {string} */
          custom.get(thing)
        );
        return;
      }
      if (is_primitive(thing)) {
        values.push(stringify_primitive(thing));
        return;
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify2(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i) => {
            statements.push(`${name2}[${i}]=${stringify2(v)}`);
          });
          break;
        case "Set":
          values.push(`new Set`);
          statements.push(
            `${name2}.${Array.from(thing).map((v) => `add(${stringify2(v)})`).join(".")}`
          );
          break;
        case "Map":
          values.push(`new Map`);
          statements.push(
            `${name2}.${Array.from(thing).map(([k, v]) => `set(${stringify2(k)}, ${stringify2(v)})`).join(".")}`
          );
          break;
        default:
          values.push(
            Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}"
          );
          Object.keys(thing).forEach((key2) => {
            statements.push(
              `${name2}${safe_prop(key2)}=${stringify2(thing[key2])}`
            );
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(
      ";"
    )}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function get_name(num) {
  let name2 = "";
  do {
    name2 = chars[num % chars.length] + name2;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name2) ? `${name2}0` : name2;
}
function escape_unsafe_char(c) {
  return escaped[c] || c;
}
function escape_unsafe_chars(str) {
  return str.replace(unsafe_chars, escape_unsafe_char);
}
function safe_key(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escape_unsafe_chars(JSON.stringify(key2));
}
function safe_prop(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? `.${key2}` : `[${escape_unsafe_chars(JSON.stringify(key2))}]`;
}
function stringify_primitive(thing) {
  if (typeof thing === "string")
    return stringify_string(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  const str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  if (typeof thing === "bigint")
    return thing + "n";
  return str;
}

// node_modules/devalue/src/constants.js
var UNDEFINED = -1;
var HOLE = -2;
var NAN = -3;
var POSITIVE_INFINITY = -4;
var NEGATIVE_INFINITY = -5;
var NEGATIVE_ZERO = -6;

// node_modules/devalue/src/stringify.js
function stringify(value, reducers) {
  const stringified = [];
  const indexes = /* @__PURE__ */ new Map();
  const custom = [];
  for (const key2 in reducers) {
    custom.push({ key: key2, fn: reducers[key2] });
  }
  const keys = [];
  let p = 0;
  function flatten(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (indexes.has(thing))
      return indexes.get(thing);
    if (thing === void 0)
      return UNDEFINED;
    if (Number.isNaN(thing))
      return NAN;
    if (thing === Infinity)
      return POSITIVE_INFINITY;
    if (thing === -Infinity)
      return NEGATIVE_INFINITY;
    if (thing === 0 && 1 / thing < 0)
      return NEGATIVE_ZERO;
    const index11 = p++;
    indexes.set(thing, index11);
    for (const { key: key2, fn } of custom) {
      const value2 = fn(thing);
      if (value2) {
        stringified[index11] = `["${key2}",${flatten(value2)}]`;
        return index11;
      }
    }
    let str = "";
    if (is_primitive(thing)) {
      str = stringify_primitive2(thing);
    } else {
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          str = `["Object",${stringify_primitive2(thing)}]`;
          break;
        case "BigInt":
          str = `["BigInt",${thing}]`;
          break;
        case "Date":
          const valid = !isNaN(thing.getDate());
          str = `["Date","${valid ? thing.toISOString() : ""}"]`;
          break;
        case "RegExp":
          const { source, flags } = thing;
          str = flags ? `["RegExp",${stringify_string(source)},"${flags}"]` : `["RegExp",${stringify_string(source)}]`;
          break;
        case "Array":
          str = "[";
          for (let i = 0; i < thing.length; i += 1) {
            if (i > 0)
              str += ",";
            if (i in thing) {
              keys.push(`[${i}]`);
              str += flatten(thing[i]);
              keys.pop();
            } else {
              str += HOLE;
            }
          }
          str += "]";
          break;
        case "Set":
          str = '["Set"';
          for (const value2 of thing) {
            str += `,${flatten(value2)}`;
          }
          str += "]";
          break;
        case "Map":
          str = '["Map"';
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive2(key2) : "..."})`
            );
            str += `,${flatten(key2)},${flatten(value2)}`;
            keys.pop();
          }
          str += "]";
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          if (Object.getPrototypeOf(thing) === null) {
            str = '["null"';
            for (const key2 in thing) {
              keys.push(`.${key2}`);
              str += `,${stringify_string(key2)},${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "]";
          } else {
            str = "{";
            let started = false;
            for (const key2 in thing) {
              if (started)
                str += ",";
              started = true;
              keys.push(`.${key2}`);
              str += `${stringify_string(key2)}:${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "}";
          }
      }
    }
    stringified[index11] = str;
    return index11;
  }
  const index10 = flatten(value);
  if (index10 < 0)
    return `${index10}`;
  return `[${stringified.join(",")}]`;
}
function stringify_primitive2(thing) {
  const type = typeof thing;
  if (type === "string")
    return stringify_string(thing);
  if (thing instanceof String)
    return stringify_string(thing.toString());
  if (thing === void 0)
    return UNDEFINED.toString();
  if (thing === 0 && 1 / thing < 0)
    return NEGATIVE_ZERO.toString();
  if (type === "bigint")
    return `["BigInt","${thing}"]`;
  return String(thing);
}

// .svelte-kit/output/server/index.js
init_chunks();
var import_cookie = __toESM(require_cookie(), 1);
var set_cookie_parser = __toESM(require_set_cookie(), 1);
var DEV = false;
var SVELTE_KIT_ASSETS = "/_svelte_kit_assets";
var ENDPOINT_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"];
var PAGE_METHODS = ["GET", "POST", "HEAD"];
function negotiate(accept, types) {
  const parts = [];
  accept.split(",").forEach((str, i) => {
    const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      parts.push({ type, subtype, q: +q, i });
    }
  });
  parts.sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex(
      (part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*")
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function is_content_type(request, ...types) {
  const type = request.headers.get("content-type")?.split(";", 1)[0].trim() ?? "";
  return types.includes(type.toLowerCase());
}
function is_form_content_type(request) {
  return is_content_type(
    request,
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
  );
}
var HttpError = class {
  /**
   * @param {number} status
   * @param {{message: string} extends App.Error ? (App.Error | string | undefined) : App.Error} body
   */
  constructor(status, body) {
    this.status = status;
    if (typeof body === "string") {
      this.body = { message: body };
    } else if (body) {
      this.body = body;
    } else {
      this.body = { message: `Error: ${status}` };
    }
  }
  toString() {
    return JSON.stringify(this.body);
  }
};
var Redirect = class {
  /**
   * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308} status
   * @param {string} location
   */
  constructor(status, location) {
    this.status = status;
    this.location = location;
  }
};
var NotFound = class extends Error {
  /**
   * @param {string} pathname
   */
  constructor(pathname) {
    super();
    this.status = 404;
    this.message = `Not found: ${pathname}`;
  }
};
var ActionFailure = class {
  /**
   * @param {number} status
   * @param {T} [data]
   */
  constructor(status, data) {
    this.status = status;
    this.data = data;
  }
};
function exec(match, params, matchers) {
  const result = {};
  const values = match.slice(1);
  const values_needing_match = values.filter((value) => value !== void 0);
  let buffered = 0;
  for (let i = 0; i < params.length; i += 1) {
    const param = params[i];
    let value = values[i - buffered];
    if (param.chained && param.rest && buffered) {
      value = values.slice(i - buffered, i + 1).filter((s2) => s2).join("/");
      buffered = 0;
    }
    if (value === void 0) {
      if (param.rest)
        result[param.name] = "";
      continue;
    }
    if (!param.matcher || matchers[param.matcher](value)) {
      result[param.name] = value;
      const next_param = params[i + 1];
      const next_value = values[i + 1];
      if (next_param && !next_param.rest && next_param.optional && next_value && param.chained) {
        buffered = 0;
      }
      if (!next_param && !next_value && Object.keys(result).length === values_needing_match.length) {
        buffered = 0;
      }
      continue;
    }
    if (param.optional && param.chained) {
      buffered++;
      continue;
    }
    return;
  }
  if (buffered)
    return;
  return result;
}
function error(status, body) {
  if (isNaN(status) || status < 400 || status > 599) {
    throw new Error(`HTTP error status codes must be between 400 and 599 \u2014 ${status} is invalid`);
  }
  return new HttpError(status, body);
}
function json(data, init2) {
  const body = JSON.stringify(data);
  const headers = new Headers(init2?.headers);
  if (!headers.has("content-length")) {
    headers.set("content-length", encoder$3.encode(body).byteLength.toString());
  }
  if (!headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }
  return new Response(body, {
    ...init2,
    headers
  });
}
var encoder$3 = new TextEncoder();
function text(body, init2) {
  const headers = new Headers(init2?.headers);
  if (!headers.has("content-length")) {
    const encoded = encoder$3.encode(body);
    headers.set("content-length", encoded.byteLength.toString());
    return new Response(encoded, {
      ...init2,
      headers
    });
  }
  return new Response(body, {
    ...init2,
    headers
  });
}
function coalesce_to_error(err) {
  return err instanceof Error || err && /** @type {any} */
  err.name && /** @type {any} */
  err.message ? (
    /** @type {Error} */
    err
  ) : new Error(JSON.stringify(err));
}
function normalize_error(error2) {
  return (
    /** @type {import('../runtime/control.js').Redirect | import('../runtime/control.js').HttpError | Error} */
    error2
  );
}
function method_not_allowed(mod, method) {
  return text(`${method} method not allowed`, {
    status: 405,
    headers: {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: allowed_methods(mod).join(", ")
    }
  });
}
function allowed_methods(mod) {
  const allowed = ENDPOINT_METHODS.filter((method) => method in mod);
  if ("GET" in mod || "HEAD" in mod)
    allowed.push("HEAD");
  return allowed;
}
function static_error_page(options2, status, message) {
  let page2 = options2.templates.error({ status, message });
  return text(page2, {
    headers: { "content-type": "text/html; charset=utf-8" },
    status
  });
}
async function handle_fatal_error(event, options2, error2) {
  error2 = error2 instanceof HttpError ? error2 : coalesce_to_error(error2);
  const status = error2 instanceof HttpError ? error2.status : 500;
  const body = await handle_error_and_jsonify(event, options2, error2);
  const type = negotiate(event.request.headers.get("accept") || "text/html", [
    "application/json",
    "text/html"
  ]);
  if (event.isDataRequest || type === "application/json") {
    return json(body, {
      status
    });
  }
  return static_error_page(options2, status, body.message);
}
async function handle_error_and_jsonify(event, options2, error2) {
  if (error2 instanceof HttpError) {
    return error2.body;
  }
  return await options2.hooks.handleError({ error: error2, event }) ?? {
    message: event.route.id === null && error2 instanceof NotFound ? "Not Found" : "Internal Error"
  };
}
function redirect_response(status, location) {
  const response = new Response(void 0, {
    status,
    headers: { location }
  });
  return response;
}
function clarify_devalue_error(event, error2) {
  if (error2.path) {
    return `Data returned from \`load\` while rendering ${event.route.id} is not serializable: ${error2.message} (data${error2.path})`;
  }
  if (error2.path === "") {
    return `Data returned from \`load\` while rendering ${event.route.id} is not a plain object`;
  }
  return error2.message;
}
function stringify_uses(node) {
  const uses = [];
  if (node.uses && node.uses.dependencies.size > 0) {
    uses.push(`"dependencies":${JSON.stringify(Array.from(node.uses.dependencies))}`);
  }
  if (node.uses && node.uses.params.size > 0) {
    uses.push(`"params":${JSON.stringify(Array.from(node.uses.params))}`);
  }
  if (node.uses?.parent)
    uses.push('"parent":1');
  if (node.uses?.route)
    uses.push('"route":1');
  if (node.uses?.url)
    uses.push('"url":1');
  return `"uses":{${uses.join(",")}}`;
}
function warn_with_callsite(message, offset = 0) {
  console.warn(message);
}
async function render_endpoint(event, mod, state) {
  const method = (
    /** @type {import('types').HttpMethod} */
    event.request.method
  );
  let handler = mod[method] || mod.fallback;
  if (method === "HEAD" && mod.GET && !mod.HEAD) {
    handler = mod.GET;
  }
  if (!handler) {
    return method_not_allowed(mod, method);
  }
  const prerender = mod.prerender ?? state.prerender_default;
  if (prerender && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
    throw new Error("Cannot prerender endpoints that have mutative methods");
  }
  if (state.prerendering && !prerender) {
    if (state.depth > 0) {
      throw new Error(`${event.route.id} is not prerenderable`);
    } else {
      return new Response(void 0, { status: 204 });
    }
  }
  try {
    let response = await handler(
      /** @type {import('@sveltejs/kit').RequestEvent<Record<string, any>>} */
      event
    );
    if (!(response instanceof Response)) {
      throw new Error(
        `Invalid response from route ${event.url.pathname}: handler should return a Response object`
      );
    }
    if (state.prerendering) {
      response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(response.headers)
      });
      response.headers.set("x-sveltekit-prerender", String(prerender));
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      return new Response(void 0, {
        status: e.status,
        headers: { location: e.location }
      });
    }
    throw e;
  }
}
function is_endpoint_request(event) {
  const { method, headers } = event.request;
  if (ENDPOINT_METHODS.includes(method) && !PAGE_METHODS.includes(method)) {
    return true;
  }
  if (method === "POST" && headers.get("x-sveltekit-action") === "true")
    return false;
  const accept = event.request.headers.get("accept") ?? "*/*";
  return negotiate(accept, ["*", "text/html"]) !== "text/html";
}
function compact(arr) {
  return arr.filter(
    /** @returns {val is NonNullable<T>} */
    (val) => val != null
  );
}
var SCHEME = /^[a-z][a-z\d+\-.]+:/i;
var absolute = /^([a-z]+:)?\/?\//;
function resolve(base2, path) {
  if (SCHEME.test(path))
    return path;
  if (path[0] === "#")
    return base2 + path;
  const base_match = absolute.exec(base2);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base2}"`);
  }
  const baseparts = path_match ? [] : base2.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path.slice(path_match[0].length).split("/") : path.split("/");
  baseparts.pop();
  for (let i = 0; i < pathparts.length; i += 1) {
    const part = pathparts[i];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix}${baseparts.join("/")}`;
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_pathname(pathname) {
  return pathname.split("%25").map(decodeURI).join("%25");
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = decodeURIComponent(params[key2]);
  }
  return params;
}
var tracked_url_properties = (
  /** @type {const} */
  [
    "href",
    "pathname",
    "search",
    "searchParams",
    "toString",
    "toJSON"
  ]
);
function make_trackable(url, callback) {
  const tracked = new URL(url);
  for (const property of tracked_url_properties) {
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return url[property];
      },
      enumerable: true,
      configurable: true
    });
  }
  {
    tracked[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url, opts);
    };
  }
  disable_hash(tracked);
  return tracked;
}
function disable_hash(url) {
  allow_nodejs_console_log(url);
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead"
      );
    }
  });
}
function disable_search(url) {
  allow_nodejs_console_log(url);
  for (const property of ["search", "searchParams"]) {
    Object.defineProperty(url, property, {
      get() {
        throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
      }
    });
  }
}
function allow_nodejs_console_log(url) {
  {
    url[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(new URL(url), opts);
    };
  }
}
var DATA_SUFFIX = "/__data.json";
function has_data_suffix(pathname) {
  return pathname.endsWith(DATA_SUFFIX);
}
function add_data_suffix(pathname) {
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
function strip_data_suffix(pathname) {
  return pathname.slice(0, -DATA_SUFFIX.length);
}
function is_action_json_request(event) {
  const accept = negotiate(event.request.headers.get("accept") ?? "*/*", [
    "application/json",
    "text/html"
  ]);
  return accept === "application/json" && event.request.method === "POST";
}
async function handle_action_json_request(event, options2, server2) {
  const actions = server2?.actions;
  if (!actions) {
    const no_actions_error = error(405, "POST method not allowed. No actions exist for this page");
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, no_actions_error)
      },
      {
        status: no_actions_error.status,
        headers: {
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
          // "The server must generate an Allow header field in a 405 status code response"
          allow: "GET"
        }
      }
    );
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return action_json({
        type: "failure",
        status: data.status,
        // @ts-expect-error we assign a string to what is supposed to be an object. That's ok
        // because we don't use the object outside, and this way we have better code navigation
        // through knowing where the related interface is used.
        data: stringify_action_response(
          data.data,
          /** @type {string} */
          event.route.id
        )
      });
    } else {
      return action_json({
        type: "success",
        status: data ? 200 : 204,
        // @ts-expect-error see comment above
        data: stringify_action_response(
          data,
          /** @type {string} */
          event.route.id
        )
      });
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return action_json_redirect(err);
    }
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, check_incorrect_fail_use(err))
      },
      {
        status: err instanceof HttpError ? err.status : 500
      }
    );
  }
}
function check_incorrect_fail_use(error2) {
  return error2 instanceof ActionFailure ? new Error('Cannot "throw fail()". Use "return fail()"') : error2;
}
function action_json_redirect(redirect) {
  return action_json({
    type: "redirect",
    status: redirect.status,
    location: redirect.location
  });
}
function action_json(data, init2) {
  return json(data, init2);
}
function is_action_request(event) {
  return event.request.method === "POST";
}
async function handle_action_request(event, server2) {
  const actions = server2?.actions;
  if (!actions) {
    event.setHeaders({
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: "GET"
    });
    return {
      type: "error",
      error: error(405, "POST method not allowed. No actions exist for this page")
    };
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return {
        type: "failure",
        status: data.status,
        data: data.data
      };
    } else {
      return {
        type: "success",
        status: 200,
        // @ts-expect-error this will be removed upon serialization, so `undefined` is the same as omission
        data
      };
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return {
        type: "redirect",
        status: err.status,
        location: err.location
      };
    }
    return {
      type: "error",
      error: check_incorrect_fail_use(err)
    };
  }
}
function check_named_default_separate(actions) {
  if (actions.default && Object.keys(actions).length > 1) {
    throw new Error(
      "When using named actions, the default action cannot be used. See the docs for more info: https://kit.svelte.dev/docs/form-actions#named-actions"
    );
  }
}
async function call_action(event, actions) {
  const url = new URL(event.request.url);
  let name2 = "default";
  for (const param of url.searchParams) {
    if (param[0].startsWith("/")) {
      name2 = param[0].slice(1);
      if (name2 === "default") {
        throw new Error('Cannot use reserved action name "default"');
      }
      break;
    }
  }
  const action = actions[name2];
  if (!action) {
    throw new Error(`No action with name '${name2}' found`);
  }
  if (!is_form_content_type(event.request)) {
    throw new Error(
      `Actions expect form-encoded data (received ${event.request.headers.get("content-type")})`
    );
  }
  return action(event);
}
function uneval_action_response(data, route_id) {
  return try_deserialize(data, uneval, route_id);
}
function stringify_action_response(data, route_id) {
  return try_deserialize(data, stringify, route_id);
}
function try_deserialize(data, fn, route_id) {
  try {
    return fn(data);
  } catch (e) {
    const error2 = (
      /** @type {any} */
      e
    );
    if ("path" in error2) {
      let message = `Data returned from action inside ${route_id} is not serializable: ${error2.message}`;
      if (error2.path !== "")
        message += ` (data.${error2.path})`;
      throw new Error(message);
    }
    throw error2;
  }
}
async function unwrap_promises(object, id) {
  for (const key2 in object) {
    if (typeof object[key2]?.then === "function") {
      return Object.fromEntries(
        await Promise.all(Object.entries(object).map(async ([key3, value]) => [key3, await value]))
      );
    }
  }
  return object;
}
var INVALIDATED_PARAM = "x-sveltekit-invalidated";
var TRAILING_SLASH_PARAM = "x-sveltekit-trailing-slash";
async function load_server_data({
  event,
  state,
  node,
  parent,
  // TODO 2.0: Remove this
  track_server_fetches
}) {
  if (!node?.server)
    return null;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    route: false,
    url: false
  };
  const url = make_trackable(event.url, () => {
    uses.url = true;
  });
  if (state.prerendering) {
    disable_search(url);
  }
  const result = await node.server.load?.call(null, {
    ...event,
    fetch: (info, init2) => {
      const url2 = new URL(info instanceof Request ? info.url : info, event.url);
      if (track_server_fetches) {
        uses.dependencies.add(url2.href);
      }
      return event.fetch(info, init2);
    },
    /** @param {string[]} deps */
    depends: (...deps) => {
      for (const dep of deps) {
        const { href } = new URL(dep, event.url);
        uses.dependencies.add(href);
      }
    },
    params: new Proxy(event.params, {
      get: (target, key2) => {
        uses.params.add(key2);
        return target[
          /** @type {string} */
          key2
        ];
      }
    }),
    parent: async () => {
      uses.parent = true;
      return parent();
    },
    route: new Proxy(event.route, {
      get: (target, key2) => {
        uses.route = true;
        return target[
          /** @type {'id'} */
          key2
        ];
      }
    }),
    url
  });
  const data = result ? await unwrap_promises(result, node.server_id) : null;
  return {
    type: "data",
    data,
    uses,
    slash: node.server.trailingSlash
  };
}
async function load_data({
  event,
  fetched,
  node,
  parent,
  server_data_promise,
  state,
  resolve_opts,
  csr
}) {
  const server_data_node = await server_data_promise;
  if (!node?.universal?.load) {
    return server_data_node?.data ?? null;
  }
  const result = await node.universal.load.call(null, {
    url: event.url,
    params: event.params,
    data: server_data_node?.data ?? null,
    route: event.route,
    fetch: create_universal_fetch(event, state, fetched, csr, resolve_opts),
    setHeaders: event.setHeaders,
    depends: () => {
    },
    parent
  });
  const data = result ? await unwrap_promises(result, node.universal_id) : null;
  return data;
}
function b64_encode(buffer) {
  if (globalThis.Buffer) {
    return Buffer.from(buffer).toString("base64");
  }
  const little_endian = new Uint8Array(new Uint16Array([1]).buffer)[0] > 0;
  return btoa(
    new TextDecoder(little_endian ? "utf-16le" : "utf-16be").decode(
      new Uint16Array(new Uint8Array(buffer))
    )
  );
}
function create_universal_fetch(event, state, fetched, csr, resolve_opts) {
  const universal_fetch = async (input, init2) => {
    const cloned_body = input instanceof Request && input.body ? input.clone().body : null;
    const cloned_headers = input instanceof Request && [...input.headers].length ? new Headers(input.headers) : init2?.headers;
    let response = await event.fetch(input, init2);
    const url = new URL(input instanceof Request ? input.url : input, event.url);
    const same_origin = url.origin === event.url.origin;
    let dependency;
    if (same_origin) {
      if (state.prerendering) {
        dependency = { response, body: null };
        state.prerendering.dependencies.set(url.pathname, dependency);
      }
    } else {
      const mode = input instanceof Request ? input.mode : init2?.mode ?? "cors";
      if (mode === "no-cors") {
        response = new Response("", {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      } else {
        const acao = response.headers.get("access-control-allow-origin");
        if (!acao || acao !== event.url.origin && acao !== "*") {
          throw new Error(
            `CORS error: ${acao ? "Incorrect" : "No"} 'Access-Control-Allow-Origin' header is present on the requested resource`
          );
        }
      }
    }
    const proxy = new Proxy(response, {
      get(response2, key2, _receiver) {
        async function push_fetched(body, is_b64) {
          const status_number = Number(response2.status);
          if (isNaN(status_number)) {
            throw new Error(
              `response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`
            );
          }
          fetched.push({
            url: same_origin ? url.href.slice(event.url.origin.length) : url.href,
            method: event.request.method,
            request_body: (
              /** @type {string | ArrayBufferView | undefined} */
              input instanceof Request && cloned_body ? await stream_to_string(cloned_body) : init2?.body
            ),
            request_headers: cloned_headers,
            response_body: body,
            response: response2,
            is_b64
          });
        }
        if (key2 === "arrayBuffer") {
          return async () => {
            const buffer = await response2.arrayBuffer();
            if (dependency) {
              dependency.body = new Uint8Array(buffer);
            }
            if (buffer instanceof ArrayBuffer) {
              await push_fetched(b64_encode(buffer), true);
            }
            return buffer;
          };
        }
        async function text2() {
          const body = await response2.text();
          if (!body || typeof body === "string") {
            await push_fetched(body, false);
          }
          if (dependency) {
            dependency.body = body;
          }
          return body;
        }
        if (key2 === "text") {
          return text2;
        }
        if (key2 === "json") {
          return async () => {
            return JSON.parse(await text2());
          };
        }
        return Reflect.get(response2, key2, response2);
      }
    });
    if (csr) {
      const get = response.headers.get;
      response.headers.get = (key2) => {
        const lower = key2.toLowerCase();
        const value = get.call(response.headers, lower);
        if (value && !lower.startsWith("x-sveltekit-")) {
          const included = resolve_opts.filterSerializedResponseHeaders(lower, value);
          if (!included) {
            throw new Error(
              `Failed to get response header "${lower}" \u2014 it must be included by the \`filterSerializedResponseHeaders\` option: https://kit.svelte.dev/docs/hooks#server-hooks-handle (at ${event.route.id})`
            );
          }
        }
        return value;
      };
    }
    return proxy;
  };
  return (input, init2) => {
    const response = universal_fetch(input, init2);
    response.catch(() => {
    });
    return response;
  };
}
async function stream_to_string(stream) {
  let result = "";
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += decoder.decode(value);
  }
  return result;
}
var subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function hash(...values) {
  let hash2 = 5381;
  for (const value of values) {
    if (typeof value === "string") {
      let i = value.length;
      while (i)
        hash2 = hash2 * 33 ^ value.charCodeAt(--i);
    } else if (ArrayBuffer.isView(value)) {
      const buffer = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
      let i = buffer.length;
      while (i)
        hash2 = hash2 * 33 ^ buffer[--i];
    } else {
      throw new TypeError("value must be a string or TypedArray");
    }
  }
  return (hash2 >>> 0).toString(36);
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(
  // special characters
  `[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`,
  "g"
);
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var replacements = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var pattern = new RegExp(`[${Object.keys(replacements).join("")}]`, "g");
function serialize_data(fetched, filter, prerendering = false) {
  const headers = {};
  let cache_control = null;
  let age = null;
  let varyAny = false;
  for (const [key2, value] of fetched.response.headers) {
    if (filter(key2, value)) {
      headers[key2] = value;
    }
    if (key2 === "cache-control")
      cache_control = value;
    else if (key2 === "age")
      age = value;
    else if (key2 === "vary" && value.trim() === "*")
      varyAny = true;
  }
  const payload = {
    status: fetched.response.status,
    statusText: fetched.response.statusText,
    headers,
    body: fetched.response_body
  };
  const safe_payload = JSON.stringify(payload).replace(pattern, (match) => replacements[match]);
  const attrs = [
    'type="application/json"',
    "data-sveltekit-fetched",
    `data-url=${escape_html_attr(fetched.url)}`
  ];
  if (fetched.is_b64) {
    attrs.push("data-b64");
  }
  if (fetched.request_headers || fetched.request_body) {
    const values = [];
    if (fetched.request_headers) {
      values.push([...new Headers(fetched.request_headers)].join(","));
    }
    if (fetched.request_body) {
      values.push(fetched.request_body);
    }
    attrs.push(`data-hash="${hash(...values)}"`);
  }
  if (!prerendering && fetched.method === "GET" && cache_control && !varyAny) {
    const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
    if (match) {
      const ttl = +match[1] - +(age ?? "0");
      attrs.push(`data-ttl="${ttl}"`);
    }
  }
  return `<script ${attrs.join(" ")}>${safe_payload}<\/script>`;
}
var s = JSON.stringify;
var encoder$2 = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array2 = encode(data);
  for (let i = 0; i < array2.length; i += 16) {
    const w = array2.subarray(i, i + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i2 = 0; i2 < 64; i2++) {
      if (i2 < 16) {
        tmp = w[i2];
      } else {
        a = w[i2 + 1 & 15];
        b = w[i2 + 14 & 15];
        tmp = w[i2 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i2 & 15] + w[i2 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i2];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x) {
    return (x - Math.floor(x)) * 4294967296;
  }
  let prime = 2;
  for (let i = 0; i < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i < 8) {
        init[i] = frac(prime ** (1 / 2));
      }
      key[i] = frac(prime ** (1 / 3));
      i++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i = 0; i < bytes.length; i += 4) {
    const a = bytes[i + 0];
    const b = bytes[i + 1];
    const c = bytes[i + 2];
    const d = bytes[i + 3];
    bytes[i + 0] = d;
    bytes[i + 1] = c;
    bytes[i + 2] = b;
    bytes[i + 3] = a;
  }
}
function encode(str) {
  const encoded = encoder$2.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i;
  for (i = 2; i < l; i += 3) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2 | bytes[i] >> 6];
    result += chars2[bytes[i] & 63];
  }
  if (i === l + 1) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4];
    result += "==";
  }
  if (i === l) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64(array);
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample",
  "wasm-unsafe-eval",
  "script"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var _use_hashes, _script_needs_csp, _style_needs_csp, _directives, _script_src, _style_src, _nonce;
var BaseProvider = class {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    /** @type {boolean} */
    __privateAdd(this, _use_hashes, void 0);
    /** @type {boolean} */
    __privateAdd(this, _script_needs_csp, void 0);
    /** @type {boolean} */
    __privateAdd(this, _style_needs_csp, void 0);
    /** @type {import('types').CspDirectives} */
    __privateAdd(this, _directives, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _script_src, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _style_src, void 0);
    /** @type {string} */
    __privateAdd(this, _nonce, void 0);
    __privateSet(this, _use_hashes, use_hashes);
    __privateSet(this, _directives, directives);
    const d = __privateGet(this, _directives);
    __privateSet(this, _script_src, []);
    __privateSet(this, _style_src, []);
    const effective_script_src = d["script-src"] || d["default-src"];
    const effective_style_src = d["style-src"] || d["default-src"];
    __privateSet(this, _script_needs_csp, !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0);
    __privateSet(this, _style_needs_csp, !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0);
    this.script_needs_nonce = __privateGet(this, _script_needs_csp) && !__privateGet(this, _use_hashes);
    this.style_needs_nonce = __privateGet(this, _style_needs_csp) && !__privateGet(this, _use_hashes);
    __privateSet(this, _nonce, nonce);
  }
  /** @param {string} content */
  add_script(content) {
    if (__privateGet(this, _script_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _script_src).push(`sha256-${sha256(content)}`);
      } else if (__privateGet(this, _script_src).length === 0) {
        __privateGet(this, _script_src).push(`nonce-${__privateGet(this, _nonce)}`);
      }
    }
  }
  /** @param {string} content */
  add_style(content) {
    if (__privateGet(this, _style_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _style_src).push(`sha256-${sha256(content)}`);
      } else if (__privateGet(this, _style_src).length === 0) {
        __privateGet(this, _style_src).push(`nonce-${__privateGet(this, _nonce)}`);
      }
    }
  }
  /**
   * @param {boolean} [is_meta]
   */
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...__privateGet(this, _directives) };
    if (__privateGet(this, _style_src).length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...__privateGet(this, _style_src)
      ];
    }
    if (__privateGet(this, _script_src).length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...__privateGet(this, _script_src)
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = (
        /** @type {string[] | true} */
        directives[key2]
      );
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
};
_use_hashes = new WeakMap();
_script_needs_csp = new WeakMap();
_style_needs_csp = new WeakMap();
_directives = new WeakMap();
_script_src = new WeakMap();
_style_src = new WeakMap();
_nonce = new WeakMap();
var CspProvider = class extends BaseProvider {
  get_meta() {
    const content = this.get_header(true);
    if (!content) {
      return;
    }
    return `<meta http-equiv="content-security-policy" content=${escape_html_attr(content)}>`;
  }
};
var CspReportOnlyProvider = class extends BaseProvider {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    super(use_hashes, directives, nonce);
    if (Object.values(directives).filter((v) => !!v).length > 0) {
      const has_report_to = directives["report-to"]?.length ?? 0 > 0;
      const has_report_uri = directives["report-uri"]?.length ?? 0 > 0;
      if (!has_report_to && !has_report_uri) {
        throw Error(
          "`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both"
        );
      }
    }
  }
};
var Csp = class {
  /**
   * @param {import('./types.js').CspConfig} config
   * @param {import('./types.js').CspOpts} opts
   */
  constructor({ mode, directives, reportOnly }, { prerender }) {
    /** @readonly */
    __publicField(this, "nonce", generate_nonce());
    /** @type {CspProvider} */
    __publicField(this, "csp_provider");
    /** @type {CspReportOnlyProvider} */
    __publicField(this, "report_only_provider");
    const use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.csp_provider = new CspProvider(use_hashes, directives, this.nonce);
    this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce);
  }
  get script_needs_nonce() {
    return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
  }
  get style_needs_nonce() {
    return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
  }
  /** @param {string} content */
  add_script(content) {
    this.csp_provider.add_script(content);
    this.report_only_provider.add_script(content);
  }
  /** @param {string} content */
  add_style(content) {
    this.csp_provider.add_style(content);
    this.report_only_provider.add_style(content);
  }
};
function defer() {
  let fulfil;
  let reject;
  const promise = new Promise((f, r) => {
    fulfil = f;
    reject = r;
  });
  return { promise, fulfil, reject };
}
function create_async_iterator() {
  const deferred = [defer()];
  return {
    iterator: {
      [Symbol.asyncIterator]() {
        return {
          next: async () => {
            const next = await deferred[0].promise;
            if (!next.done)
              deferred.shift();
            return next;
          }
        };
      }
    },
    push: (value) => {
      deferred[deferred.length - 1].fulfil({
        value,
        done: false
      });
      deferred.push(defer());
    },
    done: () => {
      deferred[deferred.length - 1].fulfil({ done: true });
    }
  };
}
var updated = {
  ...readable(false),
  check: () => false
};
var encoder$1 = new TextEncoder();
async function render_response({
  branch,
  fetched,
  options: options2,
  manifest: manifest2,
  state,
  page_config,
  status,
  error: error2 = null,
  event,
  resolve_opts,
  action_result
}) {
  if (state.prerendering) {
    if (options2.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options2.app_template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const { client } = manifest2._;
  const modulepreloads = new Set(client.imports);
  const stylesheets10 = new Set(client.stylesheets);
  const fonts10 = new Set(client.fonts);
  const link_header_preloads = /* @__PURE__ */ new Set();
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const form_value = action_result?.type === "success" || action_result?.type === "failure" ? action_result.data ?? null : null;
  let base$1 = base;
  let assets$1 = assets;
  let base_expression = s(base);
  if (!state.prerendering?.fallback) {
    const segments = event.url.pathname.slice(base.length).split("/").slice(2);
    base$1 = segments.map(() => "..").join("/") || ".";
    base_expression = `new URL(${s(base$1)}, location).pathname.slice(0, -1)`;
    if (!assets || assets[0] === "/" && assets !== SVELTE_KIT_ASSETS) {
      assets$1 = base$1;
    }
  }
  if (page_config.ssr) {
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        updated
      },
      constructors: await Promise.all(branch.map(({ node }) => node.component())),
      form: form_value
    };
    let data2 = {};
    for (let i = 0; i < branch.length; i += 1) {
      data2 = { ...data2, ...branch[i].data };
      props[`data_${i}`] = data2;
    }
    props.page = {
      error: error2,
      params: (
        /** @type {Record<string, any>} */
        event.params
      ),
      route: event.route,
      status,
      url: event.url,
      data: data2,
      form: form_value
    };
    {
      try {
        rendered = options2.root.render(props);
      } finally {
        reset();
      }
    }
    for (const { node } of branch) {
      for (const url of node.imports)
        modulepreloads.add(url);
      for (const url of node.stylesheets)
        stylesheets10.add(url);
      for (const url of node.fonts)
        fonts10.add(url);
      if (node.inline_styles) {
        Object.entries(await node.inline_styles()).forEach(([k, v]) => inline_styles.set(k, v));
      }
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let head = "";
  let body = rendered.html;
  const csp = new Csp(options2.csp, {
    prerender: !!state.prerendering
  });
  const prefixed = (path) => {
    if (path.startsWith("/")) {
      return base + path;
    }
    return `${assets$1}/${path}`;
  };
  if (inline_styles.size > 0) {
    const content = Array.from(inline_styles.values()).join("\n");
    const attributes = [];
    if (csp.style_needs_nonce)
      attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(content);
    head += `
	<style${attributes.join("")}>${content}</style>`;
  }
  for (const dep of stylesheets10) {
    const path = prefixed(dep);
    const attributes = ['rel="stylesheet"'];
    if (inline_styles.has(dep)) {
      attributes.push("disabled", 'media="(max-width: 0)"');
    } else {
      if (resolve_opts.preload({ type: "css", path })) {
        const preload_atts = ['rel="preload"', 'as="style"'];
        link_header_preloads.add(`<${encodeURI(path)}>; ${preload_atts.join(";")}; nopush`);
      }
    }
    head += `
		<link href="${path}" ${attributes.join(" ")}>`;
  }
  for (const dep of fonts10) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "font", path })) {
      const ext = dep.slice(dep.lastIndexOf(".") + 1);
      const attributes = [
        'rel="preload"',
        'as="font"',
        `type="font/${ext}"`,
        `href="${path}"`,
        "crossorigin"
      ];
      head += `
		<link ${attributes.join(" ")}>`;
    }
  }
  const global = `__sveltekit_${options2.version_hash}`;
  const { data, chunks } = get_data(
    event,
    options2,
    branch.map((b) => b.server_data),
    global
  );
  if (page_config.ssr && page_config.csr) {
    body += `
			${fetched.map(
      (item) => serialize_data(item, resolve_opts.filterSerializedResponseHeaders, !!state.prerendering)
    ).join("\n			")}`;
  }
  if (page_config.csr) {
    const included_modulepreloads = Array.from(modulepreloads, (dep) => prefixed(dep)).filter(
      (path) => resolve_opts.preload({ type: "js", path })
    );
    for (const path of included_modulepreloads) {
      link_header_preloads.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
      if (options2.preload_strategy !== "modulepreload") {
        head += `
		<link rel="preload" as="script" crossorigin="anonymous" href="${path}">`;
      } else if (state.prerendering) {
        head += `
		<link rel="modulepreload" href="${path}">`;
      }
    }
    const blocks = [];
    const properties = [
      assets && `assets: ${s(assets)}`,
      `base: ${base_expression}`,
      `env: ${s(public_env)}`
    ].filter(Boolean);
    if (chunks) {
      blocks.push("const deferred = new Map();");
      properties.push(`defer: (id) => new Promise((fulfil, reject) => {
							deferred.set(id, { fulfil, reject });
						})`);
      properties.push(`resolve: ({ id, data, error }) => {
							const { fulfil, reject } = deferred.get(id);
							deferred.delete(id);

							if (error) reject(error);
							else fulfil(data);
						}`);
    }
    blocks.push(`${global} = {
						${properties.join(",\n						")}
					};`);
    const args = ["app", "element"];
    blocks.push("const element = document.currentScript.parentElement;");
    if (page_config.ssr) {
      const serialized = { form: "null", error: "null" };
      blocks.push(`const data = ${data};`);
      if (form_value) {
        serialized.form = uneval_action_response(
          form_value,
          /** @type {string} */
          event.route.id
        );
      }
      if (error2) {
        serialized.error = uneval(error2);
      }
      const hydrate = [
        `node_ids: [${branch.map(({ node }) => node.index).join(", ")}]`,
        "data",
        `form: ${serialized.form}`,
        `error: ${serialized.error}`
      ];
      if (status !== 200) {
        hydrate.push(`status: ${status}`);
      }
      if (options2.embedded) {
        hydrate.push(`params: ${uneval(event.params)}`, `route: ${s(event.route)}`);
      }
      args.push(`{
							${hydrate.join(",\n							")}
						}`);
    }
    blocks.push(`Promise.all([
						import(${s(prefixed(client.start))}),
						import(${s(prefixed(client.app))})
					]).then(([kit, app]) => {
						kit.start(${args.join(", ")});
					});`);
    if (options2.service_worker) {
      const opts = "";
      blocks.push(`if ('serviceWorker' in navigator) {
						addEventListener('load', function () {
							navigator.serviceWorker.register('${prefixed("service-worker.js")}'${opts});
						});
					}`);
    }
    const init_app = `
				{
					${blocks.join("\n\n					")}
				}
			`;
    csp.add_script(init_app);
    body += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_app}<\/script>
		`;
  }
  const headers = new Headers({
    "x-sveltekit-page": "true",
    "content-type": "text/html"
  });
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (state.prerendering.cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="${state.prerendering.cache}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  } else {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) {
      headers.set("content-security-policy", csp_header);
    }
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) {
      headers.set("content-security-policy-report-only", report_only_header);
    }
    if (link_header_preloads.size) {
      headers.set("link", Array.from(link_header_preloads).join(", "));
    }
  }
  head += rendered.head;
  const html = options2.templates.app({
    head,
    body,
    assets: assets$1,
    nonce: (
      /** @type {string} */
      csp.nonce
    ),
    env: public_env
  });
  const transformed = await resolve_opts.transformPageChunk({
    html,
    done: true
  }) || "";
  if (!chunks) {
    headers.set("etag", `"${hash(transformed)}"`);
  }
  return !chunks ? text(transformed, {
    status,
    headers
  }) : new Response(
    new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder$1.encode(transformed + "\n"));
        for await (const chunk of chunks) {
          controller.enqueue(encoder$1.encode(chunk));
        }
        controller.close();
      },
      type: "bytes"
    }),
    {
      headers: {
        "content-type": "text/html"
      }
    }
  );
}
function get_data(event, options2, nodes, global) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  function replacer(thing) {
    if (typeof thing?.then === "function") {
      const id = promise_id++;
      count += 1;
      thing.then(
        /** @param {any} data */
        (data) => ({ data })
      ).catch(
        /** @param {any} error */
        async (error2) => ({
          error: await handle_error_and_jsonify(event, options2, error2)
        })
      ).then(
        /**
         * @param {{data: any; error: any}} result
         */
        async ({ data, error: error2 }) => {
          count -= 1;
          let str;
          try {
            str = uneval({ id, data, error: error2 }, replacer);
          } catch (e) {
            error2 = await handle_error_and_jsonify(
              event,
              options2,
              new Error(`Failed to serialize promise while rendering ${event.route.id}`)
            );
            data = void 0;
            str = uneval({ id, data, error: error2 }, replacer);
          }
          push(`<script>${global}.resolve(${str})<\/script>
`);
          if (count === 0)
            done();
        }
      );
      return `${global}.defer(${id})`;
    }
  }
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      return `{"type":"data","data":${uneval(node.data, replacer)},${stringify_uses(node)}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `[${strings.join(",")}]`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
function get_option(nodes, option) {
  return nodes.reduce(
    (value, node) => {
      return (
        /** @type {Value} TypeScript's too dumb to understand this */
        node?.universal?.[option] ?? node?.server?.[option] ?? value
      );
    },
    /** @type {Value | undefined} */
    void 0
  );
}
async function respond_with_error({
  event,
  options: options2,
  manifest: manifest2,
  state,
  status,
  error: error2,
  resolve_opts
}) {
  if (event.request.headers.get("x-sveltekit-error")) {
    return static_error_page(
      options2,
      status,
      /** @type {Error} */
      error2.message
    );
  }
  const fetched = [];
  try {
    const branch = [];
    const default_layout = await manifest2._.nodes[0]();
    const ssr = get_option([default_layout], "ssr") ?? true;
    const csr = get_option([default_layout], "csr") ?? true;
    if (ssr) {
      state.error = true;
      const server_data_promise = load_server_data({
        event,
        state,
        node: default_layout,
        parent: async () => ({}),
        track_server_fetches: options2.track_server_fetches
      });
      const server_data = await server_data_promise;
      const data = await load_data({
        event,
        fetched,
        node: default_layout,
        parent: async () => ({}),
        resolve_opts,
        server_data_promise,
        state,
        csr
      });
      branch.push(
        {
          node: default_layout,
          server_data,
          data
        },
        {
          node: await manifest2._.nodes[1](),
          // 1 is always the root error
          data: null,
          server_data: null
        }
      );
    }
    return await render_response({
      options: options2,
      manifest: manifest2,
      state,
      page_config: {
        ssr,
        csr: get_option([default_layout], "csr") ?? true
      },
      status,
      error: await handle_error_and_jsonify(event, options2, error2),
      branch,
      fetched,
      event,
      resolve_opts
    });
  } catch (e) {
    if (e instanceof Redirect) {
      return redirect_response(e.status, e.location);
    }
    return static_error_page(
      options2,
      e instanceof HttpError ? e.status : 500,
      (await handle_error_and_jsonify(event, options2, e)).message
    );
  }
}
function once(fn) {
  let done = false;
  let result;
  return () => {
    if (done)
      return result;
    done = true;
    return result = fn();
  };
}
var encoder = new TextEncoder();
async function render_data(event, route, options2, manifest2, state, invalidated_data_nodes, trailing_slash) {
  if (!route.page) {
    return new Response(void 0, {
      status: 404
    });
  }
  try {
    const node_ids = [...route.page.layouts, route.page.leaf];
    const invalidated = invalidated_data_nodes ?? node_ids.map(() => true);
    let aborted = false;
    const url = new URL(event.url);
    url.pathname = normalize_path(url.pathname, trailing_slash);
    const new_event = { ...event, url };
    const functions = node_ids.map((n, i) => {
      return once(async () => {
        try {
          if (aborted) {
            return (
              /** @type {import('types').ServerDataSkippedNode} */
              {
                type: "skip"
              }
            );
          }
          const node = n == void 0 ? n : await manifest2._.nodes[n]();
          return load_server_data({
            event: new_event,
            state,
            node,
            parent: async () => {
              const data2 = {};
              for (let j = 0; j < i; j += 1) {
                const parent = (
                  /** @type {import('types').ServerDataNode | null} */
                  await functions[j]()
                );
                if (parent) {
                  Object.assign(data2, parent.data);
                }
              }
              return data2;
            },
            track_server_fetches: options2.track_server_fetches
          });
        } catch (e) {
          aborted = true;
          throw e;
        }
      });
    });
    const promises = functions.map(async (fn, i) => {
      if (!invalidated[i]) {
        return (
          /** @type {import('types').ServerDataSkippedNode} */
          {
            type: "skip"
          }
        );
      }
      return fn();
    });
    let length = promises.length;
    const nodes = await Promise.all(
      promises.map(
        (p, i) => p.catch(async (error2) => {
          if (error2 instanceof Redirect) {
            throw error2;
          }
          length = Math.min(length, i + 1);
          return (
            /** @type {import('types').ServerErrorNode} */
            {
              type: "error",
              error: await handle_error_and_jsonify(event, options2, error2),
              status: error2 instanceof HttpError ? error2.status : void 0
            }
          );
        })
      )
    );
    const { data, chunks } = get_data_json(event, options2, nodes);
    if (!chunks) {
      return json_response(data);
    }
    return new Response(
      new ReadableStream({
        async start(controller) {
          controller.enqueue(encoder.encode(data));
          for await (const chunk of chunks) {
            controller.enqueue(encoder.encode(chunk));
          }
          controller.close();
        },
        type: "bytes"
      }),
      {
        headers: {
          // we use a proprietary content type to prevent buffering.
          // the `text` prefix makes it inspectable
          "content-type": "text/sveltekit-data",
          "cache-control": "private, no-store"
        }
      }
    );
  } catch (e) {
    const error2 = normalize_error(e);
    if (error2 instanceof Redirect) {
      return redirect_json_response(error2);
    } else {
      return json_response(await handle_error_and_jsonify(event, options2, error2), 500);
    }
  }
}
function json_response(json2, status = 200) {
  return text(typeof json2 === "string" ? json2 : JSON.stringify(json2), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store"
    }
  });
}
function redirect_json_response(redirect) {
  return json_response({
    type: "redirect",
    location: redirect.location
  });
}
function get_data_json(event, options2, nodes) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  const reducers = {
    /** @param {any} thing */
    Promise: (thing) => {
      if (typeof thing?.then === "function") {
        const id = promise_id++;
        count += 1;
        let key2 = "data";
        thing.catch(
          /** @param {any} e */
          async (e) => {
            key2 = "error";
            return handle_error_and_jsonify(
              event,
              options2,
              /** @type {any} */
              e
            );
          }
        ).then(
          /** @param {any} value */
          async (value) => {
            let str;
            try {
              str = stringify(value, reducers);
            } catch (e) {
              const error2 = await handle_error_and_jsonify(
                event,
                options2,
                new Error(`Failed to serialize promise while rendering ${event.route.id}`)
              );
              key2 = "error";
              str = stringify(error2, reducers);
            }
            count -= 1;
            push(`{"type":"chunk","id":${id},"${key2}":${str}}
`);
            if (count === 0)
              done();
          }
        );
        return id;
      }
    }
  };
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      if (node.type === "error" || node.type === "skip") {
        return JSON.stringify(node);
      }
      return `{"type":"data","data":${stringify(node.data, reducers)},${stringify_uses(
        node
      )}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `{"type":"data","nodes":[${strings.join(",")}]}
`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
var MAX_DEPTH = 10;
async function render_page(event, page2, options2, manifest2, state, resolve_opts) {
  if (state.depth > MAX_DEPTH) {
    return text(`Not found: ${event.url.pathname}`, {
      status: 404
      // TODO in some cases this should be 500. not sure how to differentiate
    });
  }
  if (is_action_json_request(event)) {
    const node = await manifest2._.nodes[page2.leaf]();
    return handle_action_json_request(event, options2, node?.server);
  }
  try {
    const nodes = await Promise.all([
      // we use == here rather than === because [undefined] serializes as "[null]"
      ...page2.layouts.map((n) => n == void 0 ? n : manifest2._.nodes[n]()),
      manifest2._.nodes[page2.leaf]()
    ]);
    const leaf_node = (
      /** @type {import('types').SSRNode} */
      nodes.at(-1)
    );
    let status = 200;
    let action_result = void 0;
    if (is_action_request(event)) {
      action_result = await handle_action_request(event, leaf_node.server);
      if (action_result?.type === "redirect") {
        return redirect_response(action_result.status, action_result.location);
      }
      if (action_result?.type === "error") {
        const error2 = action_result.error;
        status = error2 instanceof HttpError ? error2.status : 500;
      }
      if (action_result?.type === "failure") {
        status = action_result.status;
      }
    }
    const should_prerender_data = nodes.some((node) => node?.server);
    const data_pathname = add_data_suffix(event.url.pathname);
    const should_prerender = get_option(nodes, "prerender") ?? false;
    if (should_prerender) {
      const mod = leaf_node.server;
      if (mod?.actions) {
        throw new Error("Cannot prerender pages with actions");
      }
    } else if (state.prerendering) {
      return new Response(void 0, {
        status: 204
      });
    }
    state.prerender_default = should_prerender;
    const fetched = [];
    if (get_option(nodes, "ssr") === false && !state.prerendering) {
      return await render_response({
        branch: [],
        fetched,
        page_config: {
          ssr: false,
          csr: get_option(nodes, "csr") ?? true
        },
        status,
        error: null,
        event,
        options: options2,
        manifest: manifest2,
        state,
        resolve_opts
      });
    }
    const branch = [];
    let load_error = null;
    const server_promises = nodes.map((node, i) => {
      if (load_error) {
        throw load_error;
      }
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && action_result?.type === "error") {
            throw action_result.error;
          }
          return await load_server_data({
            event,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                const parent = await server_promises[j];
                if (parent)
                  Object.assign(data, await parent.data);
              }
              return data;
            },
            track_server_fetches: options2.track_server_fetches
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    const csr = get_option(nodes, "csr") ?? true;
    const load_promises = nodes.map((node, i) => {
      if (load_error)
        throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event,
            fetched,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                Object.assign(data, await load_promises[j]);
              }
              return data;
            },
            resolve_opts,
            server_data_promise: server_promises[i],
            state,
            csr
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    for (const p of server_promises)
      p.catch(() => {
      });
    for (const p of load_promises)
      p.catch(() => {
      });
    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (node) {
        try {
          const server_data = await server_promises[i];
          const data = await load_promises[i];
          branch.push({ node, server_data, data });
        } catch (e) {
          const err = normalize_error(e);
          if (err instanceof Redirect) {
            if (state.prerendering && should_prerender_data) {
              const body = JSON.stringify({
                type: "redirect",
                location: err.location
              });
              state.prerendering.dependencies.set(data_pathname, {
                response: text(body),
                body
              });
            }
            return redirect_response(err.status, err.location);
          }
          const status2 = err instanceof HttpError ? err.status : 500;
          const error2 = await handle_error_and_jsonify(event, options2, err);
          while (i--) {
            if (page2.errors[i]) {
              const index10 = (
                /** @type {number} */
                page2.errors[i]
              );
              const node2 = await manifest2._.nodes[index10]();
              let j = i;
              while (!branch[j])
                j -= 1;
              return await render_response({
                event,
                options: options2,
                manifest: manifest2,
                state,
                resolve_opts,
                page_config: { ssr: true, csr: true },
                status: status2,
                error: error2,
                branch: compact(branch.slice(0, j + 1)).concat({
                  node: node2,
                  data: null,
                  server_data: null
                }),
                fetched
              });
            }
          }
          return static_error_page(options2, status2, error2.message);
        }
      } else {
        branch.push(null);
      }
    }
    if (state.prerendering && should_prerender_data) {
      let { data, chunks } = get_data_json(
        event,
        options2,
        branch.map((node) => node?.server_data)
      );
      if (chunks) {
        for await (const chunk of chunks) {
          data += chunk;
        }
      }
      state.prerendering.dependencies.set(data_pathname, {
        response: text(data),
        body: data
      });
    }
    return await render_response({
      event,
      options: options2,
      manifest: manifest2,
      state,
      resolve_opts,
      page_config: {
        csr: get_option(nodes, "csr") ?? true,
        ssr: get_option(nodes, "ssr") ?? true
      },
      status,
      error: null,
      branch: compact(branch),
      action_result,
      fetched
    });
  } catch (e) {
    return await respond_with_error({
      event,
      options: options2,
      manifest: manifest2,
      state,
      status: 500,
      error: e,
      resolve_opts
    });
  }
}
function deprecate_missing_path(opts, method) {
  if (opts.path === void 0) {
    warn_with_callsite(
      `Calling \`cookies.${method}(...)\` without specifying a \`path\` is deprecated, and will be disallowed in SvelteKit 2.0. Relative paths can be used`,
      1
    );
  }
  if (opts.path === "") {
    warn_with_callsite(
      `Calling \`cookies.${method}(...)\` with \`path: ''\` will behave differently in SvelteKit 2.0. Instead of using the browser default behaviour, it will set the cookie path to the current pathname`,
      1
    );
  }
}
function get_cookies(request, url, trailing_slash) {
  const header = request.headers.get("cookie") ?? "";
  const initial_cookies = (0, import_cookie.parse)(header, { decode: (value) => value });
  const normalized_url = normalize_path(url.pathname, trailing_slash);
  const default_path = normalized_url.split("/").slice(0, -1).join("/") || "/";
  const new_cookies = {};
  const defaults = {
    httpOnly: true,
    sameSite: "lax",
    secure: url.hostname === "localhost" && url.protocol === "http:" ? false : true
  };
  const cookies = {
    // The JSDoc param annotations appearing below for get, set and delete
    // are necessary to expose the `cookie` library types to
    // typescript users. `@type {import('@sveltejs/kit').Cookies}` above is not
    // sufficient to do so.
    /**
     * @param {string} name
     * @param {import('cookie').CookieParseOptions} opts
     */
    get(name2, opts) {
      const c = new_cookies[name2];
      if (c && domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
        return c.value;
      }
      const decoder = opts?.decode || decodeURIComponent;
      const req_cookies = (0, import_cookie.parse)(header, { decode: decoder });
      const cookie = req_cookies[name2];
      return cookie;
    },
    /**
     * @param {import('cookie').CookieParseOptions} opts
     */
    getAll(opts) {
      const decoder = opts?.decode || decodeURIComponent;
      const cookies2 = (0, import_cookie.parse)(header, { decode: decoder });
      for (const c of Object.values(new_cookies)) {
        if (domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
          cookies2[c.name] = c.value;
        }
      }
      return Object.entries(cookies2).map(([name2, value]) => ({ name: name2, value }));
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    set(name2, value, opts = {}) {
      deprecate_missing_path(opts, "set");
      set_internal(name2, value, { ...defaults, ...opts });
    },
    /**
     * @param {string} name
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    delete(name2, opts = {}) {
      deprecate_missing_path(opts, "delete");
      cookies.set(name2, "", {
        path: default_path,
        // TODO 2.0 remove this
        ...opts,
        maxAge: 0
      });
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    serialize(name2, value, opts = {}) {
      deprecate_missing_path(opts, "serialize");
      return (0, import_cookie.serialize)(name2, value, {
        ...defaults,
        ...opts
      });
    }
  };
  function get_cookie_header(destination, header2) {
    const combined_cookies = {
      // cookies sent by the user agent have lowest precedence
      ...initial_cookies
    };
    for (const key2 in new_cookies) {
      const cookie = new_cookies[key2];
      if (!domain_matches(destination.hostname, cookie.options.domain))
        continue;
      if (!path_matches(destination.pathname, cookie.options.path))
        continue;
      const encoder2 = cookie.options.encode || encodeURIComponent;
      combined_cookies[cookie.name] = encoder2(cookie.value);
    }
    if (header2) {
      const parsed = (0, import_cookie.parse)(header2, { decode: (value) => value });
      for (const name2 in parsed) {
        combined_cookies[name2] = parsed[name2];
      }
    }
    return Object.entries(combined_cookies).map(([name2, value]) => `${name2}=${value}`).join("; ");
  }
  function set_internal(name2, value, opts) {
    let path = opts.path;
    if (!opts.domain || opts.domain === url.hostname) {
      if (path) {
        if (path[0] === ".")
          path = resolve(url.pathname, path);
      } else {
        path = default_path;
      }
    }
    new_cookies[name2] = {
      name: name2,
      value,
      options: {
        ...opts,
        path
      }
    };
  }
  return { cookies, new_cookies, get_cookie_header, set_internal };
}
function domain_matches(hostname, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized)
    return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized)
    return true;
  return path.startsWith(normalized + "/");
}
function add_cookies_to_headers(headers, cookies) {
  for (const new_cookie of cookies) {
    const { name: name2, value, options: options2 } = new_cookie;
    headers.append("set-cookie", (0, import_cookie.serialize)(name2, value, options2));
  }
}
function create_fetch({ event, options: options2, manifest: manifest2, state, get_cookie_header, set_internal }) {
  const server_fetch = async (info, init2) => {
    const original_request = normalize_fetch_input(info, init2, event.url);
    let mode = (info instanceof Request ? info.mode : init2?.mode) ?? "cors";
    let credentials = (info instanceof Request ? info.credentials : init2?.credentials) ?? "same-origin";
    return options2.hooks.handleFetch({
      event,
      request: original_request,
      fetch: async (info2, init3) => {
        const request = normalize_fetch_input(info2, init3, event.url);
        const url = new URL(request.url);
        if (!request.headers.has("origin")) {
          request.headers.set("origin", event.url.origin);
        }
        if (info2 !== original_request) {
          mode = (info2 instanceof Request ? info2.mode : init3?.mode) ?? "cors";
          credentials = (info2 instanceof Request ? info2.credentials : init3?.credentials) ?? "same-origin";
        }
        if ((request.method === "GET" || request.method === "HEAD") && (mode === "no-cors" && url.origin !== event.url.origin || url.origin === event.url.origin)) {
          request.headers.delete("origin");
        }
        if (url.origin !== event.url.origin) {
          if (`.${url.hostname}`.endsWith(`.${event.url.hostname}`) && credentials !== "omit") {
            const cookie = get_cookie_header(url, request.headers.get("cookie"));
            if (cookie)
              request.headers.set("cookie", cookie);
          }
          return fetch(request);
        }
        const prefix = assets || base;
        const decoded = decodeURIComponent(url.pathname);
        const filename = (decoded.startsWith(prefix) ? decoded.slice(prefix.length) : decoded).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = manifest2.assets.has(filename);
        const is_asset_html = manifest2.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (state.read) {
            const type = is_asset ? manifest2.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            return new Response(state.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          }
          return await fetch(request);
        }
        if (credentials !== "omit") {
          const cookie = get_cookie_header(url, request.headers.get("cookie"));
          if (cookie) {
            request.headers.set("cookie", cookie);
          }
          const authorization = event.request.headers.get("authorization");
          if (authorization && !request.headers.has("authorization")) {
            request.headers.set("authorization", authorization);
          }
        }
        if (!request.headers.has("accept")) {
          request.headers.set("accept", "*/*");
        }
        if (!request.headers.has("accept-language")) {
          request.headers.set(
            "accept-language",
            /** @type {string} */
            event.request.headers.get("accept-language")
          );
        }
        const response = await respond(request, options2, manifest2, {
          ...state,
          depth: state.depth + 1
        });
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          for (const str of set_cookie_parser.splitCookiesString(set_cookie)) {
            const { name: name2, value, ...options3 } = set_cookie_parser.parseString(str);
            set_internal(
              name2,
              value,
              /** @type {import('cookie').CookieSerializeOptions} */
              options3
            );
          }
        }
        return response;
      }
    });
  };
  return (input, init2) => {
    const response = server_fetch(input, init2);
    response.catch(() => {
    });
    return response;
  };
}
function normalize_fetch_input(info, init2, url) {
  if (info instanceof Request) {
    return info;
  }
  return new Request(typeof info === "string" ? new URL(info, url) : info, init2);
}
function validator(expected) {
  function validate(module, file) {
    if (!module)
      return;
    for (const key2 in module) {
      if (key2[0] === "_" || expected.has(key2))
        continue;
      const values = [...expected.values()];
      const hint = hint_for_supported_files(key2, file?.slice(file.lastIndexOf("."))) ?? `valid exports are ${values.join(", ")}, or anything with a '_' prefix`;
      throw new Error(`Invalid export '${key2}'${file ? ` in ${file}` : ""} (${hint})`);
    }
  }
  return validate;
}
function hint_for_supported_files(key2, ext = ".js") {
  const supported_files = [];
  if (valid_layout_exports.has(key2)) {
    supported_files.push(`+layout${ext}`);
  }
  if (valid_page_exports.has(key2)) {
    supported_files.push(`+page${ext}`);
  }
  if (valid_layout_server_exports.has(key2)) {
    supported_files.push(`+layout.server${ext}`);
  }
  if (valid_page_server_exports.has(key2)) {
    supported_files.push(`+page.server${ext}`);
  }
  if (valid_server_exports.has(key2)) {
    supported_files.push(`+server${ext}`);
  }
  if (supported_files.length > 0) {
    return `'${key2}' is a valid export in ${supported_files.slice(0, -1).join(", ")}${supported_files.length > 1 ? " or " : ""}${supported_files.at(-1)}`;
  }
}
var valid_layout_exports = /* @__PURE__ */ new Set([
  "load",
  "prerender",
  "csr",
  "ssr",
  "trailingSlash",
  "config"
]);
var valid_page_exports = /* @__PURE__ */ new Set([...valid_layout_exports, "entries"]);
var valid_layout_server_exports = /* @__PURE__ */ new Set([...valid_layout_exports]);
var valid_page_server_exports = /* @__PURE__ */ new Set([...valid_layout_server_exports, "actions", "entries"]);
var valid_server_exports = /* @__PURE__ */ new Set([
  "GET",
  "POST",
  "PATCH",
  "PUT",
  "DELETE",
  "OPTIONS",
  "HEAD",
  "fallback",
  "prerender",
  "trailingSlash",
  "config",
  "entries"
]);
var validate_layout_exports = validator(valid_layout_exports);
var validate_page_exports = validator(valid_page_exports);
var validate_layout_server_exports = validator(valid_layout_server_exports);
var validate_page_server_exports = validator(valid_page_server_exports);
var validate_server_exports = validator(valid_server_exports);
var default_transform = ({ html }) => html;
var default_filter = () => false;
var default_preload = ({ type }) => type === "js" || type === "css";
var page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "POST"]);
var allowed_page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "OPTIONS"]);
async function respond(request, options2, manifest2, state) {
  const url = new URL(request.url);
  if (options2.csrf_check_origin) {
    const forbidden = is_form_content_type(request) && (request.method === "POST" || request.method === "PUT" || request.method === "PATCH" || request.method === "DELETE") && request.headers.get("origin") !== url.origin;
    if (forbidden) {
      const csrf_error = error(403, `Cross-site ${request.method} form submissions are forbidden`);
      if (request.headers.get("accept") === "application/json") {
        return json(csrf_error.body, { status: csrf_error.status });
      }
      return text(csrf_error.body.message, { status: csrf_error.status });
    }
  }
  let decoded;
  try {
    decoded = decode_pathname(url.pathname);
  } catch {
    return text("Malformed URI", { status: 400 });
  }
  let route = null;
  let params = {};
  if (base && !state.prerendering?.fallback) {
    if (!decoded.startsWith(base)) {
      return text("Not found", { status: 404 });
    }
    decoded = decoded.slice(base.length) || "/";
  }
  const is_data_request = has_data_suffix(decoded);
  let invalidated_data_nodes;
  if (is_data_request) {
    decoded = strip_data_suffix(decoded) || "/";
    url.pathname = strip_data_suffix(url.pathname) + (url.searchParams.get(TRAILING_SLASH_PARAM) === "1" ? "/" : "") || "/";
    url.searchParams.delete(TRAILING_SLASH_PARAM);
    invalidated_data_nodes = url.searchParams.get(INVALIDATED_PARAM)?.split("").map((node) => node === "1");
    url.searchParams.delete(INVALIDATED_PARAM);
  }
  if (!state.prerendering?.fallback) {
    const matchers = await manifest2._.matchers();
    for (const candidate of manifest2._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match)
        continue;
      const matched = exec(match, candidate.params, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  let trailing_slash = void 0;
  const headers = {};
  let cookies_to_add = {};
  const event = {
    // @ts-expect-error `cookies` and `fetch` need to be created after the `event` itself
    cookies: null,
    // @ts-expect-error
    fetch: null,
    getClientAddress: state.getClientAddress || (() => {
      throw new Error(
        `${"@sveltejs/adapter-vercel"} does not specify getClientAddress. Please raise an issue`
      );
    }),
    locals: {},
    params,
    platform: state.platform,
    request,
    route: { id: route?.id ?? null },
    setHeaders: (new_headers) => {
      for (const key2 in new_headers) {
        const lower = key2.toLowerCase();
        const value = new_headers[key2];
        if (lower === "set-cookie") {
          throw new Error(
            "Use `event.cookies.set(name, value, options)` instead of `event.setHeaders` to set cookies"
          );
        } else if (lower in headers) {
          throw new Error(`"${key2}" header is already set`);
        } else {
          headers[lower] = value;
          if (state.prerendering && lower === "cache-control") {
            state.prerendering.cache = /** @type {string} */
            value;
          }
        }
      }
    },
    url,
    isDataRequest: is_data_request,
    isSubRequest: state.depth > 0
  };
  let resolve_opts = {
    transformPageChunk: default_transform,
    filterSerializedResponseHeaders: default_filter,
    preload: default_preload
  };
  try {
    if (route) {
      if (url.pathname === base || url.pathname === base + "/") {
        trailing_slash = "always";
      } else if (route.page) {
        const nodes = await Promise.all([
          // we use == here rather than === because [undefined] serializes as "[null]"
          ...route.page.layouts.map((n) => n == void 0 ? n : manifest2._.nodes[n]()),
          manifest2._.nodes[route.page.leaf]()
        ]);
        if (DEV)
          ;
        trailing_slash = get_option(nodes, "trailingSlash");
      } else if (route.endpoint) {
        const node = await route.endpoint();
        trailing_slash = node.trailingSlash;
        if (DEV)
          ;
      }
      if (!is_data_request) {
        const normalized = normalize_path(url.pathname, trailing_slash ?? "never");
        if (normalized !== url.pathname && !state.prerendering?.fallback) {
          return new Response(void 0, {
            status: 308,
            headers: {
              "x-sveltekit-normalize": "1",
              location: (
                // ensure paths starting with '//' are not treated as protocol-relative
                (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
              )
            }
          });
        }
      }
    }
    const { cookies, new_cookies, get_cookie_header, set_internal } = get_cookies(
      request,
      url,
      trailing_slash ?? "never"
    );
    cookies_to_add = new_cookies;
    event.cookies = cookies;
    event.fetch = create_fetch({
      event,
      options: options2,
      manifest: manifest2,
      state,
      get_cookie_header,
      set_internal
    });
    if (state.prerendering && !state.prerendering.fallback)
      disable_search(url);
    const response = await options2.hooks.handle({
      event,
      resolve: (event2, opts) => resolve2(event2, opts).then((response2) => {
        for (const key2 in headers) {
          const value = headers[key2];
          response2.headers.set(
            key2,
            /** @type {string} */
            value
          );
        }
        add_cookies_to_headers(response2.headers, Object.values(cookies_to_add));
        if (state.prerendering && event2.route.id !== null) {
          response2.headers.set("x-sveltekit-routeid", encodeURI(event2.route.id));
        }
        return response2;
      })
    });
    if (response.status === 200 && response.headers.has("etag")) {
      let if_none_match_value = request.headers.get("if-none-match");
      if (if_none_match_value?.startsWith('W/"')) {
        if_none_match_value = if_none_match_value.substring(2);
      }
      const etag = (
        /** @type {string} */
        response.headers.get("etag")
      );
      if (if_none_match_value === etag) {
        const headers2 = new Headers({ etag });
        for (const key2 of [
          "cache-control",
          "content-location",
          "date",
          "expires",
          "vary",
          "set-cookie"
        ]) {
          const value = response.headers.get(key2);
          if (value)
            headers2.set(key2, value);
        }
        return new Response(void 0, {
          status: 304,
          headers: headers2
        });
      }
    }
    if (is_data_request && response.status >= 300 && response.status <= 308) {
      const location = response.headers.get("location");
      if (location) {
        return redirect_json_response(new Redirect(
          /** @type {any} */
          response.status,
          location
        ));
      }
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      const response = is_data_request ? redirect_json_response(e) : route?.page && is_action_json_request(event) ? action_json_redirect(e) : redirect_response(e.status, e.location);
      add_cookies_to_headers(response.headers, Object.values(cookies_to_add));
      return response;
    }
    return await handle_fatal_error(event, options2, e);
  }
  async function resolve2(event2, opts) {
    try {
      if (opts) {
        if ("ssr" in opts) {
          throw new Error(
            "ssr has been removed, set it in the appropriate +layout.js instead. See the PR for more information: https://github.com/sveltejs/kit/pull/6197"
          );
        }
        resolve_opts = {
          transformPageChunk: opts.transformPageChunk || default_transform,
          filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter,
          preload: opts.preload || default_preload
        };
      }
      if (state.prerendering?.fallback) {
        return await render_response({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          page_config: { ssr: false, csr: true },
          status: 200,
          error: null,
          branch: [],
          fetched: [],
          resolve_opts
        });
      }
      if (route) {
        const method = (
          /** @type {import('types').HttpMethod} */
          event2.request.method
        );
        let response;
        if (is_data_request) {
          response = await render_data(
            event2,
            route,
            options2,
            manifest2,
            state,
            invalidated_data_nodes,
            trailing_slash ?? "never"
          );
        } else if (route.endpoint && (!route.page || is_endpoint_request(event2))) {
          response = await render_endpoint(event2, await route.endpoint(), state);
        } else if (route.page) {
          if (page_methods.has(method)) {
            response = await render_page(event2, route.page, options2, manifest2, state, resolve_opts);
          } else {
            const allowed_methods2 = new Set(allowed_page_methods);
            const node = await manifest2._.nodes[route.page.leaf]();
            if (node?.server?.actions) {
              allowed_methods2.add("POST");
            }
            if (method === "OPTIONS") {
              response = new Response(null, {
                status: 204,
                headers: {
                  allow: Array.from(allowed_methods2.values()).join(", ")
                }
              });
            } else {
              const mod = [...allowed_methods2].reduce(
                (acc, curr) => {
                  acc[curr] = true;
                  return acc;
                },
                /** @type {Record<string, any>} */
                {}
              );
              response = method_not_allowed(mod, method);
            }
          }
        } else {
          throw new Error("This should never happen");
        }
        if (request.method === "GET" && route.page && route.endpoint) {
          const vary = response.headers.get("vary")?.split(",")?.map((v) => v.trim().toLowerCase());
          if (!(vary?.includes("accept") || vary?.includes("*"))) {
            response = new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: new Headers(response.headers)
            });
            response.headers.append("Vary", "Accept");
          }
        }
        return response;
      }
      if (state.error && event2.isSubRequest) {
        return await fetch(request, {
          headers: {
            "x-sveltekit-error": "true"
          }
        });
      }
      if (state.error) {
        return text("Internal Server Error", {
          status: 500
        });
      }
      if (state.depth === 0) {
        return await respond_with_error({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          status: 404,
          error: new NotFound(event2.url.pathname),
          resolve_opts
        });
      }
      if (state.prerendering) {
        return text("not found", { status: 404 });
      }
      return await fetch(request);
    } catch (e) {
      return await handle_fatal_error(event2, options2, e);
    } finally {
      event2.cookies.set = () => {
        throw new Error("Cannot use `cookies.set(...)` after the response has been generated");
      };
      event2.setHeaders = () => {
        throw new Error("Cannot use `setHeaders(...)` after the response has been generated");
      };
    }
  }
}
function filter_private_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(private_prefix) && (public_prefix === "" || !k.startsWith(public_prefix))
    )
  );
}
function filter_public_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(public_prefix) && (private_prefix === "" || !k.startsWith(private_prefix))
    )
  );
}
var _options, _manifest;
var Server = class {
  /** @param {import('@sveltejs/kit').SSRManifest} manifest */
  constructor(manifest2) {
    /** @type {import('types').SSROptions} */
    __privateAdd(this, _options, void 0);
    /** @type {import('@sveltejs/kit').SSRManifest} */
    __privateAdd(this, _manifest, void 0);
    __privateSet(this, _options, options);
    __privateSet(this, _manifest, manifest2);
  }
  /**
   * @param {{
   *   env: Record<string, string>
   * }} opts
   */
  async init({ env }) {
    set_private_env(
      filter_private_env(env, {
        public_prefix: __privateGet(this, _options).env_public_prefix,
        private_prefix: __privateGet(this, _options).env_private_prefix
      })
    );
    set_public_env(
      filter_public_env(env, {
        public_prefix: __privateGet(this, _options).env_public_prefix,
        private_prefix: __privateGet(this, _options).env_private_prefix
      })
    );
    if (!__privateGet(this, _options).hooks) {
      try {
        const module = await get_hooks();
        __privateGet(this, _options).hooks = {
          handle: module.handle || (({ event, resolve: resolve2 }) => resolve2(event)),
          handleError: module.handleError || (({ error: error2 }) => console.error(error2)),
          handleFetch: module.handleFetch || (({ request, fetch: fetch2 }) => fetch2(request))
        };
      } catch (error2) {
        {
          throw error2;
        }
      }
    }
  }
  /**
   * @param {Request} request
   * @param {import('types').RequestOptions} options
   */
  async respond(request, options2) {
    if (!(request instanceof Request)) {
      throw new Error(
        "The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details"
      );
    }
    return respond(request, __privateGet(this, _options), __privateGet(this, _manifest), {
      ...options2,
      error: false,
      depth: 0
    });
  }
};
_options = new WeakMap();
_manifest = new WeakMap();

// .svelte-kit/vercel-tmp/fn/manifest.js
var manifest = (() => {
  function __memo(fn) {
    let value;
    return () => value ?? (value = value = fn());
  }
  return {
    appDir: "_app",
    appPath: "_app",
    assets: /* @__PURE__ */ new Set([".well-known/appspecific/com.chrome.devtools.json", "aesculapiusss.png", "bashbunnyss.png", "cryptoss.png", "favicon.ico", "favicon.svg", "fractalsss.png", "fratdoor.png", "gamebank.png", "gpuprices.png", "grahamzemel.com.png", "grayarea.jpg", "heckerbotss.jpg", "icons/icon-192.svg", "icons/icon-512.svg", "idorss.png", "ifc-eventhub.png", "laptopprices.png", "macbookprices.png", "manifest.json", "og-img.png", "powerschoolss.png", "quantumss.png", "shader.frag", "shader.vert", "sketch.cjs", "slag.png", "sw.js", "templateprojss.png", "textcloakerss.png", "tgaonmediumss.png", "thegrayareass.png", "vaultcollection.png", "webheckscannerss.png"]),
    mimeTypes: { ".json": "application/json", ".png": "image/png", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".cjs": "application/node", ".js": "application/javascript" },
    _: {
      client: { "start": "_app/immutable/entry/start.9253e194.js", "app": "_app/immutable/entry/app.184d98c3.js", "imports": ["_app/immutable/entry/start.9253e194.js", "_app/immutable/chunks/index.ba56c314.js", "_app/immutable/chunks/singletons.a2923fce.js", "_app/immutable/entry/app.184d98c3.js", "_app/immutable/chunks/index.ba56c314.js"], "stylesheets": [], "fonts": [] },
      nodes: [
        __memo(() => Promise.resolve().then(() => (init__(), __exports))),
        __memo(() => Promise.resolve().then(() => (init__2(), __exports2))),
        __memo(() => Promise.resolve().then(() => (init__3(), __exports3))),
        __memo(() => Promise.resolve().then(() => (init__4(), __exports4))),
        __memo(() => Promise.resolve().then(() => (init__5(), __exports5))),
        __memo(() => Promise.resolve().then(() => (init__6(), __exports6))),
        __memo(() => Promise.resolve().then(() => (init__7(), __exports7))),
        __memo(() => Promise.resolve().then(() => (init__8(), __exports8))),
        __memo(() => Promise.resolve().then(() => (init__9(), __exports9)))
      ],
      routes: [
        {
          id: "/",
          pattern: /^\/$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 3 },
          endpoint: null
        },
        {
          id: "/admin",
          pattern: /^\/admin\/?$/,
          params: [],
          page: { layouts: [0, 2], errors: [1, ,], leaf: 4 },
          endpoint: null
        },
        {
          id: "/admin/cashflow",
          pattern: /^\/admin\/cashflow\/?$/,
          params: [],
          page: { layouts: [0, 2], errors: [1, ,], leaf: 5 },
          endpoint: null
        },
        {
          id: "/admin/income",
          pattern: /^\/admin\/income\/?$/,
          params: [],
          page: { layouts: [0, 2], errors: [1, ,], leaf: 6 },
          endpoint: null
        },
        {
          id: "/admin/settings",
          pattern: /^\/admin\/settings\/?$/,
          params: [],
          page: { layouts: [0, 2], errors: [1, ,], leaf: 7 },
          endpoint: null
        },
        {
          id: "/admin/stripe",
          pattern: /^\/admin\/stripe\/?$/,
          params: [],
          page: { layouts: [0, 2], errors: [1, ,], leaf: 8 },
          endpoint: null
        },
        {
          id: "/api/admin-auth",
          pattern: /^\/api\/admin-auth\/?$/,
          params: [],
          page: null,
          endpoint: __memo(() => Promise.resolve().then(() => (init_server(), server_exports)))
        },
        {
          id: "/pass",
          pattern: /^\/pass\/?$/,
          params: [],
          page: null,
          endpoint: __memo(() => Promise.resolve().then(() => (init_server2(), server_exports2)))
        }
      ],
      matchers: async () => {
        return {};
      }
    }
  };
})();

// .svelte-kit/vercel-tmp/fn/edge.js
var server = new Server(manifest);
var initialized = server.init({
  env: (
    /** @type {Record<string, string>} */
    process.env
  )
});
var edge_default = async (request, context) => {
  await initialized;
  return server.respond(request, {
    getClientAddress() {
      return (
        /** @type {string} */
        request.headers.get("x-forwarded-for")
      );
    },
    platform: {
      context
    }
  });
};
export {
  edge_default as default
};
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
//# sourceMappingURL=index.js.map
