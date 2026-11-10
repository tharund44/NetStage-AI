# Intentional Fault

## Symptom
nslookup fails from all PCs with 'request timed out'. Pinging the DNS server at 10.10.10.5 by IP address succeeds. [RED HERRING: DNS server IP in DHCP config is correct.]

## Expected Fault
ACL 120 on R1 Gi0/0.10 explicitly denies UDP port 53 (line 40) before the permit-all on line 50, blocking DNS query traffic. The DHCP dns-server configuration is correct — a red herring that makes it appear the DNS setup is fine.
