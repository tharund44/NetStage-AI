# Intentional Fault

## Symptom
PCs can ping 8.8.8.8 and all internal servers by IP, but browsing to www.corporate.local or any hostname fails. nslookup times out.

## Expected Fault
DHCP pool distributes the wrong DNS server address — 10.10.10.50 (non-existent) instead of 10.10.10.5 (the actual DNS server). Clients send DNS queries to a host that does not exist.
