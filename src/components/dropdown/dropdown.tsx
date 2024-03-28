"use client"

import React, { useState, useEffect, useRef } from "react";
import styles from "./dropdown.module.css"

type DropdownProps = {
    children?: React.ReactElement | React.ReactElement[],
    id?: string,
    classNames?: { wrapper?: string, list?: string, option?: string},
    options?: string[] | React.ReactNode | React.ReactNode[] | React.ReactElement | React.ReactElement[],
    onValueChange?: (value: string) => any,
    onOpen?: () => any
    onClose?: () => any
}

export default function Dropdown({ children, id, classNames, options, onValueChange, onOpen, onClose }: DropdownProps): React.ReactNode {
    const [isOpen, Toggle] = useState<boolean>(false);

    const ref: any = useRef();

    function open(event: any) {
        if (isOpen) {
            if (event.target.tagName.toLowerCase() === 'a')
                setTimeout(() => close(), 250)
            return;
        };

        if (Array.isArray(options) && options.length > 0)
            FixOptionsHeight(event);

        if (onOpen)
            onOpen();

        Toggle(true);
    }

    function close() {
        if (!isOpen) return;

        ResetOptionsHeight();

        if (onClose)
            onClose();

        Toggle(false);
    }

    useEffect(() => {
        if (!ref.current) return;

        function HandleClick(event: MouseEvent) {
            if (!isOpen) return;

            if (!ref.current.contains(event.target as Node))
                close();
        }

        document.addEventListener('click', HandleClick);

        return () => {
            document.removeEventListener('click', HandleClick);
        }
        
    }, [ref, isOpen])

    function FixOptionsHeight(event: any) {
        const padding = 8;
        const containerHeight = event.target.getBoundingClientRect().height;

        const list = event.currentTarget.getElementsByClassName(styles.list)[0];

        list.style.minHeight = `${containerHeight}px`;
        list.style.height = `${containerHeight}px`;

        let listHeight = containerHeight + padding;
        setTimeout(() => {
            if (list.children.length === 0) return;

            const listStyle = window.getComputedStyle(list);

            for (let i = 0; i < list.children.length; i++) {
                const child = list.children[i];

                // account for flex containers with gap set
                if (i > 0 && listStyle.display === 'flex' &&  Number.isInteger(parseInt(listStyle.gap)))
                    listHeight += parseInt(listStyle.gap);

                const rect = child.getBoundingClientRect();
                const style = window.getComputedStyle(child); // account for margin (height only contains padding)

                listHeight += rect.height + parseInt(style.marginTop) + parseInt(style.marginBottom);
            }

            list.style.paddingTop = `${containerHeight + padding}px`;
            list.style.paddingBottom = `${containerHeight + padding}px`
            list.style.height = `calc(min(50vh, ${listHeight + (2 * padding)}px))`
         }, 0);
    }

    function ResetOptionsHeight() {
        if (!ref.current) return;

        const list = ref.current.getElementsByClassName(styles.list)[0];
        const containerHeight = list.parentElement.children[0].getBoundingClientRect().height;
        list.style.height = `${containerHeight}px`;
        list.style.paddingTop = '0px'; 
        list.style.paddingBottom = '0px'; 
    }

    return <div
        ref={ref}
        id={id}
        className={`${classNames?.wrapper} ${styles.wrapper}`}
        onClick={open}
        onFocus={open}
        onChange={FixOptionsHeight}
    >
        {children}
        <ul className={`${classNames?.list} ${styles.list} ${isOpen ? styles.open : ''}`}>
            {Array.isArray(options) ? options.map((option) => {
                if (typeof (option) === "string")
                    return <li
                        key={option}
                        className={classNames?.option}
                        onClick={(e) => {
                            if (onValueChange)
                                onValueChange(option);

                            close();
                        }}
                    >
                        {option}
                    </li>
                else return option;
            }) : options}
        </ul>
    </div>;
}