# Intentional Fault

## Symptom
Internal PCs (10.10.10.0/24) cannot reach any internet site. Inter-VLAN routing between 10.10.10.0/24 and 10.10.20.0/24 works correctly. The serial link to the ISP is up.

## Expected Fault
The interfaces are not designated as NAT inside or NAT outside (ip nat inside / ip nat outside commands are missing from both interface configurations). NAT cannot function without these designations, so no translations are created.
