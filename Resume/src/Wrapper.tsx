import React, { JSX } from "react";
type SafeTags = "div" | "main" | "header" | "section" | "article";
type WrapperProps<E extends SafeTags = "div"> = {
    tag?: E;
    children: React.ReactNode;
} & React.ComponentPropsWithoutRef<E>;
export function Wrapper<E extends SafeTags = "div">({
    tag,
    children,
    ...rest
}: WrapperProps<E>) {
    const Tag = tag || "div";
    return <Tag {...rest}>{children}</Tag>;
}
