import * as React from 'react';
export interface LoginFooterItemProps extends React.HTMLProps<HTMLAnchorElement> {
    /** Content rendered inside the footer link item */
    children?: React.ReactNode;
    /** Additional classes added to the footer link item  */
    className?: string;
    /** The URL of the footer link item */
    href?: string;
    /** Specifies where to open the linked document */
    target?: string;
}
export declare const LoginFooterItem: React.FunctionComponent<LoginFooterItemProps>;
//# sourceMappingURL=LoginFooterItem.d.ts.map