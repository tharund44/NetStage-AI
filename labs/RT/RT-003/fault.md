# Intentional Fault

## Symptom
R1 has OSPF configured and can see R2 as a neighbor, but the 172.16.10.0/24 network behind R2's GigabitEthernet0/1 never appears in R1's routing table.

## Expected Fault
The 172.16.10.0 network is not included in R2's OSPF network statements (only 10.10.99.0 is advertised). OSPF does not advertise Gi0/1's subnet, so R1 never learns the route.
