angular.module('onlyDigitsAndNumeric', [])
  .directive('onlyDigitsAndNumeric', ['$log', function ($log) {
    'use strict';

    // function showDebugInfo() {
    //   $log.debug("[onlyDigitsAndNumeric] " + Array.prototype.join.call(arguments, ' '));
    // }

    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {
            function inputValue(val) {
                if (val) {
                    var digits = val.replace(/[^0-9.]/g, '');

                    if (digits.split('.').length > 2) {
                        digits = digits.substring(0, digits.length - 1);
                    }

                    if (digits !== val) {
                        ctrl.$setViewValue(digits);
                        ctrl.$render();
                    }
                    return parseFloat(digits);
                }
                return undefined;
            }
            ctrl.$parsers.push(inputValue);
        }
    };
  }]);