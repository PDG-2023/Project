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
It is widely used in small to medium companies that do not necessarily have the budget to use platforms such as ServiceNow.

## Objectives

### User
TODO: Write stuff

### Inventory
TODO: Write stuff

### Category
A category is the first key concept of an inventory management system. Categories can serve multiple purposes: Categorize items by their use, by their compatibility, by their range(s).
TODO: Write more stuff

### Item

An item is the second an principal key concept in inventory management.
TODO: Write more stuff

### Location

A location is the last key item in inventory management. It allows to know where the item is actually physically located. 
Locations can be nested, allowing to represent storage in a flexible way.
TODO: Write more stuff

### Movement
TODO: Write stuff

### Accessibility

Having an inventory is great, but it needs to be easily browsable. StoreMe will provide ways
for users to find their items through textual input.
TODO: Write more stuff


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