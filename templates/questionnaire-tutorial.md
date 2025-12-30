# Tutorial Documentation Questionnaire

Use this questionnaire to gather information for creating a new tutorial. Fill out all sections and provide your questionnaire to an AI agent along with the tutorial-template.mdx to generate an initial draft.

---

## Basic Information

### 1. Tutorial Identification
- **Tutorial title**: [What will users learn? e.g., "Your First Vulnerability Scan"]
- **Brief description** (1-2 sentences): 
- **Target audience difficulty**: [ ] Beginner [ ] Intermediate [ ] Advanced
- **Estimated completion time**: ___ minutes
- **Tutorial category**: 
  - [ ] Basics
  - [ ] Vulnerability Management
  - [ ] CI/CD Integration
  - [ ] Compliance
  - [ ] Advanced

---

## Learning Objectives

### 2. What Will Users Learn?
List 3-5 specific learning outcomes:
1. 
2. 
3. 
4. 
5. 

### 3. What Will Users Build/Accomplish?
Describe the concrete end result (e.g., "A working CI/CD pipeline that automatically scans your Docker images"):


---

## Prerequisites

### 4. Required Knowledge
What should users know before starting?
- [ ] Basic command line usage
- [ ] Docker basics
- [ ] Git/GitHub familiarity
- [ ] API concepts
- [ ] Other: _______________________

### 5. Required Setup
What must users have installed or configured?
- [ ] DevGuard account
- [ ] Docker installed
- [ ] Specific tools: _______________________
- [ ] Access/permissions: _______________________
- [ ] Other: _______________________

### 6. Links to Prerequisites
Provide links to prerequisite tutorials or guides:
1. 
2. 
3. 

---

## Tutorial Content

### 7. Step-by-Step Breakdown

For each major step, provide:

#### Step 1:
- **Step name/title**: 
- **What does this step accomplish?**: 
- **Commands/code to execute**:
  ```bash
  # Paste commands here
  
  ```
- **Expected output**:
  ```
  # What users should see
  
  ```
- **How to verify success**:
- **Common issues at this step**:
- **Tips or best practices**:

#### Step 2:
- **Step name/title**: 
- **What does this step accomplish?**: 
- **Commands/code to execute**:
  ```bash
  
  ```
- **Expected output**:
  ```
  
  ```
- **How to verify success**:
- **Common issues at this step**:
- **Tips or best practices**:

#### Step 3:
- **Step name/title**: 
- **What does this step accomplish?**: 
- **Commands/code to execute**:
  ```bash
  
  ```
- **Expected output**:
  ```
  
  ```
- **How to verify success**:
- **Common issues at this step**:
- **Tips or best practices**:

#### [Add more steps as needed]

---

## Multiple Options/Paths

### 8. Does This Tutorial Have Alternative Paths?
- [ ] Yes - users can choose different tools/platforms
- [ ] No - single path only

If yes, describe the options:

**Option A**: 
- Name: 
- When to choose: 
- Key differences: 

**Option B**: 
- Name: 
- When to choose: 
- Key differences: 

---

## Verification & Next Steps

### 9. Final Verification
How should users verify they completed the tutorial successfully?
- Success criteria 1:
- Success criteria 2:
- Success criteria 3:



### 11. Next Steps
Where should users go from here?
1. 
2. 
3. 

---

## Additional Context

### 12. Common Pitfalls
What mistakes do users commonly make?
1. 
2. 
3. 

### 13. Important Warnings
Critical information users must know:
1. 
2. 

### 14. Helpful Tips
Pro tips to enhance the learning experience:
1. 
2. 
3. 

### 15. Troubleshooting Quick Fixes
Quick solutions for common issues:

**Issue**: 
**Solution**: 

**Issue**: 
**Solution**: 

---

## Related Content

### 16. Related Documentation
- **Related tutorials**: 
- **Related how-to guides**: 
- **Reference documentation**: 
- **Concept explanations**: 

### 17. External Resources
Any external docs, videos, or resources to reference?
1. 
2. 

---

## Tags & Metadata

### 19. Tags
List relevant tags (e.g., "docker", "github-actions", "sbom"):
- 
- 
- 

### 20. Visual Assets
Do you have or need:
- [ ] Screenshots at specific steps
- [ ] Diagrams showing the process
- [ ] Architecture diagrams
- [ ] GIFs/videos

Describe what visuals would help:

---

## Instructions for Draft generation

When you receive this filled questionnaire, use it with the tutorial-template.mdx to:
1. Generate a complete, beginner-friendly tutorial following the Diataxis framework
2. Use clear, actionable language with proper MDX formatting
3. Include code blocks with syntax highlighting
4. Add callouts (info, warning, tip) where appropriate
5. Use Steps component for the main tutorial flow
6. Add Tabs component if multiple options are provided
7. Ensure all prerequisites are linked
8. Include verification steps after each major action
9. Add a "Next Steps" section at the end
10. Keep the tone encouraging and educational

## Universal Quality Standards

### Immediate Usability
- [ ] **Can users copy-paste code and run it immediately?** (Stripe pattern)
  - No placeholder variables like `YOUR_API_KEY` in main examples
  - Actual runnable commands provided
  - Environment-specific instructions included (Mac/Linux/Windows if relevant)

- [ ] **Is there a "quick win" in the first 5 minutes?** (Kubernetes pattern)
  - Users see results fast
  - First success happens early
  - Complex details deferred to later sections

- [ ] **Are there multiple entry points for different skill levels?** (Stripe pattern)
  - Quick start for experienced users
  - Detailed walkthrough for beginners
  - Clear navigation between both

### Code Examples

- [ ] **Do code examples show the COMPLETE context?** (GitHub API pattern)
  - Full curl commands with all headers
  - Complete request bodies (not just fragments)
  - Full response examples (not just schema)

- [ ] **Are examples provided in multiple formats?** (GitHub API pattern)
  - curl / CLI
  - Code library (JavaScript, Python, etc.)
  - UI screenshots where applicable

- [ ] **Do examples use realistic data?** (Avoid "foo", "bar", "test123")
  - Real-world naming conventions
  - Meaningful example values
  - Context that matches actual use cases

### Progressive Disclosure

- [ ] **Is there a clear "what happens next" explanation?** (Stripe pattern)
  - After each code block, explain what the system does
  - Show the flow: "When you run this command, the following happens: 1... 2... 3..."
  - Make the invisible visible

- [ ] **Do you show the "complete picture" before diving into details?** (Docker pattern)
  - Architecture diagram early
  - Overall flow explained first
  - Then drill into specifics

- [ ] **Are advanced/optional topics clearly marked and separated?** (Stripe pattern)
  - Optional sections labeled as such
  - Advanced content doesn't interrupt basic flow
  - Easy to skip and come back later

## Tutorial-Specific Quality

### Learning Flow
- [ ] **Do users build something REAL, not a toy example?** (Kubernetes pattern)
  - Actual production-relevant scenario
  - Not "Hello World" unless that's the explicit goal
  - Users can extend/adapt for their needs

- [ ] **Is there a testing/verification step after each major section?** (Stripe pattern)
  - "Let's verify this worked"
  - Clear success criteria
  - Troubleshooting for common failures

- [ ] **Does the tutorial show what success looks like?** (Visual proof)
  - Screenshots of expected output
  - Example responses
  - Clear indicators of completion

### Learning Outcomes
- [ ] **Are learning objectives measurable?** (Not "understand" but "create", "configure", "deploy")
  - Action verbs
  - Concrete outputs
  - Testable results
