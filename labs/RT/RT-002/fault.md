# Intentional Fault

## Symptom
Traffic to the branch office network 192.168.1.0/24 is completely blackholed. Ping from R1 to 192.168.1.1 shows 100% packet loss. The serial link between R1 and R2 is up/up.

## Expected Fault
Static route to 192.168.1.0/24 on R1 points to next-hop 10.10.99.5, which does not exist on the serial link (the valid peer is 10.10.99.2). The link being up is confirmed but the next-hop is unreachable.
