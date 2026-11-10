# Intentional Fault

## Symptom
R1 and R2 are running OSPF but the neighbor adjacency never forms. Both interfaces are up/up and can ping each other. [RED HERRING: The network statements both cover the correct interface and wildcard masks look reasonable.]

## Expected Fault
R1's Gi0/0 is in OSPF Area 0 while R2's Gi0/0 is in OSPF Area 1. OSPF requires matching area IDs on a shared link to form adjacency. The network statements and wildcard masks are correct — a red herring that suggests the OSPF config looks fine at first glance.
