# Specification

## Context

StoreMe is a web-based application that aims to provide a simple yet extensive inventory management system.

Managing food at home, IT things for enthusiasts or parts in a small
workshop can quickly become a dull task.
Excel is great, but maintaining a workbook in the long run requires patience and advanced knowledge
if advanced features are used.

The goal of StoreMe is to provide an easy way for any person to abstract the maintaining of the tool
and instead focus on the usage of it

## Existing solutions

There are already some inventory management solution solutions. They are, most of the time, part of an
ITSM (IT services management) solution.

### Snipe-IT

- [https://snipeitapp.com](https://snipeitapp.com)

*Snipe-IT* is an open source web-based inventory management system.
It can be self-hosted but also offers cloud plans.

### ServiceNow

- [https://www.servicenow.com](https://www.servicenow.com)

*ServiceNow* is a web-based complex service management software. Its inventory management capabilities are a small part
of the features it offers.
It's a cloud based software widely used in large companies.

### GLPI

- [https://glpi-project.org](https://glpi-project.org)

*GLPI* is an open-source service management software.
Like ServiceNow, it offers extensive inventory management capabilities.
It is widely used in small to medium companies that do not necessarily have the budget to use platforms such as
ServiceNow.

## Objectives

### Landing page & user sign-up

When landing on the home page, you'll feel like arriving at your destination airport.
`StoreMe&nbsp;©` will present you with a description of the application as well as all the options

- Use our cloud instance
- Self-host an instance

The user experience will be the same. First, a lambda person needs to sign-up.
Then, with their brand-new account, they can log in to the platform.

### Create and join inventories

Then, with their brand-new account, they can create a single inventory.
The user become the owner of its own inventory.

An owner may add up to 4 other people to their inventories.
He can even delete his inventory, losing all related data.

#### Paid plans [*WISH*]

Paid plans are available to allow the creation of more than one inventory
per account and remove the 5 people per inventory limit.

### Locate an item

More than just storing an item, it is important to know where it is.
Having 5 *inflatable pools* is good, but not really useful if they must be looked everywhere.

`StoreMe&nbsp;©` allows the user to define the location(s) of an item.
So when viewing a location, we can list the items on it.

The reverse is true; All locations are listed for an item.

An item can also be categorised with multiple categories, for example, our 5 *inflatable pools* could be categorised
under the following hierarchies:

- `Summer` > `Outside` > `Commodities`
- `Water features` > `Huge-size` > `Pools`
- `Inflatable things`
- `Pools`

All the data on items can be searched trough textual inputs and tree browsing.

### Items changelog/history

It is important to know when an item was added or removed, especially for industries.

`StoreMe&nbsp;©` keeps trace of these changes, so we can determine when an object was bought or sell or if it was lost.

### Geographical representation of a location [*WISH*]

A location can be as small as a drawer or as big as a warehouse.

Although `StoreMe&nbsp;©` allows to define a *parent/children* relation between the locations,
a map of the descending relation helps the user to find his items.

With this, `StoreMe&nbsp;©` could also provide the nearest locations of the user via GPS data.

### Item metadata [*WISH*]

Metadata are key-values entries that can be added to an item model.
Custom logic can be implemented (not by the user)
depending on the metadata key and value (e.g. notification on a specific date).

## Requirements

### Functional requirements

The functional requirements describe the main needs for StoreMe.
They may not reflect exactly the final implementation(s).

#### User

- A person can become a user by signing up
- A user can log in using credentials

#### Inventory

- A user can create one inventory and become its owner
- A user can grant rights to other users on an inventory he created
- A user can list the inventories he is part of

> Currently, a user that can access an inventory has all access to its content.

#### Category

- A user can list categories
- A user can create, and modify a category
- A category can have a parent category

#### Item

- A user can list items
- A user can create and modify an item and an item model
- An item model can be linked to no, one or many categories

#### Location

- A user can list locations
- A user can create, and modify a location
- A location can have a parent location

#### Movement

- A user can list movements
- A user can create a movement, given an item and a location
    - Its creation determine the quantity and the relation between items and locations

#### Accessibility

- A user can look for items by location, categories or any other relevant metadata

### Nonfunctional requirements

| Category    | Description                                      |
|-------------|--------------------------------------------------|
| Ergonomic   | (The site is pretty :)) Modern UI and navigation | 
| Performance | The data is loaded pretty fast                   | 
| Signifiers  | In case of errors, messages are displayed        | 

--- 

We offer two ways to use the application:

- By a cloud solutions, already hosted
- Self-hosted, for people that want to manage their own instance

These requirements slightly change.

#### Cloud

| Category      | Description                                                       |
|---------------|-------------------------------------------------------------------|
| Accessibility | This solution is easily usable from most modern browsers          |
| Accessibility | This solution can be reached with standard internet configuration |
| Up to date    | This solution is always up to date with the newest stable version |

#### Self-hosted

| Category      | Description                                       |
|---------------|---------------------------------------------------|
| Accessibility | A new user can easily start a *Store-me* instance |
| Usability     | A new instance can use an existing DB             |


## Appendix

Mock-ups: https://www.figma.com/file/eCgJoB0XPuwl0jPHQlCcuM/Store.me?node-id=35%3A8399&t=EDGN4GneOP1IJZDb-1

> **Note:**  
> The mock-ups contains only the mobile views. We use a *mobile first* strategy.  
> The desktop views are therefore almost the same, but wider.
