# Intentional Fault

## Symptom
PCs on VLAN 10 can reach the 172.16.0.0/16 data centre network but latency is 150ms+ and traceroute shows 4 extra hops through the WAN. The direct LAN path should be 1 hop.

## Expected Fault
The static route to 172.16.0.0/16 directs traffic via 10.10.99.2 (the slow Serial WAN link to R2) instead of 10.10.50.2 (the direct GigabitEthernet link to R3). Traffic takes an unnecessary multi-hop WAN path.
