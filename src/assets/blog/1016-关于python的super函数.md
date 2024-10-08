---
id: 1016
title: 为什么我讨厌Python：从super函数谈起
date: 2024-07-16
tags: 
- 技术
---

今天无意间发现了一个关于Python类中`super`函数的有趣现象，具体来说，是在不传参时，`super`函数会使用`self`局部变量来调用父类的方法。看似是Python的一个特性，但在我眼中，这更像是一个bug。

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

以上代码会抛出一个`TypeError`：`super(type, obj): obj must be an instance or subtype of type`。这是因为在类`B`的`foo`方法中，`self`被重新赋值为一个字符串，导致`super()`无法正确使用`self`来调用父类的方法。

这类问题让我对Python有着深深的反感。虽然我承认Python在许多情况下非常方便且功能强大，我也时常使用它，但这并不妨碍我对它的厌恶之情。Python在底层留下了太多类似的bug（或者称之为“特性”），而为了解决这些问题，Python引入了大量的代码规范来为这些问题打补丁。

举个例子，Python的代码规范PEP8，包含了很多细节要求，比如如何命名变量、如何组织代码结构等等。虽然这些规范有助于提高代码的可读性和一致性，但在我看来，这更像是在弥补语言本身的不完善之处。Python的灵活性使得它容易上手，但也带来了很多潜在的问题，这使得我在写代码时常常感到不适。

作为一名开发者，我使用过多种编程语言，Python是目前为止唯一一个让我在编写代码时频频想要吐槽其语法和规范的语言。尽管如此，Python在数据处理、自动化脚本、web开发等领域仍然有着广泛的应用。这种矛盾的心情正是我对Python又爱又恨的原因。

---

### 结语

虽然我对Python有着诸多不满，但它的确是一个功能强大的工具。每种编程语言都有其优点和缺点，我们需要做的是根据具体需求选择最合适的工具。而对于Python，我的建议是：在享受它带来的便利的同时，也要做好面对其“特性”的心理准备。

