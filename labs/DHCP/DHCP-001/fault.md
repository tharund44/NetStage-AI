# Intentional Fault

## Symptom
Newly connected PCs on VLAN 10 receive 169.254.x.x APIPA addresses. PCs that were already connected and had DHCP leases still work but cannot renew. The switch port LEDs are green.

## Expected Fault
DHCP pool for VLAN 10 is completely exhausted — all 30 addresses in the /27 scope are leased. New clients receive no offer and fall back to APIPA. The pool should be expanded to a /24 to accommodate all hosts.
