# About the RentX
Rentx is an Rental Car backend platform. 

## Business Rules
The most important requirements and Business Rules. Separated by
- (FR) Functional Requirement
- (NFR) Non Functional Requirement
- (BR) Business Rule

### Cars

#### Register Car
**Functional Requirement**
- [X] Should be able to register an new Car

**Business Rule**
- [X] Should be registered only by ```admins``` users.
- [X] Should be registered with the ```available``` default ```true```.
- [X] Should not be able to register an car with an existing ```license_plate```.

#### List Cars

**Functional Requirement**
- [X] Should be able to list all available cars.
- [X] Should be able to list all available by category name.
- [X] Should be able to list all available by brand.
- [X] Should be able to list all available by car name.

**Business Rule**
- [X] Any user should be able to list available cars.

#### Update Cars

**Functional Requirement**
- [ ] Should be able to update an existing car.

**Business Rule**
- [ ] Should not be able to update an nonexistent car.
- [ ] Should not be able to update an ```license_plate``` with an that already exists.

### Specifications

#### Create Specification

**Functional Requirement**
- [ ] Should be able to register an new specification.

**Business Rule**
- [ ] Should be registered only by ```admins``` users.

#### Car Specification Register
**Functional Requirement**
- [X] Should be able to register an new specification to an car.

**Business Rule**
- [X] Should not be able to register an specification for an non existing car.
- [X] Should not be able to register an already existing specification for same car.
- [X] Should be registered only by ```admins``` users.

#### List Specifications

**Functional Requirement**
- [ ] Should be able to list all available specifications.
- [ ] Should be able to list all cars.

### Categories

#### Create Category
**Functional Requirement**
**Business Rule**

#### List Categories
**Functional Requirement**
**Business Rule**

#### Import Categories
**Functional Requirement**
**Business Rule**








### Users

#### Authenticate User
**Functional Requirement**
**Business Rule**

#### Create User
**Functional Requirement**
**Business Rule**

#### Update User Avatar
**Functional Requirement**
**Business Rule**

### Rental

#### Create Rental

**Functional Requirement**
- [X] Should be able to create an rental.

**Business Rule**
- [X] The rental ```expect_return_date``` parameter should be at least 24 hours by default.
- [X] Should not be able register an new rental, if already exists for user. 
- [X] Should not be able register an new rental, if already exists for car. 
- [X] The user should be authenticated by application.
- [X] On create an rental, the car status should be changed to unavailable.

#### Devolution Rental

**Functional Requirement**
- [X] Should be able to return car.

**Business Rule**
- [X] Returning the car with less then 24 hours, should be billed the entire day.
- [X] After returned, the Car should be available to another rental.  
- [X] After returned, the User should be available to another rental.
- [X] After returned, should be calculated the rental amount.
- [X] The user should be authenticated by application.
- [X] If the returning hour is higher then expected return time, should be billed an fine due overdue.
- [X] In case there is a fine, should be calculated with amount of rental.


#### Devolution Rental

**Functional Requirement**
- [X] Should be able to get all rentals by user

**Business Rule**
- [X] The user should be authenticated by application