# FolioChain Protocol - Mermaid Diagram Reference Guide

## 📊 Quick Reference for All Integration Diagrams

This document provides a quick reference for all Mermaid diagrams in the FolioChain Protocol documentation, including their purpose, key insights, and where to find them.

---

## 1. Integration Architecture Overview

**Location**: `/architecture/integration/` (Introduction)

**Diagram Type**: Multi-layered Graph (TB - Top to Bottom)

**Complexity**: 80+ nodes, 13 subsystems

**Purpose**: Provides a bird's-eye view of the entire FolioChain Protocol integration layer, showing how all components interact from asset origination through to external integrations.

### Key Components Visualized

| Layer | Components | Purpose |
|-------|-----------|---------|
| **Asset Origination** | Owner, Folio Real, Legal Docs, Surveys | Initial asset submission |
| **Data Validation** | National Registry, SUGEVAL, SUGEF, Hacienda, Environmental Ministry | Multi-source data collection |
| **Oracle Network** | Registry Bots, Notary Attestation, Regulatory Feeds, AI Engine, Consensus | Truth synthesis |
| **AI & ML Processing** | OCR, NLP, Anomaly Detection, Conflict Resolution, Trust Scores | Intelligent processing |
| **Compliance Engine** | KYC/AML, ZMT Caps, SUGEVAL Threshold, Folio Validation, Tax Check, Sanctions | Real-time enforcement |
| **Notary Bridge** | Notary Network, Document Review, Digital Attestation, Physical Archive, Crypto Signature | Legal authority |
| **Blockchain Layer** | Smart Contracts, Master Token, Fractional Factory, Compliance Module, Events | Immutable storage |
| **Storage & Archival** | IPFS, Arweave, PostgreSQL, Event Logs | Data persistence |
| **Transaction Execution** | Token Minting, Transfers, Yield Distribution, Escrow, Redemption | Active operations |
| **Monitoring** | Blockchain Listener, Oracle Listener, Notary Listener, Event Bus, Consistency Verifier, Audit Trail | System monitoring |
| **Frontend** | Web dApp, Mobile App, Admin Dashboard, Notary Portal, Investor Dashboard | User interfaces |
| **Dispute Resolution** | Detection, Freezing, Expert Review, DAO Governance, Resolution Execution | Conflict management |
| **External Integrations** | DeFi Protocols, DEXs, Cross-Chain Bridges, Payment Processors, Analytics | External connections |

### Color Coding

- 🔵 **Blue tones**: Data collection and validation
- 🟢 **Green tones**: Oracle networks and AI processing
- 🟠 **Orange tones**: Compliance and regulatory systems
- 🟣 **Purple tones**: Notary and legal processes
- 🟡 **Amber tones**: Blockchain core components
- 🔴 **Red tones**: Dispute resolution and governance

### Key Insights

1. **13 Major Subsystems**: Each with specific responsibilities
2. **Multi-Layer Architecture**: Separation of concerns for scalability
3. **Redundancy**: Multiple verification sources for critical data
4. **Feedback Loops**: Continuous monitoring and correction mechanisms
5. **External Openness**: DeFi integration while maintaining compliance

---

## 2. Oracle Data Flow Sequence

**Location**: `/architecture/integration/` (Oracle Data Feeds section)

**Diagram Type**: Sequence Diagram

**Participants**: 8 actors (Owner, Registry, 3 Oracles, AI, Consensus, Blockchain)

**Purpose**: Illustrates the temporal flow of data through the oracle network, showing how multi-source verification achieves consensus.

### Flow Stages

1. **Documentation Submission** (t=0)
   - Property owner submits folio real documentation
   - National Registry updates records

2. **Automated Collection** (t=0-6h)
   - Registry scraping bot polls every 6 hours
   - Sends raw data to AI processing engine

3. **Manual Verification** (t=0-48h)
   - Owner requests notary verification
   - Notary manually reviews and validates
   - Signed attestation generated

4. **Regulatory Feeds** (t=0-24h)
   - SUGEVAL, SUGEF, Hacienda data collected
   - Tax status, AML lists, ZMT classifications

5. **AI Processing** (t=varies)
   - OCR extracts text from scanned documents
   - NLP interprets legal language
   - Anomaly detection flags inconsistencies

6. **Consensus Calculation** (t=6-72h)
   - Compare data from 3 sources
   - Resolve conflicts using ML models
   - Calculate confidence score (0-100%)

7. **Decision Tree** (based on confidence)
   - **>95%**: Auto-approve and anchor to blockchain
   - **80-95%**: Request additional notary review
   - **<80%**: Request enhanced documentation from owner

