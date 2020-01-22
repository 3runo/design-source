import * as React from 'react';
type ListProps = {
  children: any;
  link: string;
};

export default function List(props: ListProps) {
  return (
    <a title="title" href={props.link}>
      {props.children}
    </a>
  );
}
