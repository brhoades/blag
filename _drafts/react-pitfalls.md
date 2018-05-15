---
layout: post
title:  "React Pitfalls"
#date:   2018-05-10 12:00:00 -0600
categories: react design component mistakes best practices
---

## Introduction
There are some common pitfalls that I've seen React developers, new and old, fall into when designing React components. The most common seem to center around readability and performance. Now, there's easily a dozen [good]() [articles](http://americanexpress.io/clean-code-dirty-code/) [about]() [React]() [best]() [practices]() but these lean abstract with contrived examples. Personally, I find it much easier to see where people made mistakes, see how we fixed them, and then break those examples down.

All code in this post is _real code_ that exists or did exist. Names were changed and content was trimmed for simplicity, but the structure is the same. Some of this code was written by someone else, some of it I wrote (in the past). It's important to emphasize that the intention isn't to shame anyone, but rather to learn from mistakes.

## Deadly Pitfalls
These pitfalls are *bad*. These cause broken/unexpected/undefined behavior and are not performant, not reusable, difficult to debug, and/or hard to understand.

### Nested Component Definitions
Defining components within components breaks reusability, causes unnecessary rendering, and crowds files. It's particularly tempting to nest components when one component needs variables from the other, but iit leads to coupling. Fortunately, it's easy to fix.

#### Bad
```javascript
const Section = ({ description, footer, header, items, sectionId, onChange }) => {
  const Item = ({ content, label, index, value }) => (
    <React.Fragment>
      <Header size="small">{label}</Header>
      {content}
      <Input onChange={(e) => onChange(sectionId, index, e.target.value)} value={value} />
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

Here you can see a section component which, within it, defines an Item component and a Content component. Defining an internal Content component here is only a coupling issue. However, defining Item within this component is going to cause some pain. Item is defined within this component because it's only used by Section and it needs sectionId and onChange from Section.

However, defining the component within Section causes Item to be redefined every time any Section prop changes. When any Section prop is updated, everything will be redefined and rerendered. Any Inputs on the page will be destroyed and mounted again within the DOM. If you were typing into an Input component and a Section prop changed, your focus would be lost. I've ran into this scenario quite a few times--- onChange updates Section's items which causes a rerender.

If Item were moved outside of Section, React would behave differently.

#### Good
```javascript
const Item = ({ content, label, index, onChange, sectionId }) => (
  <React.Fragment>
    <Header size="small">{label}</Header>
    {content}
    <Input onChange={(e) => onChange(sectionId, index, e.target.value)} />
    <Spacer size="small" />
  </React.Fragment>
);

const Section = ({ description, footer, header, items, sectionId, onChange }) => {
  const content = items.map(({ content, label }, i) => (
    <Item
      content={content}
      label={label}
      index={i}
      sectionId={sectionId}
      onChange={onChange}
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

As mentioned above, with Item defined outside of section any changes to Section's props which don't affect Item's props will not cause a rerender. [Only components with modified props will be updated](https://reactjs.org/docs/rendering-elements.html#react-only-updates-whats-necessary). Input's focus will not be lost as long as its props aren't changed. We save unnecessary renders here and remove future coupling issues.

### Abusing Keys


### Shared State

### Redux: Overloading mapStateToProps

## Delayed Pitfalls
These won't get you when you develop, but they'll get you when you don't expect it.

### Branching Logic in Render
Hard to read, harder to debug.

### shouldComponentUpdate
It's a smell.

## Potholes
There's aren't pitfalls... they're just potholes.

### Lambdas in Render

### && / || with Objects in Passed Props

### Wrapping with Dummy Components

```javascript
<React.Fragment />
```

### Avoid Class Components

## Resources
 * [Optimizing React Performance](https://reactjs.org/docs/optimizing-performance.html)
