# Styleguide

<!-- TOC -->

* [Styleguide](#styleguide)
    * [Global](#global)
        * [Avoid implicit / Prefer explicit](#avoid-implicit--prefer-explicit)
        * [Ordering](#ordering)
            * [Accessibility modifier](#accessibility-modifier)
            * [Default ordering](#default-ordering)
        * [*Non-private* Accessors naming](#non-private-accessors-naming)
        * [Prioritize usage over reading (and comprehension)](#prioritize-usage-over-reading--and-comprehension-)
        * [Documentation (.md)](#documentation--md-)
            * [Links](#links)
            * [Table of content](#table-of-content)
    * [Specific applications](#specific-applications)
        * [Backend](#backend)
        * [Frontend](#frontend)

<!-- TOC -->

> This file describe the styleguide applied to the project.  
> To know how to contribute, go [here](./dev-flow.md).

## Global

This section describes styleguide that is applied to all code of the project.

### Avoid implicit / Prefer explicit

Title is self-explanatory, but to be more concise:

- No implicit `this` in *Java* (or static methods)

Bad:

```java
// Java
class User {
    public static String hashPassword(String password) { /*...*/ }

    public void login(String username, String password) {
        User user = null; // get user
        testPassword(user, password)
    }
    
    protected Boolean testPassword(User user, String password) {
        return hashPassword(password) == "stored";
    }
}    
```

Good:

```java
// Java
class User {
    public static String hashPassword(String password) { /*...*/ }

    public void login(String username, String password) {
        User user = null; // get user
        this.testPassword(user, password)
    }
    
    protected Boolean testPassword(User user, String password) {
        return User.hashPassword(password) == "stored";
    }
}    
```

- No implicit `public` in *Typescript`

Bad:

```typescript
// Typescript
class User {
  login(username: string, password: string): boolean {
    /*...*/
  }
}    
```

Good:

```typescript
// Typescript
class User {
  public login(username: string, password: string): boolean {
    /*...*/
  }
}    
```

### Ordering

The ordering helps to highlight or to search code.

#### Accessibility modifier

The order of the accessibility modifiers allows faster access
to the most accessible code in classes.

> **Note**:  
> The accessibility is determined by its view **outside** the class.  
> So, for instance, the keyword `get` in **Javascript** "transforms" it's function into property.

It goes from *public* to *private*, so:

- `static`
    - `public properties`
    - `protected properties`
    - `private properties`
    - `public methods`
    - `protected methods`
    - `private methods`
- *Instance*
    - `public properties`
    - `protected properties`
    - `private properties`
    - `public constructors`
    - `protected constructors`
    - `private constructors`
    - `public methods`
    - `protected methods`
    - `private methods`

> **Note for *abstract***:  
> Abstract for properties or methods are special modifiers, so they go before the non-abstract ones.
> ```java
> // Java
> abstract class Entity {
>   public abstract String getName();
> 
>   public Int getId() { /*...*/ }
> }
> ```

> **Note for *getters/setters* methods**:  
> Methods like `String getName()` or `setName(String name)` are still methods.  
> However they can all be placed right after the constructor.

#### Default ordering

Always prefer the alphabetical order if none other order takes places.

### *Non-private* Accessors naming

When naming *"non-private"* accessors, use the name, or *main domain* first,
then the complement first.

> **What is *"non-private*" accessors?**  
> A variable, getter/setter or function that can be accessed from another part of the code.  
> **Examples**:
> - *public* | *protected*
> ```java
> // Java
> class User {
>   public String getName() { /*...*/ }
>   protected User getParent() { /*...*/ }
> }
> ```
> - constants
> ```typescript
> // typescript
> export const BACKEND_URL: string = "...";
> ```

> **What is a *"domain name*"?**  
> It's the name of dependant code managing an entity (~= domain).
> **Examples**:  
> Given the *domain* user, the following names are correct:
> - UserController
> - UserModule
> - UserService


**Why this order?**

It is easier to describe a location by its largest parent and then sharpened its precision.

**Real life example**:  
Where is *Bern*? - World -> Europe -> Central -> Switzerland

**Code example**:  
Given a button with a left and right icon.

```typescript
// "bad" naming
interface ButtonOptions {
  // ... others properties
  leftIcon: unknown;
  // ... others properties
  rightIcon: unknown;
  // ... others properties
}
```

With the order applied, the similar options are close to each order :

```typescript
// "good" naming
interface ButtonOptions {
  // ... others properties
  iconLeft: unknown;
  iconRight: unknown;
  // ... others properties
}
```

> **Note**:  
> Remember that this applies to *"non-private"* accessors.
> "Good" english can still be used to create internal variables.
> ```typescript
> function DoButton(options: ButtonOptions) {
>   const leftIcon = options.iconLeft;
>   // ...
> }
> ```

### Prioritize usage over reading (and comprehension)

The following sentence is read/heard many times:
> A code is written once but read many times.

It's mainly true, however this implies that to understand a function,
its implementation should be read. And it's not what this section is about.

From this styleguide, a function implementation is let to be pretty freely developed.
For instance, control loops (`for`, `while`) can be used
and a more functional approach is still encouraged (`map`, `filter`).

> **Note**:  
> This does not mean that an implementation can be encrypted or unreadable :).

On the other hand, the name of a function must be explicit, otherwise accompanied by comments.  
Modern IDEs integrate pretty well any `JavaDoc`/`JSDoc`.  
In case of ambiguity, examples (`@example`) provide chunks of code showing how to use or not to use a function.

### Documentation (.md)

<!-- TODO: global prettier/eslint to force format? -->

Even if there's no max width on these files,
use some return line when sentences are too long.  
*Markdown* will not create empty spaces, so avoid *one-liner* sentences.

#### Images

Images for *Markdown* files are stored respecting the following path `docs/images/<file>/<image>`.

- **file**: is the *Markdown* file
- **image**: the image to stored (can use subdirectories)

#### Links

The *Markdown* files are the documentation of this project.  
To optimize its navigation, all files must be linked by another and possibly link **to** another.  
So a new user can navigate through the documentation like it is web pages.

#### Table of content

Each file have its own table of content.

> It can be easily generated (and updated) with Jetbrains IDE.  
> See official [documentation](https://www.jetbrains.com/help/idea/markdown.html#table-of-contents).

## Specific applications

Check the following for styleguide applied to the applications.

### Backend

For *Backend* specific styleguide, see [here](../apps/backend/docs/styleguide.md).

### Frontend

For *Frontend* specific styleguide, see [here](../apps/frontend/docs/styleguide.md).
