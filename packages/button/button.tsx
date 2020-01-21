import React from 'react';
type ButtonProps = { children: any }

export default function Button(props: ButtonProps) {
    return (
        <button>
            {props.children}
        </button>
    );
}