## uptime

This flow demonstrates how to use `tedge-flows` to monitor the uptime (as a percentage) of a service.

### Description

The flow is represented by the following steps:

1. Receives status changes, record the timestamps
1. Every tick, publish the statistics

### Input

The flow expects the thin-edge.io service status message to be one of the following formats:

**JSON payload**

```json
{ "status": "down | up" }
```

**Text payload**

```
1 or 0
```