### Key Insights

1. **Three-Source Verification**: Every critical data point verified by automated bot, human notary, and regulatory feed
2. **AI-Powered Resolution**: Machine learning resolves conflicts when sources disagree
3. **Confidence-Based Routing**: Decisions automated only when certainty is high
4. **Human-in-the-Loop**: Notaries provide judgment for ambiguous cases
5. **Temporal Optimization**: Balances speed (6h polling) with accuracy (48h notary review)

---

## 3. Compliance Check Flow

**Location**: `/architecture/integration/` (Compliance Triggers section)

**Diagram Type**: Decision Tree (Graph LR - Left to Right)

**Decision Points**: 40+ nodes

**Purpose**: Complete regulatory enforcement logic showing every check a transaction must pass before execution.

### Compliance Layers

#### Layer 1: Identity Verification
- **KYC Status Check**: Is receiver KYC'd?
- **ONCHAINID Claims**: Retrieve decentralized identity
- **Nationality Check**: Costa Rican vs foreign
- **Risk Score**: SUGEF risk assessment (0-100)
- **Accreditation**: Investor qualifications

#### Layer 2: Asset-Specific Checks
- **Property Type**: ZMT vs standard property
- **Foreign Ownership Calculation**: Aggregate all holders
- **ZMT Cap Enforcement**: ≤49% for foreign holders
- **Folio Real Status**: Query oracle for VALID status

#### Layer 3: Regulatory Compliance
- **Securities Classification**: Yield-bearing vs non-security
- **SUGEVAL Threshold**: >$1M requires approval
- **SUGEVAL Approval Check**: Verified via oracle
- **SUGEF AML List**: Check sanctions database

#### Layer 4: Tax & Payment Verification
- **Property Tax Status**: Paid current year?
- **Tax Calculation**: Apply Hacienda rates (0.25-0.55%)
- **Withholding Reserve**: Set aside tax amount

#### Layer 5: Final Authorization
- **All Checks Passed?**: Boolean AND of all layers
- **Execute Transfer**: Blockchain transaction
- **Emit Events**: ComplianceSuccess or ComplianceFailure
- **Update Registry**: On-chain ownership records

### Color Coding

- 🔵 **Blue**: Transaction initiation
- 🟣 **Purple**: Identity checks
- 🟢 **Green**: Asset-specific validation
- 🟠 **Orange**: Regulatory compliance
- 🔴 **Pink**: Tax verification
- 🟦 **Teal**: Final authorization

### Key Insights

1. **Multi-Layered Defense**: 5 distinct compliance layers
2. **Fail-Fast Architecture**: Rejects at first failed check
3. **Costa Rica-Specific**: ZMT caps, SUGEVAL thresholds, Hacienda taxes
4. **Real-Time Enforcement**: Checks executed on-chain before transaction
5. **Transparent Reasons**: Rejection codes indicate exact failure point

---

## 4. Event Synchronization Architecture

**Location**: `/architecture/integration/` (Event Synchronization section)

**Diagram Type**: Complex Graph (TB) with Feedback Loops

**Subsystems**: 9 interconnected layers

**Purpose**: Demonstrates how FCP maintains consistency between on-chain and off-chain states through comprehensive event monitoring.

### Architecture Layers

#### 1. Event Sources (5 types)
- Blockchain Events (transfers, mints, burns)
- Oracle Updates (data refresh, consensus changes)
- Notary Attestations (new signatures, revocations)
- User Actions (wallets, dApps)
- System Operations (cron jobs, admin)

#### 2. Event Capture
- Dedicated listeners for each source
- WebSocket connections for real-time
- Polling fallbacks for reliability

#### 3. Unified Event Bus
- Aggregates all events
- Normalizes formats
- Synchronizes timestamps
- Manages queue

#### 4. Event Processing
- Routes to appropriate handlers
- Checks consistency across sources
- Detects conflicts and anomalies
- Classifies priority (low, medium, high, critical)

#### 5. State Synchronization
- Queries on-chain state
- Queries oracle state
- Queries notary state
- Queries database state
- Compares for discrepancies

#### 6. Consistency Resolution
- **Match**: Emit Consistency OK
- **Mismatch**: Detect discrepancy, freeze assets, trigger investigation, escalate to governance

#### 7. Audit Trail Storage
- Event log database (PostgreSQL)
- Blockchain archive (immutable)
- IPFS event hashes (tamper-evident)
- Legal archive (compliance)
- Analytics warehouse (BI)

