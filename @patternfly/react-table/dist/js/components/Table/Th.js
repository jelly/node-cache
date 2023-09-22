"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Th = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_styles_1 = require("@patternfly/react-styles");
const table_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Table/table"));
const table_scrollable_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Table/table-scrollable"));
const utils_1 = require("./utils");
const merge_props_1 = require("./base/merge-props");
const Tooltip_1 = require('@patternfly/react-core/dist/js/components/Tooltip/Tooltip');
const ThBase = (_a) => {
    var { children, className, component = 'th', dataLabel, scope = 'col', textCenter = false, sort = null, modifier, select = null, expand: collapse = null, tooltip = '', onMouseEnter: onMouseEnterProp = () => { }, width, visibility, innerRef, info: infoProps, isStickyColumn = false, hasRightBorder = false, hasLeftBorder = false, stickyMinWidth = '120px', stickyLeftOffset, stickyRightOffset, isSubheader = false } = _a, props = tslib_1.__rest(_a, ["children", "className", "component", "dataLabel", "scope", "textCenter", "sort", "modifier", "select", "expand", "tooltip", "onMouseEnter", "width", "visibility", "innerRef", "info", "isStickyColumn", "hasRightBorder", "hasLeftBorder", "stickyMinWidth", "stickyLeftOffset", "stickyRightOffset", "isSubheader"]);
    const [showTooltip, setShowTooltip] = React.useState(false);
    const [truncated, setTruncated] = React.useState(false);
    const cellRef = innerRef ? innerRef : React.createRef();
    const onMouseEnter = (event) => {
        if (event.target.offsetWidth < event.target.scrollWidth) {
            !showTooltip && setShowTooltip(true);
        }
        else {
            showTooltip && setShowTooltip(false);
        }
        onMouseEnterProp(event);
    };
    let sortParams = null;
    if (sort) {
        if (sort.isFavorites) {
            sortParams = (0, utils_1.sortableFavorites)({
                onSort: sort === null || sort === void 0 ? void 0 : sort.onSort,
                columnIndex: sort.columnIndex,
                sortBy: sort.sortBy
            })();
        }
        else {
            sortParams = (0, utils_1.sortable)(children, {
                columnIndex: sort.columnIndex,
                column: {
                    extraParams: {
                        sortBy: sort.sortBy,
                        onSort: sort === null || sort === void 0 ? void 0 : sort.onSort
                    }
                }
            });
        }
    }
    const selectParams = select
        ? (0, utils_1.selectable)(children, {
            rowData: {
                selected: select.isSelected,
                disableSelection: select === null || select === void 0 ? void 0 : select.isDisabled,
                props: select === null || select === void 0 ? void 0 : select.props
            },
            column: {
                extraParams: {
                    onSelect: select === null || select === void 0 ? void 0 : select.onSelect,
                    selectVariant: 'checkbox',
                    allRowsSelected: select.isSelected,
                    isHeaderSelectDisabled: !!select.isHeaderSelectDisabled
                }
            }
        })
        : null;
    const collapseParams = collapse
        ? (0, utils_1.collapsible)(children, {
            column: {
                extraParams: {
                    onCollapse: collapse === null || collapse === void 0 ? void 0 : collapse.onToggle,
                    allRowsExpanded: !collapse.areAllExpanded,
                    collapseAllAriaLabel: ''
                }
            }
        })
        : null;
    const widthParams = width ? (0, utils_1.cellWidth)(width)() : null;
    const visibilityParams = visibility
        ? (0, utils_1.classNames)(...visibility.map((vis) => utils_1.Visibility[vis]))()
        : null;
    let transformedChildren = (sortParams === null || sortParams === void 0 ? void 0 : sortParams.children) || (selectParams === null || selectParams === void 0 ? void 0 : selectParams.children) || (collapseParams === null || collapseParams === void 0 ? void 0 : collapseParams.children) || children;
    // info can wrap other transformedChildren
    let infoParams = null;
    if (infoProps) {
        infoParams = (0, utils_1.info)(infoProps)(transformedChildren);
        transformedChildren = infoParams.children;
    }
    const merged = (0, merge_props_1.mergeProps)(sortParams, selectParams, collapseParams, widthParams, visibilityParams, infoParams);
    const { 
    // ignore the merged children since we transform them ourselves so we can wrap it with info
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    children: mergedChildren = null, 
    // selectable adds this but we don't want it
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isVisible = null, className: mergedClassName = '', component: MergedComponent = component } = merged, mergedProps = tslib_1.__rest(merged, ["children", "isVisible", "className", "component"]);
    React.useEffect(() => {
        setTruncated(cellRef.current.offsetWidth <
            cellRef.current.scrollWidth);
    }, [cellRef]);
    const cell = (React.createElement(MergedComponent, Object.assign({ tabIndex: sort || select || !truncated ? -1 : 0, onFocus: tooltip !== null ? onMouseEnter : onMouseEnterProp, onBlur: () => setShowTooltip(false), "data-label": dataLabel, onMouseEnter: tooltip !== null ? onMouseEnter : onMouseEnterProp, scope: component === 'th' && children ? scope : null, ref: cellRef, className: (0, react_styles_1.css)(table_1.default.tableTh, className, textCenter && table_1.default.modifiers.center, isSubheader && table_1.default.tableSubhead, isStickyColumn && table_scrollable_1.default.tableStickyCell, hasRightBorder && table_scrollable_1.default.modifiers.borderRight, hasLeftBorder && table_scrollable_1.default.modifiers.borderLeft, modifier && table_1.default.modifiers[modifier], mergedClassName) }, mergedProps, props, (isStickyColumn && {
        style: Object.assign({ '--pf-v5-c-table__sticky-cell--MinWidth': stickyMinWidth ? stickyMinWidth : undefined, '--pf-v5-c-table__sticky-cell--Left': stickyLeftOffset ? stickyLeftOffset : 0, '--pf-v5-c-table__sticky-cell--Right': stickyRightOffset ? stickyRightOffset : 0 }, props.style)
    })), transformedChildren));
    const canMakeDefaultTooltip = tooltip === '' ? typeof transformedChildren === 'string' : true;
    return tooltip !== null && canMakeDefaultTooltip && showTooltip ? (React.createElement(React.Fragment, null,
        cell,
        React.createElement(Tooltip_1.Tooltip, { triggerRef: cellRef, content: tooltip || (tooltip === '' && children), isVisible: true }))) : (cell);
};
exports.Th = React.forwardRef((props, ref) => (React.createElement(ThBase, Object.assign({}, props, { innerRef: ref }))));
exports.Th.displayName = 'Th';
//# sourceMappingURL=Th.js.map