# Intentional Fault

## Symptom
External users cannot reach the internal web server via public IP 203.0.113.10. Internal users can browse the web server at its private IP 10.10.10.15 without issues. [RED HERRING: An ACL on the external interface permits HTTP/HTTPS to 203.0.113.10 — rules look correct.]

## Expected Fault
Static NAT maps 203.0.113.10 to inside local address 10.10.10.50, but the actual web server's IP is 10.10.10.15. The NAT translation sends traffic to a non-existent host. The ACL correctly permits HTTP/HTTPS to the public IP — a red herring suggesting the ACL is the issue when it actually has zero matches because NAT is translating to the wrong host.
