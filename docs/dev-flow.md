# Development flow

## Git usage

How to use git with this project.

### Branch naming

There are 2 main branches on which we normally do not modify directly:

- **master**: Represents a stable production state:  
 All the code works and provides a functional solution.
- **develop**: Usually before merging on **master**:  
 A functional code on which is added a set of new features to be tested for validation.

> *When can we modify directly on **master** or **develop** ?*  
> These branches should never be modified directly (see PR/MR section [TODO]).
> 
> But it can be done if the following conditions are true:
> - All members are aware of the changes and have agreed to them.
> - The changes are ridiculously small (or they are not really developed features).
> - They are made on a critical time or to test infrastructure.
>
> > Here's some examples:
> > - The CI has just been set on a *production server*. The change: increase timeout
> > - An update of an infrastructure needs to change some parameters.
> > The change: update configuration/environment values

#### Work branches

To develop, use the `dev/` branch directory.
The subdirectories `dev/back/` and `dev/front/` are reserved to specify
if the feature is implemented in the *backend* or the *frontend*.

> **/!\\** It is not necessary to use `dev/back/` or `dev/front/`.  
> If the feature is relatively small, feel free to implement both directly on a `dev/` subdirectory.

This work branches are followed by a meaningful name or nominal group.  
Examples:
- `dev/back/login`: implementation of the login in the *backend* code.
- `dev/front/login`: implementation of the login in the *frontend* code.
- `dev/update-id`: Change the type of entity IDs from `string` to `number`

#### Fix branches

If a feature has already been merged and a fix is needed,
use `fix/` subdirectory.

The naming is the same as the one for Work branches.  
Examples:
- `fix/back/login`
- `fix/update-id`

#### Other branches

Except the 4 previous reserved names (**master**, **develop**, **dev**, **fix**)
feel free to use other names for other kind of modification.  
Examples:
- `doc/changelog`: Update of the changelog file
- `infra/ci`: Update of the CI process
- `infra/docker`: Add some docker files

> As the branches are deleted once merged, the naming is not that important.  
> But to keep thing clean and usable (notably on some Git editors)
> use existing branch directories (e.g. already a `documentation/bla` branch)
> or add reserved names to this documentation.

### Commit message

A commit message should look like this: `(?[<STATE>]) <summary>`

- With **summary** being a short text describing what has been done.
- With **STATE** being an optional status of the commit.  
 The statuses are used for the person(s) working in the same branch. Here's some examples:
  - `[FIX] <summary>`: The current implementation used to have a bug.
  - `[WIP] <summary>`: Not finished, but pushed because it's friday night :).

> There's no need to use the `[FIX]` state on a `fix` branch.
> > The meaning of a branch > commit status

### Merge/Pull Request

This section describe how to create/review/approve/... a *Merge Request* or *Pull Request* (or whatever is used).

> **PR** will be used to reference this.

### Creation

When creating a PR, use a meaningful title and add the issue(s) in the description.
More information can be added in the description if necessary:
- Errors encountered (for the reviewer)
- Important change (not related to the current feature)
- New utility added (class/function)

Add `tags` to the PR, `back` and/or `front`. Other tags can be added.

### Review

No real constraints here except to be humble when reviewing;  
*Nobody's always true, anybody can still be wrong*.

### Validation

All CI tests must succeed.

### Approval and merging

To merge a PR, all conversations must be resolved and approved by at least one other person.

> A PR can be verbally approved (live review), so a PR can be auto-approved with the given message `approved verbaly by <user.name>`


---

**!! [TODO]**

Global prettier/eslint for all `.json|.yml|.md` files?

## Styleguide

[TODO] To define when the technology has been definitely chosen.

See here [TODO] for the global code styleguide or theses backend[TODO], frontend[TODO] for specific. 

### Documentation

How to write documentation (.md)

all readme must be linked in a way or another (like a web page)

[TODO]
