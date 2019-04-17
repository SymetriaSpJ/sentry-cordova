"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var browser_1 = require("@sentry/browser");
var core_1 = require("@sentry/core");
var types_1 = require("@sentry/types");
var PLUGIN_NAME = 'Sentry';
/** The Sentry Cordova SDK Backend. */
var CordovaBackend = /** @class */ (function (_super) {
    tslib_1.__extends(CordovaBackend, _super);
    /** Creates a new cordova backend instance. */
    function CordovaBackend(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.browserBackend = new browser_1.BrowserBackend(options);
        return _this;
    }
    /**
     * @inheritDoc
     */
    CordovaBackend.prototype.install = function () {
        var _this = this;
        this.browserBackend.install();
        if (this.isCordova()) {
            this.deviceReadyCallback = function () { return _this.runNativeInstall(); };
            document.addEventListener('deviceready', this.deviceReadyCallback);
        }
        return true;
    };
    /**
     * @inheritDoc
     */
    CordovaBackend.prototype.eventFromException = function (exception, hint) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.browserBackend.eventFromException(exception, hint)];
            });
        });
    };
    /**
     * @inheritDoc
     */
    CordovaBackend.prototype.eventFromMessage = function (message, level, hint) {
        if (level === void 0) { level = types_1.Severity.Info; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.browserBackend.eventFromMessage(message, level, hint)];
            });
        });
    };
    /**
     * @inheritDoc
     */
    CordovaBackend.prototype.sendEvent = function (event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.nativeCall('sendEvent', event)];
                    case 1:
                        _a.sent();
                        // Otherwise this is from native response
                        return [2 /*return*/, { status: types_1.Status.Success }];
                    case 2:
                        e_1 = _a.sent();
                        return [2 /*return*/, this.browserBackend.sendEvent(event)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // CORDOVA --------------------
    CordovaBackend.prototype.nativeCall = function (action) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            var exec = window && window.Cordova && window.Cordova.exec;
            if (!exec) {
                reject('Cordova.exec not available');
            }
            else {
                window.Cordova.exec(resolve, reject, PLUGIN_NAME, action, args);
            }
        });
    };
    CordovaBackend.prototype.runNativeInstall = function () {
        document.removeEventListener('deviceready', this.deviceReadyCallback);
        if (this.options.dsn && this.options.enabled !== false) {
            this.nativeCall('install', this.options.dsn, this.options);
        }
    };
    CordovaBackend.prototype.isCordova = function () {
        return window.cordova !== undefined || window.Cordova !== undefined;
    };
    /**
     * @inheritDoc
     */
    CordovaBackend.prototype.storeBreadcrumb = function (breadcrumb) {
        this.nativeCall('addBreadcrumb', breadcrumb).catch(function () {
            // We do nothing since all breadcrumbs are attached in the event.
            // This only applies to android.
        });
        return true;
    };
    /**
     * @inheritDoc
     */
    CordovaBackend.prototype.storeScope = function (scope) {
        this.nativeCall('setExtraContext', scope.extra).catch(function () {
            // We do nothing since scope is handled and attached to the event.
            // This only applies to android.
        });
        this.nativeCall('setTagsContext', scope.tags).catch(function () {
            // We do nothing since scope is handled and attached to the event.
            // This only applies to android.
        });
        this.nativeCall('setUserContext', scope.user).catch(function () {
            // We do nothing since scope is handled and attached to the event.
            // This only applies to android.
        });
    };
    return CordovaBackend;
}(core_1.BaseBackend));
exports.CordovaBackend = CordovaBackend;
//# sourceMappingURL=backend.js.map