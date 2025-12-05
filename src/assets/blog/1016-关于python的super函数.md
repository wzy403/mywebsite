---
id: 1016
title: 关于python的super函数
date: 2024-07-16
tags: 
- 技术
---

今天无意间发现 Python 类中 `super` 函数在不传参数时，会隐式使用 `self` 局部变量来调用父类方法。说好听点这叫“特性”，说难听点这根本就是个 bug。来看具体例子：

```python
class A:
    def foo(self):
        pass

class B(A):
    def foo(self):
        self = "other obj"
        super().foo()

B().foo()
```

这段代码会抛出 `TypeError`：`super(type, obj): obj must be an instance or subtype of type`。原因是在类 `B` 的 `foo` 方法里，`self` 被重新赋值成了一个字符串，导致 `super()` 无法基于 `self` 正确调用父类方法。

那么问题来了...这样设计的意义是什么？脱裤子放屁吗？我完全可以直接用 `self` 去调用 `A` 里的 `foo` 方法，为什么要用 `super`？`super` 的存在难道不应该是为了100%确保调用到父类的方法吗？现在 `super` 内部依赖 `self`，一旦 `self` 被修改，`super` 就直接失效——设计出这种机制的人到底是怎么想的？

Python 在底层埋了太多类似这样的坑（美其名曰“特性”），而为了填这些坑，又不得不引入一大堆代码规范来打补丁。这就是我如此讨厌 Python 的原因——它是我目前用过的所有语言里，唯一一个让我写着写着就想吐槽语法和所谓“规范”的编程语言。