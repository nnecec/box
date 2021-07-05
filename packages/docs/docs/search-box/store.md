---
sidebar_position: 3
---

# Store

Store 通过继承 [mitt](https://github.com/developit/mitt) 获得了事件发布订阅的能力。

Store 提供 `search` 方法通过 `emit` 方法抛出 `search` 事件，`SearchBox` 接受到 `search` 事件后触发 `onSearch` 方法。
