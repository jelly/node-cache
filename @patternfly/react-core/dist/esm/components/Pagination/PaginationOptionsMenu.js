import * as React from 'react';
import { css } from '@patternfly/react-styles';
import { Menu, MenuContent, MenuList, MenuItem } from '../Menu';
import { MenuToggle } from '../MenuToggle';
import { Popper } from '../../helpers/Popper/Popper';
import { ToggleTemplate } from './ToggleTemplate';
import { fillTemplate } from '../../helpers';
export const PaginationOptionsMenu = ({ className, widgetId, page: pageProp, itemCount, isDisabled = false, minWidth, dropDirection = 'down', perPageOptions = [], 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
itemsPerPageTitle = 'Items per page', perPageSuffix = 'per page', optionsToggleAriaLabel, ofWord = 'of', perPage = 0, firstIndex = 0, lastIndex = 0, isLastFullPageShown = false, itemsTitle = 'items', toggleTemplate, onPerPageSelect = () => null }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggleRef = React.useRef(null);
    const menuRef = React.useRef(null);
    const containerRef = React.useRef(null);
    const onToggle = () => {
        setIsOpen((prevState) => !prevState);
    };
    const onSelect = () => {
        var _a;
        setIsOpen((prevState) => !prevState);
        (_a = toggleRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    };
    const handleNewPerPage = (_evt, newPerPage) => {
        let newPage = pageProp;
        while (Math.ceil(itemCount / newPerPage) < newPage) {
            newPage--;
        }
        if (isLastFullPageShown) {
            if (itemCount / newPerPage !== newPage) {
                while (newPage > 1 && itemCount - newPerPage * newPage < 0) {
                    newPage--;
                }
            }
        }
        const startIdx = (newPage - 1) * newPerPage;
        const endIdx = newPage * newPerPage;
        return onPerPageSelect(_evt, newPerPage, newPage, startIdx, endIdx);
    };
    React.useEffect(() => {
        const handleMenuKeys = (event) => {
            var _a, _b, _c;
            // Close the menu on tab or escape
            if ((isOpen && ((_a = menuRef.current) === null || _a === void 0 ? void 0 : _a.contains(event.target))) ||
                ((_b = toggleRef.current) === null || _b === void 0 ? void 0 : _b.contains(event.target))) {
                if (event.key === 'Escape' || event.key === 'Tab') {
                    setIsOpen(false);
                    (_c = toggleRef.current) === null || _c === void 0 ? void 0 : _c.focus();
                }
            }
        };
        const handleClick = (event) => {
            var _a, _b, _c;
            // If the event is on the toggle and was fired via keyboard 'click', focus the first
            // non-disabled menu item
            // https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail
            if (event.detail === 0 && isOpen && ((_a = toggleRef.current) === null || _a === void 0 ? void 0 : _a.contains(event.target))) {
                setTimeout(() => {
                    var _a;
                    const firstElement = (_a = menuRef === null || menuRef === void 0 ? void 0 : menuRef.current) === null || _a === void 0 ? void 0 : _a.querySelector('li button:not(:disabled)');
                    firstElement && firstElement.focus();
                }, 0);
            }
            // If the event is not on the toggle, close the menu
            if (isOpen &&
                !((_b = toggleRef === null || toggleRef === void 0 ? void 0 : toggleRef.current) === null || _b === void 0 ? void 0 : _b.contains(event.target)) &&
                !((_c = menuRef.current) === null || _c === void 0 ? void 0 : _c.contains(event.target))) {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handleMenuKeys);
        window.addEventListener('click', handleClick);
        return () => {
            window.removeEventListener('keydown', handleMenuKeys);
            window.removeEventListener('click', handleClick);
        };
    }, [isOpen, menuRef]);
    const renderItems = () => perPageOptions.map(({ value, title }) => (React.createElement(MenuItem, { key: value, "data-action": `per-page-${value}`, isSelected: perPage === value, onClick: (event) => handleNewPerPage(event, value) },
        title,
        ` ${perPageSuffix}`)));
    const toggle = (React.createElement(MenuToggle, Object.assign({ ref: toggleRef, onClick: onToggle }, (optionsToggleAriaLabel && { 'aria-label': optionsToggleAriaLabel }), { isDisabled: isDisabled || (itemCount && itemCount <= 0), isExpanded: isOpen }, (widgetId && { id: `${widgetId}-toggle` }), { variant: "plainText", "aria-haspopup": "listbox" }),
        toggleTemplate &&
            typeof toggleTemplate === 'string' &&
            fillTemplate(toggleTemplate, { firstIndex, lastIndex, ofWord, itemCount, itemsTitle }),
        toggleTemplate &&
            typeof toggleTemplate !== 'string' &&
            toggleTemplate({
                firstIndex,
                lastIndex,
                ofWord,
                itemCount,
                itemsTitle
            }),
        !toggleTemplate && (React.createElement(ToggleTemplate, { firstIndex: firstIndex, lastIndex: lastIndex, ofWord: ofWord, itemCount: itemCount, itemsTitle: itemsTitle }))));
    const menu = (React.createElement(Menu, { className: css(className), onSelect: onSelect, ref: menuRef },
        React.createElement(MenuContent, null,
            React.createElement(MenuList, null, renderItems()))));
    return (React.createElement("div", { ref: containerRef },
        React.createElement(Popper, { trigger: toggle, triggerRef: toggleRef, popper: menu, popperRef: menuRef, isVisible: isOpen, direction: dropDirection, appendTo: containerRef.current || undefined, minWidth: minWidth !== undefined ? minWidth : 'revert' })));
};
PaginationOptionsMenu.displayName = 'PaginationOptionsMenu';
//# sourceMappingURL=PaginationOptionsMenu.js.map