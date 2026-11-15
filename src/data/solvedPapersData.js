export const solvedPapersData = [
  {
    id: "bece355l-cat1-model",
    title: "BECE355L: CAT-1 Examination (Model Solved Paper)",
    examType: "Continuous Assessment Test 1",
    totalMarks: 50,
    duration: "90 Minutes",
    coveredModules: "Module 1 (AWS Cloud Concepts) & Module 2 (Amazon EC2)",
    academicYear: "2026-2027",
    sections: [
      {
        sectionName: "Part A: Conceptual Foundations (Short Answers - 5 Marks Each)",
        questions: [
          {
            id: "cat1-q1",
            questionNumber: "Q1",
            marks: 5,
            module: "Module 1: AWS Cloud Concepts",
            topicRef: "1.1 The Shift from Traditional On-Premises to Cloud Computing",
            question: "Define Cloud Computing. Differentiate between Capital Expenditure (CapEx) and Operational Expenditure (OpEx) with respect to traditional on-premises data centers and AWS Cloud.",
            modelAnswer: `### 1. Definition of Cloud Computing (NIST Standard)
Cloud computing is the on-demand delivery of IT resources (compute power, database storage, applications, and networking) over the Internet with pay-as-you-go pricing. Rather than purchasing, owning, and maintaining physical servers, organizations provision technology services on an as-needed basis from a cloud provider such as Amazon Web Services (AWS).

---

### 2. CapEx vs OpEx Comparison Table

| Feature | Traditional On-Premises (CapEx) | AWS Cloud Computing (OpEx) |
| :--- | :--- | :--- |
| **Financial Nature** | **Capital Expenditure (CapEx):** Substantial upfront investment in physical assets that depreciate over time. | **Operational Expenditure (OpEx):** Day-to-day ongoing operational expenses with zero upfront commitments. |
| **Procurement Cycle** | Slow (6–12 weeks to order, ship, rack, cable, and configure hardware). | Instantaneous (provision virtual servers in minutes via Console, CLI, or SDK). |
| **Capacity Planning** | **Idle Server Dilemma:** Must purchase hardware for forecasted peak traffic. During off-peak hours, 80–90% of capacity sits idle, wasting capital. | **Elastic Auto-Scaling:** Capacity matches real-time demand dynamically. Scale out during spikes and scale in during lulls. |
| **Maintenance Burden** | High (customer pays for real estate, HVAC cooling, uninterrupted power supply UPS, hardware repairs, and system administrators). | Zero physical maintenance (AWS handles all physical facility, hardware replacement, and hypervisor maintenance). |
| **Pricing Model** | Fixed, sunk cost regardless of utilization. | Pay-only-for-what-you-use (billed by the second or hour). |`
          },
          {
            id: "cat1-q2",
            questionNumber: "Q2",
            marks: 5,
            module: "Module 1: AWS Cloud Concepts",
            topicRef: "1.2 The 9-Layer Stack: IaaS, PaaS, and SaaS Service Models",
            question: "Analyze the 9-layer technology stack and differentiate between Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS). State what a student/developer does under each model.",
            modelAnswer: `### 1. The 9 Architectural Layers
The technology stack is divided into 9 discrete layers:
1. **Networking** (Physical cables, switches, routers)
2. **Storage** (Hard drives, SAN/NAS arrays)
3. **Servers** (Physical server hardware, CPUs, RAM)
4. **Virtualization** (Hypervisor / Nitro)
5. **Operating System (OS)** (Linux / Windows Server)
6. **Middleware** (Web servers, message brokers)
7. **Runtime** (Python, Node.js, Java JVM)
8. **Applications** (Custom software code)
9. **Data** (Databases and user records)

---

### 2. Service Model Demarcation Matrix

| Layer | Traditional On-Premises | IaaS (e.g., Amazon EC2) | PaaS (e.g., AWS Elastic Beanstalk, Heroku) | SaaS (e.g., Salesforce, Google Docs) |
| :--- | :--- | :--- | :--- | :--- |
| **Data** | Customer | **Customer** | **Customer** | Cloud Provider |
| **Applications** | Customer | **Customer** | **Customer** | Cloud Provider |
| **Runtime** | Customer | **Customer** | Cloud Provider | Cloud Provider |
| **Middleware** | Customer | **Customer** | Cloud Provider | Cloud Provider |
| **Operating System** | Customer | **Customer** | Cloud Provider | Cloud Provider |
| **Virtualization** | Customer | Cloud Provider | Cloud Provider | Cloud Provider |
| **Servers** | Customer | Cloud Provider | Cloud Provider | Cloud Provider |
| **Storage** | Customer | Cloud Provider | Cloud Provider | Cloud Provider |
| **Networking** | Customer | Cloud Provider | Cloud Provider | Cloud Provider |

---

### 3. Student / Developer Role Summary
* **SaaS:** **Uses software** as an end user (e.g., creating diagrams on Canva, writing reports in Google Docs).
* **PaaS:** **Deploys code** directly into a managed execution environment without configuring OS or runtimes (e.g., deploying Node.js/Python apps to Firebase/Beanstalk).
* **IaaS:** **Manages virtual servers** including choosing the OS, configuring firewalls, running patches, and installing software (e.g., launching an Amazon EC2 Linux instance).`
          }
        ]
      },
      {
        sectionName: "Part B: Architecture & Analytical Problems (10 Marks Each)",
        questions: [
          {
            id: "cat1-q3",
            questionNumber: "Q3",
            marks: 10,
            module: "Module 1: AWS Cloud Concepts",
            topicRef: "1.3 Deployment Models & The AWS Global Infrastructure Architecture",
            question: "Explain the architectural components of the AWS Global Infrastructure: Regions, Availability Zones (AZs), Local Zones, Wavelength Zones, and Edge Locations. Prove mathematically how Multi-AZ deployment increases application availability.",
            modelAnswer: `### 1. AWS Global Infrastructure Components
The AWS Global Infrastructure is organized hierarchically:

1. **AWS Regions:**
   * A Region is a physical, independent geographic area around the world (e.g., N. Virginia \`us-east-1\`, Frankfurt \`eu-central-1\`, São Paulo \`sa-east-1\`).
   * Contains at least **3 isolated Availability Zones**.
   * Regions are completely isolated from each other to prevent correlated failures.
   * Selection factors: Legal data residency/compliance, user latency, available services, and regional cost differences.

2. **Availability Zones (AZs):**
   * An AZ consists of **one or more discrete physical data centers**, each with independent redundant power feeds, on-site diesel generators, industrial cooling, and physical security.
   * Interconnected via **high-speed, private, redundant metropolitan fiber networks** with single-digit millisecond latency.
   * Scale: **105 AZs across 33 Regions globally**.

3. **Edge Locations & Points of Presence (PoPs):**
   * Data center endpoints located in major metropolitan cities worldwide.
   * Run **Amazon CloudFront (CDN)** and **Route 53 (DNS)** to cache static/dynamic content and protect against DDoS attacks via AWS Shield.

4. **Local Zones & Wavelength Zones:**
   * **Local Zones (41 globally):** Place compute, storage, and database services close to major urban centers (e.g., Los Angeles) to deliver single-digit millisecond latency for real-time video editing and gaming.
   * **Wavelength Zones (29 globally):** Embed AWS compute directly inside **5G telecommunication provider networks** (Verizon, Vodafone, KDDI) for ultra-low latency mobile edge computing.

---

### 2. Mathematical Proof of Multi-AZ Reliability

Let $A$ represent the availability probability of a single Availability Zone (e.g., $99.9\\%$ or $A = 0.999$).
The probability of a single AZ experiencing an outage is:
$$P(\\text{Failure}) = 1 - A = 1 - 0.999 = 0.001$$

When deploying an application across $N = 2$ independent, physically separated Availability Zones behind an Elastic Load Balancer (ELB), the entire system fails **if and only if both independent AZs fail simultaneously**:
$$P(\\text{System Failure}) = (1 - A)^N = (0.001)^2 = 0.000001$$

Therefore, the Overall Multi-AZ System Availability $A_{\\text{sys}}$ is:
$$A_{\\text{sys}} = 1 - P(\\text{System Failure}) = 1 - 0.000001 = 99.9999\\%$$

> **Conclusion:** Deploying across two independent AZs boosts reliability from **Three Nines (99.9%)** to **Six Nines (99.9999%)**, reducing theoretical downtime from 8.76 hours/year to under 32 seconds/year.`
          },
          {
            id: "cat1-q4",
            questionNumber: "Q4",
            marks: 10,
            module: "Module 1 & 2: AWS Security & Shared Responsibility",
            topicRef: "2.1 Security 'OF' the Cloud vs Security 'IN' the Cloud & IT Controls",
            question: "Elucidate the AWS Shared Responsibility Model. Contrast Security 'OF' the Cloud with Security 'IN' the Cloud. Explain why 'Patch Management' is classified as a Shared Control rather than an Inherited Control.",
            modelAnswer: `### 1. Philosophy of the Shared Responsibility Model
Security and compliance is an explicit, divided partnership between AWS and the customer. AWS manages the underlying infrastructure burden, while the customer maintains configuration control over their workloads and data.

---

### 2. Security "OF" the Cloud vs Security "IN" the Cloud

#### A. Security "OF" the Cloud (AWS Responsibility):
AWS is responsible for protecting the infrastructure that runs all AWS services:
* **Physical Hardware:** Server racks, CPUs, ECC RAM, NVMe storage disks, power supply units.
* **Facilities & Data Centers:** 24/7 armed perimeter security, biometric access locks, surveillance cameras, dual-generator power feeds, automated fire suppression, HVAC systems.
* **Network Infrastructure:** Subsea communication cables, core switching fabrics, DDoS mitigation hardware (AWS Shield).
* **Virtualization Layer:** The hypervisor software (AWS Nitro / KVM), physical device emulation, and host operating systems.

#### B. Security "IN" the Cloud (Customer Responsibility):
The customer is responsible for everything they provision and store:
* **Customer Data:** Data classification, data life cycles, preventing unauthorized public access.
* **Identity & Access Management (IAM):** User accounts, multi-factor authentication (MFA), least-privilege permission policies.
* **Operating System & Software:** Installing, configuring, and updating the guest operating system (Linux/Windows) on EC2 instances.
* **Network & Firewall Rules:** Configuring Security Groups (stateful virtual firewalls) and Network ACLs (stateless subnet firewalls).
* **Encryption:** Selecting server-side encryption (KMS) or client-side encryption for data at rest and data in transit (TLS/SSL).

---

### 3. Why Patch Management is a "Shared Control"
IT Controls in AWS are classified into three tiers:
1. **Inherited Controls:** Wholly provided by AWS (Physical data center security, environmental cooling).
2. **Customer-Specific Controls:** Solely managed by the customer (VPC subnet zoning, IAM policies).
3. **Shared Controls:** Apply to **both AWS and the customer in separate, distinct contexts**:

> **Patch Management is a Shared Control because:**
> * **AWS's Half:** AWS is strictly responsible for patching vulnerabilities in the **physical infrastructure devices, firmware, and host hypervisor**.
> * **Customer's Half:** The customer is strictly responsible for running OS patches (\`yum update\`, \`apt update\`, Windows Updates), database engine updates, and runtime application patches on their guest instances.
>
> Neither entity can perform the other's patching role: AWS cannot access the customer's guest OS to apply patches without violating privacy, and the customer cannot access AWS physical host servers.`
          },
          {
            id: "cat1-q5",
            questionNumber: "Q5",
            marks: 10,
            module: "Module 2: Amazon EC2",
            topicRef: "2.1 Amazon EC2 Architecture & Purchasing Options",
            question: "A company needs compute resources for three distinct workloads:\n(a) A steady, predictable enterprise database running continuously for 3 years.\n(b) A background batch video-transcoding job that has flexible start/end times and can tolerate interruptions.\n(c) A seasonal e-commerce web application with unpredictable short-term traffic spikes.\n\nRecommend the optimal EC2 purchasing option for each workload, justify your choice based on cost-efficiency, and explain the key characteristics of each option.",
            modelAnswer: `### Workload Analysis and Recommendations

#### (a) Steady, Predictable Enterprise Database (3-Year Horizon)
* **Recommended Purchasing Option:** **Reserved Instances (RI) or EC2 Instance Savings Plans**
* **Justification:**
  * Steady-state workloads running 24/7/365 for over a year achieve the highest discount (up to **72% savings** compared to On-Demand rates).
  * You commit to a 1-year or 3-year term.
  * Payment options: *All Upfront* (maximum discount), *Partial Upfront*, or *No Upfront*.
  * **EC2 Instance Savings Plans** provide the same 72% discount while allowing flexibility to change instance sizes within the same family in a given region.

---

#### (b) Background Batch Video-Transcoding (Interruptible & Flexible)
* **Recommended Purchasing Option:** **Spot Instances**
* **Justification:**
  * Unused EC2 capacity offered at steep discounts (up to **90% off** On-Demand pricing).
  * Perfect for workloads with flexible start and end times that are fault-tolerant.
  * **Termination Notice:** AWS can reclaim a Spot Instance when capacity is needed elsewhere, providing a **2-minute warning** via CloudWatch events / instance metadata.
  * If interrupted, the batch job can checkpoint its progress and resume when another Spot Instance is provisioned, minimizing total processing cost.

---

#### (c) Seasonal E-Commerce Web Application (Unpredictable Spikes)
* **Recommended Purchasing Option:** **Hybrid Strategy: Savings Plans for Baseline + On-Demand Instances with Auto Scaling for Spikes**
* **Justification:**
  * **Baseline Traffic:** Run on **Compute Savings Plans** (up to 66% savings with maximum flexibility across regions, instance families, and Lambda).
  * **Unpredictable Spikes:** Provision **On-Demand Instances** via an **Auto Scaling Group**.
  * **On-Demand Characteristics:** Pay for compute capacity strictly by the second (Linux) or hour (Windows) with **zero long-term commitment and zero upfront payment**.
  * When traffic decreases, Auto Scaling immediately terminates the On-Demand instances, ensuring zero money is wasted on idle capacity.`
          },
          {
            id: "cat1-q6",
            questionNumber: "Q6",
            marks: 10,
            module: "Module 2: Amazon EC2",
            topicRef: "2.2 The 7 Steps to Launching an Amazon EC2 Instance",
            question: "List and explain the 7 steps to launch an Amazon EC2 instance using the AWS Management Console. Explain the stateful nature of Security Groups and how they differ from Network ACLs.",
            modelAnswer: `### 1. The 7 Steps to Launching an Amazon EC2 Instance

1. **Step 1: Instance Name and Tags:**
   * Assign a name tag (\`Key = Name\`, \`Value = MyWebServer\`).
   * Add metadata tags (up to 50 tags per resource) for **Resource Organization**, **Cost Allocation** (Cost Center tags in billing), **Automation** (auto start/stop scripts), and **ABAC Access Control**.

2. **Step 2: Choosing an Amazon Machine Image (AMI):**
   * Select the software template for the root volume (OS, pre-installed servers, applications).
   * Sources: AWS Pre-built (Amazon Linux 2023, Ubuntu, Windows Server), AWS Marketplace, Custom "Golden Images", or Community AMIs.
   * *Critical Rule: Once launched, the AMI cannot be modified for that instance.*

3. **Step 3: Selecting an Instance Type:**
   * Choose CPU (vCPU), memory (RAM), storage, and networking capacity based on instance family:
     * *General Purpose (T, M)*: Balanced compute/memory for web servers.
     * *Compute Optimized (C)*: Batch processing, gaming servers.
     * *Memory Optimized (R)*: In-memory caches, high-performance databases.
     * *Accelerated Computing (P, G)*: GPUs for machine learning and 3D modeling.
     * *Storage Optimized (I, D)*: Data warehousing and big data.

4. **Step 4: Key Pairs (Authentication):**
   * Public key stored by AWS; private key file (\`.pem\` or \`.ppk\`) stored securely by the customer.
   * Linux instances use the key pair for **SSH** login; Windows instances use it to decrypt the local administrator password for **RDP** login.

5. **Step 5: Network Settings:**
   * Select **VPC**, **Subnet** (Public vs Private), and configure **Auto-assign Public IP**.
   * Configure **Security Groups** (virtual firewall rules specifying allowed ports, protocols, and CIDR IP sources).

6. **Step 6: Configure Storage:**
   * Attach **Amazon EBS (Elastic Block Store)** volumes. Choose volume type (General Purpose SSD gp3, Provisioned IOPS io2, Throughput Optimized HDD st1, Cold HDD sc1).
   * Configure volume size, encryption with AWS KMS, and "Delete on Termination" flag.

7. **Step 7: Advanced Details:**
   * Attach an **IAM Role (Instance Profile)** so applications can securely access other AWS services (e.g., S3) without hardcoded access keys.
   * Provide a **User Data script** (\`#!/bin/bash\`) executed automatically during the first boot to install updates and software packages (e.g., Apache HTTP server).

---

### 2. Security Groups: Stateful Nature vs Network ACLs

* **Stateful Filtering:** Security Groups track connection state. **If an inbound request is allowed, the outbound response traffic is automatically permitted**, regardless of outbound firewall rules!
* **Allow-Only Rules:** Security Groups evaluate all rules and only allow traffic (there are no explicit "Deny" rules; anything not permitted is denied by default).

| Feature | Security Group (SG) | Network ACL (NACL) |
| :--- | :--- | :--- |
| **Operating Level** | Instance level (virtual NIC) | Subnet level (subnet boundary) |
| **Rule Type** | **Allow rules only** | **Allow and Deny rules** |
| **State Nature** | **Stateful** (responses automatically allowed) | **Stateless** (return traffic must be explicitly allowed) |
| **Rule Processing** | All rules evaluated before decision | Rules evaluated in strict numerical order |`
          }
        ]
      }
    ]
  },
  {
    id: "bece355l-ec2-storage-deepdive",
    title: "BECE355L: Storage & EC2 Deep Dive Problem Set (30 Marks)",
    examType: "Analytical Problem Set / University Model Questions",
    totalMarks: 30,
    duration: "60 Minutes",
    coveredModules: "Module 2: EC2, EBS, EFS & Instance Store",
    academicYear: "2026-2027",
    sections: [
      {
        sectionName: "Part A: Storage & Scaling Architecture (10 Marks Each)",
        questions: [
          {
            id: "stor-q1",
            questionNumber: "Q1",
            marks: 10,
            module: "Module 2: AWS Storage Services",
            topicRef: "2.3 Amazon EC2 Storage Options: EBS, EFS & Instance Store",
            question: "Compare Amazon Elastic Block Store (EBS), Amazon Elastic File System (EFS), and EC2 Instance Store across persistence, performance, attachment limits, and typical use cases. When would you strictly choose Instance Store over EBS?",
            modelAnswer: `### 1. Storage Comparison Matrix

| Attribute | Amazon EBS | Amazon EFS | EC2 Instance Store |
| :--- | :--- | :--- | :--- |
| **Storage Type** | Block-level storage | File-level storage (NFSv4) | Block-level storage |
| **Persistence** | **Persistent:** Independent life cycle from instance; retains data upon instance stop or reboot. | **Persistent:** Managed, elastic file system; retains all data permanently. | **Ephemeral (Non-persistent):** Data is **PERMANENTLY LOST** if instance is stopped, hibernated, or terminated. |
| **Attachment Scope** | Single EC2 instance in the **same Availability Zone** (Multi-Attach available for io1/io2 only). | Mounted simultaneously across **hundreds of EC2 instances** across multiple AZs and regions. | Physically wired to the specific host hardware running the instance; **cannot be detached or moved**. |
| **Performance** | High performance, low latency (up to 256,000 IOPS with Provisioned IOPS SSD). | Elastic throughput scaling; distributed access latency. | **Ultra-low latency, maximum IOPS** because disks are directly attached to the physical bus. |
| **Encryption** | Native one-click encryption using AWS KMS. | Native encryption at rest (KMS) and in transit. | Not configurable via standard AWS settings; predetermined by instance type. |
| **Boot Volume Support** | **Yes** (General Purpose SSD & Provisioned IOPS SSD). | **No** (Cannot be a boot volume). | Optional for select instance families (rarely used as primary boot). |

---

### 2. When to Strictly Choose Instance Store over EBS:
You strictly choose **Instance Store** when:
1. **The application requires ultra-high read/write IOPS and minimal microsecond latency** that network-attached EBS cannot match.
2. **The data is temporary, disposable, or easily regenerated from another primary store**, such as:
   * Distributed caching tiers (Memcached / Redis cache nodes).
   * Scratch processing buffers and temporary video render files.
   * Replicated database architectures where node failure is handled by application-level clustering (e.g., Apache Cassandra, Elasticsearch replica nodes, Hadoop HDFS data nodes).`
          },
          {
            id: "stor-q2",
            questionNumber: "Q2",
            marks: 10,
            module: "Module 2: Amazon EBS",
            topicRef: "2.4 Amazon EBS Volume Types & Performance Characteristics",
            question: "Explain the four Amazon EBS volume types (General Purpose SSD, Provisioned IOPS SSD, Throughput Optimized HDD, Cold HDD). State their primary use cases and identify which types CANNOT be used as boot volumes.",
            modelAnswer: `### 1. The Four Amazon EBS Volume Types

#### A. Solid State Drive (SSD)-Based Volumes:
1. **General Purpose SSD (gp2 / gp3):**
   * **Characteristics:** Balances price and performance. Baseline performance scales with volume size (or configured independently in gp3).
   * **Size Range:** 1 GiB to 16,384 GiB (16 TiB).
   * **Use Cases:** Recommended for most workloads, system boot volumes, virtual desktops, medium-sized databases (MySQL, SQL Server), and test environments.
   * **Boot Volume:** **YES**, fully supported as root boot volume.

2. **Provisioned IOPS SSD (io1 / io2 Block Express):**
   * **Characteristics:** Designed for mission-critical, I/O-intensive workloads requiring sustained sub-millisecond latency and guaranteed IOPS performance (up to 256,000 IOPS).
   * **Size Range:** 4 GiB to 16,384 GiB (16 TiB).
   * **Use Cases:** Large enterprise transaction databases (Oracle, SAP HANA, Microsoft SQL Server enterprise).
   * **Boot Volume:** **YES**, supported as root boot volume.

---

#### B. Hard Disk Drive (HDD)-Based Volumes:
3. **Throughput Optimized HDD (st1):**
   * **Characteristics:** Low-cost magnetic storage optimized for frequently accessed, throughput-intensive, sequential read/write workloads (up to 500 MB/s throughput).
   * **Size Range:** 125 GiB to 16,384 GiB (16 TiB).
   * **Use Cases:** Big data analytics (EMR, Hadoop), streaming workloads, data warehouses, log processing.
   * **Boot Volume:** **NO! CANNOT BE A BOOT VOLUME.**

4. **Cold HDD (sc1):**
   * **Characteristics:** The lowest cost per gigabyte EBS volume type, designed for infrequently accessed, large sequential datasets.
   * **Size Range:** 125 GiB to 16,384 GiB (16 TiB).
   * **Use Cases:** Long-term archival storage, backup data, file servers where lowest storage cost is the paramount priority.
   * **Boot Volume:** **NO! CANNOT BE A BOOT VOLUME.**

---

### Summary of Boot Volume Restriction:
> **HDD-based volumes (Throughput Optimized HDD \`st1\` and Cold HDD \`sc1\`) CANNOT be used as boot volumes.** Root volumes must be an SSD volume (General Purpose or Provisioned IOPS).`
          },
          {
            id: "stor-q3",
            questionNumber: "Q3",
            marks: 10,
            module: "Module 2: Amazon EC2",
            topicRef: "2.5 Scaling Architectures: Vertical vs Horizontal & Auto Scaling",
            question: "Distinguish between Vertical Scaling and Horizontal Scaling in Amazon EC2. Detail the three steps required to vertically scale an instance. Explain how Amazon EC2 Auto Scaling automates horizontal scaling with Scheduled, Dynamic, and Predictive policies.",
            modelAnswer: `### 1. Vertical Scaling vs Horizontal Scaling

| Feature | Vertical Scaling (Scale Up / Scale Down) | Horizontal Scaling (Scale Out / Scale In) |
| :--- | :--- | :--- |
| **Mechanism** | Changing the instance type to a larger or smaller instance size with more/less CPU and RAM (e.g., upgrading from \`t2.micro\` to \`m5.2xlarge\`). | Adding or terminating virtual server instances in parallel to distribute the load across multiple machines. |
| **Downtime Requirement** | **Requires downtime:** The instance must be stopped before the hardware type can be modified. | **Zero downtime:** New instances spin up behind an Elastic Load Balancer (ELB) while active instances continue serving traffic. |
| **Scalability Limit** | Finite ceiling (capped by the largest single instance AWS manufactures, e.g., \`u-24tb1.112xlarge\`). | Virtually infinite (can scale to hundreds or thousands of instances across multiple AZs). |
| **Fault Tolerance** | Low (if the single giant instance crashes, the entire system fails). | Extremely high (if one instance crashes, remaining instances handle traffic and Auto Scaling replaces the failed node). |

---

### 2. The Three Steps to Vertically Scale an EC2 Instance:
1. **Stop the instance:** Shut down the instance via Console or API (Note: EBS-backed instances can be stopped; Instance Store-backed cannot).
2. **Change the instance type:** Select the new desired instance family/size (e.g., from \`t3.large\` to \`c5.xlarge\`).
3. **Start the instance:** Boot the instance back up with the newly allocated hardware resources.

---

### 3. Amazon EC2 Auto Scaling Policies:
1. **Scheduled Scaling:**
   * Scales capacity ahead of known, recurring load changes (e.g., scaling out every Wednesday morning at 9:00 AM before a weekly sales campaign and scaling in on Friday night).
2. **Dynamic Scaling:**
   * Adjusts instance count based on live metric thresholds (e.g., maintaining an average fleet CPU utilization of 60% via **Target Tracking Scaling Policies**). Automatically provisions instances when demand spikes and terminates them when demand subsides.
3. **Predictive Scaling:**
   * Utilizes **machine learning algorithms** to forecast future traffic patterns based on historical usage data, pre-warming and provisioning the exact right number of instances in advance of approaching demand curves.`
          }
        ]
      }
    ]
  }
  ,
  {
    id: "bece355l-core-services-exam",
    title: "BECE355L: Module 2 Core Services (S3, RDS, VPC, SQS/SNS) Solved Paper",
    examType: "Module 2 Comprehensive Examination",
    totalMarks: 50,
    duration: "90 Minutes",
    coveredModules: "Module 2: AWS Core Services (S3, RDS, VPC, SQS, SNS)",
    academicYear: "2026-2027",
    sections: [
      {
        sectionName: "Part A: Core Service Concepts (5 Marks Each)",
        questions: [
          {
            id: "mod2-q1",
            questionNumber: "Q1",
            marks: 5,
            module: "Module 2: AWS Core Services",
            topicRef: "2.6 Amazon S3 & Storage Classes",
            question: "Define Object Storage in Amazon S3. Explain how S3 achieves 99.999999999% (11 9's) durability, and elucidate the role of Delete Markers in S3 Versioning.",
            modelAnswer: `### 1. Definition of Amazon S3 Object Storage
Amazon Simple Storage Service (Amazon S3) is an industry-standard object storage service that manages data not as hierarchical file system trees or block volumes, but as discrete **Objects** stored in flat, globally unique root containers called **Buckets**.
Each object consists of:
* **Key:** The unique string identifier (e.g., \`reports/2026/exam.pdf\`).
* **Value:** The data byte stream (0 bytes to 5 TB).
* **Version ID:** Generated when S3 Versioning is enabled.
* **Metadata:** Key-value pairs describing the object (e.g., Content-Type).

---

### 2. How 11 9's Durability is Achieved
Amazon S3 is engineered for **99.999999999% (11 9's)** of data durability:
* **Multi-AZ Geographic Redundancy:** Objects are synchronously stored across a minimum of **three geographically separated Availability Zones (AZs)** within an AWS Region.
* **Physical Disaster Tolerance:** Even if two entire Availability Zones in a region suffer catastrophic loss or destruction concurrently, data in S3 Standard remains completely intact and recoverable.

---

### 3. S3 Versioning & The Role of Delete Markers
When S3 Versioning is enabled on a bucket:
1. **Accidental Deletion Protection:** If a user submits a \`DELETE\` request for an object without specifying a version ID, Amazon S3 **does not permanently delete the file**.
2. **Delete Marker Insertion:** S3 inserts a special marker called a **Delete Marker** with its own unique version ID, making the object appear deleted in the Console.
3. **Instant Restoration:** To recover the object, an administrator simply deletes the Delete Marker, instantly restoring the prior active version.`
          },
          {
            id: "mod2-q2",
            questionNumber: "Q2",
            marks: 5,
            module: "Module 2: AWS Core Services",
            topicRef: "2.8 Amazon VPC Subnetting & Security",
            question: "A company creates a subnet with CIDR block 10.0.2.0/26 in an Amazon VPC. Derive the number of usable IP addresses for EC2 instances, and identify the 5 reserved addresses in AWS.",
            modelAnswer: `### 1. Usable IP Derivation for a /26 Subnet
1. **Total Theoretical Addresses:**
   A \`/26\` prefix leaves \(32 - 26 = 6\) host bits.
   \[
   	ext{Total IP Addresses} = 2^6 = 64
   \]
2. **AWS Reserved IP Addresses (Always 5):**
   AWS strictly reserves **5 IP addresses** in every subnet that cannot be assigned to customer instances.
3. **Usable IP Addresses Calculation:**
   \[
   	ext{Usable IPs} = 64 - 5 = 59
   \]

---

### 2. The 5 Reserved IP Addresses Breakdown (for 10.0.2.0/26)

| IP Address | Role / Purpose in AWS |
| :--- | :--- |
| **10.0.2.0** | **Network Address:** Base wire address for the subnet. |
| **10.0.2.1** | **VPC Router:** Reserved by AWS for the default virtual router. |
| **10.0.2.2** | **DNS Server:** Reserved for the AmazonProvidedDNS (base CIDR + 2). |
| **10.0.2.3** | **Future Use:** Reserved by AWS for future network capabilities. |
| **10.0.2.63** | **Network Broadcast:** Last address in the block. Broadcast is not supported in VPC, but AWS reserves this address. |`
          }
        ]
      },
      {
        sectionName: "Part B: Advanced Architectural Solutions (10 Marks Each)",
        questions: [
          {
            id: "mod2-q3",
            questionNumber: "Q3",
            marks: 10,
            module: "Module 2: AWS Core Services",
            topicRef: "2.7 Amazon RDS, Multi-AZ & Read Replicas",
            question: "A production e-commerce platform on Amazon RDS experiences database contention due to 5,000 writes/sec and 2,000,000 product search reads/sec. Differentiate between Multi-AZ deployments and Read Replicas. Explain using the Examination Notebook analogy and architectural formulas.",
            modelAnswer: `### 1. Multi-AZ Deployments vs Read Replicas Comparison Matrix

| Architectural Feature | Amazon RDS Multi-AZ Deployment | Amazon RDS Read Replicas |
| :--- | :--- | :--- |
| **Primary Purpose** | **High Availability & Disaster Recovery** | **High Performance & Read Scalability** |
| **Replication Mode** | **Synchronous** physical block-level replication | **Asynchronous** logical replication |
| **Replica State** | **Passive / Inactive** (Standby CANNOT process queries) | **Active** (Processes READ-ONLY queries: SELECT) |
| **Endpoint Architecture**| **Single DNS Endpoint:** Updates automatically to Standby | **Distinct DNS Endpoints:** Each replica has its own URL |
| **Failover Mechanism** | **Automatic Failover** in 60–120s with zero data loss | **Manual Promotion** to standalone primary DB |
| **Maximum Count** | Exactly 1 Standby per Primary DB instance | Up to 5 Read Replicas (up to 15 in Aurora) |
| **Geographic Scope** | Cross-AZ within a single AWS Region | Same AZ, Cross-AZ, or **Cross-Region** (Global) |

---

### 2. The Examination Notebook Analogy (Dr. Aparna Mohanty's Framework)
* **Primary Database (P):** The **main answer sheet** where the student writes all answers (handles Read + Write operations).
* **Standby Database (S):** An **identical copy sealed in the principal's safe**. Nobody reads from it or writes to it during the exam. It is used strictly if the original notebook is damaged (Safety / Automatic Failover).
* **Read Replicas (RR):** **Photocopies** distributed to teaching assistants so multiple evaluators can read the work simultaneously without disrupting the student (Read Scalability).

---

### 3. Solution for the 10-Million User / High-Volume Scenario
1. **Handling 5,000 Writes/sec:** Directed exclusively to the **Primary RDS instance** (which replicates synchronously to a Multi-AZ Standby for fault tolerance).
2. **Handling 2,000,000 Reads/sec:** Applications route product search queries across **multiple Read Replicas**, offloading 100% of read traffic from the Primary.

---

### 4. Summary Formulas for Scoring
$$\text{Multi-AZ} = \text{High Availability} + \text{Synchronous Replication} + \text{Automatic Failover}$$
$$\text{Read Replicas} = \text{Read Scalability} + \text{Asynchronous Replication} + \text{Dedicated Endpoints}$$`
          },
          {
            id: "mod2-q4",
            questionNumber: "Q4",
            marks: 10,
            module: "Module 2: AWS Core Services",
            topicRef: "2.8 Amazon VPC Subnetting & Security",
            question: "Perform a comprehensive technical comparison between Security Groups and Network Access Control Lists (NACLs) in Amazon VPC. Detail their scope, statefulness, rule evaluation, and default behaviors.",
            modelAnswer: `### 1. Comprehensive Technical Comparison Matrix

| Feature | Security Groups (SG) | Network ACLs (NACLs) |
| :--- | :--- | :--- |
| **Level of Operation** | **Virtual Network Interface (ENI) / Instance Level** | **Subnet Boundary Level** |
| **Statefulness** | **Stateful:** If inbound traffic is allowed, outbound response is automatically permitted regardless of outbound rules. | **Stateless:** Return traffic must be explicitly allowed by corresponding outbound rules and ephemeral ports. |
| **Supported Rule Types** | **ALLOW rules only** (cannot create explicit Deny rules). | Both **ALLOW and DENY rules** supported. |
| **Rule Evaluation Order**| **All rules evaluated** before making an allow decision. | Evaluated in **strict numerical order** (rule 100 before rule 200); first match dictates decision. |
| **Default Rules (New)** | Blocks all inbound traffic; allows all outbound traffic. | Custom NACL blocks all inbound and outbound traffic until rules are added. |
| **Ephemeral Port Requirement**| Handled automatically by the hypervisor state tracking. | Must explicitly open outbound ephemeral ports (1024–65535) for client responses. |

---

### 2. Real-World Analogy: Building Security vs Apartment Lock
* **Network ACL (Subnet Guard):** The security guard at the front gate of an apartment complex checking incoming and outgoing visitors against a numbered badge list (Subnet perimeter).
* **Security Group (Apartment Deadbolt):** The private lock on your personal apartment door (Instance level), where you choose whom to invite in, and once inside, they can walk out freely without showing an exit pass (Stateful).

---

### 3. Architectural Decision Guidelines
* **Use Security Groups for:** Defining role-based access for application tiers (e.g., Web SG allows port 80/443 from 0.0.0.0/0; Database SG allows port 3306 ONLY from Web SG).
* **Use Network ACLs for:** Immediate threat mitigation and blocking specific malicious IP addresses (e.g., adding Rule 50: \`DENY 198.51.100.23/32\`).`
          },
          {
            id: "mod2-q5",
            questionNumber: "Q5",
            marks: 10,
            module: "Module 2: AWS Core Services",
            topicRef: "2.9 Amazon SQS & Amazon SNS Messaging",
            question: "Architect an asynchronous, loosely coupled E-Commerce Order Processing Workflow using the Amazon SNS-to-SQS Fanout pattern. Contrast Amazon SQS and Amazon SNS with respect to delivery mechanism, visibility timeout, and Dead-Letter Queues (DLQ).",
            modelAnswer: `### 1. The Amazon SNS-to-SQS Fanout Architecture

\`\`\`
[ E-Commerce Web Tier ]
           │
           ▼ (Publish Order Event: 256 KB JSON)
   [ Amazon SNS Topic: Orders ]
     ┌─────┼─────────────────┐
     │ Fanout Replication   │
     ▼     ▼                 ▼
[ SQS Q1: Fulfillment ] [ SQS Q2: Fraud ] [ SQS Q3: Data Lake ]
     │                         │                 │
     ▼                         ▼                 ▼
[ EC2 Worker Fleet ]    [ Lambda Function ] [ Kinesis Firehose -> S3 ]
\`\`\`

1. **Publisher:** The checkout service publishes an \`OrderPlaced\` JSON message to an Amazon SNS Topic.
2. **Fanout Replication:** SNS replicates and pushes identical copies of the event simultaneously into three dedicated SQS queues:
   * **Queue 1 (Order Fulfillment):** Polled by background EC2 worker instances to pack and ship items.
   * **Queue 2 (Fraud Detection):** Polled by AWS Lambda to verify customer credit risk.
   * **Queue 3 (Analytics Data Lake):** Ingested by Amazon Kinesis Data Firehose into an Amazon S3 bucket for BI reporting.
3. **Decoupling Advantage:** If the fraud detection Lambda experiences a delay or the data lake is under maintenance, order fulfillment continues at full speed with zero packet loss.

---

### 2. SQS vs SNS Technical Contrast Matrix

| Feature | Amazon SQS (Queue) | Amazon SNS (Pub/Sub) |
| :--- | :--- | :--- |
| **Communication Model** | **Pull-based:** Consumers poll the queue via \`ReceiveMessage\`. | **Push-based:** SNS instantly pushes messages to subscribers. |
| **Delivery Target** | **1-to-1 / Pooled Workers:** One consumer processes each message. | **1-to-Many:** All subscribed endpoints receive identical messages. |
| **Message Persistence**| Stored durably for **1 minute to 14 days** (default 4 days). | Transient (dropped if endpoints unreachable and no DLQ configured). |
| **Visibility Timeout** | **Yes (default 30s, max 12h):** Hides message while being processed. | Not applicable (push delivery). |
| **Dead-Letter Queue** | Isolates poison-pill messages after \`maxReceiveCount\` fails. | Preserves undeliverable messages when endpoints fail retry policy. |`
          },
          {
            id: "mod2-q6",
            questionNumber: "Q6",
            marks: 10,
            module: "Module 2: AWS Core Services",
            topicRef: "2.6 Amazon S3 & Storage Classes",
            question: "Compare Amazon S3 Storage Classes across durability, retrieval speed, minimum retention, and cost. Provide enterprise selection criteria for: (a) An active photo-sharing app, (b) Monthly payroll archives, and (c) 10-year healthcare audit records.",
            modelAnswer: `### 1. Amazon S3 Storage Classes Comprehensive Matrix

| Storage Class | Durability | Availability | Retrieval Latency | Minimum Retention | Relative Storage Cost |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **S3 Standard** | 11 9's | 99.99% | Milliseconds | None | Baseline ($0.023/GB) |
| **S3 Express One Zone** | 11 9's (1 AZ) | 99.95% | Single-digit ms (10x faster) | None | High-performance tier |
| **S3 Standard-IA** | 11 9's | 99.9% | Milliseconds | 30 Days | Medium ($0.0125/GB) + retrieval fee |
| **S3 One Zone-IA** | 11 9's (1 AZ) | 99.5% | Milliseconds | 30 Days | Low (20% less than Standard-IA) |
| **S3 Intelligent-Tiering**| 11 9's | 99.9% | Milliseconds | 30 Days (auto-tier) | Auto-optimizes; no retrieval fee |
| **S3 Glacier Instant** | 11 9's | 99.9% | Milliseconds | 90 Days | Low ($0.004/GB) |
| **S3 Glacier Flexible** | 11 9's | 99.99% | 1–5 min (Expedited) / 3–5 hr | 90 Days | Very Low ($0.0036/GB) |
| **S3 Glacier Deep Archive**| 11 9's | 99.99% | 12 to 48 Hours | 180 Days | Lowest in Cloud ($0.00099/GB) |

---

### 2. Enterprise Selection Criteria for Given Workloads

#### (a) Active Photo-Sharing Mobile Application
* **Recommended Class:** **Amazon S3 Standard** (or **S3 Intelligent-Tiering**).
* **Justification:** Millions of active users upload and view photos daily requiring high-throughput, millisecond retrieval latency across multiple Availability Zones with zero per-GB retrieval penalties.

#### (b) Monthly Financial Payroll Records (Accessed Once a Month)
* **Recommended Class:** **Amazon S3 Standard-IA (Infrequent Access)**.
* **Justification:** Payroll records are referenced occasionally (e.g., at end of month) but require immediate, millisecond retrieval during financial reporting. S3 Standard-IA cuts storage costs nearly in half compared to S3 Standard while delivering identical millisecond performance.

#### (c) 10-Year Healthcare Regulatory Compliance Audit Logs
* **Recommended Class:** **Amazon S3 Glacier Deep Archive**.
* **Justification:** Medical records and audit trails must be retained for 7–10+ years to comply with HIPAA/GDPR regulations. These records are almost never accessed, and a 12-to-48-hour retrieval turnaround is completely acceptable in audit scenarios. Glacier Deep Archive offers the lowest storage pricing in the cloud ($1 per terabyte per month).`
          }
        ]
      }
    ]
  }

  ,
  {
    id: "bece355l-cat2-model",
    title: "BECE355L: CAT-2 Examination (Model Solved Paper)",
    examType: "Continuous Assessment Test 2",
    totalMarks: 50,
    duration: "90 Minutes",
    coveredModules: "Module 3 (Database & Analytics) & Module 4 (Security & Compliance)",
    academicYear: "2026-2027",
    sections: [
      {
        sectionName: "Part A: Conceptual Foundations (5 Marks Each)",
        questions: [
          {
            id: "cat2-q1",
            questionNumber: "Q1",
            marks: 5,
            module: "Module 3: AWS Database & Analytics Services",
            topicRef: "3.1 AWS Lambda & Serverless Compute",
            question: "State the core characteristics of Serverless Computing. Explain the technical limits of an AWS Lambda function with respect to execution duration, memory, and deployment size.",
            modelAnswer: `### 1. Core Characteristics of Serverless Computing
* **Zero Server Management:** Physical server provisioning, OS patching, and runtime maintenance are completely handled by AWS.
* **Automatic Horizontal Scaling:** Scales automatically from zero requests to thousands of concurrent executions in response to events.
* **Pay-per-Use Billing:** Customers pay only for the exact compute time consumed (measured in milliseconds / GB-seconds); zero cost when code is idle.
* **Built-in Fault Tolerance:** Functions execute automatically across multiple Availability Zones in a Region.

---

### 2. AWS Lambda Technical Limits

| Parameter | Limit | Architectural Significance |
| :--- | :--- | :--- |
| **Max Execution Timeout** | **15 Minutes (900 seconds)** | Long-running continuous processes cannot run on Lambda; use AWS Fargate or EC2. |
| **Memory (RAM) Allocation** | **128 MB to 10,240 MB (10 GB)** | CPU allocation scales proportionately with memory; 1,769 MB = 1 full vCPU. |
| **Ephemeral Storage (/tmp)**| **512 MB to 10,240 MB (10 GB)** | High-speed temporary scratch space for data transformation and downloads. |
| **Deployment Package Size** | **50 MB (zipped) / 250 MB (unzipped)** | Lambda also supports container images up to 10 GB from Amazon ECR. |`
          },
          {
            id: "cat2-q2",
            questionNumber: "Q2",
            marks: 5,
            module: "Module 3: AWS Database & Analytics Services",
            topicRef: "3.2 Amazon DynamoDB",
            question: "Explain the difference between a Simple Primary Key (Partition Key) and a Composite Primary Key in Amazon DynamoDB. Why does DynamoDB discourage SQL-style JOINs?",
            modelAnswer: `### 1. DynamoDB Primary Key Types
1. **Simple Primary Key (Partition Key / HASH Key):**
   * Composed of a single attribute.
   * DynamoDB passes the Partition Key through an internal hash function to determine physical SSD partition placement.
   * Every item in the table must have a globally unique Partition Key value (e.g., \`UserID\`).
2. **Composite Primary Key (Partition Key HASH + Sort Key RANGE):**
   * Composed of two attributes: a Partition Key and a Sort Key.
   * Items with the same Partition Key are stored in the same physical partition, sorted sequentially in ascending order by their Sort Key.
   * Items can share Partition Keys, but the combination of (Partition Key + Sort Key) must be unique (e.g., \`StudentID: 101\`, \`Semester: 1\`, \`Semester: 2\`).

---

### 2. Why DynamoDB Discourages SQL-style JOINs
* **Performance Degradation at Scale:** Relational \`JOIN\` operations require cross-table disk lookups that increase in latency exponentially as datasets grow to terabytes.
* **Single-Digit Millisecond Guarantee:** DynamoDB avoids JOINs by utilizing **Single-Table Design**, pre-joining heterogeneous related records (e.g., Student profile and course enrollments) under common partition keys so that complex entity relationships can be retrieved in a single sub-10ms network round-trip.`
          },
          {
            id: "cat2-q3",
            questionNumber: "Q3",
            marks: 5,
            module: "Module 4: AWS Security & Compliance",
            topicRef: "4.1 AWS Identity and Access Management",
            question: "Differentiate between an IAM User and an IAM Role. Why should applications running on Amazon EC2 never use hardcoded IAM Access Keys?",
            modelAnswer: `### 1. IAM User vs IAM Role Demarcation

| Feature | IAM User | IAM Role |
| :--- | :--- | :--- |
| **Intended Entity** | A specific permanent person / employee | A service (EC2/Lambda) or temporary federated user |
| **Credentials** | Long-term permanent credentials (Password / Access Keys) | Short-term temporary credentials (issued via AWS STS) |
| **Rotation** | Must be rotated manually by administrator | **Automatically rotated** by AWS without downtime |
| **Security Risk** | High risk if hardcoded in software source code | Minimal risk; credentials expire automatically |

---

### 2. Why Hardcoded Access Keys on EC2 are Prohibited
* **Credential Leakage:** Hardcoded credentials in application files or configuration scripts can easily be committed to public GitHub repositories, exposing the AWS account to full compromise.
* **Best Practice:** Attach an **IAM Role to an EC2 Instance Profile**. The AWS SDK automatically fetches temporary, rotating credentials from the instance metadata service (IMDS) with zero credential management in code.`
          },
          {
            id: "cat2-q4",
            questionNumber: "Q4",
            marks: 5,
            module: "Module 4: AWS Security & Compliance",
            topicRef: "4.4 AWS Organizations & SCPs",
            question: "Explain the role of Service Control Policies (SCPs) in AWS Organizations. Do SCPs grant permissions? Explain with respect to the account root user.",
            modelAnswer: `### 1. The Role of Service Control Policies (SCPs)
* Service Control Policies (SCPs) are centralized guardrails managed by the AWS Organizations Management Account that specify the **maximum allowable permissions** for member accounts within an Organizational Unit (OU).
* **SCPs DO NOT grant permissions:** An SCP acts as an access filter. A user still requires an explicit IAM policy grant inside their account to execute an action.

---

### 2. SCP Authority Over the Account Root User
* Unlike standard IAM policies which cannot restrict the root user, **SCPs apply to ALL users and roles within affected member accounts—INCLUDING THE MEMBER ACCOUNT ROOT USER!**
* If an SCP contains an explicit Deny statement (e.g., denying \`s3:DeleteBucket\`), even the root user of that member account cannot delete the bucket.`
          }
        ]
      },
      {
        sectionName: "Part B: Comprehensive Architectural Solutions (10 Marks Each)",
        questions: [
          {
            id: "cat2-q5",
            questionNumber: "Q5",
            marks: 10,
            module: "Module 3: AWS Database & Analytics Services",
            topicRef: "3.7 AWS Disaster Recovery Strategies",
            question: "Analyze the 4 AWS Disaster Recovery strategies. Detail the RPO, RTO, and relative operational cost for each tier using the Gas Stove Analogy. Provide an enterprise architectural recommendation for a mission-critical banking application.",
            modelAnswer: `### 1. The 4 Disaster Recovery Strategies Comparison Matrix

| Disaster Recovery Tier | Recovery Point Objective (RPO) | Recovery Time Objective (RTO) | Relative Cost | Secondary Region State |
| :--- | :--- | :--- | :--- | :--- |
| **1. Backup & Restore** | Hours | Hours to Days | **$ (Lowest)** | Only data backups in S3; zero compute running. |
| **2. Pilot Light** | Minutes | 10 to 30 Minutes | **$$ (Low)** | Core database running & replicating; compute is OFF. |
| **3. Warm Standby** | Seconds | 5 to 10 Minutes | **$$$ (Medium)** | Scaled-down mirror environment running 24/7. |
| **4. Multi-Region Active-Active** | **Near-Zero** | **Near-Zero** | **$$$$ (Highest)** | Full production environments running in 2+ regions simultaneously. |

---

### 2. The Gas Stove Analogy
* **Backup & Restore:** Storing firewood and matches in the shed (must build a fire from scratch during disaster).
* **Pilot Light:** A gas stove where only the tiny pilot flame is kept lit continuously (turn the knob to fire up full heat quickly).
* **Warm Standby:** A burner kept on low simmer all day (quick turn of the knob brings it to a rolling boil).
* **Multi-Region Active-Active:** Two chefs cooking identical meals simultaneously on two blazing burners in different kitchens.

---

### 3. Enterprise Recommendation for Mission-Critical Banking
* **Selected Strategy:** **Multi-Region Active-Active / Hot Site**.
* **Architecture:**
  1. Primary core databases deployed using **Amazon Aurora Global Database** or **DynamoDB Global Tables** (providing sub-second cross-region replication).
  2. Stateless web and application fleets deployed behind **Application Load Balancers** across two distant AWS Regions (e.g., \`ap-south-1\` Mumbai and \`ap-southeast-1\` Singapore).
  3. **Amazon Route 53** configured with **Latency-Based Routing** and **DNS Health Checks**.
  4. If an entire AWS region experiences a catastrophic natural disaster, Route 53 diverts 100% of global financial transactions to the healthy region with zero human intervention and near-zero RTO/RPO.`
          },
          {
            id: "cat2-q6",
            questionNumber: "Q6",
            marks: 10,
            module: "Module 4: AWS Security & Compliance",
            topicRef: "4.2 AWS KMS & Envelope Encryption",
            question: "Explain the cryptographic workflow of Envelope Encryption in AWS Key Management Service (KMS). Why does KMS use Data Encryption Keys (DEKs) instead of encrypting large datasets directly?",
            modelAnswer: `### 1. Why Direct KMS Encryption Fails for Large Datasets
* **The 4 KB API Limit:** AWS KMS is engineered with strict cryptographic boundaries; its \`kms:Encrypt\` API call can only encrypt plaintext data up to a **maximum of 4 KB**.
* **Network & Bottleneck Overhead:** Streaming gigabyte- or terabyte-sized datasets over network connections into KMS Hardware Security Modules (HSMs) would introduce catastrophic latency, high data-transfer charges, and HSM hardware saturation.

---

### 2. The 3-Step Cryptographic Workflow of Envelope Encryption

\`\`\`
[ Application ]
      │ 1. kms:GenerateDataKey(KeyId)
      ▼
   [ AWS KMS ]
      │ Returns: (1) Plaintext DEK + (2) Ciphertext DEK
      ▼
[ Application ]
      ├─► Uses Plaintext DEK to encrypt large file locally in memory
      ├─► Wipes Plaintext DEK from RAM immediately!
      └─► Stores [ Encrypted Data Payload ] + [ Ciphertext DEK ] together on disk
\`\`\`

#### Step 1: Key Generation
1. The application invokes the AWS KMS API: \`kms:GenerateDataKey\`, passing the Customer Managed Key (CMK) ARN.
2. KMS generates a 256-bit AES symmetric key called the **Data Encryption Key (DEK)**.
3. KMS returns two versions of the DEK:
   * **Plaintext Data Key**
   * **Ciphertext Data Key** (the plaintext key encrypted by the KMS Master Key inside the HSM).

#### Step 2: Local Payload Encryption
1. The application uses the **Plaintext Data Key** to encrypt the 100 GB database or file locally in RAM.
2. **Crucial Security Step:** The application immediately and securely erases the Plaintext Data Key from memory.
3. The application stores the **Encrypted Data Payload** alongside the **Ciphertext Data Key** (the envelope).

#### Step 3: Decryption Workflow
1. When reading data, the application extracts the Ciphertext Data Key and sends it to KMS via \`kms:Decrypt\`.
2. KMS decrypts the ciphertext key using the Master Key inside its secure HSM and returns the Plaintext Data Key.
3. The application decrypts the dataset in memory and discards the key.`
          },
          {
            id: "cat2-q7",
            questionNumber: "Q7",
            marks: 10,
            module: "Module 3: AWS Database & Analytics Services",
            topicRef: "3.5 Amazon Redshift Data Warehousing",
            question: "Compare Amazon Redshift with Amazon RDS PostgreSQL. Detail the Massively Parallel Processing (MPP) architecture, Leader Node, and Compute Node slices. Explain why the COPY command is preferred over SQL INSERT.",
            modelAnswer: `### 1. Amazon Redshift vs Amazon RDS PostgreSQL Comparison

| Architectural Feature | Amazon RDS PostgreSQL | Amazon Redshift |
| :--- | :--- | :--- |
| **Workload Type** | **OLTP (Online Transaction Processing)** | **OLAP (Online Analytical Processing)** |
| **Storage Layout** | **Row-Oriented:** Contiguous rows on disk | **Columnar:** Contiguous column blocks on disk |
| **Data Compression** | Minimal row-level compression | **Extreme Columnar Compression** (80-90% reduction) |
| **Target Query Nature** | Rapid single-row CRUD (Bank balance updates) | Complex aggregations over billions of rows (SUM, AVG) |
| **Scaling Architecture** | Single primary instance + Read Replicas | **Massively Parallel Processing (MPP)** multi-node cluster |
| **Storage Capacity** | Up to 64 TB | **Petabytes to Exabytes (Redshift Spectrum)** |

---

### 2. The MPP Cluster Architecture (Leader & Compute Nodes)
1. **Leader Node:**
   * Receives SQL client connections via standard PostgreSQL JDBC/ODBC drivers.
   * Parses SQL queries, optimizes the execution plan, and compiles code into binary execution blocks.
   * Coordinates the distribution of compiled tasks to all Compute Nodes.
   * Aggregates intermediate results returned by Compute Nodes into the final query output.
2. **Compute Nodes & Node Slices:**
   * Compute Nodes execute compiled query steps in parallel across dedicated CPUs, memory, and local columnar disk arrays.
   * Each Compute Node is subdivided into **Node Slices** (e.g., 2 to 16 slices per node depending on instance type).
   * Each slice is allocated an exclusive portion of memory and disk space, processing its assigned data partition completely concurrently with all other slices.

---

### 3. Why the \`COPY\` Command is Mandatory Over SQL \`INSERT\`
* **The Single-Insert Bottleneck:** Using single-row SQL \`INSERT\` statements routes every write sequentially through the single Leader Node, which must compile individual commit transactions, causing severe serialization bottlenecks.
* **Parallel Ingestion via \`COPY\`:** The \`COPY\` command loads data in parallel from Amazon S3 directly into Compute Node slices simultaneously. If an S3 file is split into chunks matching the total cluster slice count, all slices ingest data concurrently, achieving ingestion speeds of terabytes per hour.`
          }
        ]
      }
    ]
  },
  {
    id: "bece355l-fat-model",
    title: "BECE355L: Final Assessment Test (FAT Comprehensive Solved Paper)",
    examType: "University End-Semester Final Assessment Test (FAT)",
    totalMarks: 100,
    duration: "180 Minutes",
    coveredModules: "Comprehensive: Modules 1 through 7 (All Topics)",
    academicYear: "2026-2027",
    sections: [
      {
        sectionName: "Part A: Comprehensive Core Concepts (5 Marks Each)",
        questions: [
          {
            id: "fat-q1",
            questionNumber: "Q1",
            marks: 5,
            module: "Module 5: Architectural Best Practices",
            topicRef: "5.1 The AWS Well-Architected Framework",
            question: "Enumerate the Six Pillars of the AWS Well-Architected Framework and provide two representative AWS services for each pillar.",
            modelAnswer: `### The Six Pillars & Representative AWS Services

| Well-Architected Pillar | Primary Focus Area | Representative AWS Services |
| :--- | :--- | :--- |
| **1. Operational Excellence** | Run & monitor systems to deliver business value; operations as code. | **AWS CloudFormation, AWS Systems Manager** |
| **2. Security** | Protect data, systems, and assets; identity foundations & encryption. | **AWS IAM, AWS KMS, AWS WAF** |
| **3. Reliability** | Recover dynamically from disruptions; scale horizontally; automated recovery. | **Amazon Route 53, Amazon RDS Multi-AZ, AWS Backup** |
| **4. Performance Efficiency**| Use computing resources efficiently; adopt serverless & edge caching. | **AWS Lambda, Amazon CloudFront, AWS Fargate** |
| **5. Cost Optimization** | Run systems at lowest price point; eliminate undifferentiated costs. | **AWS Cost Explorer, EC2 Spot Instances, AWS Budgets** |
| **6. Sustainability** | Minimize environmental impact of running cloud workloads. | **AWS Graviton3 Processors, Customer Carbon Footprint Tool** |`
          },
          {
            id: "fat-q2",
            questionNumber: "Q2",
            marks: 5,
            module: "Module 6: Operational Excellence",
            topicRef: "6.2 AWS CloudFormation",
            question: "Analyze the architecture of an AWS CloudFormation template. What is Drift Detection, and what occurs when a resource creation fails during stack deployment?",
            modelAnswer: `### 1. CloudFormation Template Architecture
* A CloudFormation template is a declarative **JSON or YAML** document describing the desired state of infrastructure.
* Key sections include: \`Parameters\`, \`Mappings\`, \`Conditions\`, \`Resources\` (**THE ONLY MANDATORY SECTION**), and \`Outputs\`.

---

### 2. Drift Detection
* **Definition:** Identifies manual, unmanaged modifications made to infrastructure resources outside of CloudFormation (e.g., an engineer manually adding an inbound port rule to a Security Group via the web console).
* CloudFormation compares the current live state against the template and reports detailed property discrepancies.

---

### 3. Failure Behavior: Automatic Rollback
* If any single resource creation fails during stack deployment (e.g., insufficient subnet IP capacity or invalid AMI ID), CloudFormation automatically triggers **Automatic Rollback**.
* It deletes all newly created resources and returns the stack to the last known healthy state, preventing orphan broken resources.`
          },
          {
            id: "fat-q3",
            questionNumber: "Q3",
            marks: 5,
            module: "Module 6: Operational Excellence",
            topicRef: "6.4 AWS Systems Manager",
            question: "How does AWS Systems Manager Session Manager improve enterprise security over traditional SSH and Bastion Hosts?",
            modelAnswer: `### Comparison: Traditional Bastion Hosts vs Systems Manager Session Manager

| Security Dimension | Traditional SSH via Bastion Host | AWS Systems Manager Session Manager |
| :--- | :--- | :--- |
| **Firewall Ports** | Inbound port 22 (SSH) must be opened to internet. | **Zero inbound ports open!** Uses outbound HTTPS (port 443). |
| **Public IP Requirement**| Bastion host must have a Public / Elastic IP. | Instances can be in **100% private subnets** with NO public IPs. |
| **Key Management** | Vulnerable SSH private key pairs (\`.pem\`) must be shared. | **No SSH keys!** Access is controlled via IAM permissions. |
| **Audit Logging** | Difficult to track commands executed inside sessions. | **100% auditable:** Full session text logged to S3 / CloudWatch. |`
          },
          {
            id: "fat-q4",
            questionNumber: "Q4",
            marks: 5,
            module: "Module 7: Networking & Content Delivery",
            topicRef: "7.1 Amazon Route 53",
            question: "Differentiate between an A Record, a CNAME Record, and an Alias Record in Amazon Route 53. Why are Alias Records unique to AWS?",
            modelAnswer: `### 1. DNS Record Types Comparison

| DNS Record Type | Target Destination | Can Resolve at Zone Apex (example.com)? | Query Cost |
| :--- | :--- | :--- | :--- |
| **A Record** | IPv4 address (e.g., \`192.0.2.1\`) | **Yes** | Standard DNS query fee |
| **CNAME Record** | Another canonical hostname (e.g., \`lb.amazonaws.com\`) | **NO (Forbidden by DNS RFC)** | Standard DNS query fee |
| **Alias Record** | **AWS Resource** (ALB, CloudFront, S3 website) | **YES** | **FREE of charge** for AWS endpoints |

---

### 2. Why Alias Records are Unique to AWS
* **Zone Apex Support:** Allows mapping the root apex domain (\`example.com\`) directly to dynamic AWS load balancers without violating DNS standards.
* **Automatic IP Tracking:** If an Application Load Balancer scales and changes IP addresses, Route 53 updates internally with zero propagation delay.`
          }
        ]
      },
      {
        sectionName: "Part B: Advanced System Architecture & Problem Sets (10 Marks Each)",
        questions: [
          {
            id: "fat-q5",
            questionNumber: "Q5",
            marks: 10,
            module: "Module 7: Networking & Content Delivery",
            topicRef: "7.2 Amazon CloudFront & 7.3 API Gateway",
            question: "Architect a Global Low-Latency Web Application using Amazon CloudFront, Amazon S3, Amazon API Gateway, and AWS Lambda. Detail Origin Access Control (OAC), edge caching, and API Gateway throttling.",
            modelAnswer: `### 1. End-to-End Serverless Architecture Diagram

\`\`\`
[ Global Users Worldwide ]
           │ HTTPS Requests (Anycast DNS)
           ▼
[ Amazon CloudFront Edge Locations (PoPs) ]
     ├─────────────────────────────────────────┐
     │ Route /static/* (Cache Hit: Sub-10ms)  │ Route /api/* (Dynamic API calls)
     ▼                                         ▼
[ Amazon S3 Bucket ]               [ Amazon API Gateway ]
(Protected via OAC)                      │ (Throttling: 10,000 RPS, JWT Auth)
                                         ▼
                                   [ AWS Lambda Functions ]
                                         │
                                         ▼
                                   [ Amazon DynamoDB ]
\`\`\`

---

### 2. Component Technical Breakdown
1. **Amazon CloudFront:**
   * Caches static web assets (HTML, CSS, images) across hundreds of worldwide Edge Locations, serving repeat requests with sub-10ms latency.
   * Compresses payloads using Gzip and Brotli; enforces HTTPS via AWS Certificate Manager (ACM) SSL certificates requested in \`us-east-1\`.
2. **Origin Access Control (OAC):**
   * Configured on the S3 origin to ensure users **cannot bypass CloudFront** by downloading files directly from S3 URLs.
   * The S3 bucket policy allows \`s3:GetObject\` ONLY to the CloudFront service principal.
3. **Amazon API Gateway:**
   * Serves as the single secure entry point for dynamic API calls (\`/api/*\`).
   * Implements **Token Bucket Throttling** (default 10,000 requests/sec with a 5,000 burst capacity) returning HTTP 429 when exceeded.
   * Validates JSON schemas and enforces authentication via Amazon Cognito / Lambda Authorizers.
4. **AWS Lambda & DynamoDB:**
   * Serverless microservices execute business logic and update records in DynamoDB with single-digit millisecond latency.`
          },
          {
            id: "fat-q6",
            questionNumber: "Q6",
            marks: 10,
            module: "Module 7: Networking & Content Delivery",
            topicRef: "7.4 Direct Connect & 7.6 Transit Gateway",
            question: "An enterprise operates 20 VPCs across multiple AWS accounts and requires private connectivity to their on-premises data center. Compare the N(N-1)/2 VPC Peering approach with an AWS Transit Gateway hub-and-spoke architecture. Detail how AWS Direct Connect integrates with Transit Gateway.",
            modelAnswer: `### 1. Full-Mesh VPC Peering Complexity vs Transit Gateway

| Metric / Dimension | Point-to-Point VPC Peering Mesh | AWS Transit Gateway Hub-and-Spoke |
| :--- | :--- | :--- |
| **Connection Formula** | \( \frac{N(N - 1)}{2} \) point-to-point links | Exactly \( N \) attachments |
| **Connections for 20 VPCs**| **190 distinct peering connections** | **20 attachments to a single hub** |
| **Transitive Routing** | **NOT supported** (VPC A cannot reach VPC C via B) | **Fully Supported** (VPC A routes to VPC C through hub) |
| **Management Burden** | Catastrophic route table configuration sprawl | Centralized route tables with route domain isolation |
| **On-Premises Hybrid Link**| Must configure separate VPN/DX links to every VPC | **1 Direct Connect link connects to all 20 VPCs** |

---

### 2. Integration with AWS Direct Connect
1. **Transit Virtual Interface (Transit VIF):**
   * The enterprise provisions an 802.1q dedicated VLAN on their AWS Direct Connect physical connection and designates it as a **Transit VIF**.
2. **Direct Connect Gateway (DXGW):**
   * The Transit VIF terminates on an AWS Direct Connect Gateway, which is associated with the **AWS Transit Gateway**.
3. **Enterprise Connectivity:**
   * Traffic from the on-premises corporate network traverses the dedicated private fiber link, enters the Transit Gateway, and routes seamlessly into any of the 20 attached VPCs.`
          },
          {
            id: "fat-q7",
            questionNumber: "Q7",
            marks: 10,
            module: "Module 3: AWS Database & Analytics Services",
            topicRef: "3.4 Amazon Kinesis & 3.5 Amazon Redshift",
            question: "Design an end-to-end Real-Time Clickstream Ingestion and Analytics Pipeline. Contrast Amazon Kinesis Data Streams (KDS) and Kinesis Data Firehose (KDF). Explain how data flows into Amazon Redshift.",
            modelAnswer: `### 1. End-to-End Analytics Pipeline Architecture

\`\`\`
[ Web & Mobile Users ] ──► [ Kinesis Data Streams (KDS) ] (Real-Time Ingestion, 1MB/s per Shard)
                                       │
                ┌──────────────────────┴──────────────────────┐
                ▼                                             ▼
     [ Kinesis Data Analytics ]                    [ Kinesis Data Firehose (KDF) ]
     (Real-Time SQL Anomaly Detection)             (Buffer: 60s / 5MB + Lambda JSON transform)
                │                                             │
                ▼                                             ▼
     [ Live Ops Dashboard ]                        [ Amazon S3 Staging Bucket ]
                                                              │ (Automated Manifest COPY)
                                                              ▼
                                                   [ Amazon Redshift Data Warehouse ]
                                                              │ (Columnar MPP Analytics)
                                                              ▼
                                                   [ Amazon QuickSight BI ]
\`\`\`

---

### 2. Technical Comparison: Kinesis Data Streams vs Firehose

| Architectural Feature | Kinesis Data Streams (KDS) | Kinesis Data Firehose (KDF) |
| :--- | :--- | :--- |
| **Latency Profile** | **Real-Time (sub-second / 70ms)** | **Near Real-Time (60s to 900s buffer)** |
| **Capacity Management** | Managed via **Shards** (1 MB/s in, 2 MB/s out) | **Fully serverless** (auto-scales automatically) |
| **Data Persistence** | **24 hours to 365 days** (allows data replay) | **Zero persistence** (transient buffer; flushes to storage) |
| **Destination Flexibility**| Custom consumers using KCL, Lambda, Flink | Direct delivery to **S3, Redshift, OpenSearch, Splunk** |

---

### 3. How Data Enters Amazon Redshift via Firehose
1. Firehose batches incoming stream records and writes compressed columnar Parquet/Gzip files into an intermediate **Amazon S3 Staging Bucket**.
2. Firehose automatically issues a high-performance **Redshift \`COPY\` command**, loading data in parallel across all Redshift Compute Node slices.
3. Analysts query the data warehouse using SQL for multi-year customer trend analysis.`
          },
          {
            id: "fat-q8",
            questionNumber: "Q8",
            marks: 10,
            module: "Module 4: AWS Security & Compliance",
            topicRef: "4.6 Edge Security & 4.3 Amazon Inspector",
            question: "A financial organization must defend against DDoS attacks, SQL Injection exploits, and host-level OS vulnerabilities. Formulate a comprehensive Defense-in-Depth Security Architecture combining AWS Shield, AWS WAF, Security Groups, and Amazon Inspector.",
            modelAnswer: `### 1. Defense-in-Depth Multi-Layer Architecture

\`\`\`
[ Internet Attackers ]
          │
          ▼ ── Layer 3 & 4 (DDoS Volumetric Attacks: SYN/UDP Floods)
   [ AWS Shield Standard / Advanced ] ──► (Absorbed at Edge Points of Presence)
          │
          ▼ ── Layer 7 (Application Attacks: SQLi, XSS, HTTP Floods)
   [ AWS WAF (Web Application Firewall) ] ──► (Blocked via Managed Web ACLs)
          │
          ▼ ── Layer 4 (Transport / Network Firewall)
   [ Security Groups & NACLs ] ──► (Stateful filtering: Port 443 only from WAF/ALB)
          │
          ▼ ── Host & Compute Layer (Software CVEs & Patching)
   [ Amazon Inspector + Systems Manager Patch Manager ] ──► (Automated CVE detection & repair)
\`\`\`

---

### 2. Layer-by-Layer Security Implementation
1. **Perimeter Layer (DDoS Mitigation via AWS Shield):**
   * **AWS Shield Standard** defends against volumetric Layer 3/4 network floods at no extra cost.
   * **AWS Shield Advanced** protects ALBs and CloudFront with 24/7 direct access to the AWS Shield Response Team (SRT) and financial DDoS cost protection.
2. **Application Layer (Exploit Prevention via AWS WAF):**
   * **AWS WAF** inspects HTTP/S request bodies, headers, and query strings for OWASP Top 10 exploits.
   * Deploys Managed Rules for **SQL Injection (SQLi)** and **Cross-Site Scripting (XSS)**.
   * Implements **Rate-Based Rules** (limiting client IPs to 2,000 requests/5 min) to thwart brute-force login attempts and scraper bots.
3. **Network Layer (Network Isolation via Security Groups):**
   * EC2 instances reside in **Private Subnets** with zero public IP addresses.
   * Instance Security Groups allow inbound traffic **only from the Application Load Balancer's Security Group ID** on port 8080, completely preventing direct internet ingress.
4. **Host & Application Layer (Vulnerability Management via Amazon Inspector):**
   * **Amazon Inspector** continuously monitors EC2 instances via the built-in AWS Systems Manager (SSM) agent.
   * Automatically discovers unpatched Common Vulnerabilities and Exposures (CVEs) in operating system packages and container images.
   * Findings automatically trigger **AWS Systems Manager Patch Manager** maintenance windows to apply security patches during off-peak hours.`
          }
        ]
      }
    ]
  }

];
