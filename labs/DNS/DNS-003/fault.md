# Intentional Fault

## Symptom
PCs can ping every IP address including the DNS server and the gateway, but any name resolution (nslookup, browsing by hostname) fails. ipconfig /all shows no DNS server configured.

## Expected Fault
The DHCP pool is missing the dns-server option entirely. PCs receive an IP and gateway via DHCP but no DNS server address, so all name resolution fails.
