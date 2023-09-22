import { __rest } from "tslib";
import * as React from 'react';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/AboutModalBox/about-modal-box';
import contentStyles from '@patternfly/react-styles/css/components/Content/content';
export const AboutModalBoxContent = (_a) => {
    var { children, trademark, hasNoContentContainer = false } = _a, props = __rest(_a, ["children", "trademark", "hasNoContentContainer"]);
    return (React.createElement("div", Object.assign({ className: css(styles.aboutModalBoxContent) }, props),
        React.createElement("div", { className: css('pf-v5-c-about-modal-box__body') }, hasNoContentContainer ? children : React.createElement("div", { className: css(contentStyles.content) }, children)),
        React.createElement("p", { className: css(styles.aboutModalBoxStrapline) }, trademark)));
};
AboutModalBoxContent.displayName = 'AboutModalBoxContent';
//# sourceMappingURL=AboutModalBoxContent.js.map