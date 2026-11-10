# Intentional Fault

## Symptom
Hosts with IPs 10.10.10.128 through 10.10.10.254 are blocked from accessing the file server at 10.10.30.5. Hosts 10.10.10.1 through 10.10.10.127 can access it without issues.

## Expected Fault
ACL 105 line 10 uses wildcard mask 0.0.0.127 which only matches hosts 10.10.10.0 through 10.10.10.127. Hosts in the .128-.254 range do not match line 10, fall through to the deny on line 20, and are blocked. The wildcard mask should be 0.0.0.255 to cover the entire /24.
