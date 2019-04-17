"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@sentry/core");
var normalize_1 = require("../normalize");
/** Default Breadcrumbs instrumentations */
var Cordova = /** @class */ (function () {
    function Cordova() {
        /**
         * @inheritDoc
         */
        this.name = Cordova.id;
    }
    /**
     * @inheritDoc
     */
    Cordova.prototype.setupOnce = function () {
        var _this = this;
        core_1.addGlobalEventProcessor(function (event) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var self;
            return tslib_1.__generator(this, function (_a) {
                self = core_1.getCurrentHub().getIntegration(Cordova);
                if (self) {
                    return [2 /*return*/, normalize_1.normalizeData(event)];
                }
                return [2 /*return*/, event];
            });
        }); });
    };
    /**
     * @inheritDoc
     */
    Cordova.id = 'Cordova';
    return Cordova;
}());
exports.Cordova = Cordova;
//# sourceMappingURL=cordova.js.map