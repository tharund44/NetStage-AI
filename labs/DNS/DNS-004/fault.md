# Intentional Fault

## Symptom
All PCs report DNS failures — browsing and nslookup time out. Pinging the DNS server 10.10.10.5 returns 'Request timed out'. The switch port for the DNS server is up. [RED HERRING: Switch port Fa0/20 is up/up and in correct VLAN.]

## Expected Fault
The DNS server at 10.10.10.5 is powered off or its NIC is disconnected — ARP resolution for 10.10.10.5 shows 'Incomplete' on R1. The switch port being up/connected is a red herring (the port may be connected but the server's NIC or OS is not responding).
