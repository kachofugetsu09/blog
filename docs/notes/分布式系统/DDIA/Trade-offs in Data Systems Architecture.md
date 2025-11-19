---
outline: default
---
This chapter mainly focuses on the trade-offs in different data architectures.

# Terminology

##  Three important concerns
1. **Reliability**: The ability of a system to continue to work correctly even when facing failures(hardware, software or human errors).
2. **Scalability**: As the system grows(data, traffic, complexity), the system must be able to handle the load.
3. **Maintainability**: The ability of a system to be change in future. 

**Operational system** : Operational means it always modifies data in the database; therefore, it performs data transactions. 
This kind of system is used by backend businesses and software engineers.
For example: bank systems, booking systems, etc
**Analytical system**: Analytical means it is related to data analysis; therefore, it uses a read-only copy from the operational system to perform statistics.
This kind of system is used by business analysts (to make future decisions) and data scientist 
For example: supermarket goods analysis system, stock market or 
