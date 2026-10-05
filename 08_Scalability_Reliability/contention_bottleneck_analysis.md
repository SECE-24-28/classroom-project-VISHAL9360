# SALESTORM ARFA - Contention Bottleneck & Hardware Physics Analysis

## 1. The 10,000-to-100 Contention Paradox
When 10,000 requests arrive concurrently targeting 100 stock units:
- Only 1.0% of requests will result in an inventory lease.
- 99.0% of requests (9,900 requests) are guaranteed rejections.

In poorly architected systems, processing a rejection consumes virtually the same compute, memory, and database lock resources as processing a successful reservation. The primary bottleneck is not granting the 100 reservations—it is gracefully shedding the 9,900 losing requests without destabilizing the system.

---

## 2. Hardware Resource & Physical Limits

| Resource Layer | Physical Bottleneck | SALESTORM Architectural Solution |
| :--- | :--- | :--- |
| **Linux Ephemeral Ports** | 65,535 port limit; sockets stuck in `TIME_WAIT` | HTTP/2 socket multiplexing & persistent connection pools |
| **CPU Cache Thrashing** | L1/L2 cache invalidation from lock bouncing | Single-threaded Redis event loop; zero thread context switching |
| **Disk I/O IOPS** | NVMe disk write saturation under synchronous logging | In-memory reservation plane; asynchronous batched WAL flushing |
| **Network Interconnect** | Packet drops at AWS VPC virtual network interfaces | High-throughput Enhanced Networking (ENA 100 Gbps instances) |

---

## 3. Mathematical Proof of Zero Overselling
Let $S_t$ denote the available stock at discrete time $t$, with initial stock $S_0 = 100$.
Let $r_i \in \{1\}$ denote the requested decrement of the $i$-th reservation request.
The Redis Lua script executes sequentially inside Redis's single execution thread:

$$S_{t+1} = \begin{cases} 
S_t - 1 & \text{if } S_t \ge 1 \\
S_t & \text{if } S_t = 0 \text{ (Emit REJECT)}
\end{cases}$$

Because Redis Lua execution is atomic and non-preemptive:
1. No two Lua scripts can interleave execution on the same Redis primary node.
2. The decrement condition $S_t \ge 1$ is evaluated immediately prior to decrement within the same atomic instruction.
3. Therefore:
$$\forall t \ge 0, \quad S_t \ge 0 \quad \text{and} \quad \sum_{k=1}^{M} \text{granted}_k \le S_0 = 100$$
Overselling is mathematically impossible regardless of request concurrency.