#### 8. Notifications & Actions
- Real-time dashboard updates
- Email/SMS alerts for critical
- Webhooks for integrations
- Smart contract calls
- Governance proposals

#### 9. Subscribers
- Web dApp
- Mobile app
- Admin dashboard
- Compliance monitor
- Analytics platform
- External integrations

### Key Insights

1. **Five Event Sources**: Comprehensive coverage of all system activities
2. **Unified Bus**: Single source of truth for event ordering
3. **Multi-State Verification**: Cross-checks 4 independent data stores
4. **Auto-Freeze Protection**: Immediately pauses affected assets on inconsistency
5. **Feedback Loops**: Governance resolutions update all systems

---

## 5. Notary Workflow State Machine

**Location**: `/architecture/integration/` (Notary Attestation section)

**Diagram Type**: State Diagram v2

**States**: 15+ workflow states

**Purpose**: Complete lifecycle of notary attestation from request through blockchain anchoring.

### State Transitions

```
[*] → RequestInitiated
RequestInitiated → DocumentCompilation
DocumentCompilation → NotaryAssignment
NotaryAssignment → CredentialVerification
CredentialVerification → DocumentReview (if valid)
CredentialVerification → RequestInitiated (if invalid - reassign)
```

#### Document Review (Nested State)
```
[*] → TitleChainAnalysis
TitleChainAnalysis → EncumbranceCheck
EncumbranceCheck → OwnershipVerification
OwnershipVerification → LegalRiskAssessment
LegalRiskAssessment → ComplianceValidation
ComplianceValidation → [*]
```

#### Decision Routing
```
DocumentReview → PendingDecision
PendingDecision → Approved (no issues)
PendingDecision → ConditionalApproval (minor issues)
PendingDecision → Rejected (critical issues)
PendingDecision → EscalatedReview (complex/ambiguous)
```

#### Approval Path
```
Approved → DigitalAttestation
DigitalAttestation → CryptographicSignature (ED25519)
CryptographicSignature → PhysicalArchive
PhysicalArchive → BlockchainAnchoring
BlockchainAnchoring → OracleValidation
OracleValidation → SmartContractUpdate
SmartContractUpdate → EventEmission
EventEmission → NotificationDispatch
NotificationDispatch → [*]
```

#### Conditional/Rejection Paths
```
ConditionalApproval → RequireDocumentation
RequireDocumentation → DocumentCompilation (loop)
Rejected → DisputeLogging
DisputeLogging → NotificationDispatch
EscalatedReview → SeniorNotaryReview
SeniorNotaryReview → PendingDecision (re-evaluate)
```

### Key Insights

1. **Human Judgment Layer**: Notaries provide legal interpretation where algorithms can't
2. **Dual Records**: Digital attestation (blockchain) + physical archive (legal)
3. **Credential Verification**: Ensures only licensed Costa Rican notaries participate
4. **Escalation Path**: Complex cases reviewed by senior notaries
5. **Cryptographic Proof**: ED25519 signatures link notary to attestation

---

## 6. Dispute Resolution Flowchart

**Location**: `/architecture/integration/` (Dispute Resolution section)

**Diagram Type**: Complex Flowchart

**Nodes**: 50+ decision points

**Purpose**: Multi-tiered conflict resolution from automated ML through DAO governance to court proceedings.

### Resolution Pathways

#### 1. Detection & Classification
```
Start → Classify Issue Type
├─ Data Conflict (oracle disagreement)
├─ Transaction Dispute (user claims)
├─ Compliance Violation (rule breach)
└─ Oracle Failure (system error)
All → Freeze Affected Assets
```

#### 2. Evidence Collection
- Pull blockchain history (immutable record)
- Query all oracle sources (3+ sources)
- Retrieve notary records (legal attestations)
- Collect user submissions (claims, proofs)
- Analyze transaction logs (forensics)

#### 3. Severity Assessment
```
Compile Evidence → Assess Severity
├─ Low → Automated Resolution (ML)
├─ Medium → Expert Panel Review (3 notaries)
├─ High → DAO Governance Vote (7 days)
└─ Critical → Emergency Multisig (3-of-5)
```

#### 4. Low Severity (Automated)
```
ML Conflict Resolution → Confidence Score
├─ >90% → Resolution Execution
└─ <90% → Escalate to Expert Panel
```

#### 5. Medium Severity (Expert Panel)
```
3-Notary Review Panel → Majority Decision
├─ Consensus → Resolution Execution
└─ Split Decision → Escalate to DAO
```

