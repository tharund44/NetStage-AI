# Intentional Fault

## Symptom
Internet works for most users but during peak hours (30+ concurrent users), some PCs get 'destination unreachable' when trying to browse. It works again if they retry after a few minutes.

## Expected Fault
NAT pool NATPOOL contains only 4 public IP addresses (209.165.200.225-228) with non-overload (one-to-one) mapping. When all 4 are allocated, additional translations fail (312 misses). The pool should use overload (PAT) or be expanded.
