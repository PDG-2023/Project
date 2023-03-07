# Specification

> V 1.0, 07.03.2023

## Context & description

StoreMe is a simple inventory management system.

It aims to crush competition by eliminating all the complex
and time-consuming features of others inventory management software.

## Existing solutions

There are already some inventory solutions. Here's some:

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

*GLIP* is an open-source service management software.
Like ServiceNow, it offers extensive inventory management capabilities.
It is widely used in small to medium companies that do not necessarily have the budget to use platforms such as ServiceNow.

## Objectives
The main objective for StoreMe is to keep things as simple as they may be. 
The main downside of existing solutions are their complexity around a simple task: "Were is my item and how many do I have".

For that, we will use 3 different key concepts:
- Locations, hierarchical representation of where an item is physically
- Category, what group does the item belongs to
- Models, what the item is

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