#### 6. High Severity (DAO Governance)
```
Create Proposal → 7-Day Voting → Result
├─ Approved → Resolution Execution
├─ Rejected → Legal Escalation
└─ No Quorum → Emergency Multisig
```

#### 7. Critical Severity (Emergency)
```
Emergency 3-of-5 Multisig → Resolution Execution
```

#### 8. Legal Escalation
```
Court Proceedings → Court Order → Resolution Execution
```

#### 9. Resolution Execution
```
Update Blockchain State
Update Oracle Data
Update Notary Records
Update Database
↓
Cross-System Verification
├─ All Synced? → Unfreeze Assets
└─ Not Synced → Retry Synchronization
```

#### 10. Compensation & Penalties
```
Determine Compensation
├─ User Harmed → Protocol Insurance Payout
├─ Oracle Failed → Slash Oracle Stake
└─ Notary Error → Review Notary License
```

#### 11. Finalization
```
Notify All Parties
Archive Case Records
Update System Metrics
→ Resolution Complete
```

### Key Insights

1. **Four Escalation Tiers**: Matches resolution mechanism to issue severity
2. **Auto-Freeze Protection**: Immediate asset pause prevents further damage
3. **Evidence-Based**: Comprehensive forensics before decision
4. **Multi-Stakeholder**: ML, experts, DAO, and courts all have roles
5. **Compensation Mechanisms**: Protocol insurance protects users, penalties deter bad actors

---

## 7. Transaction Lifecycle Timeline

**Location**: `/architecture/integration/` (Complete Transaction Lifecycle section)

**Diagram Type**: Timeline Visualization

**Phases**: 9 lifecycle stages

**Duration**: 6-12 months typical (origination to secondary trading)

**Purpose**: End-to-end journey of a tokenized real estate asset from listing through redemption.

### Timeline Phases

#### Phase 1: Asset Origination (Days 1-30)
**Activities**:
- Property owner decides to tokenize
- Engages with FCP platform
- Gathers folio real documents
- Obtains property survey
- Collects tax records
- Submits to notary review
- National Registry check
- Environmental compliance verification

**Deliverables**: Complete documentation package

#### Phase 2: Oracle Processing (Days 10-40)
**Activities**:
- Multi-source data aggregation (Registry, SUGEVAL, SUGEF)
- AI document processing (OCR, NLP)
- Anomaly detection
- ML conflict resolution
- Trust score calculation
- Data anchoring preparation

**Deliverables**: Consensus data package with >95% confidence

#### Phase 3: Compliance Validation (Days 30-60)
**Activities**:
- Issuer KYC/AML verification
- Sanctions list screening
- Risk assessment
- SUGEVAL threshold check
- Securities classification
- ZMT foreign ownership cap verification
- Property tax verification
- Withholding setup
- Hacienda integration

**Deliverables**: Compliance approval certificate

#### Phase 4: Token Minting (Days 60-90)
**Activities**:
- Deploy master token contract
- Create fractional token contracts
- Initialize compliance module
- Hash folio real data on-chain
- Store metadata (IPFS)
- Emit TokenMinted event
- Create physical legal records
- Store in Arweave
- Generate ownership certificates

**Deliverables**: Live tokens on blockchain with legal backing

#### Phase 5: Primary Market (Days 90-180)
**Activities**:
- Define fundraising campaign (target, price)
- Launch investor portal
- Investor onboarding (KYC, accreditation)
- Wallet setup and education
- Token purchase transactions
- Compliance pre-checks
- Transfer execution
- Ownership registry updates

**Deliverables**: Funded project with distributed token ownership

#### Phase 6: Asset Management (Months 6+)
**Activities**:
- Real-time ownership tracking
- Yield distribution (rental income, etc.)
- Governance participation (DAO votes)
- Oracle polling (6-hour cycles)
- Event synchronization
- Consistency verification
- Bill 23.415 monitoring
- SUGEVAL rule change tracking
- Tax rate adjustments

**Deliverables**: Ongoing asset operations and compliance

#### Phase 7: Secondary Trading (Ongoing)
**Activities**:
- List on compliant DEX
- Set asking price
- Enable asset discovery
- Buyer views details and docs
- Submit purchase offer
- Dynamic compliance check (real-time)
- ZMT cap verification
- Escrow management
- Notary approval (if required)
- Blockchain transfer
- Update all registries
- Emit events
- Notify all parties

**Deliverables**: Liquid secondary market for fractions

#### Phase 8: Dispute Scenarios (As Needed)
**Activities**:
- Inconsistency detection
- Auto-freeze affected assets
- Evidence collection (forensics)
- Expert panel review
- DAO governance vote
- Court proceedings (if needed)
- Correct data propagation
- Cross-system sync verification
- Asset unfreeze

