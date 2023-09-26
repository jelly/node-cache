"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = rule;
exports.ruleName = exports.meta = exports.messages = void 0;
var _path = _interopRequireDefault(require("path"));
var _stylelint = require("stylelint");
var _utils = require("../../utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ruleName = (0, _utils.namespace)("at-import-partial-extension-blacklist");
exports.ruleName = ruleName;
var messages = _stylelint.utils.ruleMessages(ruleName, {
  rejected: function rejected(ext) {
    return "Unexpected extension \".".concat(ext, "\" in imported partial name");
  }
});
exports.messages = messages;
var meta = {
  url: (0, _utils.ruleUrl)(ruleName)
};
exports.meta = meta;
function rule(blacklistOption) {
  var blacklist = [].concat(blacklistOption);
  return function (root, result) {
    var validOptions = _stylelint.utils.validateOptions(result, ruleName, {
      actual: blacklistOption,
      possible: [_utils.isString, _utils.isRegExp]
    });
    if (!validOptions) {
      return;
    }
    function checkPathForUnderscore(path, decl) {
      // Stripping trailing quotes and whitespaces, if any
      var pathStripped = path.replace(/^\s*(["'])\s*/, "").replace(/\s*(["'])\s*$/, "");
      var extension = _path["default"].extname(pathStripped).slice(1);
      // Save this separately to be able to pass the original string to report()
      var extensionNormalized = extension.toLowerCase();

      // If the extension is empty
      if (!extension) {
        return;
      }

      // Skipping importing CSS: url(), ".css", URI with a protocol, media
      if (pathStripped.slice(0, 4) === "url(" || pathStripped.slice(-4) === ".css" || pathStripped.search("//") !== -1 || pathStripped.search(/[\s,)"']\w+$/) !== -1) {
        return;
      }
      blacklist.forEach(function (ext) {
        if ((0, _utils.isString)(ext) && extensionNormalized === ext || (0, _utils.isRegExp)(ext) && extensionNormalized.search(ext) !== -1) {
          _stylelint.utils.report({
            message: messages.rejected(extension),
            node: decl,
            word: extension,
            result: result,
            ruleName: ruleName
          });
        }
      });
    }
    root.walkAtRules("import", function (atRule) {
      // Processing comma-separated lists of import paths
      atRule.params.split(",").forEach(function (path) {
        checkPathForUnderscore(path, atRule);
      });
    });
  };
}
rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;