import React, { ReactNode } from "react";
import { Picture } from "../../lib";
export declare enum Layout {
    PictureFirst = 0,
    ContentFirst = 1
}
export default function Wide2Columns({ picture, layout, children, className, animate, }: {
    picture: Picture;
    layout?: Layout;
    children: ReactNode;
    className?: string;
    animate?: boolean;
}): React.JSX.Element;
