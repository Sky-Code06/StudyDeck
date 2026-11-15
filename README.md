# 🎓 StudyDeck — Zero-Omission Mastery Platform

> **An interactive, high-retention learning dashboard and university exam preparation system built to ensure zero topics, edge cases, formulas, or architectural nuances are skipped.**

---

## 🌟 Overview

**StudyDeck** bridges the gap between dense professor lecture slides and actual cognitive mastery. Developed specifically for university-grade computer science and cloud engineering curricula, it ingests raw course presentations (PPTX), lecture PDFs, and syllabi, structuring them into textbook-grade interactive notes, active recall flashcards, prerequisite concept graphs, practice testing arenas, and verified exam solutions.

The included curriculum is the complete, accredited coursework for **BECE355L: Advanced Cloud Computing** (VIT University), covering all 7 modules and 38 comprehensive topics.

---

## ✨ Features & Modalities

### 1. 📖 Exhaustive Deep-Dive Notes (Zero-Omission Standard)
* Complete hierarchical breakdown of all 7 modules and 38 topics.
* Built-in real-world analogies (e.g. Dr. Aparna Mohanty's examination notebook analogy for RDS Multi-AZ vs. Read Replicas).
* Common exam traps, antipatterns, and misconceptions.
* Exact mathematical formulas (e.g. Subnetting usable IPs: $2^{(32 - \text{prefix})} - 5$), CLI commands, and comparison tables.
* Per-topic estimated reading time and mastery tracking toggles.

### 2. 📝 Exam Solutions & Solved Papers Repository
* **5 Complete Model Solved Papers** covering CAT-1, CAT-2, and FAT (End-Semester) examinations (30 questions total).
* Step-by-step model solutions classified by mark weightage (**5 Marks** Short Answers vs. **10 Marks** Comprehensive Architectural Designs).
* Instant filtering by marks, global keyword search across questions and answers, and one-click Markdown copy to clipboard.
* Every question links directly back to the source notes in the curriculum.

### 3. 🎴 Active Recall & Spaced Repetition Flashcards
* 3D flip card active recall interface with Anki-style 4-tier difficulty ratings (`Again`, `Hard`, `Good`, `Easy`).
* Full keyboard shortcuts (`Space` to flip, `1-4` to rate, `← / →` to navigate).
* Built-in **Text-to-Speech (TTS)** audio readout using the browser Web Speech API.
* Completion confetti celebration powered by `canvas-confetti`.

### 4. 🧠 Interactive Concept Mind Map & Prerequisite Graph
* Visual node-link dependency graph showing concept prerequisites.
* Dynamic mastery state tracking (`Mastered`, `Learning`, `Unvisited`).
* Slide-out Concept Inspector Drawer with one-click navigation directly into the corresponding notes.

### 5. 🧪 Practice Quiz Arena
* Multiple-choice practice questions with instant scoring.
* In-depth diagnostic explanations of *why* the correct option is right and *why* distractors fail.
* Historical accuracy metrics and attempt tracking.

### 6. ⚡ High-Yield Revision Cheat Sheets
* 11 rapid-reference summary matrices (S3 Storage Classes, EC2 Pricing & Tenancy, RDS vs. EC2 DB, Security Groups vs. NACLs, SQS vs. SNS, EBS Volume Types).
* Searchable and print-friendly export for last-minute exam day revision.

---

## 📚 Curriculum Breakdown (BECE355L: Advanced Cloud Computing)

* **Module 1: AWS Cloud Concepts & Shared Responsibility**
  * 1.1 Shift from Traditional On-Premises to Cloud Computing
  * 1.2 The 9-Layer Stack: IaaS, PaaS, and SaaS Service Models
  * 1.3 Deployment Models (Public/Private/Hybrid) & Global Infrastructure
  * 1.4 Security 'OF' the Cloud vs. Security 'IN' the Cloud
  * 1.5 The 3-Tier IT Controls Hierarchy & Compliance in Practice
* **Module 2: AWS Core Services**
  * 2.1 Amazon EC2 Fundamentals, Compute Methods & Architecture
  * 2.2 EC2 Purchasing Options (On-Demand, Spot, Reserved, Savings Plans) & Tenancy
  * 2.3 The 7 Steps to Launching an EC2 Instance & Configuration Decisions
  * 2.4 EC2 Storage Options: Amazon EBS, EFS & Instance Store
  * 2.5 Managing EC2: Lifecycle States, Auto Scaling, ELB & Cost Optimization
  * 2.6 Amazon S3 (Simple Storage Service) & Storage Classes Architecture
  * 2.7 Amazon RDS (Relational Database Service), Multi-AZ & Read Replicas
  * 2.8 Amazon VPC (Virtual Private Cloud), Subnetting & Network Security
  * 2.9 Amazon SQS & Amazon SNS: Decoupled Architecture, Pub/Sub & Fanout
* **Module 3: AWS Database, Serverless & Analytics Services**
  * 3.1 AWS Lambda & Serverless Compute Architecture (Limits, Triggers, Invocations)
  * 3.2 Amazon DynamoDB: NoSQL Architecture, Partition Keys & Single-Table Design
  * 3.3 Containerization on AWS: Amazon ECS, EKS & AWS Fargate
  * 3.4 Real-Time Streaming Data: Amazon Kinesis (Streams, Firehose, Analytics)
  * 3.5 Amazon Redshift: Cloud Data Warehousing & Massively Parallel Processing (MPP)
  * 3.6 Amazon EMR (Elastic MapReduce) & Big Data Hadoop/Spark Processing
  * 3.7 AWS Disaster Recovery Strategies (4 Tiers) & AWS Backup Automation
* **Module 4: AWS Security, Identity & Compliance**
  * 4.1 AWS Identity and Access Management (IAM): Users, Groups, Roles & Policies
  * 4.2 AWS Key Management Service (KMS), Envelope Encryption & CloudHSM
  * 4.3 Automated Vulnerability Management: Amazon Inspector
  * 4.4 AWS Organizations, Consolidated Billing & Service Control Policies (SCPs)
  * 4.5 AWS Trusted Advisor (5 Pillars), Security Hub & AWS Artifact
  * 4.6 AWS Edge Security: AWS WAF, AWS Shield (DDoS) & Firewall Manager
* **Module 5: AWS Architectural Best Practices**
  * 5.1 The AWS Well-Architected Framework: The 6 Pillars & Design Principles
* **Module 6: AWS Operational Excellence & Management Tools**
  * 6.1 AWS Management Interfaces: Management Console, AWS CLI & SDKs
  * 6.2 Infrastructure as Code: AWS CloudFormation Stacks & Drift Detection
  * 6.3 Observability & Monitoring: Amazon CloudWatch Metrics, Logs & Alarms
  * 6.4 AWS Systems Manager (SSM): Session Manager, Run Command & Parameter Store
* **Module 7: AWS Networking & Content Delivery Services**
  * 7.1 Amazon Route 53: Global DNS Management & 7 Routing Policies
  * 7.2 Amazon CloudFront: Global Content Delivery Network (CDN) & Edge Caching
  * 7.3 Amazon API Gateway: REST, HTTP & WebSocket APIs
  * 7.4 Dedicated Hybrid Connectivity: AWS Direct Connect & VIFs
  * 7.5 AWS Site-to-Site VPN & Client VPN Architecture
  * 7.6 AWS Transit Gateway: Hub-and-Spoke Enterprise Network Interconnect

---

## 🛠️ Tech Stack

* **Frontend:** React 19 (Single-Page Application with state-based tab routing)
* **Build System:** [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Effects:** `canvas-confetti`
* **State & Persistence:** Custom React Hook (`useStudyDeck.js`) with `localStorage` synchronization

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
* npm (bundled with Node.js)

### Installation
```bash
# Clone the repository
git clone https://github.com/Sky-Code06/StudyDeck.git

# Navigate into the project directory
cd StudyDeck

# Install dependencies
npm install
```

### Running Locally
```bash
npm run dev
```
Open **`http://127.0.0.1:5173/`** in your browser.

### Building for Production
```bash
npm run build
```
Generates an optimized production build in the `dist/` directory.

---

## 📂 Adding New Exam Papers or Course Decks

1. **Exam Papers:** Drop your question paper PDFs or images into the [`solved_papers/`](./solved_papers/) folder.
2. **Decks:** Use the built-in **Deck Builder** tab (`+ Add Files / Deck`) in the web application to export/import JSON decks or create custom topics.

---

## 📄 License

This project is licensed under the MIT License.
