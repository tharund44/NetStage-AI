# Intentional Fault

## Symptom
Only 5 PCs on VLAN 10 (10.10.10.0/24) successfully get DHCP addresses. The 6th PC and onward get APIPA despite the pool showing total addresses as 254. [RED HERRING: pool size appears correct at 254 addresses.]

## Expected Fault
The DHCP excluded-address range 10.10.10.1 through 10.10.10.250 is overly broad, leaving only 4 usable addresses (.251-.254). The pool's total of 254 addresses is a red herring — the exclusion negates nearly all of them.
