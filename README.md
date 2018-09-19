
# Typescript 中的 React类型备忘

- `React.StatelessComponent | React.SFC<P>`: 代表 React无状态函数组件
- `React.Component<P, S>`: 代表 React有状态组件
- `React.ComponentType<P>`: 代表 React组件，SFC 或 Component
- `React.ReactElement<P> | JSX.Element`: 代表 React组件 或 Dom组件(如：<div />)
- `React.ReactNode`: 什么都可能： ReactElement 或 JS原始类型（如：0, false,  undefined）
- `React.CSSProperties`: 代表 css-in-js 样式对象
- `React.ReactEventHandler<E>`: 代表 一般性事件句柄
- `React.MouseEvent<E> | React.KeyboardEvent<E> | React.TouchEvent<E> etc...`: 代表 一些特殊事件句柄

