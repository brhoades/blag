---
layout: post
title:  "React Pitfalls"
#date:   2018-05-10 12:00:00 -0600
categories: react design component mistakes best practices
---

## Introduction
React has some common pitfalls that I see developers fall into when designing components. The most common seem to center around readability and performance. Now, there's easily a dozen [good]() [articles](http://americanexpress.io/clean-code-dirty-code/) [about]() [React]() [best]() [practices]() but these lean abstract with contrived examples. Personally, I find it much easier to see where people made mistakes, see how we fixed them, and then break those examples down.

## Deadly Pitfalls
These pitfalls are *bad*. These cause undefined, unperformant, or undeseriable behavior and also tend to be difficult to debug, hard to understand, or not reusable.

### Nested Component Definitions
Defining components within components breaks reusability, causes unnecessary rendering, and crowds files. It's particularly tempting to nest components when one component needs variables from the other, but it leads to coupling. Nesting components will always lead to rerenders of child compoents when any prop in the parent component is changed. Fortunately, it's easy to fix and fairly easy to diagnose.

#### Recommended Reading
 * [React Documentation: rendering elements](https://reactjs.org/docs/rendering-elements.html)
 * [React Reconciliation](https://medium.com/@ryanbas21/react-reconciliation-7075e3f07437)

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

However, defining the component within Section causes Item to be redefined and rerendered every time any Section prop changes. Any Inputs on the page will be destroyed and mounted again within the DOM. If you were typing into an Input component and a Section prop changed, your focus would be lost. I've ran into this scenario quite a few times--- onChange updates Section's items which causes a rerender.

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
Keys in React are used when returning procedurally generated components. One of the most common uses is an array of values which will be individually passed into equally many components, as can be seen below. React's [documentation describes this well](https://reactjs.org/docs/lists-and-keys.html#keys):

> Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity.

Unfortunately, keys aren't always available inside a data source. When not available, keys can be chosen that aren't stable between renders or not unique among sibling components. React's documentation [mentions this](https://reactjs.org/docs/reconciliation.html#tradeoffs):

> Keys should be stable, predictable, and unique. Unstable keys (like those produced by Math.random()) will cause many component instances and DOM nodes to be unnecessarily recreated, which can cause performance degradation and lost state in child components.

In a pinch, using the array index may suffice. However, I'm in the camp that index as a key is an antipattern; you only do this until you encounter a bug from it. Bugs resulting from index as a key are incredibly difficulty to diagnose; they usually arise from where components that have state are change keys. The bug's symptoms will be varied: maybe state tranfers when an element is deleted from an index, or maybe it gets a random state from an older component. You don't want to learn the symptoms.

#### Recommended Reading
 * [Index as a key is an antipattern](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318)
 * [React documentation: Keys](https://reactjs.org/docs/lists-and-keys.html)
 * [React documentation: Recursing on Children](https://reactjs.org/docs/reconciliation.html#recursing-on-children)

#### Bad
```javascript
const shortid = require('shortid');

const Quiz = ({ sections }) => {
  return (
    <div>
      {
        sections.map((section) => (
          <Section
            {...section}
            key={shortid.generate()}
          />
        ))
      }
    </div>
  );
});
```

We're using [shortid](https://github.com/dylang/shortid#usage) to generate a unique, per render random key for our sections. This would be a nonissue if sections never change position or the list never changes size. However, if sections does change, it's possible that there could be [performance issues](https://reactjs.org/docs/reconciliation.html#recursing-on-children) or [state bugs](https://codepen.io/pen?&editors=0010). This can sometimes be easy to solve... sometimes it's not.

#### Good
```javascript
const Quiz = ({ sections }) => {
  return (
    <div>
      {
        sections.map((section) => (
          <Section
            {...section}
            key={section.label}
          />
        ))
      }
    </div>
  );
});
```

The shortid is now swapped for label, which in this case is both unique among all sections and consistent. If you can't find a key that's unique, you may find yourself resorting to using an index, but that should be [a last resort](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318).

### Redux: Overloading mapStateToProps
With Redux, [mapStateToProps](https://github.com/reduxjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) is used to subscribe to updates from the store. Any time the store is updated, every component decorated with connect will have its mapStateToProps called. The output of mapStateToProps is then passed to the component via props.

Since mapStateToProps is called on every update, React applications which heavily utilize the store could see a performance impact. For example, if you are storing [the contents of a form](https://redux-form.com/7.3.0/) in Redux, every letter typed may trigger a store update. Depending on how your application is laid out, this would trigger every mapStateToProps on every keypress, and possible trigger rerenders if those result in prop changes.

If there are any mapStateToProps functions which do a lot of calculation, such as computing the initial values for the form which a user is inputting into, those will be recalculated _every time a key is input_. Since the initial state of a form likely wouldn't change from user input, it wouldn't affect the output for mapStateToProps here. However, the calculation would still happen under the hood.

One workaround here is to use [Reselect](https://github.com/reduxjs/reselect) in any place you are performing complex logic within mapStateToProps. Reselect, which behaves very similarly to mapStateToProps, excepts a list of input functions (which pull data from the store), and passes the list of outputs from those input functions to a result function, which should have the heavy lifting in it. From reselect's documentation:

```javascript
// createSelector(...inputSelectors | [inputSelectors], resultFunc)

const totalSelector = createSelector(
  [
    state => state.values.value1,
    state => state.values.value2
  ],
  (value1, value2) => value1 + value2
)
```

This example is very simple, but it demonstrates basic usage well. Here we created a selector with two input selectors that grab values from the store. These values are passed through to the result function passed as a second argument to `createSelector`. `totalSelector` would be used in your mapStateToProps:

```javascript
mapStateToProps = (state) => ({
  totalOutput: totalSelector(state),
});
```

`totalSelector` is memoized; it is only called when one of its input selectors return a different value. So if `value1 + value2` were an expensive operation that rarely occurred, it would only be called if the two input selectors had changed. This stops expensive computations from occurring when they will provide the same output.

### Shared State

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
