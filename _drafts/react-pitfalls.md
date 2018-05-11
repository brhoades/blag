---
layout: post
title:  "React Pitfalls"
#date:   2018-05-10 12:00:00 -0600
categories: react design component mistakes best practices
---

Introduction
=================
There are some common pitfalls that I've seen React developers, new and old, fall into when designing React components. The most common seem to center around readability and performance. Now, there's easily a dozen [good]() [articles](http://americanexpress.io/clean-code-dirty-code/) [about]() [React]() [best]() [practices]() but these lean abstract with contrived examples. Personally, I find it much easier to see where people made mistakes, see how we fixed them, and then break those examples down.

Deadly Pitfalls
=====================

Nested Component Definitions
--------------------------------
Defining components within components breaks reusability, causes unnecessary rendering, and crowds files unnecessarily. It can be tempting to nest components, particularly when one component effectively closes over another, but it will always lead to coupling. Fortunately, it's easy to fix.

### Bad
```javascript
const Section = ({ description, footer, header, sectionId, onChange }) => {
  const Item = ({ content, label, index }) => (
    <React.Fragment>
      <Header size="small">{label}</Header>
      {content}
      <Input onChange={(e) => onChange(sectionId, index, e.target.value)}
      <Spacer size="small" />
    </React.Fragment>
  );
  
  const Content = () => (
    items.map(({ content, label }, i) => (
      <Item
        content={content}
        label={label}
        index={i}
        key={`${sectionId}${label}`}
      />
    ));
  );
  
  return (
    <Card>
      <Header>{header}</Header>
      <Content />
      <Footer>{footer}</Footer>
    </Card>
  );
});
```

Closing over id.
React updates every item when any item changes. With well-defined components, [only components which changed are updated](https://reactjs.org/docs/rendering-elements.html#react-only-updates-whats-necessary).

### Good
```javascript
const Item = ({ content, label, index, sectionId }) => (
  <React.Fragment>
    <Header size="small">{label}</Header>
    {content}
    <Input onChange={(e) => onChange(sectionId, index, e.target.value)}
    <Spacer size="small" />
  </React.Fragment>
);

const Section = ({ description, footer, header, sectionId, onChange }) => {
  const content = items.map(({ content, label }, i) => (
    <Item
      content={content}
      label={label}
      index={i}
      sectionId={sectionId}
      key={`${sectionId}${label}`}
    />
  ));

  return (
    <Card>
      <Header>{header}</Header>
      {content}
      <Footer>{footer}</Footer>
    </Card>
  );
});
```

Shared State
--------------

Abusing Keys
---------------

Redux: Overloading mapStateToProps
---------------------------------------

Delayed Pitfalls
=====================

Branching Logic in Render
----------------------------
Hard to read, harder to debug.

shouldComponentUpdate
------------------------
It's a smell.

Potholes
===========
There's aren't pitfalls... they're just potholes.

Lambdas in Render
-------------------

&& / || with Objects in Passed Props
-----------------------------------------

Wrapping with Dummy Components
----------------------------------

```javascript
<React.Fragment />
```

Avoid Class Components
-------------------------

Resources
=============
 * [Optimizing React Performance](https://reactjs.org/docs/optimizing-performance.html)
