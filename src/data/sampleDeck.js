export const sampleDeck = {
  id: "cs-systems-architecture",
  title: "Computer Systems, OS & Architecture",
  description: "Exhaustive, zero-omission mastery of hardware internals, OS kernels, concurrency, virtual memory, and distributed systems.",
  category: "Computer Science",
  author: "Study Deck Master Engine",
  version: "1.0.0",
  estimatedHours: 24,
  badge: "Core Engineering",
  modules: [
    {
      id: "mod-1-memory-cpu",
      title: "Module 1: CPU Architecture & The Memory Hierarchy",
      summary: "Microarchitectural pipeline, register files, cache line coherence, virtual memory translation, page tables, and TLB.",
      order: 1,
      topics: [
        {
          id: "top-1-1-pipeline",
          title: "1.1 The Classical RISC Instruction Pipeline & Hazards",
          readTimeMinutes: 18,
          masteryLevel: "Beginner to Advanced",
          content: {
            introduction: "Modern central processing units execute instructions by breaking instruction cycles into discrete microarchitectural stages. Rather than waiting for one instruction to complete all stages before beginning the next, pipelining overlaps the execution of multiple instructions simultaneously, multiplying instruction throughput.",
            coreConcepts: [
              {
                heading: "The 5-Stage Classic RISC Pipeline",
                explanation: "The classical MIPS/RISC architecture breaks instruction execution into 5 stages executed in sequential clock cycles:\n1. IF (Instruction Fetch): The Program Counter (PC) sends its address to the instruction cache, reading the 32-bit machine code instruction into the IF/ID pipeline register. The PC is incremented (PC + 4).\n2. ID (Instruction Decode & Register Fetch): The opcode and operands are parsed. Operands are read from the register file (dual read ports allow reading two registers simultaneously). Sign extension is applied to immediate values.\n3. EX (Execution / ALU / Effective Address Calculation): The Arithmetic Logic Unit (ALU) operates on operands (performing ADD, SUB, bitwise operations) or calculates effective memory addresses for load/store instructions.\n4. MEM (Memory Access): If the instruction is a LOAD or STORE, data is read from or written to the L1 Data Cache. For all other instructions, this stage acts as a bypass pass-through.\n5. WB (Write Back): The result from the ALU or memory read is committed back to the register file, updating the destination register.",
                keyPoints: [
                  "Ideal CPI (Cycles Per Instruction) for an unhindered pipeline approaches 1.0.",
                  "Throughput increases by a factor proportional to the number of pipeline stages (minus latch overhead and hazard stalls).",
                  "Pipeline depth trade-off: deeper pipelines allow higher clock frequencies, but increase the latency penalty of branch mispredictions."
                ]
              },
              {
                heading: "The Three Pipeline Hazards (Structural, Data, Control)",
                explanation: "Pipelines are hindered by three fundamental hazards that prevent the next instruction from executing in its designated clock cycle:\n\n1. Structural Hazard: Hardware resource conflicts. Example: If a unified memory bus is used for both instructions and data, an IF stage fetching an instruction clashes with a MEM stage reading data. Solved via Harvard Architecture (separated L1 I-Cache and L1 D-Cache).\n\n2. Data Hazard (Read-After-Write - RAW): Occurs when instruction j depends on the result of instruction i that has not yet completed WB. Solved by:\n   - Data Forwarding / Bypassing: Routing the output of the EX or MEM stage directly back to the ALU input multiplexers without waiting for WB.\n   - Load-Use Interlock / Stall: A LOAD instruction cannot forward its data until the end of MEM stage. If the very next instruction needs this data, hardware must inject a 1-cycle bubble (NOP stall).\n   - Compiler scheduling: Reordering independent instructions to fill the load delay slot.\n\n3. Control Hazard (Branch Hazards): The next instruction to fetch depends on the outcome of a conditional branch that is only evaluated in ID or EX stage. Unresolved branches force the pipeline to stall or flush.\n   - Branch Prediction: Modern CPUs employ Dynamic Branch Predictors (2-bit saturating counters, Bimodal, Gshare, and TAGE branch predictors) achieving >95% accuracy.",
                keyPoints: [
                  "RAW (Read-After-Write) is a true data dependency.",
                  "WAR (Write-After-Read) and WAW (Write-After-Write) are name dependencies solved in out-of-order CPUs via Register Renaming.",
                  "Branch misprediction penalty = pipeline depth between IF and branch resolution (often 14-20 cycles on modern x86 cores)."
                ]
              }
            ],
            analogies: [
              {
                concept: "Instruction Pipelining",
                analogy: "An automated car assembly line. Instead of a single team building an entire car from chassis to paint over 5 hours before starting the next car, one station handles the frame, the next installs the engine, the next adds the wheels, and the next paints. A finished car rolls off the line every hour once the line is full."
              }
            ],
            commonMisconceptions: [
              {
                trap: "Believing pipelining decreases the latency of an individual instruction.",
                reality: "Pipelining increases throughput (number of instructions completed per unit time), but slightly *increases* the execution latency of an individual instruction due to pipeline register setup and propagation delays."
              },
              {
                trap: "Thinking out-of-order processors execute side effects out of order.",
                reality: "Modern superscalar processors execute micro-ops out-of-order in reservation stations, but *always* commit state in-order via the Reorder Buffer (ROB) to guarantee precise architectural state and exact exception handling."
              }
            ],
            deepDiveFormulaOrCode: {
              title: "Pipeline Speedup Equation",
              formula: "Speedup = (N * S * t_unpipelined) / ((N + S - 1) * t_clock + Stalls)",
              explanation: "Where N = number of instructions, S = number of pipeline stages, t_clock = stage delay + register latch overhead. As N approaches infinity with zero hazard stalls, Speedup approaches S * (t_unpipelined / (S * t_clock))."
            },
            takeaways: [
              "Pipelining overlaps instruction cycles into IF, ID, EX, MEM, and WB stages.",
              "Structural hazards are eliminated with split Harvard caches (I-Cache and D-Cache).",
              "Data hazards are mitigated with forwarding circuits and compiler scheduling, requiring stalls on load-use dependencies.",
              "Control hazards require sophisticated dynamic branch prediction; mispredictions flush speculative work from the pipeline."
            ]
          }
        },
        {
          id: "top-1-2-virtual-memory",
          title: "1.2 Virtual Memory, Multi-Level Page Tables & The TLB",
          readTimeMinutes: 22,
          masteryLevel: "Advanced",
          content: {
            introduction: "Virtual memory is one of the foundational abstractions of computing. It provides each process with the illusion of an isolated, contiguous, multi-terabyte address space while efficiently sharing physical RAM, protecting processes from one another, and transparently utilizing secondary disk storage for paging.",
            coreConcepts: [
              {
                heading: "Virtual Addresses to Physical Addresses Translation",
                explanation: "Under 64-bit architectures (such as x86-64 48-bit canonical addressing), memory is partitioned into uniform blocks called Pages (typically 4 KB = 4096 bytes = 2^12 bytes).\nA Virtual Address (VA) is decomposed into:\n- Virtual Page Number (VPN): The higher-order bits determining which page in virtual memory is being referenced.\n- Page Offset: The lower 12 bits indicating the exact byte within the 4096-byte page. The offset is identical in both the virtual and physical address!\n\nThe hardware Memory Management Unit (MMU) intercepts every memory reference, extracts the VPN, walks the page table structure, retrieves the Physical Frame Number (PFN), and concatenates it with the original offset to form the Physical Address (PA).",
                keyPoints: [
                  "4 KB page size means offset = 12 bits (2^12 = 4096).",
                  "x86-64 4-level paging uses 48-bit virtual addresses: 9 bits per level (4 * 9 = 36 bits for VPN) + 12 bits offset.",
                  "Page Table Entries (PTE) contain status flags: Present (P), Read/Write (R/W), User/Supervisor (U/S), Dirty (D), Accessed (A), and No-Execute (NX)."
                ]
              },
              {
                heading: "Multi-Level Hierarchical Page Tables",
                explanation: "Why not a flat single-level page table? A 48-bit address space with 4 KB pages has 2^36 pages. A flat table with 8-byte entries would consume 2^36 * 8 = 512 Gigabytes of RAM per process just to store the page table!\n\nSolution: Multi-Level Page Tables (Hierarchical Radix Trees):\n- x86-64 uses a 4-level structure: PML4 (Page Map Level 4) -> PDPT (Page Directory Pointer Table) -> PD (Page Directory) -> PT (Page Table).\n- The CPU's CR3 register holds the physical address of the current process's root PML4 table.\n- Crucial efficiency: Intermediate tables are allocated *lazily on demand*. If an entire 1 GB address range is unmapped, its parent entry is marked 'Not Present', eliminating the need to allocate underlying tables. Sparse address spaces consume only a few kilobytes of page table memory.",
                keyPoints: [
                  "CR3 register is swapped during OS context switches, instantly changing the active address space.",
                  "Huge Pages (2 MB) bypass the bottom PT level (21-bit offset). Giant Pages (1 GB) bypass PD and PT levels (30-bit offset), dramatically reducing TLB pressure for databases and VMs."
                ]
              },
              {
                heading: "Translation Lookaside Buffer (TLB) & Page Faults",
                explanation: "Walking a 4-level page table requires 4 separate memory accesses just to read a single byte—a 400% performance degradation! To eliminate this bottleneck, the MMU includes a specialized high-speed hardware cache called the Translation Lookaside Buffer (TLB).\n\n- TLB Hit: The VPN-to-PFN mapping is found in the TLB cache within 1 cycle. Memory access proceeds at full speed.\n- TLB Miss: The MMU hardware page-table walker reads the 4 levels from RAM, loads the mapping into the TLB, and resumes.\n- TLB Invalidation: When page mappings change (e.g., `munmap`, page migration, context switch without PCID), the OS executes instructions like `INVLPG` or flushes CR3. Modern CPUs use Process-Context Identifiers (PCID / ASID) to tag TLB entries so switching between processes does not wipe out cached translations.\n- Page Fault: If the 'Present' bit in the PTE is 0, the MMU triggers a CPU interrupt (Vector 14). The OS kernel's page fault handler checks the reason:\n  * Invalid access (segmentation fault / SIGSEGV).\n  * Demand paging (page is on disk swap / backing file; OS allocates physical RAM, reads data from storage, updates PTE to Present, and restarts the faulting instruction).\n  * Copy-on-Write (COW): On `fork()`, parent and child share read-only pages. A write triggers a fault; the kernel allocates a fresh physical frame, copies the 4 KB data, marks it writable, and resumes."
              }
            ],
            analogies: [
              {
                concept: "Multi-Level Page Tables & TLB",
                analogy: "Navigating a massive multi-campus university library. A multi-level page table is the card catalog system: Campus Directory -> Building -> Floor -> Shelf -> Book. A 4-step walk. The TLB is the sticky note on your desk where you jotted down the exact shelf location of the 10 books you are actively reading today."
              }
            ],
            commonMisconceptions: [
              {
                trap: "Assuming `fork()` duplicates all physical memory immediately.",
                reality: "Modern operating systems use Copy-on-Write (COW). `fork()` creates a clone of the page tables with all pages marked read-only. Physical frames are only allocated and duplicated when one process actually attempts to write to a page."
              }
            ],
            deepDiveFormulaOrCode: {
              title: "Effective Memory Access Time (EMAT) with TLB",
              formula: "EMAT = HitRate * (t_TLB + t_RAM) + (1 - HitRate) * (t_TLB + 4 * t_RAM + t_RAM)",
              explanation: "If TLB hit rate is 99%, t_TLB = 1ns, t_RAM = 50ns: EMAT = 0.99*(51) + 0.01*(1 + 200 + 50) = 50.49 + 2.51 = 53ns (less than a 6% penalty compared to direct RAM access)."
            },
            takeaways: [
              "Virtual addresses are split into Virtual Page Number (VPN) and Page Offset (lower 12 bits for 4KB pages).",
              "Multi-level page tables save gigabytes of memory by only allocating tables for actively mapped memory ranges.",
              "The TLB caches translated addresses; PCID/ASID prevents flushing the TLB on every context switch.",
              "Page faults enable virtual memory magic: demand paging, memory-mapped files (mmap), and copy-on-write (COW)."
            ]
          }
        }
      ]
    },
    {
      id: "mod-2-concurrency-os",
      title: "Module 2: Concurrency, Synchronization & Deadlocks",
      summary: "Threads, context switches, atomic instructions, memory models, mutexes, semaphores, lock-free algorithms, and Coffman deadlock conditions.",
      order: 2,
      topics: [
        {
          id: "top-2-1-primitives",
          title: "2.1 Synchronization Primitives, Atomics & Memory Barriers",
          readTimeMinutes: 20,
          masteryLevel: "Intermediate to Advanced",
          content: {
            introduction: "When multiple threads concurrently read and modify shared state without coordination, data races corrupt application state. Understanding hardware atomic instructions, cache coherence protocols (MESI), memory ordering, and operating system synchronization primitives is essential for writing robust multi-threaded software.",
            coreConcepts: [
              {
                heading: "Hardware Atomicity: Test-And-Set vs Compare-And-Swap (CAS)",
                explanation: "Software cannot achieve synchronization without hardware-level atomic operations. The two foundational primitives are:\n1. Test-And-Set (TAS): Atomically writes 1 to a memory location and returns its previous value in a single indivisible bus/cache cycle.\n2. Compare-And-Swap (CAS): Accepts three parameters: Memory Address, Expected Value, and Desired Value. If *Address == Expected, it writes Desired and returns true; otherwise it leaves memory untouched and returns false.\n\nModern x86 executes CAS via the `lock cmpxchg` instruction. The `lock` prefix asserts a cache line lock via the MESI protocol, ensuring exclusive ownership of the cache line across all CPU cores during the read-modify-write cycle.",
                keyPoints: [
                  "CAS is the fundamental building block for all lock-free data structures (lock-free queues, skip lists, ring buffers).",
                  "ABA Problem: If value A changes to B and back to A, a naive CAS succeeds even though the state changed. Solved using tagged pointers / version counters (Double-Word CAS)."
                ]
              },
              {
                heading: "Mutexes vs Spinlocks vs Semaphores",
                explanation: "Three core synchronization abstractions:\n\n- Spinlock: A thread continuously executes a CAS loop in user space until the lock becomes free. Advantages: Zero context switch latency if held for microsecond durations. Disadvantages: Wastes 100% CPU time spinning; disastrous if the lock holder is preempted.\n\n- Mutex (Mutual Exclusion): Provides binary mutual exclusion with sleeping. In Linux, implemented via `futex` (Fast Userspace Mutex). An uncontended lock acquisition is a single fast user-space atomic decrement. Only when contention occurs does the thread execute a `sys_futex` syscall to put the thread to sleep in the kernel wait queue, freeing the CPU core for other workloads.\n\n- Semaphore: A synchronization counter initialized to N. Two operations:\n  * `sem_wait()` (P): Decrements counter. If counter <= 0, blocks until signaled.\n  * `sem_post()` (V): Increments counter. Unblocks a waiting thread.\n  * Binary Semaphore (N=1) acts like a mutex without strict thread ownership (any thread can call post)."
              },
              {
                heading: "The Four Coffman Conditions for Deadlock",
                explanation: "A deadlock occurs when a set of threads are blocked forever, each waiting for a resource held by another. A system can deadlock IF AND ONLY IF all four Coffman conditions hold simultaneously:\n\n1. Mutual Exclusion: At least one resource must be held in a non-shareable mode.\n2. Hold and Wait: A thread holds at least one resource and is waiting to acquire additional resources held by other threads.\n3. No Preemption: Resources cannot be forcibly confiscated from a thread; they can only be released voluntarily.\n4. Circular Wait: A closed chain of threads exists such that each thread waits for a resource held by the next thread in the chain (T1 -> R2 -> T2 -> R3 -> T1).\n\nDeadlock Prevention Strategy: Break any single condition! The most practical software solution is eliminating Circular Wait by enforcing a Global Strict Lock Acquisition Order (e.g., always acquire Lock A before Lock B based on memory address or ID)."
              }
            ],
            analogies: [
              {
                concept: "Spinlock vs Futex (Mutex)",
                analogy: "Checking if a fitting room is open. A spinlock is standing outside the door rattling the handle every 2 seconds. A futex is rattling the handle once, finding it locked, taking a pager buzzer from the attendant, sitting down to read a book, and only returning when the buzzer vibrates."
              }
            ],
            commonMisconceptions: [
              {
                trap: "Thinking a volatile keyword in C/C++ or Java guarantees thread-safe atomic increments (e.g., count++).",
                reality: "In C/C++, `volatile` merely tells the compiler not to optimize away memory reads/writes; it provides zero atomicity and zero memory fencing. Even in Java where `volatile` enforces memory visibility barriers, `count++` is still a non-atomic three-step operation (Read, Add, Write) that will lose updates under concurrency."
              }
            ],
            deepDiveFormulaOrCode: {
              title: "Lock Ordering to Eliminate Circular Wait",
              formula: "∀ (R_i, R_j) : if Acquire(R_i) before Acquire(R_j) ⟹ ID(R_i) < ID(R_j)",
              explanation: "By defining a total order `<` on all lock identifiers and requiring that every thread acquire locks in strictly increasing order, circular wait cycles become mathematically impossible."
            },
            takeaways: [
              "Hardware primitives like CAS (`cmpxchg`) underpin all modern lock and lock-free synchronization.",
              "Futex provides the best of both worlds: zero-syscall overhead when uncontended, kernel sleeping when contended.",
              "Deadlock requires all 4 Coffman conditions; eliminate Circular Wait via strict hierarchical lock ordering."
            ]
          }
        }
      ]
    },
    {
      id: "mod-3-networking",
      title: "Module 3: Networking Protocols & Distributed Systems",
      summary: "OSI vs TCP/IP, TCP 3-way handshake, congestion control, HTTP evolution, DNS resolution, and the CAP theorem.",
      order: 3,
      topics: [
        {
          id: "top-3-1-tcp-internals",
          title: "3.1 TCP State Machine, Flow Control & Congestion Control",
          readTimeMinutes: 24,
          masteryLevel: "Advanced",
          content: {
            introduction: "The Transmission Control Protocol (TCP) provides a reliable, ordered, error-checked, flow-controlled, and congestion-controlled stream of bytes over an unreliable packet-switched IP network. Understanding TCP's internal state machine, sliding windows, and congestion algorithms is critical for systems and web engineering.",
            coreConcepts: [
              {
                heading: "The 3-Way Handshake & 4-Way Teardown",
                explanation: "Connection Establishment (3-Way Handshake):\n1. Client -> Server: SYN (Synchronize Sequence Number). Client chooses random Initial Sequence Number (ISN_c). State: SYN_SENT.\n2. Server -> Client: SYN-ACK. Server acknowledges client's ISN (ACK = ISN_c + 1) and sends its own random ISN_s. State: SYN_RECEIVED.\n3. Client -> Server: ACK. Client acknowledges server's ISN (ACK = ISN_s + 1). State: ESTABLISHED on both sides.\n\nConnection Teardown (4-Way FIN/ACK):\nBecause TCP is full-duplex, each direction must close independently. Side A sends FIN, Side B responds with ACK (Side A is FIN_WAIT_2). Side B finishes sending remaining data and sends FIN, Side A responds with ACK and enters TIME_WAIT.\n\nWhy TIME_WAIT is essential:\nSide A stays in TIME_WAIT for 2 * MSL (Maximum Segment Lifetime, typically 60-120s) to:\n1. Ensure the final ACK was received by Side B. If lost, Side B retransmits FIN, and Side A can re-send the ACK.\n2. Allow old duplicate segments lingering in the internet routing fabric to expire so they cannot corrupt a future connection using the same socket tuple (IP:Port)."
              },
              {
                heading: "Flow Control (Sliding Window) vs Congestion Control",
                explanation: "Crucial Distinction:\n- Flow Control protects the RECEIVER buffer from being overwhelmed. The receiver advertises its available buffer space via the `rwnd` (Receive Window) header field. The sender never transmits more bytes than `rwnd`.\n\n- Congestion Control protects the NETWORK routers and links from being overwhelmed. The sender calculates `cwnd` (Congestion Window) based on network feedback.\n\nThe effective transmission window is:\n`Effective Window = min(rwnd, cwnd)`",
                keyPoints: [
                  "TCP Sliding Window allows sending multiple packets without waiting for individual ACKs, maximizing Bandwidth-Delay Product (BDP).",
                  "Cumulative ACKs acknowledge all bytes received up to that point. SACK (Selective Acknowledgments) allows the receiver to explicitly inform the sender of non-contiguous received blocks, preventing redundant retransmissions."
                ]
              },
              {
                heading: "Congestion Control Algorithms (Slow Start, AIMD, BBR)",
                explanation: "TCP dynamically probes available network bandwidth:\n1. Slow Start: Sender starts with cwnd = 10 MSS (Maximum Segment Size). For every ACK received, cwnd doubles every Round-Trip Time (RTT) exponentially until reaching `ssthresh` (Slow Start Threshold).\n2. Congestion Avoidance (AIMD - Additive Increase / Multiplicative Decrease):\n   - Additive Increase: Once cwnd >= ssthresh, cwnd increases linearly by 1 MSS per RTT.\n   - Multiplicative Decrease: Upon packet loss (indicated by 3 duplicate ACKs), cwnd is halved (TCP Reno/Cubic), signaling network congestion.\n3. BBR (Bottleneck Bandwidth and RTT): Google's modern model-based congestion control. Instead of treating packet loss as an indicator of congestion (which punishes high-loss wireless links and causes bufferbloat), BBR directly measures maximum bottleneck bandwidth and minimum propagation delay, pacing packet delivery to prevent router queues from filling up."
              }
            ],
            analogies: [
              {
                concept: "Flow Control vs Congestion Control",
                analogy: "Flow control is your friend drinking from a tap—if they can only swallow 1 cup per minute, you throttle the tap so they don't choke. Congestion control is the city water pipe leading to the building—if the pipe pressure drops because everyone in town is showering, the pumping station slows down the feed to prevent pipes bursting."
              }
            ],
            commonMisconceptions: [
              {
                trap: "Believing TCP packets are received as distinct messages with preserved boundaries.",
                reality: "TCP is a pure byte stream protocol with ZERO message boundaries. Two separate `send()` calls of 50 bytes may arrive at the receiver as one 100-byte read or fifty 2-byte reads. Application protocols (like HTTP or WebSockets) must implement framing (length prefixes or delimiters) to parse individual messages."
              }
            ],
            deepDiveFormulaOrCode: {
              title: "Bandwidth-Delay Product (BDP)",
              formula: "BDP = Bandwidth (bits/sec) * RoundTripTime (seconds)",
              explanation: "BDP represents the volume of data 'in flight' that can fill the network pipe. If the TCP window scale option is not enabled (capping window size at 64 KB), a 1 Gbps link with 100ms RTT will only utilize a tiny fraction of its capacity!"
            },
            takeaways: [
              "TCP establishes connections with a 3-way handshake and gracefully closes both halves with a 4-way teardown.",
              "TIME_WAIT state (2*MSL) protects against lost final ACKs and stale wandering internet packets.",
              "Transmission window = min(rwnd, cwnd), balancing receiver buffer capacity and network pipe congestion."
            ]
          }
        }
      ]
    }
  ],
  flashcards: [
    {
      id: "fc-1",
      moduleId: "mod-1-memory-cpu",
      topicId: "top-1-1-pipeline",
      question: "What are the 5 classical stages of a RISC instruction pipeline?",
      answer: "1. IF (Instruction Fetch)\n2. ID (Instruction Decode & Register Fetch)\n3. EX (Execute / ALU operation)\n4. MEM (Memory Access for Load/Store)\n5. WB (Write Back to Register File)",
      conceptTag: "CPU Architecture",
      difficulty: "Medium",
      highYield: true
    },
    {
      id: "fc-2",
      moduleId: "mod-1-memory-cpu",
      topicId: "top-1-1-pipeline",
      question: "What is a RAW hazard and how do modern CPUs resolve it without stalling?",
      answer: "A Read-After-Write (RAW) data hazard occurs when an instruction needs an operand that a preceding instruction has produced but not yet written back to the register file. Modern CPUs resolve this using Data Forwarding / Bypassing—routing the output of the EX or MEM stage directly to the ALU inputs.",
      conceptTag: "Pipelining",
      difficulty: "Hard",
      highYield: true
    },
    {
      id: "fc-3",
      moduleId: "mod-1-memory-cpu",
      topicId: "top-1-2-virtual-memory",
      question: "Why do modern 64-bit operating systems use Multi-Level Page Tables instead of a single flat table?",
      answer: "A single flat page table for a 48-bit address space would require 2^36 entries * 8 bytes = 512 GB of RAM per process just to store translations! Multi-level page tables create a sparse tree where unmapped memory ranges require zero page table allocation.",
      conceptTag: "Virtual Memory",
      difficulty: "Hard",
      highYield: true
    },
    {
      id: "fc-4",
      moduleId: "mod-1-memory-cpu",
      topicId: "top-1-2-virtual-memory",
      question: "What is the role of the TLB (Translation Lookaside Buffer) and how do PCID/ASID tags optimize it?",
      answer: "The TLB is a high-speed MMU hardware cache that stores recent Virtual Page Number to Physical Frame Number mappings, avoiding a 4-level RAM walk. Process-Context Identifiers (PCID/ASID) tag entries with the process ID, preventing the operating system from having to flush the entire TLB on context switches.",
      conceptTag: "Memory Management",
      difficulty: "Hard",
      highYield: true
    },
    {
      id: "fc-5",
      moduleId: "mod-2-concurrency-os",
      topicId: "top-2-1-primitives",
      question: "What are the four Coffman conditions required for a Deadlock to occur?",
      answer: "1. Mutual Exclusion (non-shareable resource)\n2. Hold and Wait (holding a resource while requesting another)\n3. No Preemption (resources cannot be forcibly taken)\n4. Circular Wait (a circular chain of threads waiting for each other)",
      conceptTag: "Concurrency",
      difficulty: "Medium",
      highYield: true
    },
    {
      id: "fc-6",
      moduleId: "mod-2-concurrency-os",
      topicId: "top-2-1-primitives",
      question: "How does a Futex (Fast Userspace Mutex) avoid kernel syscalls during uncontended acquisition?",
      answer: "A futex uses an atomic CAS (Compare-And-Swap) operation entirely in user-space to acquire the lock. If uncontended, zero context switches or syscalls occur. Only when contention is detected does the thread execute a `sys_futex` syscall to enter the kernel wait queue.",
      conceptTag: "Operating Systems",
      difficulty: "Hard",
      highYield: true
    },
    {
      id: "fc-7",
      moduleId: "mod-3-networking",
      topicId: "top-3-1-tcp-internals",
      question: "Why is the TCP TIME_WAIT state held for 2 * MSL (Maximum Segment Lifetime)?",
      answer: "1. To ensure the final ACK sent by the passive closer is received (if lost, the remote end retransmits FIN, which can be answered).\n2. To guarantee that any duplicate segments lingering in the internet routing network expire and do not corrupt a new connection reusing the same IP:Port tuple.",
      conceptTag: "Networking",
      difficulty: "Medium",
      highYield: true
    },
    {
      id: "fc-8",
      moduleId: "mod-3-networking",
      topicId: "top-3-1-tcp-internals",
      question: "What is the fundamental difference between TCP Flow Control and Congestion Control?",
      answer: "Flow Control protects the RECEIVER buffer from overflowing (governed by the advertised `rwnd`). Congestion Control protects the intermediate NETWORK links and routers from collapsing (governed by the sender's calculated `cwnd`). The actual sending window is `min(rwnd, cwnd)`.",
      conceptTag: "Networking",
      difficulty: "Medium",
      highYield: true
    }
  ],
  conceptNodes: [
    {
      id: "node-cpu",
      label: "RISC Pipelining",
      module: "mod-1-memory-cpu",
      description: "IF -> ID -> EX -> MEM -> WB microarchitecture execution stages",
      status: "mastered",
      prerequisites: []
    },
    {
      id: "node-hazards",
      label: "Pipeline Hazards",
      module: "mod-1-memory-cpu",
      description: "Structural, RAW/WAR/WAW Data hazards, and Control branch prediction",
      status: "learning",
      prerequisites: ["node-cpu"]
    },
    {
      id: "node-vm",
      label: "Virtual Memory",
      module: "mod-1-memory-cpu",
      description: "Virtual-to-Physical translation, 4KB pages, MMU",
      status: "mastered",
      prerequisites: []
    },
    {
      id: "node-pagetables",
      label: "Multi-Level Page Tables",
      module: "mod-1-memory-cpu",
      description: "4-level radix tree (PML4 -> PDPT -> PD -> PT) and CR3",
      status: "learning",
      prerequisites: ["node-vm"]
    },
    {
      id: "node-tlb",
      label: "TLB & Page Faults",
      module: "mod-1-memory-cpu",
      description: "Hardware cache for address translations, demand paging, and COW",
      status: "learning",
      prerequisites: ["node-pagetables"]
    },
    {
      id: "node-atomics",
      label: "Hardware Atomics & CAS",
      module: "mod-2-concurrency-os",
      description: "Compare-And-Swap, MESI cache locking, lock-free primitives",
      status: "mastered",
      prerequisites: ["node-cpu"]
    },
    {
      id: "node-sync",
      label: "Mutexes & Futex",
      module: "mod-2-concurrency-os",
      description: "Fast userspace locking, semaphores, spinlocks",
      status: "learning",
      prerequisites: ["node-atomics"]
    },
    {
      id: "node-deadlocks",
      label: "Deadlocks & Coffman Conditions",
      module: "mod-2-concurrency-os",
      description: "The 4 conditions and prevention via global lock hierarchy",
      status: "unvisited",
      prerequisites: ["node-sync"]
    },
    {
      id: "node-tcp",
      label: "TCP Handshake & State Machine",
      module: "mod-3-networking",
      description: "SYN/SYN-ACK/ACK, TIME_WAIT, 2*MSL",
      status: "learning",
      prerequisites: []
    },
    {
      id: "node-congestion",
      label: "Flow & Congestion Control",
      module: "mod-3-networking",
      description: "Sliding window, rwnd vs cwnd, AIMD, and BBR",
      status: "unvisited",
      prerequisites: ["node-tcp"]
    }
  ],
  quizzes: [
    {
      id: "q-1",
      moduleId: "mod-1-memory-cpu",
      question: "Which of the following occurs during the MEM stage of a classic 5-stage RISC pipeline for an ADD instruction?",
      options: [
        "The ALU performs addition on the operands.",
        "The result is written into the destination register.",
        "The instruction passes through the MEM stage without reading or writing data memory.",
        "The processor stalls for 1 cycle because ADD requires an active bus."
      ],
      correctIndex: 2,
      explanation: "In a classical 5-stage pipeline, the MEM stage is only active for memory load and store instructions (`lw`, `sw`). For arithmetic instructions like `ADD`, the calculation is finished in the EX stage, so the result simply bypasses/passes through the MEM stage on its way to WB (Write Back)."
    },
    {
      id: "q-2",
      moduleId: "mod-1-memory-cpu",
      question: "In an x86-64 system with 48-bit virtual addresses and 4 KB pages, how many bits of the virtual address represent the page offset?",
      options: [
        "9 bits",
        "12 bits",
        "16 bits",
        "36 bits"
      ],
      correctIndex: 1,
      explanation: "A 4 KB page is 4096 bytes. Because 2^12 = 4096, exactly 12 bits are needed to address any individual byte within that page. The remaining 48 - 12 = 36 bits represent the Virtual Page Number (VPN), which is split into four 9-bit indices for the 4-level page table."
    },
    {
      id: "q-3",
      moduleId: "mod-2-concurrency-os",
      question: "What is the primary advantage of a Futex (Fast Userspace Mutex) over a standard kernel semaphore?",
      options: [
        "It eliminates all race conditions automatically without programming locks.",
        "It acquires uncontended locks purely in user space via an atomic instruction, avoiding costly kernel syscalls.",
        "It allows infinite threads to acquire the lock at the exact same millisecond.",
        "It converts deadlocks into livelocks."
      ],
      correctIndex: 1,
      explanation: "A futex performs an atomic test-and-set / CAS in user space. If there is no contention, the lock is acquired immediately without invoking a system call (saving hundreds of CPU cycles). The kernel is only invoked via `sys_futex` if a conflict occurs and the thread must sleep."
    },
    {
      id: "q-4",
      moduleId: "mod-2-concurrency-os",
      question: "Which of the following techniques reliably PREVENTS deadlocks by breaking the Circular Wait condition?",
      options: [
        "Spawning more CPU threads.",
        "Enforcing a global total ordering on all locks such that threads must acquire locks in strictly ascending order.",
        "Replacing all mutexes with spinlocks.",
        "Increasing the timeout for `sleep()`."
      ],
      correctIndex: 1,
      explanation: "By assigning every lock a unique integer or memory order and requiring that every thread acquire locks in strictly ascending numerical order (e.g. Lock 1 before Lock 2), it is mathematically impossible to form a closed cycle of dependency, permanently preventing circular wait."
    },
    {
      id: "q-5",
      moduleId: "mod-3-networking",
      question: "If a TCP connection has an advertised receiver window (rwnd) of 32 KB and a calculated congestion window (cwnd) of 16 KB, what is the maximum amount of unacknowledged data the sender can transmit?",
      options: [
        "48 KB (32 KB + 16 KB)",
        "32 KB",
        "16 KB",
        "8 KB"
      ],
      correctIndex: 2,
      explanation: "The effective TCP send window is strictly governed by `min(rwnd, cwnd)`. Here, `min(32 KB, 16 KB) = 16 KB`. The sender must limit its inflight unacknowledged bytes to 16 KB to avoid overloading the network path, even though the receiver has space for 32 KB."
    }
  ],
  cheatSheet: [
    {
      category: "Memory & Addressing",
      items: [
        { label: "Standard Page Size", value: "4096 bytes (4 KB) = 12-bit offset" },
        { label: "x86-64 Paging Levels", value: "PML4 -> PDPT -> PD -> PT (4 levels of 9-bits each)" },
        { label: "Huge Page Size", value: "2 MB (bypasses PT, 21-bit offset) or 1 GB (bypasses PD & PT, 30-bit offset)" },
        { label: "Root Page Register", value: "CR3 (holds physical address of current PML4 table)" }
      ]
    },
    {
      category: "Concurrency & OS",
      items: [
        { label: "Coffman Conditions (All 4 Required)", value: "Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait" },
        { label: "Atomic Primitive", value: "CAS (Compare-And-Swap): lock cmpxchg" },
        { label: "Fast Mutex", value: "Futex: user-space atomic check + optional sys_futex sleep" },
        { label: "Lock Hierarchy Rule", value: "Always acquire locks in monotonic ascending order to break cycle" }
      ]
    },
    {
      category: "Networking & Protocols",
      items: [
        { label: "TCP 3-Way Handshake", value: "SYN (ISN_c) -> SYN-ACK (ISN_s, ACK_c+1) -> ACK (ACK_s+1)" },
        { label: "TCP Transmission Window", value: "Effective Window = min(rwnd, cwnd)" },
        { label: "TIME_WAIT Duration", value: "2 * MSL (typically 60-120 seconds)" },
        { label: "BDP Equation", value: "Bandwidth-Delay Product = Bandwidth (bps) * RTT (sec)" }
      ]
    }
  ]
};
