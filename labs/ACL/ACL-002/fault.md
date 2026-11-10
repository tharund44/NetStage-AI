# Intentional Fault

## Symptom
External clients from the internet cannot reach the company's public web server (10.10.30.10 / 203.0.113.10). Internal users can browse the web server fine and can also reach external sites. [RED HERRING: ACL permit statements look correct at first glance.]

## Expected Fault
ACL 150 is applied outbound on the internal Gi0/0.30 interface instead of inbound on the external S0/0/0 interface. Inbound internet traffic on S0/0/0 has no ACL (no filtering), but the permit rules on Gi0/0.30 outbound reference the internal IP which never matches post-NAT traffic flow. The ACL should be applied inbound on S0/0/0 and reference the public IP.