**Deliverables**: Resolved conflicts with system integrity restored

#### Phase 9: Asset Redemption (Years Later)
**Activities**:
- Token holder initiates redemption
- Submit required documents
- Notary coordination
- Update National Registry
- Transfer legal title (physical deed)
- Discharge digital tokens
- Burn tokens on blockchain
- Archive transaction records
- Close audit trail

**Deliverables**: Full redemption with legal ownership transferred

### Key Insights

1. **6-12 Month Cycle**: From origination to active secondary trading
2. **Parallel Processes**: Oracle and compliance validation overlap
3. **Continuous Monitoring**: Asset management phase never ends
4. **Multiple Touchpoints**: Notaries involved at 3+ stages
5. **Legal Finality**: Redemption returns to traditional ownership model

---

## 🎨 Diagram Style Guide

### Color Scheme

All diagrams use a consistent color palette for visual coherence:

| Category | Color | Hex Code | Usage |
|----------|-------|----------|-------|
| Data Sources | Light Blue | `#e1f5ff` | Asset origination, validation |
| Oracle Systems | Green | `#d3f9d8` | Multi-source truth |
| AI/ML | Blue | `#e7f5ff` | Intelligent processing |
| Compliance | Orange | `#ffe8cc` | Regulatory checks |
| Legal/Notary | Purple | `#f3d9fa` | Attestations |
| Blockchain | Amber | `#ffd8a8` | On-chain core |
| Storage | Light Blue | `#d0ebff` | Data persistence |
| Transactions | Light Green | `#b2f2bb` | Active operations |
| Monitoring | Pink | `#ffdeeb` | System health |
| Frontend | Indigo | `#dbe4ff` | User interfaces |
| Governance | Red | `#ffe3e3` | Dispute resolution |
| External | Gray | `#e9ecef` | Integrations |

### Typography

- **Node Labels**: Sentence case, max 4 words
- **Subgraph Titles**: ALL CAPS for hierarchy
- **Notes**: Italic, positioned strategically
- **Decision Points**: Question format with `?`

### Layout Principles

1. **Top-to-Bottom**: Main data flow goes downward
2. **Left-to-Right**: Secondary flows go rightward
3. **Feedback Loops**: Dashed lines returning upward
4. **Clustered**: Related components in subgraphs
5. **Spaced**: Adequate whitespace for readability

---

## 📚 Usage Guidelines

### For Developers

- **Refer frequently**: Keep diagrams open while coding
- **Trace flows**: Follow specific data through diagrams
- **Identify components**: Locate your module in architecture
- **Understand dependencies**: See what your code connects to

### For Stakeholders

- **High-Level**: Focus on subsystem boundaries
- **Data Flow**: Follow arrows to understand information movement
- **Decision Points**: Understand where judgment is required
- **Timelines**: Grasp project durations and milestones

### For Auditors

- **Compliance Paths**: Trace regulatory checks
- **Audit Trails**: Follow event logging flows
- **Dispute Resolution**: Understand escalation procedures
- **Legal Anchoring**: Verify court-admissible record creation

### For Investors

- **System Maturity**: Assess architectural sophistication
- **Risk Management**: Identify redundancy and failsafes
- **Scalability**: Evaluate modular design
- **Compliance**: Verify regulatory integration

---

## 🔄 Diagram Versioning

All diagrams are versioned with the protocol:

- **v1.0.0**: Initial implementation (October 2025)
- **Future**: Updated with protocol changes

Each diagram includes a note indicating last update date and version compatibility.

---

## 🛠️ Maintenance

### Update Frequency

- **Quarterly**: Review all diagrams for accuracy
- **On-Change**: Update immediately when architecture changes
- **Annual**: Full redesign if major protocol upgrade

### Change Process

1. Propose diagram update via GitHub issue
2. Discuss with core team
3. Update Mermaid code
4. Test rendering (`npm run build`)
5. Submit pull request
6. Peer review
7. Merge and deploy

---

## 📖 Further Reading

- **Full Documentation**: [Integration & Workflows](https://elwizard33.github.io/foliochain-docs/architecture/integration/)
- **Mermaid Syntax**: [Official Mermaid Docs](https://mermaid.js.org/)
- **Contributing**: See `README.md` for contribution guidelines

---

**Last Updated**: October 23, 2025  
**Version**: 1.0.0  
**Maintained by**: FolioChain Documentation Team

*Clear diagrams, clear understanding. 📊*
