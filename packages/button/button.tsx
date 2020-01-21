import * as React from 'react';

type ButtonProps = { children: any };

export default function Button(props: ButtonProps): JSX.Element {
  return <button>{props.children}</button>;
}
